import React,{useState , useEffect} from 'react';
import {BrandData} from '../components/BrandData';
import '../css/ManageBrand.css';
import * as RiIcons from "react-icons/ri";
import {Form,Input} from 'antd';
import * as AiIcons from "react-icons/ai";
import {storage} from "../firebase";
import InputImage from '../UploadImageCustomer.js'
import * as axiosData from '../service/Service';
/*import logo from '../image/logo.png'*/   



const ManageBrand = () => {
    const [showBrand , setShowBrand] = useState([]);
    const [brandData , setBrandData] = useState([]);
    
    const [brandMode , setBrandMode] = useState();
    const [brandImg , setBrandImg] = useState();

    const manageModal = (status) => {
        var modal = document.getElementsByClassName('Modal-Add-Cate')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }

    const uploadFileToFirebase = (file) =>{

        if(brandMode === "add"){
        const timestamp = Math.floor(Date.now()/1000);
        const newName = timestamp + "-JRY";
        const uploadTask = storage.ref(`images/${newName}`).put(file);
        uploadTask.on(
            "state_changed",
            () => {
                storage.ref("images")
                    .child(newName)
                    .getDownloadURL()
                    .then((url)=>{
                    console.log(url);
                    }
                )
            }
        )
        }
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
        setBrandImg(URL.createObjectURL(e.target.files[0]))
    }

    const handleChange = (e)=>{
        console.log(e.target);
        e.persist();
        setBrandData((prev) => ({ ...prev, [e.target.name]: e.target.value}));
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
            {BrandData.map((item, index)=>{
                return(
                    
                        <div className="Brand-card" key={index}>
                            <img src={item.BrandImg} />
                            <h5>{item.BrandName}</h5>
                            <div className="button-brand-group">
                                <a  className="Brand-pen" onClick={() => {setBrandData(item);setBrandMode("edit");manageModal("show")}}><RiIcons.RiPencilFill/>แก้ไข</a>
                                <a  className="Brand-bin" onClick={() => {setBrandData(item);;manageModalDelete("show")}}><RiIcons.RiDeleteBin7Fill/>ลบ</a>
                            </div>
                        </div>

                    
                )
            })} 
            </div> 

            {/*Add modal*/}
            <div id="Modal-Add-Cate" className="Modal-Add-Cate">
                <div className="Modal-Add-Cate-body">
                    {brandMode === "add" ?<h1>เพิ่มแบรนด์</h1>:<h1>แก้ไขแบรนด์</h1>}
                    <Form onFinish={uploadFileToFirebase}>
                        <div className="input-Cate-Add-img">
                            <img  src={brandImg} />
                            <Input required  type="file" accept="image/*" id="ImgFileBrand" onChange={selectFile} className="ImgAddBrand"/>
                            <p className="p-name-img-brand" for="ImgFileBrand" onClick={() => {triggerClick()}}>เลือกภาพที่ต้องการ</p>
                        </div>
                        <div className="input-Cate-Add">
                            <Input required  maxLength='18' onChange={handleChange}/>
                            <label>ชื่อ</label>
                        </div>
                        <a  className="Close-modal-x-Cate-Add" onClick={() => {manageModal("close")}}><RiIcons.RiCloseLine /></a>
                        <div className="button-Cate-group-Add">
                            <a  className="Close-modal-Cate-Add" onClick={() => {manageModal("close")}}>ยกเลิก</a>
                            <button type="submit" className="Save-Cate-submit-Add">
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
