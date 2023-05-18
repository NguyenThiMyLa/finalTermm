import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { variables } from '../Variables.js';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';



const AddMerchandise = () => {
    const [name, namechange] = useState('');
    const [id] = useState('');
    let validate = true;

    const navigate = useNavigate();
    const handlesubmit = (e) => {
        e.preventDefault();
        functionvalidate()
        const storeobj = { id, name};
        if(validate) {
            fetch(variables.API_URL + 'merchandise', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(storeobj)
            }).then(res => {
                toast.success('Thêm mới cửa hàng thành công');
                navigate('/merchandise');
            }).catch((err) => {
                console.log(err.message);
            })
        }
    }; 

    const functionvalidate=()=> {
        if (name.length === 0) {
            toast.warning('Vui lòng nhập tên hàng hóa')
            validate=false;
        }
    }
    const validateName = (value) => {
        if(value.length < 1){
            toast.warning('Vui lòng nhập tên hàng hóa')
        }
    }
    return (
        <div>
            <form class="container" onSubmit={handlesubmit}>
                <div class="row">
                    <div class="offset-lg-2 col-lg-8">
                        <div class="card">
                            <div class="card-header">
                                <h2>Thêm mới hàng hóa ở chợ</h2>
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label>Tên hàng hóa</label>
                                    <input onBlur={e=>validateName(e.target.value)} placeholder="Nhập tên hàng hóa" onChange={e => namechange(e.target.value)} value={name} class="form-control"></input>
                                </div>
                            </div>
                            <div class="card-footer">
                                <button class="btn btn-success" type="submit">Lưu</button>
                                <ToastContainer />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddMerchandise;