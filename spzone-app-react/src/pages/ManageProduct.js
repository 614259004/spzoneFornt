import React,{useState, useEffect} from 'react'
import {ProductData} from '../components/ProductData';
import '../css/ManageBrand.css';
import * as RiIcons from "react-icons/ri";
import {Form,Input,Modal,Button} from 'antd';
import * as AiIcons from "react-icons/ai";
import InputImage from '../UploadImageCustomer.js'

const ManageProduct = () => {
    return (
        <div className="brand-body-page">
            <div className="Head-brand">
                <h1>สินค้า</h1>
                <div className="Product-add-button">
                    
                    <a ><AiIcons.AiOutlinePlusCircle />เพิ่มสินค้า</a>
                </div>
            </div>

            <div className="Product-card-layout">
            {ProductData.map((item, index)=>{
                return(
                    
                        <div className="Product-card" key={index}>
                            <img src={item.ProductImg} />
                            <div className="Product-info-admin">
                                <div className="Product-name-group">
                                    <h5>{item.ProductName}</h5>
                                    <h6>{item.ProductId}</h6>
                                    <div className="Size-layout">
                                        <div className="size-product">
                                            <h6>s</h6>
                                            <h6>10ตัว</h6>
                                        </div>
                                        <div className="size-product">
                                            <h6>m</h6>
                                            <h6>10ตัว</h6>
                                        </div>
                                        <div className="size-product">
                                            <h6>l</h6>
                                            <h6>10ตัว</h6>
                                        </div>
                                        <div className="size-product">
                                            <h6>xl</h6>
                                            <h6>10ตัว</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="button-brand-group">
                                    <a  className="Brand-pen"><AiIcons.AiFillEye/>รายละเอียด</a>
                                    <a href="#Modal-Delete-Cate" className="Brand-bin"><RiIcons.RiDeleteBin7Fill/>ลบ</a>
                                </div>
                            </div>
                        </div>
             )
            })} 
            </div>
        

            {/*Delete modal*/}
            <div id="Modal-Delete-Cate" className="Modal-Delete-Cate">
                <div className="Modal-Delete-Cate-body">
                    <h4>คุณต้องการจะลบสินค้าใช่หรือไม่</h4>
                    <div className="button-Cate-group-Delete">
                            <a href="#" className="Close-modal-Cate-Delete">ไม่ใช่</a>
                            <button  className="Save-Cate-submit-Delete">
                                ใช่
                            </button>
                    </div>
                    
                </div>    
            </div>

            {/*Delete modal*/}
        </div>
    )
}

export default ManageProduct
