import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {variables} from './Variables.js';

const Customer = () => {
    const[custlist, custupdate]=useState([null]);
    useEffect(()=> {
        fetch(variables.API_URL+'employee').then(res=> {
            return res.json();
        }).then(resp=>{
            custupdate(resp);
        }).catch((err)=> {
            console.log(err.message);
        })
    },[])

    return (
        <div className="container">
            <h2>Customer Listing</h2>
            <table className="table table-bordered">
                <thead className="bg-dark text-white">
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Area</td>
                        <td>CreditLimit</td>
                        <td>Action</td>
                    </tr>
                </thead>

                <tbody>
                    {   
                        // custlist.map((item)=>(
                        //     <tr key={item.id}>
                        //         <td>{item.id}</td>
                        //         <td>{item.name}</td>
                        //         <td>{item.area}</td>
                        //         <td>{item.creditlimit}</td>
                        //         <td>
                        //             <a className="btn btn-primary">Edit</a>
                        //             <a className="btn btn-danger">Remove</a>
                        //         </td>
                        //     </tr>
                        // ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Customer;