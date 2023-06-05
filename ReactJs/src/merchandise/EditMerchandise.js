import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import {variables} from '../Variables.js';
import {ToastContainer, toast } from 'react-toastify'
import '../App.css';

const EditStore = () => {
        const [Name, namechange] = useState('');
        const {Id}=useParams();

        const navigate=useNavigate();
        useEffect(()=>{
            fetch(variables.API_URL+'merchandise/'+Id).then (res=>{
                return res.json();
            }).then(res=>{
                namechange(res[0].Name);
            }).catch((err)=>{
                console.log(err.message);
            })
        },[]);
    const handlesubmit = (e) => {
        e.preventDefault();
        const merchandiseobj = {Id, Name};
        fetch(variables.API_URL+'merchandise', {
            method: "PUT",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(merchandiseobj)
        }).then(res => {
            toast.success('Cập nhật thông tin hàng hóa thành công');
            navigate('/merchandise');
        }).catch((err) => {
            console.log(err.message);
        })
    }
    return ( 
        <div>
            <form className="container_body" onSubmit={handlesubmit}>
                <div className="card">
                    <div className="card-header">
                        <h2>Chỉnh sửa thông tin hàng hóa</h2>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label>Tên hàng hóa</label>
                            <input onChange={e=>namechange(e.target.value)} value={Name}  className="form-control"></input>
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