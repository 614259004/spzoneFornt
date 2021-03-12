import React,{useState, useEffect} from 'react'
import '../css/ManageBrand.css';
import * as RiIcons from "react-icons/ri";
import {Form,Input} from 'antd';
import * as AiIcons from "react-icons/ai";
import * as axiosData from '../service/Service';

const ManageCategory = () => {
    const [showCate, setShowCate] = useState([]);
    const [cateData, setCateData] = useState([]);

    const [cateMode , setCateMode] = useState();
    const[form01] = Form.useForm();

    //const [category, addcategory] = useState(d.jsonAddCategory);
    
    //ตัวเชื่อม
    useEffect(initialValue,[]);
    function initialValue(){
        axiosData.showcate().then(function (data){
            console.log('test1'+data.sp_category);
            setShowCate(data.sp_category);
            setCateData('');
            console.log('test2'+showCate);
        })
    }

    const onFinish = () => {
        
        {cateMode === "add"?
        axiosData.addcate(cateData).then(function (data){
            console.log(data);
            manageModal("close");
            initialValue();
        })
        :
        axiosData.editcate(cateData).then(function (data){
            console.log(data);
            manageModal("close");
            initialValue();
        })
        }
    }

    const onFinish01 = () => {

        axiosData.deletecate(cateData).then(function (data){
            console.log(data);
            manageModalDelete("close");
            setCateData('');
            initialValue();
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

    const manageModalDelete = (status) => {
        var modal = document.getElementsByClassName('Modal-Delete-Cate')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }


    const handleChange = (e)=>{
        e.persist();
        setCateData({...cateData,[e.target.name]: e.target.value});
        console.log([e.target.name], e.target.value);
    };

        return (
            <div className="brand-body-page">
            <div className="Head-brand">
                <h1>หมวดหมู่</h1>
                <div className="brand-add-button-cate">
                    <a  onClick={() => {setCateMode("add");manageModal("show")}}><AiIcons.AiOutlinePlusCircle />เพิ่มหมวดหมู่</a>
                </div>
            </div>
            <div className="Brand-card-layout">
            {showCate!=undefined?showCate.map((item)=>(    
                        <div className="Brand-card-Cate" key={item.Cg_categoryid}>
                            <h5 >{item.Cg_name}</h5>
                            <div className="button-brand-group-cate">
                                <a  onClick={() => {setCateMode("edit");setCateData(item);manageModal("show")}} className="Brand-pen-cate"><RiIcons.RiPencilFill/>แก้ไข</a>
                                <a  className="Brand-bin-cate" onClick={() => {manageModalDelete("show");setCateData(item)}}><RiIcons.RiDeleteBin7Fill/>ลบ</a>
                            </div>
                        </div>
            )):null} 
            </div>

            {/*Add modal*/}
            <div id="Modal-Add-Cate" className="Modal-Add-Cate">
                <div className="Modal-Add-Cate-body">
                    {cateMode === "add" ?<h1>เพิ่มหมวดหมู่</h1>:<h1>แก้ไขหมวดหมู่</h1>}
                    <Form onFinish={onFinish}  form={form01}>
                        <div className="input-Cate-Add">
                            <Input required name="Cg_name" onChange={(e)=> handleChange(e)} value={cateData.Cg_name} maxLength='18'/>
                            <label>ชื่อ</label>
                        </div>
                        <a  className="Close-modal-x-Cate-Add" onClick={()=> {setCateData('');manageModal("close")}}><RiIcons.RiCloseLine /></a>
                        <div className="button-Cate-group-Add">
                            <a  className="Close-modal-Cate-Add" onClick={()=> {setCateData('');manageModal("close")}}>ยกเลิก</a>
                            <button type="submit"  className="Save-Cate-submit-Add">
                                {cateMode==="add"?"เพิ่ม":"บันทึก"}
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
            {/*Add modal*/}

            {/*Delete modal*/}
            <div id="Modal-Delete-Cate" className="Modal-Delete-Cate">
                <div className="Modal-Delete-Cate-body">
                    <h4>คุณต้องการจะลบหมวดหมู่ {cateData.Cg_name} ใช่หรือไม่</h4>
                    <div className="button-Cate-group-Delete">
                            <a onClick={() => {manageModalDelete("close")}} className="Close-modal-Cate-Delete">ไม่ใช่</a>
        
                                <button  className="Save-Cate-submit-Delete" onClick={()=> {onFinish01()}}>
                                    ใช่
                                </button>
                
                    </div>
                    
                </div>    
            </div>

            {/*Delete modal*/}


        </div>
    )
}

export default ManageCategory