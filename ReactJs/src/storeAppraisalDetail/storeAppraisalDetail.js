import React, { Component, useEffect, useState } from 'react';
import { variables } from '../Variables';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './storeAppraisalDetail.css';
import { ToastContainer, toast } from 'react-toastify'

const StoreAppraisalDetail = () => {
    const [StoreAppraisalList, StoreAppraisalUpdate] = useState([null]);
    const pathStoreId = window.location.href;
    useEffect(() => {
        const start = pathStoreId.lastIndexOf('/') + 1;
        const end = pathStoreId.indexOf('?');
        const StoreId = pathStoreId.slice(start, end);
        localStorage.setItem( 'StoreId', StoreId );
        const urlParams = new URLSearchParams(window.location.search);
        const DateCheck = urlParams.get('date');

        const apiUrl = variables.API_URL + 'DetailCondition/getDetailCondition/' + StoreId + '?date=' + DateCheck;
        fetch(apiUrl)
            .then((res) => res.json())
            .then((resp) => {
                StoreAppraisalUpdate(resp);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div className="container">
            <div className="card container_list">
                <div className="card-header store-title">
                    <h2>Đánh giá cửa hàng</h2>
                </div>
                <div className="card-body">
                    <form>
                        <div className="criteria">
                            <p className="sub-title">1.  Điều kiện bảo đảm an toàn thực phẩm đối với nơi chế biến, kinh doanh dịch vụ ăn uống</p>
                            {StoreAppraisalList.map(item => {
                                if (item?.Type === 1) {
                                    return (
                                        <div key={item?.Id}>
                                            <span>-</span>
                                            <span>{item?.Content}</span>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>

                        <div className="criteria">
                            <p className="sub-title">2. Điều kiện bảo đảm an toàn thực phẩm đối với cơ sở chế biến, kinh doanh dịch vụ ăn uống</p>
                            {StoreAppraisalList.map(item => {
                                if (item?.Type === 2) {
                                    return (
                                        <div key={item?.Id}>
                                            <span>-</span>
                                            <span>{item?.Content}</span>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>

                        <div className="criteria">
                            <p className="sub-title">3. Điều kiện bảo đảm an toàn thực phẩm trong chế biến và bảo quản thực phẩm</p>
                            {StoreAppraisalList.map(item => {
                                if (item?.Type === 3) {
                                    return (
                                        <div key={item?.Id}>
                                            <span>-</span>
                                            <span>{item?.Content}</span>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>

                        <div className="criteria">
                            <p className="sub-title">4. Điều kiện bảo đảm an toàn thực phẩm đối với nguyên liệu, dụng cụ ăn uống, chứa đựng thực phẩm và người kinh doanh thức ăn đường phố</p>
                            {StoreAppraisalList.map(item => {
                                if (item?.Type === 4) {
                                    return (
                                        <div key={item?.Id}>
                                            <span>-</span>
                                            <span>{item?.Content}</span>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
}

export default StoreAppraisalDetail;