import React, {useState} from 'react';
import './leftMenu.css';
import { Link } from 'react-router-dom';

const leftMenu = () => {
    return (
        <div className="sidebar">
            <div className="logo">
                <span>
                    <span>SafeFoodSys</span>
                </span>
            </div>
            <div className="menu">
                <a href="/user" className="menuItem active text-dark"
                >
                    <i className="sidebar-icon bi bi-people fs-6"></i>
                    <span>Quản lý User</span>
                </a>
                <a href="/store" className="menuItem active text-dark">
                    <i className="sidebar-icon bi bi-shop fs-6"></i>
                    <span>Quản lý cửa hàng</span>
                </a>
                <a href="/merchandise" className="menuItem active text-dark">
                    <i className="sidebar-icon bi bi-palette-fill fs-6"></i>
                    <span>Quản lý hàng hóa</span>
                </a>
                <a class="dropdown text-black menuItem active">
                    <i className="bi bi-gear-fill fs-6 me-3"></i>
                    <span class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Quản lý thẩm định
                    </span>
                    <ul class="dropdown-menu">
                        <li><a class="dropdownItem text-black" href="/appraisal">Đã kiểm tra</a></li>
                        <li><a class="dropdownItem text-black" href="/notAppraisal">Chưa kiểm tra</a></li>
                    </ul>
                </a>
                <a href="#" className="menuItem active text-dark">
                    <i className="sidebar-icon bi bi-bar-chart-fill fs-6"></i>
                    <span>Thống kê hàng tháng, quý, năm</span>
                </a>                
            </div>
            
        </div>
    )
}
export default leftMenu