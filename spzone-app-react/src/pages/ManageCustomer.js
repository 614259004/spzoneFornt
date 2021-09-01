import React,{useState, useEffect} from 'react';
import '../css/ManageBrand.css';
import "../css/ManageCustomer.css";
import { IoIosArrowForward } from "react-icons/io";
import * as axiosData from '../service/Service';


const ManageCustomer = () => {

    const customerData = {
        C_customerid : '',
        C_name : '',
        C_lastname : '',
        C_tel : '',
        C_image : '',
        S_statusid : ''
    }
    const [dataCustomer,setDataCustomer] = useState([]);
    const [banCus,setBanCus] = useState(customerData);

    useEffect(initialValue,[]);
    function initialValue(){
        
        axiosData.showAllCustomer().then(function (data){
            setDataCustomer(data);
        })
        setBanCus(customerData);
    }

    console.log(dataCustomer);

    const manageModalBanCus = (status) => {
        var modal = document.getElementsByClassName('Modal_Ban_Customer')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }

    const banCustomer = () =>{
        const cData ={
            C_customerid : banCus.C_customerid,
            C_name : banCus.C_name,
            C_lastname : banCus.C_lastname,
            C_tel : banCus.C_tel,
            C_image : banCus.C_image
        }

        axiosData.blockCustomer(cData).then(function (data){
            manageModalBanCus('close')
            
        })
    }


    return (
        <div  className="brand-body-page">
            <div className="Head-brand">
                <h1>ลูกค้า</h1>
            </div>
            <div className="bodyCustomer">
                {dataCustomer != null ? dataCustomer.map((cusItem)=>(
                <div className="cardCustomer" onClick={()=>{manageModalBanCus('show');setBanCus(cusItem)}}>
                    
                    <div className="cardImgCustomer">
                        <img src={cusItem.C_image} />
                        
                    </div>
                    <p> {cusItem.C_name} {cusItem.C_lastname}</p>
                    <IoIosArrowForward className="IconCustomerAdmin" />
                </div>
                )): null } 
            </div>
            {/* Modal */}
            <div id="Modal_Ban_Customer" className="Modal_Ban_Customer">
                <div className="Modal_Ban_Customer_body">
                    <h4>คุณต้องการจะบล็อกผู้ใข้ {banCus.C_name} {banCus.C_lastname} ใช่หรือไม่</h4>
                    <br />
                    <div className="boxOfBanCusgroup">
                        <button onClick={()=>{manageModalBanCus('close')}}> ไม่ </button>
                        <button onClick={()=>{banCustomer()}}> ใช่ </button>
                    </div>
                    
                </div>    
            </div>
            {/* Modal */}
        </div>
    )
}

export default ManageCustomer
