import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AppHeader = () => {
    const[menuvisible, menuvisiblechange] = useState(true);
    const location=useLocation();
    const navigate=useNavigate;
    useEffect(()=> {
        if(location.pathname=='/register' || location.pathname=='/login') {
            menuvisiblechange(false);
        } else {
            let username=localStorage.getItem('username') !=null?localStorage.getItem('username').toString():'';
            if (username===''){
                navigate('/login')
            }
            menuvisiblechange(true);
        }
    },[location]);
    return ( 
        <div> {menuvisible &&
            <div className="App-header">
                {/* <Link to="/">Home</Link>
                <Link to="/user">Quản lý User</Link>
                <Link style={{float:'right'}} to="/login">Logout</Link>
                <Link to="/store">Quản lý cửa hàng</Link>
                <Link to="/merchandise">Quản lý thực phẩm</Link>
                <Link to="/appraisal">Appraisal</Link>
                <Link to="/notAppraisal">Not Appraisal</Link> */}
            </div>
            }
        </div>
    );
}

export default AppHeader ;