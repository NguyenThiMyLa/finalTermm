import { useState } from "react";
import {variables} from '../Variables.js';
import { ToastContainer, toast } from 'react-toastify';
import { Navigate } from "react-router-dom";
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Registeration = () => {
    const [username, usernamechange] = useState('');
    const [firstname, firstnamechange] = useState('');
    const [lastname, lastnamechange] = useState('');
    const [role, rolechange] = useState('');
    const [email, emailchange] = useState('');
    const [password, passwordchange] = useState('');
    const [phonenumber, phonenumberchange] = useState('');
    const [address, addresschange] = useState('');

    const regobj={username, firstname, lastname, role, email, phonenumber, password, address};

    let validate = true;
    const navigate=useNavigate();
    const handlesubmit=(e) => {
        e.preventDefault();
        functionvalidate();
        if(validate){
        fetch(variables.API_URL+'register', {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                UserName : username,
                FirstName : firstname,
                LastName : lastname,
                Email : email,
                PhoneNumber : phonenumber, 
                Password : password,
                Address : address,
                RoleId : "91888b75-f38c-4ad1-90db-77e9e02f31f5"
            })
        })
        .then(res=> {
            toast.success('Đăng ký thành công', 'Please contact admin for activation');
            navigate('/login');
        }).catch((err)=> {
            console.log(err.message);
        })
        } else {
            toast.warning('Vui lòng nhập thông tin xác thực hợp lệ và tiếp tục')
        }
    };

    const validateemail=(emailvalue)=> {
        if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(emailvalue)) {
        }else {
            toast.warning('Vui lòng nhập Email hợp lệ')
        }
    }

    const validateuser=(username) => {
        fetch(variables.API_URL+'user'+username).then(res=> {
            if (!res.ok) {
                return false;
            }
            return res.json();
        }).then(resp=> {
            if(Object.keys(resp).length > 0) {
                validate=false;
                toast.warning('Tên đăng nhập đã tồn tại')
                usernamechange('');
            }
        })
    }
    const functionvalidate=()=> {
        if (username.length === 0) {
            validate=false;
        }
        if (email.length === 0) {
            validate=false;
        } else {
            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {

            }else {
                validate = false;
            }
        }
        if (password.length === 0) {
            validate=false;
        }
    }
    return ( 
        <div>
            <form className="container" onSubmit={handlesubmit}>
                <div className="row">
                    <div className="offset-lg-2 col-lg-8">
                        <div className="register-title">
                            <h2>Đăng ký tài khoản</h2>
                        </div>
                        <div className="card-body-register">
                            <div className="form-group register-input">
                                <label class="">Tên đăng nhập<span className="text-danger">*</span></label>
                                <input placeholder="Tên đăng nhập" value={username} onBlur={e=>validateuser(e.target.value)} onChange={e => usernamechange(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group register-input">
                                <label>Họ<span className="text-danger">*</span></label>
                                <input placeholder="Họ" value={firstname} onChange={e => firstnamechange(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group register-input">
                                <label>Tên<span className="text-danger">*</span></label>
                                <input placeholder="Tên" value={lastname} onChange={e => lastnamechange(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group register-input">
                                <label>Email <span className="text-danger">*</span></label>
                                <input placeholder="Email" value={email} onBlur={e=>validateemail(e.target.value)} onChange={e => emailchange(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group register-input">
                                <label>Mật khẩu<span className="text-danger">*</span></label>
                                <input placeholder="Mật khẩu" value={password} onChange={e => passwordchange(e.target.value)} className="form-control" type="password"></input>
                            </div>
                            <div className="form-group register-input">
                                <label>Số điện thoại</label>
                                <input placeholder="Số điện thoại" value={phonenumber} onChange={e => phonenumberchange(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group register-input">
                                <text>Địa chỉ</text>
                                <textarea placeholder="Địa chỉ" value={address} onChange={e => addresschange(e.target.value)} className="form-control"></textarea>
                            </div>
                            <div className="form-group register-input">
                                <input value={role} onChange={e => rolechange(e.target.value)} type="hidden" className="form-control"></input>
                            </div>
                        </div>
                        <div className="register-button">
                            <button className="btn btn-success" type="submit">Đăng ký</button>
                            <ToastContainer />
                            <Link className="btn btn-primary" to="/login">Đã có tài khoản?</Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
     );
}
 
export default Registeration;