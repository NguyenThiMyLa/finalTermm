import React, { useEffect, useState } from 'react';
import { variables } from '../Variables';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './evaluateStore.css';

const EvaluateStore = () => {
    const [ConditionSafeId, ConditionSafeIdChange] = useState([]);
    const [StoreId, StoreIdChange] = useState('');
    const { Id } = useParams();
    const [EvaluateStoreList, EvaluateStoreUpdate] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(variables.API_URL + 'Evaluate')
            .then(res => res.json())
            .then(resp => {
                EvaluateStoreUpdate(resp);
            })
            .catch(err => {
                console.log(err.message);
            });
    }, []);

    useEffect(() => {
        StoreIdChange(Id);
    }, [Id]);

    const handleCheckboxChange = event => {
        const checkboxId = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            ConditionSafeIdChange(prevIds => [...prevIds, checkboxId]);
        } else {
            ConditionSafeIdChange(prevIds =>
                prevIds.filter(id => id !== checkboxId)
            );
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        const detailConditionobj = {
            Id: '',
            StoreId: StoreId,
            ConditionSafeIds: ConditionSafeId
        };
        console.log(detailConditionobj);
        fetch(variables.API_URL + 'DetailCondition', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(detailConditionobj)
        })
            .then(response => {
                if (response.ok) {
                    toast.success('Added Successfully');
                    navigate('/appraisal/storeAppraisalDetail/' + detailConditionobj.StoreId);
                } else {
                    toast.error('An error occurred');
                }
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    return (
        <div className="container">
            <div className="card container_list">
                <div className="card-header store-title">
                    <h2>Đánh giá cửa hàng</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="criteria">
                            <p className="sub-title">1. Địa điểm cơ sở sơ chế biến rau củ quả</p>
                            {EvaluateStoreList.map(item => {
                                if (item?.Type === 1) {
                                    return (
                                        <div key={item?.Id}>
                                            <input
                                                type="checkbox"
                                                value={item?.Id}
                                                name="EvaluateName"
                                                onChange={handleCheckboxChange}
                                            />
                                            <span>{item?.Content}</span>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>

                        <div className="criteria">
                            <p className="sub-title">2. Bố trí mặt bằng cơ sở sản xuất, kinh doanh</p>
                            {EvaluateStoreList.map(item => {
                                if (item?.Type === 2) {
                                    return (
                                        <div key={item?.Id}>
                                            <input
                                                type="checkbox"
                                                value={item?.Id}
                                                name="EvaluateName"
                                                onChange={handleCheckboxChange}
                                            />
                                            <span>{item?.Content}</span>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>

                        <div className="criteria">
                            <p className="sub-title">3. Hệ thống cung cấp nước và điện trong cơ sở sản xuất, kinh doanh</p>
                            {EvaluateStoreList.map(item => {
                                if (item?.Type === 3) {
                                    return (
                                        <div key={item?.Id}>
                                            <input
                                                type="checkbox"
                                                value={item?.Id}
                                                name="EvaluateName"
                                                onChange={handleCheckboxChange}
                                            />
                                            <span>{item?.Content}</span>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>

                        <div className="criteria">
                            <p className="sub-title">4. Trang thiết bị, phương tiện dụng cụ sản xuất, kinh doanh rau củ quả</p>
                            {EvaluateStoreList.map(item => {
                                if (item?.Type === 4) {
                                    return (
                                        <div key={item?.Id}>
                                            <input
                                                type="checkbox"
                                                value={item?.Id}
                                                name="EvaluateName"
                                                onChange={handleCheckboxChange}
                                            />
                                            <span>{item?.Content}</span>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>

                        <div className="criteria">
                            <p className="sub-title">5. Yêu cầu vệ sinh an toàn trong sản xuất và bốc dỡ, vận chuyển rau củ quả</p>
                            {EvaluateStoreList.map(item => {
                                if (item?.Type === 5) {
                                    return (
                                        <div key={item?.Id}>
                                            <input
                                                type="checkbox"
                                                value={item?.Id}
                                                name="EvaluateName"
                                                onChange={handleCheckboxChange}
                                            />
                                            <span>{item?.Content}</span>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>

                        <div className="criteria">
                            <p className="sub-title">6. Yêu cầu vệ sinh nhà xưởng, thiết bị dụng cụ nhà máy sản xuất rau củ quả</p>
                            {EvaluateStoreList.map(item => {
                                if (item?.Type === 6) {
                                    return (
                                        <div key={item?.Id}>
                                            <input
                                                type="checkbox"
                                                value={item?.Id}
                                                name="EvaluateName"
                                                onChange={handleCheckboxChange}
                                            />
                                            <span>{item?.Content}</span>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>


                        <div className="btn-send-div">
                            <button className="btn-send" type="submit">
                                Gửi
                            </button>
                        </div>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};


export default EvaluateStore;