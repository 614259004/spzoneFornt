import React, {useState} from 'react';
import * as FaIcons from "react-icons/fa";
import * as BiIcons from "react-icons/bi";
import * as RiIcons from "react-icons/ri";
import * as AiIcons from "react-icons/ai";
import { Link } from 'react-router-dom';
import {SidebarData} from './Sidebardata';
import './Navbar.css';
import logo from '../image/logo.png';


function Navbar() {
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)
  return (
    <>
    
    <div className="navbar">
        <Link to="#" className="menu-bars-humberger">
            <FaIcons.FaBars onClick={showSidebar}/>
        </Link>
        <a href="/">
            <img src={logo} alt="sp zone" className="logo-img"/>
        </a>
        <BiIcons.BiSearch className="search-icon"/>
        <select name="" id="" className="eng-th">
            <option value="">English</option>
            <option value="" id="th">ไทย</option>
            <AiIcons.AiOutlineDown />
        </select>
        <a href="/Login" className="login">Log in</a>
    </div>
    <nav className={sidebar ? 'nav-menu active ' : 'nav-menu'}>
        <ul className="nav-menu-items" >
            <br/>
            <li className="navbar-toggle">
                <Link to="#" onClick={showSidebar} className="menu-bars-x">
                    <RiIcons.RiCloseFill />
                </Link>
            </li>
            
            {SidebarData.map((item, index)=>{
                return(
                    <li key={index} className={item.cName}>
                        <Link to={item.path}>
                            <span>{item.title}</span>
                        </Link>
                    </li>
                   
                )
            })} 
            <br/>
            <div className="line">
                <p>.</p>
            </div>
            <br/><br/>
            <a href="https://web.facebook.com/SPzone-809686962429089" className="medie-facebook" target="_blank">
                <AiIcons.AiFillFacebook />
            </a>
            <a href="https://www.instagram.com/spzoneclothing/?fbclid=IwAR3UbvtbatTgarH4de8ocEyAQCfnE5ZTGfH--BW8co2hGz3E54V-MyrWm_8" 
            className="medie-ig" target="_blank">
                <AiIcons.AiFillInstagram />
            </a>
            <br/><br/><br/>
            <li className="info-spzone">
                <p>Sp zone store</p>
                <p>open 17:00 - 00.00</p>
                <p>close every friday</p>
            </li>
        </ul>
    </nav>
    
    </>
  );
}

export default Navbar;