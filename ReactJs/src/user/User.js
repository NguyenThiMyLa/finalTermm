import React, {Component, useEffect, useState} from 'react';
import {variables} from '../Variables';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './user.css';
import {ToastContainer, toast } from 'react-toastify'

const User = () => {
    const[userList, userUpdate] = useState([null]);
    const [firstname, firstnamechange] = useState('');
    const [lastname, lastnamechange] = useState('');
    const [email, emailchange] = useState('');
    const[inputSearch, setInputSearch] = useState('');
    const [data, setData] = useState([]);
    const navigate=useNavigate();
    const handleRemove=(Id)=> {
        if(window.confirm('Bạn có muốn xóa người dùng này không?')) {
            fetch(variables.API_URL+'user/'+Id,{
                method: "DELETE"
            }).then(res=> {
                toast.success('Xóa thành công');
                navigate(0);
            }).catch((err) => {
                console.log(err.message);
            });
        }
    }

    const handleSearch = event => {
        setInputSearch(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        fetch(variables.API_URL+'user') 
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error(error));
        };
    useEffect(()=> {
        fetch(variables.API_URL+'user')
        .then(res => {
            return res.json();
        }).then(resp=>{
            userUpdate(resp);
        }).catch((err)=> {
            console.log(err.message);
        })
    }, []);
    return(
        <div class="container">
            <div class="card container_list">
                <div class="card-header">
                    <h2>Danh sách User</h2>
                </div>
                <div class="card-body">
                    <div className='top-body'>
                        <Link class="btn btn-success" to="/user/create">Add User (+)</Link>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="search">Search:</label>
                            <input placeholder='Tìm kiếm' type="text" id="search" value={inputSearch} onChange={handleSearch} />
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                    <div className="table-height" >
                        <table class="table table-bordered">
                            <thead class="bg-dark text-white">
                                <tr>
                                    <td>FirstName</td>
                                    <td>LastName</td>
                                    <td>Address</td>
                                    <td>PhoneNumber</td>
                                    <td>Email</td>
                                    <td>Edit</td>
                                    <td>Remove</td>
                                </tr>
                            </thead>
                            <tbody>
                                {   
                                    userList.map((item)=>(
                                        <tr key={item?.Id}>
                                            <td>{item?.FirstName}</td>
                                            <td>{item?.LastName}</td>
                                            <td>{item?.Address}</td>
                                            <td>{item?.PhoneNumber}</td>
                                            <td>{item?.Email}</td>
                                            <td>
                                                <Link class="btn btn-primary" to={"/user/edit/"+item?.Id}>Edit</Link>
                                            </td>
                                            <td>
                                                <a onClick={()=>{handleRemove(item.Id)}} class="btn btn-danger">Remove</a>
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


export default User;