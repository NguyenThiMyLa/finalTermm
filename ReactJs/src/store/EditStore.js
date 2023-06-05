import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import {variables} from '../Variables.js';
import './store.css';
import '../App.css'
import {ToastContainer, toast } from 'react-toastify'

const EditStore = () => {
        const [Name, namechange] = useState('');
        const [Address, addresschange] = useState('');
        const [PhoneNumber, phonenumberchange] = useState('');
        const [OwnerId, OwnerIdChange] = useState('');
        const [BusinessStartDate, BusinessStartDateChange] = useState('');
        const [BusinessLicense, BusinessLicenseChange] = useState('');
        const [TaxCode, TaxCodeChange] = useState('');
        const {Id}=useParams();

        const navigate=useNavigate();
        useEffect(()=>{
            fetch(variables.API_URL+'store/'+Id).then (res=>{
                return res.json();
            }).then(res=>{
                namechange(res[0].Name);
                addresschange(res[0].Address);
                phonenumberchange(res[0].PhoneNumber);
                OwnerIdChange(res[0].OwnerId);
                BusinessStartDateChange(res[0].BusinessStartDate);
                BusinessLicenseChange(res[0].BusinessLicense);
                TaxCodeChange(res[0].TaxCode);
            }).catch((err)=>{
                console.log(err.message);
            })
        },[]);
    const handlesubmit = (e) => {
        e.preventDefault();
        const storeobj = {Id, Name, OwnerId, Address, PhoneNumber, BusinessStartDate, BusinessLicense, TaxCode};
        fetch(variables.API_URL+'store', {
            method: "PUT",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(storeobj)
        }).then(res => {
            toast.success('Cập nhật thông tin cửa hàng thành công');
            navigate('/store');
        }).catch((err) => {
            console.log(err.message);
        })
    }
    return ( 
        <div>
            <form className="container_body" onSubmit={handlesubmit}>
                <div className="card">
                    <div className="card-header">
                        <h2>Chỉnh sửa thông tin cửa hàng</h2>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label>Tên cửa hàng</label>
                            <input onChange={e=>namechange(e.target.value)} value={Name}  className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label>Địa chỉ</label>
                            <input onChange={e=>addresschange(e.target.value)} value={Address} className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label>Số điện thoại</label>
                            <input onChange={e=>phonenumberchange(e.target.value)} value={PhoneNumber} className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label>Ngày đăng ký bắt đầu kinh doanh</label>
                            <input onChange={e=>BusinessStartDateChange(e.target.value)} value={BusinessStartDate} className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label>Giấy phép kinh doanh</label>
                            <input onChange={e=>BusinessLicenseChange(e.target.value)} value={BusinessLicense} className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label>Mã số thuế</label>
                            <input onChange={e=>TaxCodeChange(e.target.value)} value={TaxCode} className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <input onChange={e=>OwnerIdChange(e.target.value)} value={OwnerId} type="hidden" className="form-control"></input>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-success" type="submit">Lưu</button>
                        <ToastContainer />
                    </div>
                </div> 
            </form>
        </div>
     );
}
 
export default EditStore;