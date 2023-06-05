import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import {variables} from '../Variables.js';
import {ToastContainer, toast } from 'react-toastify'
import '../App.css';

const EditUser = () => {
    const [FirstName, firstnamechange] = useState('');
    const [LastName, lastnamechange] = useState('');
    const [Address, addresschange] = useState('');
    const [PhoneNumber, phonenumberchange] = useState('');
    const [Email, emailchange] = useState('');
    const {Id}=useParams();

    const navigate=useNavigate();
    useEffect(()=>{
        fetch(variables.API_URL+'user/'+Id).then (res=>{
            return res.json();
        }).then(res=>{
            firstnamechange(res[0].FirstName);
            lastnamechange(res[0].LastName);
            addresschange(res[0].Address);
            phonenumberchange(res[0].PhoneNumber);
            emailchange(res[0].Email);
        }).catch((err)=>{
            console.log(err.message);
        })
    },[]);
    const handlesubmit = (e) => {
        e.preventDefault();
        const userobj = {Id, FirstName, LastName, Address, PhoneNumber, Email};
        fetch(variables.API_URL+'user', {
            method: "PUT",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(userobj)
        }).then(res => {
            toast.success('Updated Successfully');
            navigate('/user');
        }).catch((err) => {
            console.log(err.message);
        })
    }
    return ( 
        <div>
            <form className="container_body" onSubmit={handlesubmit}>
                <div className="card">
                    <div className="card-header">
                        <h2>Chỉnh sửa thông tin User</h2>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label>FirstName</label>
                            <input onChange={e=>firstnamechange(e.target.value)} value={FirstName}  className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label>LastName</label>
                            <input onChange={e=>lastnamechange(e.target.value)} value={LastName}  className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input onChange={e=>addresschange(e.target.value)} value={Address}  className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label>PhoneNumber</label>
                            <input onChange={e=>phonenumberchange(e.target.value)} value={PhoneNumber}  className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input onChange={e=>emailchange(e.target.value)} value={Email}  className="form-control"></input>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-success" type="submit">Save</button>
                        <ToastContainer />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditUser;