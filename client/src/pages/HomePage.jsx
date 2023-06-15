import React, { useState, useEffect } from 'react'
import { Modal, message } from 'antd'
import { Form, Input, Select, Table, DatePicker } from 'antd';
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import Spinner from '../components/Spinner';
import moment from 'moment'
import Analytics from "../components/Analytics"
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState("7")
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState('all');
  const [viewData, setViewData] = useState('table');
  const [editable, setEditable] = useState(null)
  const [deleted,setDeleted] =useState(false)
  // Delete
  const handleDelete = async (record) => {
    try {
      setDeleted(true)
      setLoading(true)
      await axios.post("/transactions/delete-transactions",{transactionId:record._id});
      setLoading(false)
      setDeleted(false)
      message.success("Transaction Deleted")
  
  }catch (err) {
    setLoading(false)
    console.log(err);
    message.error("Enable to delete")
  }
}

// table data
const columns = [
  {
    title: "Date",
    dataIndex: 'date',
    key: 'date',
    render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>
  },
  {
    title: "Amount",
    dataIndex: 'amount',
    key: 'amount'
  },
  {
    title: "Type",
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: "Category",
    dataIndex: 'category',
    key: 'category'
  },
  {
    title: "Reference",
    dataIndex: 'reference',
    key: 'reference'
  },
  {
    title: "Action",
    key: 'action',
    render: (text, record) => (
      <div>
        <EditOutlined onClick={() => {
          setEditable(record)
          setShowModal(true)
        }} />
        <DeleteOutlined className='mx-2' onClick={() => { handleDelete(record) }} />
      </div>
    )
  },
]

const getAllTransaction = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    setLoading(true)
    const res = await axios.post('/transactions/get-transactions', {
      userid: user.userData._id,
      frequency,
      selectedDate,
      type
    })
    setLoading(false)
    setAllTransaction(res.data)
  } catch (err) {
    message.error("Fetch issue with Transaction")
  }

}
// useEffect
useEffect(() => {
  getAllTransaction()
}, [frequency, selectedDate, type, editable,deleted])




// submit
const handlerSubmit = async (values) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    setLoading(true)
    if (editable) {
      await axios.post('/transactions/edit-transactions', {
        payload: {
          ...values,
          userid: user.userData._id,
        },
        transactionId: editable._id
      })
      setLoading(false)
      message.success("Transaction updated")
    } else {
      await axios.post('/transactions/add-transactions', { ...values, userid: user.userData._id })
      setLoading(false)
      message.success("Transaction added")
    }
    setShowModal(false)
    setEditable(null)
  } catch (err) {
    setLoading(false);
    if (err.response) {
      console.log(err.response.data);
      console.log(err.response.status);
      message.error("Failed to add transaction: Server Error");
    } else if (err.request) {
      console.log(err.request);
      message.error("Failed to add transaction: No response received");
    } else {
      console.log('Error', err.message);
      message.error("Failed to add transaction: Request Error");
    }
    console.log(err);
  }
};
return (
  <>
  {loading && <Spinner />}
  <Layout >
    <div className="filters px-5">
      <div className="d-flex  justify-content-center align-items-center">
        <div className="d-flex justify-content-center align-items-center ">
          <h6 className="mb-0">Select Frequency:</h6>
          <Select value={frequency} onChange={(value) => setFrequency(value)} className='m-2'>
            <Select.Option value="7">
              Last One Week
            </Select.Option>
            <Select.Option value="30">
              Last One Month
            </Select.Option>
            <Select.Option value="365">
              Last One Year
            </Select.Option>
            <Select.Option value="custom">
              Custom
            </Select.Option>
          </Select>
          {frequency === "custom" && <RangePicker value={selectedDate} onChange={(value) => setSelectedDate(value)} />}
        </div>
        <div className="d-flex justify-content-center align-items-center mx-3">
          <h6 className="mb-0">Select Type:</h6>
          <Select value={type} onChange={(value) => setType(value)} className='m-2'>
            <Select.Option value="all">
              All
            </Select.Option>
            <Select.Option value="expanse">
              Expanse
            </Select.Option>
            <Select.Option value="income">
              Income
            </Select.Option>
          </Select>

        </div>
      </div>
      <div className="icons mx-2">
        <UnorderedListOutlined className={`mx-2 fs-4 ${viewData === "table" ? "active-icon" : "inactive-icon"}`} onClick={() => setViewData('table')} />
        <AreaChartOutlined className={`mx-2 fs-4 ${viewData === "analytics" ? "active-icon" : "inactive-icon"}`} onClick={() => setViewData('analytics')} />
      </div>
      <div className=""><button className="btn btn-secondary custom-btn px-5" onClick={() => setShowModal(true)}>Add New</button></div>
    </div>
    <div className="content px-5">
      {viewData === "table" ? <Table dataSource={allTransaction} columns={columns} className='text-capitalize' /> : <Analytics allTransaction={allTransaction} />}

    </div>
    <Modal title={editable ? 'Edit Transactions' : 'Add Transactions'} open={showModal} onCancel={() => setShowModal(false)} footer={false}>
      <Form Layout="vertical" onFinish={handlerSubmit} className='text-capitalize' initialValues={editable}>
        <Form.Item label="Amount" name="amount">
          <Input type='text' />
        </Form.Item>
        <Form.Item label="Type" name="type">
          <Select>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expanse">Expanse</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Category" name="category">
          <Select>
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="tip">Tip</Select.Option>
            <Select.Option value="project">Project</Select.Option>
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="move">Move</Select.Option>
            <Select.Option value="bills">Bills</Select.Option>
            <Select.Option value="fee">Fee</Select.Option>
            <Select.Option value="tax">Tax</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Date" name="date">
          <Input type='Date' />
        </Form.Item>
        <Form.Item label="Reference" name="reference">
          <Input type='text' />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input type='text' />
        </Form.Item>
        <div className="d-flex justify-content-end">
          <button type='submit' className="btn btn-secondary">SAVE</button>
        </div>
      </Form>
    </Modal>
  </Layout>
</>
)
}

export default HomePage
