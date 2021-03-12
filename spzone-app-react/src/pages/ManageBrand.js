import React,{useState , useEffect} from 'react';
import {BrandData} from '../components/BrandData';
import '../css/ManageBrand.css';
import * as RiIcons from "react-icons/ri";
import {Form,Input} from 'antd';
import * as AiIcons from "react-icons/ai";
import {storage} from "../firebase";
import {DefaultBrandImg} from "../const/AllData"

import * as axiosData from '../service/Service';
/*import logo from '../image/logo.png'*/   

const ManageBrand = () => {
    const initBrand ={
        B_name:"",
        B_image:"",
        B_imageFile:""
    }
    const [showBrand , setShowBrand] = useState([]);
    const [brandData , setBrandData] = useState(initBrand);
    
    const [brandMode , setBrandMode] = useState();
    const [brandImg , setBrandImg] = useState();

    useEffect(initialValue,[]);
    function initialValue(){
        axiosData.showbrand().then(function (data){
            
            setShowBrand(data.sp_brand);
            setBrandData(initBrand);
           
        })
    }



    const manageModal = (status) => {
        var modal = document.getElementsByClassName('Modal-Add-Cate')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }

    const uploadFileToFirebase = (e) =>{
        //console.log(brandData.B_imageFile.name);
        if(brandMode === "add"){
           
                
                const timestamp = Math.floor(Date.now()/1000);
                const newName = timestamp + "-SPzone";
                
                const uploadTask = storage.ref(`images/${newName}`).put(brandData.B_imageFile);
                
                uploadTask.on(
                    "state_changed", 
                    (snapshop) => {
                    const progress = Math.round(
                        (snapshop.bytesTrans/snapshop.totalBytes) * 100
                    );
                    },
                    (error)=>{
                        console.log(error);
                    },
                    () => {
                    
                        storage.ref("images")
                            .child(newName)
                            .getDownloadURL()
                            .then((url)=>{
                                addBrand(url);
                            }
                            )
                    }            
                )
            
        }else if(brandMode === "edit"){
            
                const timestamp = Math.floor(Date.now()/1000);
                const newName = timestamp + "-SPzone";
                
                const uploadTask = storage.ref(`images/${newName}`).put(brandData.B_imageFile);
                
                uploadTask.on(
                    "state_changed", 
                    (snapshop) => {
                    const progress = Math.round(
                        (snapshop.bytesTrans/snapshop.totalBytes) * 100
                    );
                    },
                    (error)=>{
                        console.log(error);
                    },
                    () => {
                    
                        storage.ref("images")
                            .child(newName)
                            .getDownloadURL()
                            .then((url)=>{
                                editBrand(url);
                            }
                            )
                    }            
                )
            
        }
    }


    const addBrand = (url) => {
        
        var Bdata = {
            B_name: brandData.B_name,
            B_image: url
        };
        
        axiosData.addbrand(Bdata).then((data) =>{
            
            manageModal("close");
            initialValue();
        })
    }

    const editBrand = () => {
        var Bdata = {
            B_brandid:brandData.B_brandid,
            B_name: brandData.B_name,
            B_image: brandData.B_image
        };
        axiosData.updatebrand(Bdata).then((data) =>{
            
            manageModal("close");
            initialValue();
        })
    }

    const manageModalDelete = (status) => {
        var modal = document.getElementsByClassName('Modal-Delete-Cate')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }

    const selectFile = (e) =>{
        setBrandData({...brandData,B_image:URL.createObjectURL(e.target.files[0]),[e.target.name]: e.target.files[0]});
    
        //setBrandData({...brandData,[e.target.name]: e.target.files[0]});
    }

    const handleChange = (e)=>{
        e.persist();
        setBrandData({...brandData,[e.target.name]: e.target.value});
        
    };

    const triggerClick = () =>{
        document.querySelector('#ImgFileBrand').click();
    }

    

    
    return (
        <div className="brand-body-page">
            <div className="Head-brand">
                <h1>แบรนด์</h1>
                <div className="brand-add-button">
                    
                    <a onClick={() => {setBrandMode("add");manageModal("show")}}><AiIcons.AiOutlinePlusCircle />เพิ่มเเบรนด์</a>
                </div>
            </div><div className="Brand-card-layout">
            {showBrand!=undefined?showBrand.map((item)=>(
                
                        <div className="Brand-card" key={item.B_brandid}>
                            <img src={item.B_image} />
                            <h5>{item.B_name}</h5>
                            <div className="button-brand-group">
                                <a  className="Brand-pen" onClick={() => {setBrandData(item);setBrandMode("edit");manageModal("show")}}><RiIcons.RiPencilFill/>แก้ไข</a>
                                <a  className="Brand-bin" onClick={() => {setBrandData(item);;manageModalDelete("show")}}><RiIcons.RiDeleteBin7Fill/>ลบ</a>
                            </div>
                        </div>

                    
            )):null} 

            </div> 

            {/*Add modal*/}
            <div id="Modal-Add-Cate" className="Modal-Add-Cate">
                <div className="Modal-Add-Cate-body">
                    {brandMode === "add" ?<h1>เพิ่มแบรนด์</h1>:<h1>แก้ไขแบรนด์</h1>}
                    <Form novalidate>
                        <div className="input-Cate-Add-img">
                            <img  src={brandData.B_image} />
                            <Input required  type="file" accept="image/*" id="ImgFileBrand"  onChange={selectFile} className="ImgAddBrand" name="B_imageFile"/>
                            <p className="p-name-img-brand" for="ImgFileBrand" onClick={() => {triggerClick()}}>เลือกภาพที่ต้องการ</p>
                        </div>
                        <div className="input-Cate-Add">
                            <Input required name="B_name" maxLength='18' value={brandData.B_name} onChange={(e)=> handleChange(e)}/>
                            <label>ชื่อ</label>
                        </div>
                        <a  className="Close-modal-x-Cate-Add" onClick={() => {manageModal("close");initialValue()}}><RiIcons.RiCloseLine /></a>
                        <div className="button-Cate-group-Add">
                            <a  className="Close-modal-Cate-Add" onClick={() => {manageModal("close");initialValue()}}>ยกเลิก</a>
                            <button type="submit" className="Save-Cate-submit-Add" onClick={(e)=>{uploadFileToFirebase(e)}}>
                                {brandMode==="add"?"เพิ่ม":"บันทึก"}
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
            {/*Add modal*/}

            {/*Delete modal*/}
            <div id="Modal-Delete-Cate" className="Modal-Delete-Cate">
                <div className="Modal-Delete-Cate-body">
                    <h4>คุณต้องการจะลบแบรนด์ใช่หรือไม่</h4>
                    <div className="button-Cate-group-Delete">
                            <a onClick={() => {manageModalDelete("close")}} className="Close-modal-Cate-Delete">ไม่ใช่</a>
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

export default ManageBrand
