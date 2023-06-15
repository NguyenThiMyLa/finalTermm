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
        fetch(variables.API_URL + 'DetailCondition', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(detailConditionobj)
        })
        .then(response => {
            if (response.ok) {
                toast.success('Added Successfully');
                navigate('/appraisal/');
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
                            <p className="sub-title">1.  Điều kiện bảo đảm an toàn thực phẩm đối với nơi chế biến, kinh doanh dịch vụ ăn uống</p>
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
                            <p className="sub-title">2. Điều kiện bảo đảm an toàn thực phẩm đối với cơ sở chế biến, kinh doanh dịch vụ ăn uống</p>
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
                            <p className="sub-title">3. Điều kiện bảo đảm an toàn thực phẩm trong chế biến và bảo quản thực phẩm</p>
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
                            <p className="sub-title">4. Điều kiện bảo đảm an toàn thực phẩm đối với nguyên liệu, dụng cụ ăn uống, chứa đựng thực phẩm và người kinh doanh thức ăn đường phố</p>
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