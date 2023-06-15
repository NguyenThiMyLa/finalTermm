import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { variables } from '../Variables.js';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../App.css'



const AddStore = () => {
    const [ownerid, setSelectedOptions] = useState();
    const [userLists,userUpdate] = useState([null]);
    const [name, namechange] = useState('');
    const [address, addresschange] = useState('');
    const [phonenumber, phonenumberchange] = useState('');
    const [BusinessStartDate, BusinessStartDateChange] = useState('');
    const [BusinessLicense, BusinessLicenseChange] = useState('');
    const [TaxCode, TaxCodeChange] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [id] = useState('');
    let validate = true;

    const navigate = useNavigate();
    const handlesubmit = (e) => {
        e.preventDefault();
        functionvalidate()
        const storeobj = { id, name, ownerid, address, phonenumber, BusinessStartDate, BusinessLicense, TaxCode };
        if(validate) {
            fetch(variables.API_URL + 'store', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(storeobj)
            }).then(res => {
                toast.success('Thêm mới cửa hàng thành công');
                navigate('/store');
            }).catch((err) => {
                console.log(err.message);
            })
        }
    }; 
    
    useEffect(() => {
        fetch(variables.API_URL + 'user')
            .then(res => {
                return res.json();
            }).then(resp => {
                const userList = [];
                resp.forEach(element => {
                    userList.push({value: element.Id, label: element.FirstName});
                });
                userUpdate(userList);
            }).catch((err) => {
                console.log(err.message);
            })
    }, []);

    function handleSelect(data) {
        let a = data.value;
        setSelectedOptions(a);
    }

    const functionvalidate=()=> {
        if (name.length === 0) {
            toast.warning('Vui lòng nhập tên cửa hàng')
            validate=false;
        }
        if (address.length === 0) {
            toast.warning('Vui lòng nhập địa chỉ cửa hàng')
            validate=false;
        }
        if (phonenumber.length === 0) {
            toast.warning('Vui lòng nhập số điện thoại cửa hàng')
            validate=false;
        }
        if (BusinessStartDate.length === 0) {
            toast.warning('Vui lòng nhập ngày bắt đầu đăng ký kinh doanh')
            validate=false;
        }
        if (BusinessLicense.length === 0) {
            toast.warning('Vui lòng nhập giấy phép kinh doanh')
            validate=false;
        }
        if (TaxCode.length === 0) {
            toast.warning('Vui lòng nhập mã số thuế')
            validate=false;
        }
    }
    const validateName = (value) => {
        if(value.length < 1){
            toast.warning('Vui lòng nhập tên cửa hàng')
        }
    }

    const validateAddress = (value) => {
        if(value.length < 1){
            toast.warning('Vui lòng nhập địa chỉ cửa hàng')
        }
    }

    const validatePhoneNumber = (value) => {
        if(value.length < 1){
            toast.warning('Vui lòng nhập số điện thoại cửa hàng')
        }
    }
    const validateBusinessStartDate = (value) => {
        if(value.length < 1){
            toast.warning('Vui lòng nhập ngày bắt đầu đăng kí kinh doanh')
        }
    }
    const validateBusinessLicense = (value) => {
        if(value.length < 1){
            toast.warning('Vui lòng nhập giấy phép kinh doanh   ')
        }
    }
    const validateTaxCode = (value) => {
        if(value.length < 1){
            toast.warning('Vui lòng nhập mã số thuế')
        }
    }
    return (
        <div>
            <form class="container_body" onSubmit={handlesubmit}>
                <div class="card">
                    <div class="card-header">
                        <h2>Thêm mới cửa hàng</h2>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <label>Tên cửa hàng</label>
                            <input onBlur={e=>validateName(e.target.value)} placeholder="Tên cửa hàng" onChange={e => namechange(e.target.value)} value={name} class="form-control"></input>
                        </div>
                        <div className="App">
                        <label>Chủ cửa hàng</label>
                            <Select
                                options={userLists}
                                placeholder="Chọn chủ cửa hàng"
                                value={userLists.Id}
                                onChange={handleSelect}
                                isSearchable={true}
                            />
                        </div>

                        <div class="form-group">
                            <label>Địa chỉ</label>
                            <input onBlur={e=>validateAddress(e.target.value)} placeholder="Địa chỉ của cửa hàng" onChange={e => addresschange(e.target.value)} value={address} class="form-control"></input>
                        </div>
                        <div class="form-group">
                            <label>Số điện thoại </label>
                            <input onBlur={e=>validatePhoneNumber(e.target.value)} placeholder="Số điện thoại của cửa hàng" onChange={e => phonenumberchange(e.target.value)} value={phonenumber} class="form-control"></input>
                        </div>
                        <div class="form-group">
                            <label>Ngày đăng ký bắt đầu kinh doanh</label>
                            <DatePicker 
                                selected={BusinessStartDate}
                                onChange={(date) => BusinessStartDateChange(date)}
                                onBlur={e=>validateBusinessStartDate(e.target.value)}
                                placeholder="Nhập ngày đăng ký bắt đầu kinh doanh của cửa hàng"
                                value={BusinessStartDate}
                            />
                            {/* <input onBlur={e=>validateBusinessStartDate(e.target.value)} placeholder="Nhập ngày đăng ký bắt đầu kinh doanh của cửa hàng" onChange={e => BusinessStartDateChange(e.target.value)} value={BusinessStartDate} class="form-control"></input> */}
                        </div>
                        <div class="form-group">
                            <label>Giấy phép kinh doanh</label>
                            <input onBlur={e=>validateBusinessLicense(e.target.value)} placeholder="Nhập giấy phép kinh doanh của cửa hàng" onChange={e => BusinessLicenseChange(e.target.value)} value={BusinessLicense} class="form-control"></input>
                        </div>
                        <div class="form-group">
                            <label>Mã số thuế</label>
                            <input onBlur={e=>validateTaxCode(e.target.value)} placeholder="Nhập mã số thuế của cửa hàng" onChange={e => TaxCodeChange(e.target.value)} value={TaxCode} class="form-control"></input>
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

export default AddStore;