import React,{useState, useEffect} from 'react';
import './Navbar.css';
import * as BiIcons from "react-icons/bi";
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import {SidebarData} from './Sidebardata';
import * as axiosData from '../service/Service';
import { Sling as Hamburger } from 'hamburger-react'
import { Redirect, useHistory } from 'react-router-dom';



function Navbar() {
    const history = useHistory();

    const cusData ={
        C_customerid:'',
        C_name:'',
        C_lastname:'',
        C_tel:'',
        C_image:'',
        S_statusid:'',
        L_email:'',
        L_password:''
    }

    const [isOpen, setOpen] = useState(false)
    const [colorHum, setColorHum] = useState('#000000')
    const [arrowEng, setArrowEng] = useState(false)
    const [userData, setUserData] = useState(cusData)
    const [useNavbar, setUseNavbar] = useState(false)
    const [cartData, setCartData] = useState([])
    const [profileModal, setProfileModal] = useState('close')

    const userId = {C_customerid:localStorage.getItem('UserId')};
    
    useEffect(initialValue,[cartData]);
    function initialValue(){
        
        axiosData.getCart(userId).then(function (data){
            setCartData(data)
        })
        
        if(userId.C_customerid != null){
            axiosData.getprofile(userId).then(function (data){
                setUserData(data[0]);
                setUseNavbar(true)
                
            })
        }
    }

    const languageShow = () =>{
        const EngIcons = document.querySelector('.EngIcons');
        if(arrowEng === false){
            EngIcons.style.transform=" rotate(-180deg)";
        } else if (arrowEng === true){
            EngIcons.style.transform=" rotate(0deg)";
        }
    }

    const ManageModalProfileLogout = (status) => {
        var modal = document.getElementsByClassName('Modal-Profile-Nuvbar')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }
   
    const LogOut = () =>{
        localStorage.removeItem('UserId');
        window.location.reload();
    }

    const GoToProfile = () => {
        history.push("/Profile");
        window.location.reload();
    }



  return (
    <>
    {/*Profile modal*/}
    <div id="Modal-Profile-Nuvbar" onClick={()=>{ManageModalProfileLogout('close')}} className="Modal-Profile-Nuvbar">
        <div className="Modal-Profile-Nuvbar-body">
            <h4 onClick={()=>{GoToProfile()}}>Profile</h4>
            <h4>History</h4>
            <h4 onClick={()=>{LogOut()}}>Log out</h4>     
        </div>    
    </div>

    {/*Profile modal*/}

    <div className="navbarSPZ">

       
        <div className="nuvbarbox01">
            
        </div>

        <div className="nuvbarbox02">
            <a href='/'>
                <img src='/assets/image/minilogo.jpg' />
            </a>
        </div>
        <div className="nuvbarbox03">
            <div className="nuvbar03-group01">
                <BiIcons.BiSearch className="search-icon-nuvbar"/>
            </div>
            <div className="nuvbar03-group02">
                
                
                    <h5 onClick={()=>{setArrowEng(!arrowEng);languageShow();}}>English</h5>
                    <MdIcons.MdKeyboardArrowDown className="EngIcons" onClick={()=>{setArrowEng(!arrowEng);languageShow();}} />
            </div>
                
            
            <div className="nuvbar03-group03">
           
                {useNavbar != true ?

               
                <a href='/Login'>
                    <span className="Login-text-home">
                     Log in
                    </span>
                </a>
                :
                <div className="name-user-login-navbar">
                    <div className="cart_group_nuvbar">
                        <a href="/Home/Cart" className="nuvbar_cart_icon"><HiIcons.HiOutlineShoppingCart /></a>
                        {cartData !== undefined ? 
                            <div className="AmountOfProductInCart">
                                <p>{cartData.length}</p>
                            </div>
                        :null}
                    </div>
                    { profileModal == 'close' ?

                    <div className="img-user-nuvbar" onClick={()=>{ManageModalProfileLogout('show');setProfileModal('show')}}>
                        
                        <span className="Username-text-home">
                            <img src={userData.C_image} />
                            <h5>{userData.C_name}</h5>
                        </span>
                       
                    </div>
                    :
                    <div className="img-user-nuvbar" onClick={()=>{ManageModalProfileLogout('close');setProfileModal('close')}}>
                        
                        <span className="Username-text-home">
                            <img src={userData.C_image} />
                            <h5>{userData.C_name}</h5>
                        </span>
                       
                    </div>

                    }
                </div>
                }
                
            </div>
            
        </div>


    <div className="slidebarHomeBg" >

    </div>
    <div className="slidebarHome02">

    </div>
    <div className="slidebarHome">
        <div className="slidebarhome-item">
            {SidebarData.map((item, index)=>{
                        return(
                            <div className="item-nuvbar-box">
                                <a key={index} className={item.cName} href={item.path}>
                                        <span>{item.title}</span>
                                </a>
                            </div>
                        )
            })} 
            <div className="socails-icon">
                <a target="_blank" href="https://web.facebook.com/SPzone-809686962429089/" className="face_icon"><FaIcons.FaFacebook/></a>
                <a target="_blank" href="https://www.instagram.com/spzoneclothing/" className="ig_icon"><AiIcons.AiFillInstagram /></a>
            </div>
        </div>
    </div>


    <div className="Hamburger-group">
                <Hamburger color={colorHum} size={20} duration={0.8} onToggle={toggled => {
                    const slidebar001 = document.querySelector('.slidebarHome');
                    const slidebar002 = document.querySelector('.slidebarHome02');
                    const slidebar00Bg = document.querySelector('.slidebarHomeBg');
                    if (toggled) {
                        slidebar001.style.marginLeft="0%";
                        slidebar001.style.transition=".8s";
                        slidebar002.style.marginLeft="0%";
                        slidebar002.style.transition=".5s";
                        slidebar00Bg.style.visibility="none";
                        slidebar00Bg.style.opacity="1";  
                        slidebar00Bg.style.visibility="visible";
                        setColorHum('#ffffff');
                    } else {
                        slidebar001.style.marginLeft="-50%";
                        slidebar001.style.transition=".5s";
                        slidebar002.style.marginLeft="-50%";
                        slidebar002.style.transition=".8s";
                        slidebar00Bg.style.opacity="0"; 
                        slidebar00Bg.style.visibility="hidden";
                        setColorHum('#000000');
                    }
                }} />
            </div>
    </div>




    </>
  );
}

export default Navbar;