import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { variables } from '../Variables.js';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';
import '../App.css';


const AddStoreMerchandise = () => {
    const [MerchandiseId, setSelectedOptions] = useState();
    const [storeMerchandiseLists, storeMerchandiseUpdate] = useState([null]);
    const [MadeIn, MadeInChange] = useState('');
    const [StoreId, StoreIdChange] = useState('');
    const [Id] = useState('');
    let validate = true;
    const navigate = useNavigate();
    const handlesubmit = (e) => {
        e.preventDefault();
        functionvalidate()
        const storeMerchandiseobj = {MerchandiseId, MadeIn, StoreId, Id};
        if(validate) {
            fetch(variables.API_URL + 'StoreMerchandise', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(storeMerchandiseobj)
            }).then(res => {
                toast.success('Thêm mới mặt hàng thành công');
                navigate('/store/storeMerchandise/'+StoreId);
            }).catch((err) => {
                console.log(err.message);
            })
        }
    }; 
    

    const functionvalidate=()=> {
        if (MadeIn.length === 0) {
            toast.warning('Vui lòng nhập xuất xứ của mặt hàng')
            validate=false;
        }
    }

    const validateMadeIn = (value) => {
        if(value.length < 1){
            toast.warning('Vui lòng nhập xuất xứ của mặt hàng')
        }
    }

    useEffect(() => {
        const valueStoreId = localStorage.getItem( 'StoreId', StoreId );
        StoreIdChange(valueStoreId);
        fetch(variables.API_URL + 'Merchandise')
            .then(res => {
                return res.json();
            }).then(resp => {
                const MerchandiseList = [];
                resp.forEach(element => {
                    MerchandiseList.push({value: element.Id, label: element.Name});
                });
                storeMerchandiseUpdate(MerchandiseList);
            }).catch((err) => {
                console.log(err.message);
            })
    }, []);


    function handleSelect(data) {
        let a = data.value;
        setSelectedOptions(a);
    }
    return (
        <div>
            <form class="container_body" onSubmit={handlesubmit}>
                <div class="card">
                    <div class="card-header">
                        <h2>Thêm mới mặt hàng của cửa hàng</h2>
                    </div>
                    <div class="card-body">
                        <div className="App">
                            <label>Tên mặt hàng</label>
                            <Select
                                options={storeMerchandiseLists}
                                placeholder="Chọn tên mặt hàng"
                                value={storeMerchandiseLists.Id}
                                onChange={handleSelect}
                                isSearchable={true}
                            />
                        </div>

                        <div class="form-group">
                            <label>Xuất xứ</label>
                            <input onBlur={e=>validateMadeIn(e.target.value)} placeholder="Xuất xứ của mặt hàng" onChange={e => MadeInChange(e.target.value)} value={MadeIn} class="form-control"></input>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-success" type="submit">Lưu</button>
                        <ToastContainer />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddStoreMerchandise;