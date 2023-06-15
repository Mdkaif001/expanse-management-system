import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, message } from 'antd';
import axios from "axios"
import Spinner from '../components/Spinner';
const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    // submit 
    const submitHandler = async (values) => {
        try {
            setLoading(true);
            const { data } = await axios.post("/user/login", values);
            setLoading(false)
            message.success("Login Success");
            localStorage.setItem('user', JSON.stringify({ ...data, password: '' }))
            navigate("/")
        } catch (err) {
            setLoading(true);
            message.error("Wrong email and password")
            console.log(err);
            setLoading(false)
        }
    }
    //prevent
    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate("/")
        }
    }, [navigate])


    return (
        <>
            <div className="register-page ">
                <div>{loading && <Spinner />}</div>
                <Form layout="vertical bg-white p-5 custom-form " onFinish={submitHandler}>
                    <Form.Item label="Email" name="email"  className='custom-label'>
                        <Input type="email"  className='fs-5' />
                    </Form.Item>
                    <Form.Item className='text-white custom-label' label="Password" name="password"  >
                        <Input type="password"  className='fs-5' />
                    </Form.Item>
                    <div className="d-flex flex-column text-white">
                        <Link to="/register" className=' pb-3 text-black  text-center mt-2'>
                        Not a user ? Click Here to Register
                    </Link>
                    <button className='btn btn-primary custom-btn'>Login</button>
            </div>
        </Form >
            </div >
        </>
    )
}

export default Login
