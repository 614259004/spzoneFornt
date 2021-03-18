import React,{useState, useEffect} from 'react'
import '../css/ManageBrand.css';
import * as RiIcons from "react-icons/ri";
import {Form,Input,Tooltip} from 'antd';
import * as AiIcons from "react-icons/ai";
import {storage} from "../firebase";
import * as axiosData from '../service/Service';
import {jsonUrl} from '../const/AllData';


const ManageProduct = () => {

    const initProduct ={
        P_name:"",
        P_price:"",
        P_detail:"",
        B_brandid:"",
        Cg_categoryid:"",
        P_image1:"",
        P_image1File:"",
        P_image2:"",
        P_image2File:"",
        P_image3:"",
        P_image3File:""
    }

    const sizeData = {
        P_size:"",
        P_size_amount:""
    }

    

    const [productData , setProductData] = useState(initProduct);
    const [showProduct , setShowProduct] = useState([]);
    const [showBrand , setShowBrand] = useState([]);
    const [showCate , setShowCate] = useState([]);
    const [firstImg , setFirstImg] = useState();

    const [showSize, setShowSize] = useState([]);
    const [sizeAdd, setSizeAdd] = useState(sizeData);
    const [allSize, setAllSize] = useState([]);
    const [removeSize, setRemoveSize] = useState([]);

    const [productMode, setProductMode] = useState();
    const [addAmountSize , setAddAmountSize] = useState(sizeData);
    
    
    
    useEffect(initialValue,[]);
    function initialValue(){
        axiosData.showproduct().then(function (data){
            setShowProduct(data);
            setProductData(initProduct);
          
        })
        axiosData.showbrand().then(function (data){
            
            setShowBrand(data.sp_brand);
           
        })
        axiosData.showcate().then(function (data){
            
            setShowCate(data.sp_category);
           
        })
        axiosData.showallsize().then(function (data){
           
            setAllSize(data.sp_size);
           
        })

    }

    const HoverDelete =(index)=>{
        console.log("testDS");
        var buttonSize = document.getElementsByClassName('bin-in-size-Proinfo')[index];
        buttonSize.classList.add("show");
    }

    const LeaveHover=(index)=>{
        var buttonSize = document.getElementsByClassName('bin-in-size-Proinfo')[index];
        buttonSize.classList.remove("show");
    }
    
    const manageAddModal = (status) => {
        var modal = document.getElementsByClassName('Modal-Add-Product')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }

    const ManageModelSizeDelete = (status) => {
        var modal = document.getElementsByClassName('Modal-Delete-Cate')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }

    const manageInfoModal = (status) => {
        var modal = document.getElementsByClassName('Modal-Info-Pro')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }

    const callSize = (id) => {
         axiosData.showsize(id).then(function (data){
            
            setShowSize(data);
        })
    }

    const manageAddSizeModal = (status) => {
        var modal = document.getElementsByClassName('Modal-Add-Size-Product')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }

    const manageAddAmountModal = (status) =>{
        var modal = document.getElementsByClassName('Modal-Add-Amount-Size')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }

    const selectFile01 = (e) =>{
        
        /*console.log(productData.P_image1);*/
        setProductData({...productData,P_image1:URL.createObjectURL(e.target.files[0]),[e.target.name]: e.target.files[0]});
        
        
    }
    const selectFile02 = (e) =>{
        
        setProductData({...productData,P_image2:URL.createObjectURL(e.target.files[0]),[e.target.name]: e.target.files[0]});
        
    }
    const selectFile03 = (e) =>{
        
        setProductData({...productData,P_image3:URL.createObjectURL(e.target.files[0]),[e.target.name]: e.target.files[0]});
        
    }

    const handleChange = (e)=>{
        e.persist();
        setProductData({...productData,[e.target.name]: e.target.value});
    };

    const handleChangeSize = (e)=>{
        e.persist();
        setSizeAdd({...sizeAdd,[e.target.name]: e.target.value});
    };

    const handleChangeAddSize = (e) =>{
        e.persist();
        setAddAmountSize({...addAmountSize,[e.target.name]: e.target.value});
        
    }

    const updateStockSize = (id) => {
        
     const sizeAmount = allSize.map(AmountS => {
            if(AmountS.P_size === addAmountSize.P_size && AmountS.P_productid === id){
               return parseInt(addAmountSize.P_size_amount)+parseInt(AmountS.P_size_amount);
            }
        }  
        )
        console.log(sizeAmount);
        sizeAmount.map(jojo => {
            if(jojo !== undefined){
                const A_S ={
                    P_size:addAmountSize.P_size,
                    P_size_amount:jojo
                }

                axiosData.updateamountsize(A_S, id).then(function (data){
           
                    initialValue()
                    manageAddAmountModal("close")

                   
                })
            }
        })

    }
    


   const  uploadFileToFirebase =  (e) =>{
        
                const timestamp = Math.floor(Date.now()/1000);
                const newName = timestamp + "-SPzone-Product-img1";
                const newName02 = timestamp + "-SPzone-Product-img2";
                const newName03 = timestamp + "-SPzone-Product-img3";
                
                
                const uploadTask = storage.ref(`imagesProduct/${newName}`).put(productData.P_image1File);
                const uploadTask02 = storage.ref(`imagesProduct/${newName02}`).put(productData.P_image2File);
                const uploadTask03 = storage.ref(`imagesProduct/${newName03}`).put(productData.P_image3File);
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
                    
                        storage.ref("imagesProduct")
                            .child(newName)
                            .getDownloadURL()
                            .then((url01)=>{
                                addProductInfo(url01);
                            }
                            )
                    }            
                )
                
                    uploadTask02.on(
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
                    
                        storage.ref("imagesProduct")
                            .child(newName02)
                            .getDownloadURL()
                            .then((url02)=>{
                                addProductInfo(url02);
                            }
                            )
                    }            
                )

                  uploadTask03.on(
                    "state_changed", 
                    (snapshop) => {
                    const progress = Math.round(
                        (snapshop.bytesTrans/snapshop.totalBytes) * 100
                    );
                    },
                    (error)=>{
                        console.log(error);
                    },
                     ()  => {
                    
                            storage.ref("imagesProduct")
                            .child(newName03)
                            .getDownloadURL()
                            .then((url03)=>{
                                addProductInfo(url03);
                            }
                            )
                    }            
                )
                
                      
        }
    
        const addProductInfo = (url) => {
            
            jsonUrl.push(url);

            console.log("url "+jsonUrl.length);

            if(jsonUrl.length === 3){
                var Pdata ={
                    P_name:productData.P_name,
                    P_price:productData.P_price,
                    P_detail:productData.P_detail,
                    B_brandid:productData.B_brandid,
                    Cg_categoryid:productData.Cg_categoryid,
                    P_image1:jsonUrl[0],
                    P_image2:jsonUrl[1],
                    P_image3:jsonUrl[2]
                }

                console.log(Pdata);
                if(productMode === "add"){
                axiosData.addproduct(Pdata).then((data) =>{
                    console.log(data);
                    manageAddModal("close");
                    initialValue();
                    jsonUrl.splice(0,jsonUrl.length);
                })
                } else if(productMode === "edit"){
                    
                        axiosData.editproduct(Pdata,productData.P_productid).then((data) =>{
                        console.log(data);
                        manageAddModal("close");
                        initialValue();
                        jsonUrl.splice(0,jsonUrl.length);
                   })
                }
            }
        }
        const addProductSize = () => {
            
           
                var Szdata ={
                    P_productid:productData.P_productid,
                    P_size:sizeAdd.P_size,
                    P_size_amount:sizeAdd.P_size_amount
                }
                console.log(Szdata);

                axiosData.addsize(Szdata).then((data) =>{
                    console.log(data);
                    manageAddSizeModal("close");
                    manageInfoModal("close");
                    setSizeAdd(sizeData)
                    initialValue();
                })
        }
        
        const deleteSize =(Szdata)=>{
            var Sidata={
                P_productid:Szdata.P_productid,
                P_size:Szdata.P_size
            }
            

            axiosData.deletesize(Sidata).then((data) =>{
               
                ManageModelSizeDelete("close");
                manageInfoModal("close");
                initialValue();
            })
        }

        

    const triggerClick01 = () =>{
        document.querySelector('#ImgFileProduct01').click();
    }
    const triggerClick02 = () =>{
        document.querySelector('#ImgFileProduct02').click();
    }
    const triggerClick03 = () =>{
        document.querySelector('#ImgFileProduct03').click();
    }
    return (
        <div className="brand-body-page">
            <div className="Head-brand">
                <h1>สินค้า</h1>
                <div className="Product-add-button">
                    
                    <a onClick={()=>{manageAddModal("show");setProductMode("add")}}><AiIcons.AiOutlinePlusCircle />เพิ่มสินค้า</a>
                </div>
            </div>

            <div className="Product-card-layout">
            {showProduct.map((item, index)=>{
                return(
                    
                        <div className="Product-card" key={index}>
                            <img src={item.P_image1} />
                            <div className="Product-info-admin">
                                <div className="Product-name-group">
                                    <h5>{item.P_name}</h5>
                                    <h6>{item.P_productid}</h6>
                                    <div className="Size-layout">
                                    {Object.keys(allSize).length !== 0 ?
                                    allSize.filter(aSize => aSize.P_productid === item.P_productid).map(allS => (
                                        
                                            <div className="size-product">
                                                <h6>{allS.P_size}</h6>
                                                <h6>{allS.P_size_amount}</h6>
                                            </div>
                                       
                                    )):null}
                                    </div>
                                </div>
                                <div className="button-brand-group-product">
                                    <a  className="Brand-pen-product" onClick={() => {setProductData(item);manageInfoModal("show");setFirstImg(item.P_image1);callSize(item)}}><RiIcons.RiPencilFill/>จัดการสินค้า</a>
                                    <a  className="Brand-pen-product Add-size-amount" onClick={()=>{manageAddAmountModal("show");setProductData(item)}}><AiIcons.AiOutlinePlusCircle />เพิ่มจำนวน</a>
                                </div>
                            </div>
                        </div>
             )
            })}
            </div> 

            {/*Add modal*/}
            <div className="Modal-Add-Product">
                <div className="Modal-Add-Product-body">
                    <h1>{productMode==="add"?"เพิ่มสินค้า":"แก้ไขสินค้า"}</h1>
                    <a className="x-add-product-from" onClick={()=>{manageAddModal("close");initialValue()}}><RiIcons.RiCloseLine /></a>
                    <div className="Add-From-Product">
                        <div className="NameAndPrice">
                            <div className="Product-from-add">
                                <p>ชื่อสินค้า</p>
                                <Input required name="P_name" value={productData.P_name} onChange={(e)=> handleChange(e)}/>
                            </div>
                            <div className="Price-from-add">
                                <p>ราคาสินค้า</p>
                                <Input required name="P_price" value={productData.P_price} onChange={(e)=> handleChange(e)}/>
                            </div>
                        </div>
                        <div className="ProductInfo">
                            <div className="Info-from-add">
                                <p>รายละเอียด</p>
                                <Input required name="P_detail" value={productData.P_detail} onChange={(e)=> handleChange(e)}/>
                            </div>
                        </div>
                        <div className="CateAndBrand">
                            <div className="Cate-From-add">
                                <p>หมวดหมู่</p>
                                <select name="Cg_categoryid" value={productData.Cg_categoryid} required onChange={(e)=> handleChange(e)}>
                                        <option  value=""></option> 
                                    {showCate.map((Cate)=>(
                                       
                                       <option key={Cate.Cg_categoryid} value={Cate.Cg_categoryid}>{Cate.Cg_name}</option> 
                                    ))}
                                </select>
                            </div>
                            <div className="Brand-From-add">
                                <p>แบรนด์</p>
                                <select name="B_brandid" value={productData.B_brandid} required onChange={(e)=> handleChange(e)}>
                                    <option  value=""></option> 
                                    {showBrand.map((brand)=>(
                                       
                                       <option key={brand.B_brandid} value={brand.B_brandid}>{brand.B_name}</option> 
                                    ))}
                                </select>
                            </div>
                        </div>
                        {/* <div className="PromotionProduct">
                            <div className="Promo-From-add">
                                <p>โปรโมชัน</p>
                                <Input required onChange={(e)=> handleChange(e)} value={productData.Pr_promotion_code} name="Pr_promotion_code"/>
                            </div>
                        </div> */}
                        <div className="Image-Product-Group">
                            <div className="Product-Img-Add">
                                <img src={productData.P_image1} />
                                <Input required id="ImgFileProduct01"   type="file" accept="image/*" className="" name="P_image1File" onChange={selectFile01} />
                                <p onClick={() => {triggerClick01()}}>เลือกรูปภาพที่1</p>
                            </div>
                            <div className="Product-Img-Add">
                                <img src={productData.P_image2} />
                                <Input required id="ImgFileProduct02"    type="file" accept="image/*" className="" name="P_image2File" onChange={selectFile02}/>
                                <p onClick={() => {triggerClick02()}}>เลือกรูปภาพที่2</p>
                            </div>
                            <div className="Product-Img-Add">
                                <img src={productData.P_image3} />
                                <Input required id="ImgFileProduct03"    type="file" accept="image/*" className="" name="P_image3File" onChange={selectFile03}/>
                                <p onClick={() => {triggerClick03()}}>เลือกรูปภาพที่3</p>
                            </div>
                        </div>
                        <div className="Button-group-add-pro">
                            <button className="cancle-add-pro" onClick={()=>{manageAddModal("close");initialValue()}}>ยกเลิก</button>
                            <button className="Ok-add-pro" onClick={(e)=>{uploadFileToFirebase(e)}}>{productMode==="add"?"เพิ่ม":"บันทึก"}</button>
                        </div>
                    </div>
                    
                </div>    
            </div>
            {/*Add modal*/}
            

            {/*Info modal*/}
            <div  className="Modal-Info-Pro">
            
                <div className="Modal-Info-Pro-body">
                    <a className="x-add-product-from" onClick={()=>{manageInfoModal("close");initialValue();setFirstImg()}}><RiIcons.RiCloseLine /></a>
                   <div className="Info-Product-Box">
                       <div  className="Product-Group-layout">
                            <img id="firstImg" src={firstImg}/>
                            <div className="Group-II-Img">
                                <img src={productData.P_image1} onClick={()=>{setFirstImg(productData.P_image1)}} />
                                <img src={productData.P_image2} onClick={()=>{setFirstImg(productData.P_image2)}}/>
                                <img src={productData.P_image3} onClick={()=>{setFirstImg(productData.P_image3)}}/>
                            </div>
                       </div>
                       <div className="Product-Group-layout-II">
                           <label id="Product-price">฿{productData.P_price}</label>
                           <h1 className="Name-ProInfo-h1">{productData.P_name}</h1>
                           <label className="Pid-ProInfo-lb">รหัสสินค้า :{productData.P_productid}</label>
                           <p className="Pdetail-ProInfo-p">{productData.P_detail}</p>
                           <div className="BrandAndCate-InfoPro">
                               <div className="InfoPro-Cate">
                                 <label>หมวดหมู่ :</label>
                                 <p>{productData.Cg_name}</p>
                               </div>
                               <div className="InfoPro-Brand">
                                 <label>แบรนด์ :</label>
                                 <p>{productData.B_name}</p>
                               </div>
                           </div>
                           <label className="Jamnun-ProInfo">จำนวนสินค้า (ตัว) :</label>
                           <div className="Size-Pro-Info-group">
                               <div className="Size-layout-ProInfo">
                           {Object.keys(showSize).length !== 0 ?
                           
                                showSize.map((size,index)=>(
                                    
                                        <div className="Size-button-InfoPro" 
                                            onMouseEnter={()=>{HoverDelete(index)}} 
                                            onMouseLeave={()=>{LeaveHover(index)}}
                                            onClick={()=>{ManageModelSizeDelete("show");setRemoveSize(size)}}
                                        >
                                            <label className="Size-inFoPro">{size.P_size}</label>
                                            <p>{size.P_size_amount}</p>
                                            <div className="bin-in-size-Proinfo"><RiIcons.RiDeleteBin7Fill/></div>
                                        </div> 
                                    
                               ))
                            :null} </div>  
                               <div className="Add-Size-button-ProInfo">
                                    <a onClick={()=>{manageAddSizeModal("show")}}><AiIcons.AiOutlinePlusCircle />เพิ่มไซส์</a>
                               </div>
                           </div>
                           <div className="button-InfoPro-Group">
                               <button  onClick={()=>{setProductMode("edit");manageAddModal("show");manageInfoModal("close")}}>แก้ไขสินค้า</button>
                           </div>

                       </div>
                   </div>
                    
                    
                </div>    
            </div>

            {/*Info modal*/}


            {/*Add Size modal*/}
            <div  className="Modal-Add-Size-Product">
                <div className="Modal-Add-Size-Product-body">
                    <a className="x-add-product-from" onClick={()=>{manageAddSizeModal("close");setSizeAdd(sizeData);}}><RiIcons.RiCloseLine /></a>
                    <h1>เพิ่มไซส์</h1>
                    <div className="Size-From-group">
                        <div className="size-input-group">
                            <Input name="P_size" value={sizeAdd.P_size} required onChange={(e)=> handleChangeSize(e)}/>
                            <p id="Size-input">ไซส์</p>
                        </div>
                        <div className="size-input-group">
                            <Input required name="P_size_amount" value={sizeAdd.P_size_amount}  onChange={(e)=> handleChangeSize(e)}/>
                            <p id="Size-input-amount">จำนวน(ตัว)</p>
                        </div>
                        <div className="size-button-group">
                            <a onClick={()=>{manageAddSizeModal("close");setSizeAdd(sizeData);}}>ยกเลิก</a>
                            <button onClick={()=>{addProductSize()}}>เพิ่ม</button>
                        </div>
                    </div>
                </div>    
            </div>
            {/*Add Size modal*/}
            {/*Delete Size modal*/}
            <div id="Modal-Delete-Cate" className="Modal-Delete-Cate">
                <div className="Modal-Delete-Cate-body">
                    <h4>คุณต้องการจะลบไซส์ {removeSize.P_size} ใช่หรือไม่</h4>
                    <div className="button-Cate-group-Delete">
                            <a onClick={() => {ManageModelSizeDelete("close")}} className="Close-modal-Cate-Delete">ไม่ใช่</a>
                            <button  className="Save-Cate-submit-Delete" onClick={()=>{deleteSize(removeSize)}}>
                                ใช่
                            </button>
                    </div>
                    
                </div>    
            </div>
            {/*Delete Size modal*/}

            {/*Add Amount Size modal*/}
            <div  className="Modal-Add-Amount-Size">
                <div className="Modal-Add-Amount-Size-body">
                    <h1>เพิ่มจำนวนสินค้า</h1>
                    <a className="x-add-product-from" onClick={()=>{manageAddAmountModal("close");setAddAmountSize(sizeData)}}><RiIcons.RiCloseLine /></a>
                    <div className="inputdata-Add-amount-Proinfo">
                        <p id="select-size-Add-amount">เลือกไซส์</p>
                        <select name="P_size" value={addAmountSize.P_size} required onChange={(e)=> handleChangeAddSize(e)}>
                            <option></option>
                            {Object.keys(allSize).length !== 0 ?
                                    allSize.filter(aSize => aSize.P_productid === productData.P_productid).map(AmountS => (
                                        
                                        <option value={AmountS.P_size}>{AmountS.P_size}</option>
                                       
                                    )):null}
                        </select>
                    </div>
                    <div className="inputdata-Add-amount-Proinfo">
                        <p id="input-Pro-Add-amount">จำนวน</p>
                        <Input required name="P_size_amount" value={addAmountSize.P_size_amount} onChange={(e)=> handleChangeAddSize(e)}/>
                    </div>
                    <div className="button-Pro-group-Delete-Amount">
                            <a onClick={() => {manageAddAmountModal("close");setAddAmountSize(sizeData);}} >ไม่ใช่</a>
                            <button  className="Save-Cate-submit-Delete" onClick={()=>{updateStockSize(productData.P_productid)}}>
                                ใช่
                            </button>
                    </div>
                </div>    
            </div>
            {/*Add Amount Size modal*/}
        </div>
    )
}



export default ManageProduct
