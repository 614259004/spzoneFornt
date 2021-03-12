import React, {useState} from 'react';
import './AdminSidebar.css';
import { Link } from 'react-router-dom'
import {Adminbardata} from './Adminbardata';


function AdminSidebar() {
  return (
    <div className="Navbar-admin">
     
      <div className="Admin-side-bar">
        <div className="Welcom-admin">
          <img src='/assets/image/spzone-logo.jpg' />
          <h5>ยินดีตอนรับ สู่หน้าจัดการร้าน</h5>
        </div>
        <br />
        {Adminbardata.map((item, index)=>{
                  return(
                      <li key={index} className={item.cName}>
                          <Link to={item.path}>
                            {item.icon}
                            <span>{item.title}</span>
                          </Link>
                      </li>
                   
                  )
        })} 
      </div> 
      <div className="Admin-Profile">
        <a href="">
          Admin name
        </a>
      </div>
    </div>
  );
}

export default AdminSidebar;