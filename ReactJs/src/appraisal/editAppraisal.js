import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import {variables} from '../Variables.js';
import {ToastContainer, toast } from 'react-toastify'
import Select from 'react-select';

const EditAppraisal = () => {
    const [StaffId, setSelectedOptions] = useState();
    const [StaffLists, StaffUpdate] = useState([null]);
    const [Name, namechange] = useState('');
    const [Address, AddressChange] = useState('');
    const [StoreId] = useState('');
    const [DateCheck, DateCheckChange] = useState('');
    const [Checker, CheckerChange] = useState('');
    const {Id}=useParams();

    const navigate=useNavigate();
    useEffect(()=>{
        fetch(variables.API_URL+'appraisal/'+Id).then (res=>{
            return res.json();
        }).then(res=>{
            namechange(res[0].Name);
            AddressChange(res[0].Address);
            CheckerChange(res[0].Checker);
            DateCheckChange(res[0].DateCheck);
        }).catch((err)=>{
            console.log(err.message);
        })

        fetch(variables.API_URL + 'user/getStaff')
            .then(res => {
                return res.json();
            }).then(resp => {
                const StaffList = [];
                resp.forEach(element => {
                    StaffList.push({value: element.Id, label: element.LastName});
                });
                StaffUpdate(StaffList);
            }).catch((err) => {
                console.log(err.message);
            })
    },[]);
    const handlesubmit = (e) => {
        e.preventDefault();
        const appraisalobj = {Id, Name, StoreId, Address, DateCheck, Checker, StaffId};
        fetch(variables.API_URL+'appraisal', {
            method: "PUT",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(appraisalobj)
        }).then(res => {
            toast.success('Cập nhật thông tin cửa hàng thành công');
            navigate('/appraisal');
        }).catch((err) => {
            console.log(err.message);
        })
    }

    function handleSelect(data) {
        let a = data.value;
        setSelectedOptions(a);
    }
    return ( 
        <div>
            <form className="container_body" onSubmit={handlesubmit}>
                <div className="card">
                    <div className="card-header">
                        <h2>Chỉnh sửa thông tin cửa hàng đã thẩm định</h2>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label>Tên cửa hàng</label>
                            <input onChange={e=>namechange(e.target.value)} value={Name}  className="form-control" disabled></input>
                        </div>
                        <div className="form-group">
                            <label>Địa chỉ</label>
                            <input onChange={e=>AddressChange(e.target.value)} value={Address}  className="form-control" disabled></input>
                        </div>
                        <div className="App">
                        <label>Người kiểm tra</label>
                            <Select
                                options={StaffLists}
                                placeholder="Chọn nhân viên kiểm tra"
                                value={StaffLists.LastName}
                                onChange={handleSelect}
                                isSearchable={true}
                            />
                    </div>
                        <div className="form-group">
                            <label>Ngày kiểm tra</label>
                            <input onChange={e=>DateCheckChange(e.target.value)} value={DateCheck}  className="form-control"></input>
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

export default EditAppraisal;