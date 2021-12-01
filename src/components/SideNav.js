import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as User from './User';

const SideNav = (props) => {

    const SidebarData = function (isManager, isHrManager, isAdmin) {
        return [
        {
            title: 'My Profile',
            path: '/',
            icon: <AiIcons.AiFillHome />,
            cName: 'nav-text',
            show: true
        },
        {
            title: 'Payroll',
            path: '/payroll',
            icon: <FaIcons.FaDollarSign />,
            cName: 'nav-text',
            show: isManager || isHrManager
        },
        {
            title: 'Timesheets',
            path: '/timesheets',
            icon: <FaIcons.FaCalendarAlt />,
            cName: 'nav-text',
            show: true
        },
        {
            title: 'Create Payroll',
            path: '/createpayroll',
            icon: <FaIcons.FaCalendarAlt />,
            cName: 'nav-text',
            show: isHrManager
        },
        {
            title: 'Employees',
            path: '/employee',
            icon: <FaIcons.FaCalendarAlt />,
            cName: 'nav-text',
            show: isManager
        },
        {
            title: 'Employees',
            path: '/employeehr',
            icon: <FaIcons.FaCalendarAlt />,
            cName: 'nav-text',
            show: isHrManager
        }
        ,
        {
            title: 'My Payroll',
            path: '/mypayroll',
            icon: <FaIcons.FaCalendarAlt />,
            cName: 'nav-text',
            show: !isHrManager
        }
        ,
        {
            title: 'Create Rate',
            path: '/createrate',
            icon: <FaIcons.FaCalendarAlt />,
            cName: 'nav-text',
            show: isHrManager
        }
    ]};

    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const [sidebarData, setSidebarData] = useState(SidebarData());
    let admin;
    let manager;
    let hrManager;

    useEffect(() => {
        fetchRoles();
    }, [sidebar]);

    async function fetchRoles() {
        admin = await User.isAdmin();
        manager = await User.isManager();
        hrManager = await User.isHrManager();
        const updatedSideBarData = SidebarData(manager, hrManager, admin);
        console.log('updatedSideBarData', updatedSideBarData);
        setSidebarData(updatedSideBarData);
    }

    return (
        <>
            <div className='navbar'>
                <Link to='#' className='menu-bars'>
                    <FaIcons.FaBars onClick={showSidebar} />
                </Link>
                <div className='title'>Duke HR</div>
                <AmplifySignOut />
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars'>
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {sidebarData.map((item, index) => {
                        return (item.show ?
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li> : ""
                        );
                    })}
                </ul>
            </nav>
        </>
    );
}

export default SideNav;