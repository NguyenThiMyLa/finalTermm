import React, {Component, useEffect, useState} from 'react';
import {variables} from '../Variables';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {ToastContainer, toast } from 'react-toastify';


const StoreMerchandise = () => {
    const[storeMerchandiseList, storeMerchandiseUpdate] = useState([null]);
    const pathStoreId = window.location.href;
    const navigate=useNavigate();

    const handleRemove=(Id)=> {
        if(window.confirm('Bạn có muốn xóa cửa hàng này không?')) {
            fetch(variables.API_URL+'StoreMerchandise/'+Id,{
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
        const StoreId = pathStoreId.slice(-36);
        localStorage.setItem( 'StoreId', StoreId );
        fetch(variables.API_URL+'StoreMerchandise/getSMerchandise/'+StoreId)
        .then(res => {
            return res.json();
        }).then(resp=>{
            storeMerchandiseUpdate(resp);
        }).catch((err)=> {
            console.log(err.message);
        })
    }, []);
    return(
        <div class="container">
            <div class="card">
                <div class="card-header store-title">
                    <h2>Danh sách mặt hàng của cửa hàng</h2>
                </div>
                <div class="card-body">
                    <div>
                        <Link class="btn btn-success btn-addStore" to="/store/storeMerchandise/create">Thêm mặt hàng (+)</Link>
                    </div>
                    <table class="table table-bordered">
                        <thead class="bg-dark text-white">
                            <tr>
                                <td class="title-tableStore">Tên mặt hàng</td>
                                <td class="title-tableStore">Xuất xứ</td>
                                <td class="title-tableStore">Đánh giá</td>
                                <td class="title-tableStore">Chỉnh sửa</td>
                                <td class="title-tableStore">Xóa</td>
                            </tr>
                        </thead>

                        <tbody>
                            {   
                                storeMerchandiseList.map((item)=>(
                                    <tr key={item?.Id}>
                                        <td class="body-tableStore">{item?.Name}</td>
                                        <td class="body-tableStore">{item?.MadeIn}</td>
                                        <td class="body-tableStore">
                                            <Link class="btn btn-primary" to={"/store/storeMerchandise/edit/"+item?.Id}>Đánh giá</Link>
                                        </td>
                                        <td class="body-tableStore">
                                            <Link class="btn btn-primary" to={"/store/storeMerchandise/edit/"+item?.Id}>Chỉnh sửa</Link>
                                        </td>
                                        <td class="body-tableStore">
                                            <a onClick={()=>{handleRemove(item?.Id)}} class="btn btn-danger">Xóa</a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}


export default StoreMerchandise;