import { Link, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {variables} from '../Variables.js';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, usernamechange] = useState('');
    const [password, passwordchange] = useState('');
    
    const navigate=useNavigate();
    let validate = true;

    useEffect(()=> {
        localStorage.clear();
    })

    const handlesubmit=(e) => {
        e.preventDefault();
        functionvalidate();
        if (validate) {
            fetch(variables.API_URL+'login', {
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    username:username,
                    password:password
                })
            }).then(res=>{
                console.log(res);
                if(!res.ok) {
                    toast.error('Login Failed')
                }
                return res.json();
            }).then(res=> {
                console.log(res);
                if(res.length>0) {
                    let userobj=res[0];
                    if(userobj.isactive===false) {
                        toast.error('User in InActive state, plase contact admin for activation');
                    } else {
                        localStorage.setItem('username', username);
                        localStorage.setItem('userrole', userobj.role);
                        toast.success('Đăng nhập thành công');
                        navigate('/');
                    }
                }else {
                    toast.error('Tên đăng nhập hoặc mật khẩu không đúng')
                }
            })
        }else {
            toast.warning('Vui lòng nhập thông tin xác thực hợp lệ và tiếp tục')
        }
    };

    const functionvalidate=()=> {
        if (username.length === 0 && password.length === 0) {
            validate=false;
        }
    }

    return ( 
        <div>
            <form className="container" onSubmit={handlesubmit}>
                <div className="row">
                    <div className="offset-lg-2 col-lg-8">
                        <div className="login-title">
                            <h2>Đăng nhập</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group login-input">
                                <label>Tên đăng nhập<span className="text-danger">*</span></label>
                                <input value={username} placeholder='Tên đăng nhập' onChange={e => usernamechange(e.target.value)} className="login-form-control"></input>
                            </div>
                            <div className="form-group login-input-password ">
                                <label>Mật khẩu<span className="text-danger">*</span></label>
                                <input value={password} placeholder='Mật khẩu' onChange={e => passwordchange(e.target.value)} className="login-form-control" type="password"></input>
                            </div>
                        </div>
                        <div className="login-button">
                            <button className="btn btn-success" type="submit">Đăng nhập</button>
                            <ToastContainer />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;