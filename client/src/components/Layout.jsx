import React, { useState } from 'react';
import '../layout.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Badge } from 'antd';

function Layout({ children }) {

    const [collapsed, setCollapsed] = useState(() => {
        return false
    });

    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();
    const userMenu = [

        {
            name: 'Home',
            path: '/',
            icon: 'ri-home-2-line',
        },
        {
            name: 'Appointments',
            path: '/appointments',
            icon: 'ri-calendar-check-line',
        },
        {
            name: 'Apply Doctor',
            path: '/apply-doctor',
            icon: 'ri-user-star-line',
        },
    ];

    const doctorMenu = [
        {
            name: "Home",
            path: "/",
            icon: "ri-home-2-line",
        },
        {
            name: "Patients",
            path: "/doctor/patients",
            icon: "ri-group-line",
        },
        {
            name: "Appointments",
            path: "/doctor/appointments",
            icon: "ri-calendar-check-line",
        },
        {
            name: "Profile",
            path: `/doctor/profile/${user?._id}`,
            icon: "ri-user-line",
        },
    ];

    const adminMenu = [

        {
            name: 'Home',
            path: '/',
            icon: 'ri-home-2-line',
        },
        {
            name: 'Users',
            path: '/admin/userlist',
            icon: 'ri-user-star-line',
        },
        {
            name: 'Doctors',
            path: '/admin/doctorslist',
            icon: 'ri-user-heart-line',
        },
    ];

    const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
    const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";

    return (
        <div className='main'>
            <div className='is-flex layout'>

                <div className='sidebar'>
                    {collapsed ? (
                        <div className='sidebar-header'>
                            <h1 className='logo'>e-Salud</h1>
                            <h1 className="role">{role}</h1>
                        </div>
                    ) : (
                        <div className='sidebar-header'>
                            <h1 className='active-logo'>e-Salud Manager</h1>
                            <h1 className="active-role">{role}</h1>
                        </div>
                    )}

                    <div className='menu'>
                        {menuToBeRendered.map((menu) => {
                            const isActive = location.pathname === menu.path;
                            return (
                                <div>
                                    {collapsed ? (
                                        <div className={`is-flex menu-item ${isActive && 'active-menu-item'}`}>
                                            <Link to={menu.path} className={`px-4 ${menu.icon}`}></Link>
                                        </div>
                                    ) : (
                                        <div className={`is-flex menu-item ${isActive && 'active-menu-item'}`}>
                                            <i className={menu.icon}></i>
                                            <Link to={menu.path}>{menu.name}</Link>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        <div className={`is-flex menu-item-logout`} onClick={() => {
                            localStorage.clear()
                            navigate('/login')
                        }}>
                            <i className='ri-logout-box-r-line cursor-pointer'></i>
                            {!collapsed && <Link to='/login'>Logout</Link>}
                        </div>
                    </div>
                </div>

                <div className='content'>
                    <div className='header'>
                        {collapsed ? (
                            <i
                                className='ri-arrow-right-s-line header-action-icon'
                                onClick={() => setCollapsed(false)}
                            ></i>
                        ) : (
                            <i
                                className='ri-arrow-left-s-line header-action-icon'
                                onClick={() => setCollapsed(true)}
                            ></i>
                        )}

                        {user?.isDoctor ? (
                            <div className='is-flex is-align-items-center px-4'>
                                <Badge count={user?.unseenNotifications.length} onClick={() => navigate("/notifications")}>
                                    <i className='ri-notification-2-line header-action-icon'></i>
                                </Badge>

                                <Link className='anchor mx-5' to={`/doctor/profile/${user?._id}`}>{user?.name}</Link>
                            </div>
                        ) : (
                            <div className='is-flex is-align-items-center px-4'>
                                <Badge count={user?.unseenNotifications.length} onClick={() => navigate("/notifications")}>
                                    <i className='ri-notification-2-line header-action-icon'></i>
                                </Badge>

                                <Link className='anchor mx-5' to='/'>{user?.name}</Link>
                            </div>
                        )}
                    </div>
                    <div className='body'>
                        {children}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Layout;