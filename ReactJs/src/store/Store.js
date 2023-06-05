import React, {Component, useEffect, useState} from 'react';
import {variables} from '../Variables';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './store.css';
import {ToastContainer, toast } from 'react-toastify';


const Store = () => {
    const[storeList, storeUpdate] = useState([null]);
    const navigate=useNavigate();
    const handleRemove=(Id)=> {
        if(window.confirm('Bạn có muốn xóa cửa hàng này không?')) {
            fetch(variables.API_URL+'store/'+Id,{
                method: "DELETE"
            }).then(res=> {
                toast.success('Đã xóa thành công.');
                navigate(0);
            }).catch((err) => {
                console.log(err.message);
            });
        }
    };

    useEffect(()=> {
        fetch(variables.API_URL+'store')
        .then(res => {
            return res.json();
        }).then(resp=>{
            storeUpdate(resp);
        }).catch((err)=> {
            console.log(err.message);
        })
    }, []);
    return(
        <div class="container">
            <div class="card container_list">
                <div class="card-header store-title">
                    <h2>Danh sách cửa hàng</h2>
                </div>
                <div class="card-body">
                    <div>
                        <Link class="btn btn-success btn-addStore" to="/store/create">Thêm cửa hàng (+)</Link>
                        {/* <input type="text" placeholder="Search..." className='search' onChange={(e) => setQuery(e.target.value)}></input> */}
                    </div>
                    <div className="table-height">
                        <table class="table table-bordered">
                            <thead class="bg-dark text-white">
                                <tr>
                                    <td class="title-tableStore">Tên cửa hàng</td>
                                    <td class="title-tableStore">Địa chỉ</td>
                                    <td class="title-tableStore">Số điện thoại</td>
                                    <td class="title-tableStore">Ngày đăng ký kinh doanh</td>
                                    <td class="title-tableStore">Giấy phép kinh doanh</td>
                                    <td class="title-tableStore">Mã số thuế</td>
                                    <td class="title-tableStore">Mặt hàng</td>
                                    <td class="title-tableStore">Chỉnh sửa</td>
                                    <td class="title-tableStore">Xóa</td>
                                </tr>
                            </thead>

                            <tbody>
                                {   
                                    storeList.map((item)=>(
                                        <tr key={item?.Id}>
                                            <td class="body-tableStore">{item?.Name}</td>
                                            <td class="body-tableStore">{item?.Address}</td>
                                            <td class="body-tableStore">{item?.PhoneNumber}</td>
                                            <td class="body-tableStore">{item?.BusinessStartDate}</td>
                                            <td class="body-tableStore">{item?.BusinessLicense}</td>
                                            <td class="body-tableStore">{item?.TaxCode}</td>
                                            <td class="body-tableStore">
                                                <Link class="btn btn-primary" to={"/store/storeMerchandise/"+item?.Id}>Mặt hàng</Link>
                                            </td>
                                            <td class="body-tableStore">
                                                <Link class="btn btn-primary" to={"/store/edit/"+item?.Id}>Chỉnh sửa</Link>
                                            </td>
                                            <td class="body-tableStore">
                                                <a onClick={()=>{handleRemove(item.Id)}} class="btn btn-danger">Xóa</a>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Store;