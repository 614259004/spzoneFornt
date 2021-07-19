import React,{useState, useEffect} from 'react'
import '../css/Payment.css';
import * as axiosData from '../service/Service';
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as GoIcons from "react-icons/go";
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import {storage} from "../firebase";


const Payment = () => {

    const initPayment ={
        Or_imgpayment:"",
        Or_imgpaymentFile:""
    }

    const [addressShow,setAddressShow] = useState([]);
    const [cartShow,setCartShow] = useState([]);
    const [headPayment,setHeadPayment] = useState('Address');
    const [totalShow,setTotalShow] = useState();
    const [billData , setBillData] = useState(initPayment);
    const [selectAdd , setSelectAdd] = useState('');

    const [addFunction , setAddFunction] = useState(false);

    
    

    const C_id = {C_customerid:localStorage.getItem('UserId')};

    useEffect(initialValue,[]);
    function initialValue(){
        axiosData.getAddress(C_id).then(function (data){
            setAddressShow(data)
            
        })
        axiosData.getCart(C_id).then(function (data){
            setCartShow(data)
            var total = 0
            for(var i =0 ; i< cartShow.length ; i++){
                var sum = cartShow[i].P_price * cartShow[i].Ca_amount;
                
                 total = total + parseInt(sum);
                 setTotalShow(total+50);
            }
        })
    }

    const selectFile = (e) =>{
        
        setBillData({...billData,Or_imgpayment:URL.createObjectURL(e.target.files[0]),[e.target.name]: e.target.files[0]});
        
    }

    const selectAddress = (index,id) => {

        var sa = document.getElementsByClassName('address_payment_group')[index];
        
        
        
    }

    const slidePayment =(index)=>{
        var s = document.getElementsByClassName('Payment_step');

        for(let i = 0 ; i < s.length ; i++){
            if( i === index){
                var x = document.getElementsByClassName('Payment_bullet')[index];
                var y = document.getElementsByClassName('Payment_check')[index];
                var z = document.getElementsByClassName('Payment_progress_p')[index];
                const slidePage = document.querySelector(".slidepage");
                
                x.classList.add("active");
                y.classList.add("active");
                z.classList.add("active");
                if(i === 0){
                    
                    slidePage.style.marginLeft="-55%";
                }
               
            }
        }

    }

    const backSlide = (index) => {
        var s = document.getElementsByClassName('Payment_step');
        for(let i = 0 ; i < s.length ; i++){
            if(i === index){
                var x = document.getElementsByClassName('Payment_bullet')[index];
                var y = document.getElementsByClassName('Payment_check')[index];
                var z = document.getElementsByClassName('Payment_progress_p')[index];
                const slidePage = document.querySelector(".slidepage");
                
                x.classList.remove("active");
                y.classList.remove("active");
                z.classList.remove("active");
                if(i === 0){
                    slidePage.style.marginLeft="0%";
                }
                
            }
        }
    }

    const triggerClick = () =>{
        document.querySelector('#ImgFileOrder').click();
    }

    const uploadFileToFirebase = (e) => {
        const timestamp = Math.floor(Date.now()/1000);
        const newName = timestamp + "-SPzone";
                    
        const uploadTask = storage.ref(`bills/${newName}`).put(billData.Or_imgpaymentFile);

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
            
                storage.ref("bills")
                    .child(newName)
                    .getDownloadURL()
                    .then((url)=>{
                        addOrders(url)
                    }
                    )
            }            
        )

    }

    const addOrders = (url) =>{
        var Or_data={
            Or_price:2000,
            Or_order_code:'test',
            C_customerid:localStorage.getItem('UserId'),
            A_addressid:selectAdd,
            Or_imgpayment:url
        }
        


        console.log(Or_data);

        axiosData.addOrders(Or_data).then((data) =>{
            
            
        })
    }

    return (
        <div className="Payment_body">
            <div className="Payment_card">
                {headPayment === 'Address' ?
                <h2 className="head_payment_icon">Select Address</h2>
                :
                <h2 className="head_payment_icon">Payment Page</h2>
                }
                <div className="Payment_progress_bar">
                    <div className="Payment_step">
                        <div className="Payment_bullet ">
                            <p className="Payment_progress_p "><GoIcons.GoPackage/></p>
                            <div className="Payment_check "><AiIcons.AiOutlineCheck /></div>
                        </div>
                    </div>
                    <div className="Payment_step">
                        <div className="Payment_bullet">
                            <p className="Payment_progress_p"><BiIcons.BiMoney /></p>
                            <div className="Payment_check"><AiIcons.AiOutlineCheck /></div>
                        </div>
                    </div>
                </div>


                <div className="payment_layout_form">

                    <div className="payment_page slidepage">
                        <div className="payment_field">
                            {Object.keys(addressShow).length !== 0 ?
                                addressShow.map((item,index) => (
                                    <div className={addFunction === true ? "address_payment_group black_address" : "address_payment_group "} onClick={()=>{selectAddress(index,item.A_addressid);setSelectAdd(item.A_addressid)}}>
                                        <h4>{item.A_receive_name}</h4>
                                        <h5>
                                            {item.A_homenumber}  {item.A_moo} {item.A_canton} {item.A_district} {item.	A_province} {item.A_postal_code}
                                        </h5>
                                
                                    </div>
                            )):null}
                            <h5>+ add new address</h5>
                            <button className="Payment_button_next" onClick={()=>{slidePayment(0);setHeadPayment('Payment')}}>next<MdIcons.MdKeyboardArrowRight className="arrow_next_payment"/></button>
                        </div>
                    </div>

                    <div className="payment_page">
                        <div className="payment_field">
                            <div className="payment_container">
                                <div className="payment_bill">
                                    <div className="pay_data_group">
                                        <div className="payData">
                                            <p className="head_payment_product">product</p>
                                            <p className="head_payment_amount">amount</p>
                                            <p className="head_payment_price">price</p>
                                        </div>
                                        {Object.keys(cartShow).length !== 0 ?
                                            cartShow.map(item => (
                                                <div className="payData_02">
                                                    <p className="head_payment_product_02">{item.P_name}</p>
                                                    <p className="head_payment_amount_02">{item.Ca_amount}</p>
                                                    <p className="head_payment_price_02">{item.Ca_amount * item.P_price}.00฿</p>
                                                </div>
                                                
                                        )):null}
                                        <div className="payData_02">
                                                    <p className="head_payment_product_02">shipping</p>
                                                    <p className="head_payment_amount_02"></p>
                                                    <p className="head_payment_price_02">50.00฿</p>
                                        </div>
                                        <div className="payData_03">
                                                <p className="total_name_payment">Total</p>
                                                <p className="Total_number_payment">{totalShow}.00฿</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="payment_add_evidence">
                                    <div className="bank_admin_group">
                                        <img src="/assets/image/kbank-icon.png" />
                                        <div className="bank_data">
                                            <h4>024-3-89951-6</h4>
                                            <h4>นาย จิรายุค แซ่ลิ้ม</h4>
                                        </div>
                                    </div>
                                    <div className="input_add_img_payment">
                                        <div className="bill_img">
                                            <img  src={billData.Or_imgpayment} />
                                        </div>
                                        <input type="file" accept="image/*" id="ImgFileOrder" onChange={selectFile}   className="ImgFileOrder" name="Or_imgpaymentFile"/>
                                        <p className="p_payment_bill_select" for="ImgFileOrder" onClick={()=>{triggerClick()}} >กรุณาแนบหลักฐานการชำระเงิน</p>
                                    </div>
                                </div>

                                

                            </div>
                            <div className="button_group_payment">
                                <button className="button_group_payment_back" onClick={() => {backSlide(0);setHeadPayment('Address')}} >
                                    <MdIcons.MdKeyboardArrowLeft className="button_group_payment_back_icon" />back
                                </button>
                                <button className="button_group_payment_next" onClick={(e)=>{slidePayment(1);uploadFileToFirebase(e)}}>
                                    submit<BsIcons.BsCheck className="button_group_payment_next_icon"/>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Payment
