import React ,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {  Form, Input, message } from 'antd';
import axios from "axios";
import Spinner from '../components/Spinner';

const Register = () => {
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    // submit 
    const submitHandler = async (values) => {
        try {
            setLoading(true);
            await axios.post('/user/register', values);
            message.success("Registration Successful");
            setLoading(false)
            navigate("/login");

        } catch (err) {
            setLoading(true)
            message.error("Something went wrong");
            setLoading(false)
        }
    }
    //prevent
    useEffect(()=>{
        if(localStorage.getItem("user")){
            navigate("/")
        }
    },[navigate])
    return (
        <>
            <div className="register-page ">
                <div>{loading && <Spinner/>}</div>
                <Form layout="vertical p-5 custom-form  bg-white" onFinish={submitHandler}>
                    
                    <Form.Item label="Name" name="name" className='text-white custom-label' >
                        <Input type='text' className='fs-5'/>
                    </Form.Item>
                    <Form.Item label="Email" name="email" className='text-white custom-label' >
                        <Input type="email" className='fs-5' />
                    </Form.Item>
                    <Form.Item label="Password" name="password" className='text-white custom-label' >
                        <Input type="password" className='fs-5'/>
                    </Form.Item>
                    <div className="d-flex flex-column">
                        <Link to="/login" className=' pb-3 text-black  text-center mt-2'>
                            Already Register ? Click Here to login
                        </Link>
                        <button className='btn btn-primary custom-btn'>Sign Up</button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default Register
