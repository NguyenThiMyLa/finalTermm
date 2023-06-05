import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import {variables} from '../Variables.js';
import {ToastContainer, toast } from 'react-toastify'
import '../App.css'

const EditStoreMerchandise = () => {
        const [Name, namechange] = useState('');
        const [StoreId, StoreIdChange] = useState('');
        const [MerchandiseId, MerchandiseIdChange] = useState('');
        const [MadeIn, MadeInChange] = useState('');
        const {Id}=useParams();

        const navigate=useNavigate();
        useEffect(()=>{
            fetch(variables.API_URL+'StoreMerchandise/'+Id).then (res=>{
                return res.json();
            }).then(res=>{
                namechange(res[0].Name);
                MadeInChange(res[0].MadeIn);
                StoreIdChange(res[0].StoreId);
                MerchandiseIdChange(res[0].StoreId);
            }).catch((err)=>{
                console.log(err.message);
            })
        },[]);
    const handlesubmit = (e) => {
        e.preventDefault();
        const storeMerchandiseobj = {Id, MerchandiseId, Name, MadeIn, StoreId};
        fetch(variables.API_URL+'StoreMerchandise', {
            method: "PUT",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(storeMerchandiseobj)
        }).then(res => {
            toast.success('Cập nhật thông tin mặt hàng thành công');
            navigate('/store/storeMerchandise/'+storeMerchandiseobj.StoreId);
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
                            <label>Tên mặt hàng</label>
                            <input onChange={e=>namechange(e.target.value)} value={Name}  className="form-control" disabled></input>
                        </div>
                        <div className="form-group">
                            <label>Xuất xứ</label>
                            <input onChange={e=>MadeInChange(e.target.value)} value={MadeIn} className="form-control"></input>
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

export default EditStoreMerchandise;