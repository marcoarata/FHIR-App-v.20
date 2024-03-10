import React from 'react';
import { Button, Form, Input } from 'antd'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { hideLoading, showLoading } from '../redux/alertsSlice';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            dispatch(showLoading());
            const response = await axios.post("/api/user/login", values);
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                localStorage.setItem("token", response.data.data);
                navigate('/');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error('Something went wrong');
        }
    };

    return (
        <div className='auth'>
        <div className='auth-frame'>
            <div className='auth-form card p-3'>
                <h1 className='card-title'>Welcome Back</h1>
                <Form layout='vertical' onFinish={onFinish}>
                    <Form.Item label='Email' name='email'>
                        <Input placeholder='Email' />
                    </Form.Item>
                    <Form.Item label='Password' name='password'>
                        <Input type='password' placeholder='Password' />
                    </Form.Item>

                    <Button className='primary-button my-2' htmlType='submit'>LOGIN</Button>

                    <Link to='/register' className='anchor mt-2'>CLICK HERE TO REGISTER</Link>

                </Form>
            </div>
        </div>
        </div>
    );
};

export default Login;