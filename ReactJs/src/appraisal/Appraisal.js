import React, { Component, useEffect, useState } from 'react';
import { variables } from '../Variables';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';


const Appraisal = () => {
    const [storeList, storeUpdate] = useState([null]);
    const navigate = useNavigate();
    const handleRemove = (Id) => {
        if (window.confirm('Bạn có muốn xóa cửa hàng này không?')) {
            fetch(variables.API_URL + 'Appraisal/Appraisal/' + Id, {
                method: "DELETE"
            }).then(res => {
                toast.success('Đã xóa thành công.');
                navigate(0);
            }).catch((err) => {
                console.log(err.message);
            });
        }
    };

    useEffect(() => {
        fetch(variables.API_URL + 'Appraisal/Appraisal')
            .then(res => {
                return res.json();
            }).then(resp => {
                storeUpdate(resp);
            }).catch((err) => {
                console.log(err.message);
            })
    }, []);
    return (
        <div class="container">
            <div class="card">
                <div class="card-header store-title">
                    <h2>Quản lý thẩm định định kỳ: Đã kiểm tra</h2>
                </div>
                <div className='table-height'>
                    <table class="table table-bordered">
                        <thead class="bg-dark text-white">
                            <tr>
                                <td class="title-tableStore">Tên cửa hàng</td>
                                <td class="title-tableStore">Địa chỉ</td>
                                <td class="title-tableStore">Người kiểm tra</td>
                                <td class="title-tableStore">Ngày kiểm tra</td>
                                <td class="title-tableStore">Chi tiết thẩm định</td>
                                <td class="title-tableStore">Đánh giá</td>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                storeList.map((item) => (
                                    <tr key={item?.Id}>
                                        <td class="body-tableStore">{item?.Name}</td>
                                        <td class="body-tableStore">{item?.Address}</td>
                                        <td class="body-tableStore">{item?.LastName}</td>
                                        <td class="body-tableStore">{moment(item?.DateCheck, 'YYYY-MM-DDTHH:mm:ss').format('HH:mm:ss DD-MM-YYYY')}</td>
                                        <td class="body-tableStore">
                                            <Link
                                                className="btn btn-primary"
                                                to={`/appraisal/storeAppraisalDetail/${item?.StoreId}?date=${item?.DateCheck}`}
                                            >
                                                Chi tiết thẩm định
                                            </Link>
                                        </td>
                                        <td class="body-tableStore">{item?.Evaluate}</td>
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


export default Appraisal;