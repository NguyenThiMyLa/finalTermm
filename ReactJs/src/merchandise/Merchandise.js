import React, {Component, useEffect, useState} from 'react';
import {variables} from '../Variables';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './merchandise.css'
import {ToastContainer, toast } from 'react-toastify';


const Merchandise = () => {
    const[merchandiseList, merchandiseUpdate] = useState([null]);
    const[image, setImage] = useState();
    const navigate=useNavigate();
    const handleRemove=(Id)=> {
        if(window.confirm('Bạn có muốn xóa hàng hóa này không?')) {
            fetch(variables.API_URL+'merchandise/'+Id,{
                method: "DELETE"
            }).then(res=> {
                toast.success('Đã xóa thành công.');
                navigate(0);
            }).catch((err) => {
                console.log(err.message);
            });
        }
    };

    const handleImage = (e) => {
        const file = e.target.files[0]
        file.preview = URL.createObjectURL(file)
        setImage(file);
    }

    useEffect(()=> {
        fetch(variables.API_URL+'merchandise')
        .then(res => {
            return res.json();
        }).then(resp=>{
            merchandiseUpdate(resp);
        }).catch((err)=> {
            console.log(err.message);
        })
    }, []);

    useEffect(() => {
        return () => {
            image && URL.revokeObjectURL(image.preview);
        }
    }, [image])
    return(
        <div class="container">
            <div class="card container_list">
                <div class="card-header store-title">
                    <h2>Danh sách hàng hóa có trong chợ</h2>
                </div>
                <div class="card-body">
                    <div>
                        <Link class="btn btn-success btn-addStore" to="/merchandise/create">Thêm hàng hóa (+)</Link>
                    </div>
                    <div className="table-height">
                        <table class="table table-bordered">
                            <thead class="bg-dark text-white">
                                <tr>
                                    <td class="title-tableStore">Tên hàng hóa</td>
                                    <td class="title-tableStore">Hình ảnh</td>
                                    <td class="title-tableStore">Chỉnh sửa</td>
                                    <td class="title-tableStore">Xóa</td>
                                </tr>
                            </thead>

                            <tbody>
                                {   
                                    merchandiseList.map((item)=>(
                                        <tr key={item?.Id}>
                                            <td class="body-tableStore">{item?.Name}</td>
                                            <td>
                                                <div>
                                                    <input  type="file"
                                                            onChange={handleImage}
                                                    />
                                                    {image && (
                                                        <img src={image.preview} alt="" width="30px" height="30px"/>
                                                    )}
                                                </div>
                                            </td>
                                            <td class="body-tableStore">
                                                <Link class="btn btn-primary" to={"/merchandise/edit/"+item?.Id}>Chỉnh sửa</Link>
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


export default Merchandise;