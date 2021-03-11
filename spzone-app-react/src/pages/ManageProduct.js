import React,{useState, useEffect} from 'react'
import {ProductData} from '../components/ProductData';
import '../css/ManageBrand.css';
import * as RiIcons from "react-icons/ri";
import {Form,Input,Modal,Button} from 'antd';
import * as AiIcons from "react-icons/ai";
import InputImage from '../UploadImageCustomer.js'

const ManageProduct = () => {
    const [showAdd,setShowAdd] = useState(false);
    return (
        <div className="brand-body-page">
            <div className="Head-brand">
                <h1>สินค้า</h1>
                <div className="Product-add-button">
                    
                    <a onClick={() => {setShowAdd(true);}}><AiIcons.AiOutlinePlusCircle />เพิ่มสินค้า</a>
                </div>
            </div>
            {!showAdd ?
            <div className="Product-card-layout">
            {ProductData.map((item, index)=>{
                return(
                    
                        <div className="Product-card" key={index}>
                            <img src={item.ProductImg} />
                            <div className="Product-info-admin">
                                <div className="Product-name-group">
                                    <h5>{item.ProductName}</h5>
                                    <h6>{item.ProductId}</h6>
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

            :

                <div className="Card-Add-Product">
                    <Form >
                        <h1>เพิ่มสินค้า</h1>
                        <div className="form-input-add-product">

                            <div className="page-add-product">
                                <div className="input-add-product">
                                    <label>ชื่อสินค้า</label>
                                    <Input />
                                </div>
                                <div className="input-add-product">
                                    <label>ไซต์</label>
                                    <Input />
                                </div>
                                <div className="input-add-product">
                                    <label>จำนวน</label>
                                    <Input />
                                </div>
                                <div className="input-add-product">
                                    <label>ราคา</label>
                                    <Input />
                                </div>
                            </div>

                            <div className="page-add-product">
                                <div className="input-add-product">
                                    <label>หมวดหมู่</label>
                                    <select>
                                        <option></option>
                                        <option>เสื้อ</option>
                                        <option>เครื่องประดับ</option>
                                    </select>
                                </div>
                                <div className="input-add-product">
                                    <label>แบรนด์</label>
                                    <select>
                                        <option></option>
                                        <option>jone500</option>
                                        <option>pbg</option>
                                    </select>
                                </div>
                                <div className="input-add-product">
                                    <label>คำอธิบาย</label>
                                    <Input />
                                </div>
                            </div>

                            <div className="page-add-product">
                                <div className="input-add-product">
                                    <InputImage />
                                </div> 
                            </div>

                        </div>

                        <div className="Product-add-button-group">
                            <a className="Product-add-button-cancel" onClick={() => {setShowAdd(false);}}>ยกเลิก</a>
                            <button><AiIcons.AiOutlinePlusCircle />เพิ่มสินค้า</button>
                        </div>
                    </Form>
                </div>
            }
            
        

            {/*Delete modal*/}
            <div id="Modal-Delete-Cate">
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
