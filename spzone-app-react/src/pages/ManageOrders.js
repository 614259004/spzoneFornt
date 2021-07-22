import React,{useState, useEffect} from 'react'
import '../css/ManageOrders.css';
import * as AiIcons from "react-icons/ai";
import * as axiosData from '../service/Service';

const ManageOrders = () => {

    const initOrder ={
        A_addressid: "",
        C_customerid: "",
        C_image: "",
        C_lastname: "",
        C_name: "",
        C_tel: "",
        OS_statusid: "",
        Or_date: "",
        Or_imgpayment: "",
        Or_order_code: "",
        Or_orderid: "",
        Or_price: "",
        S_statusid: "",
    }

    const [orderShow,setOrderShow] = useState([]);
    const [orderData,setOrderData] = useState(initOrder);
    const [orderDetailData,setOrderDetailData] = useState([]);
    const [orderCancle,setOrderCancle] = useState();
    


    useEffect(initialValue,[]);
    function initialValue(){
        ManageModalOrdersInfo('close')
        ManageModalOrdersInfoComfirm('close');
        axiosData.getOrders().then(function (data){
            
            setOrderShow(data)
           
        })
         
        
    }

    const callOrderDetail = (id) =>{
        
        const or_id={Or_orderid:id};
        axiosData.getOrdersDetail(or_id).then(function (data){
            
            setOrderDetailData(data)
           
        })
    }

    const YesMoneyOrder =(id)=>{
        
        axiosData.comfirmOrder(id).then(function (data){
            
            initialValue();
           
        })
    }

    const CancleOrderbutton =(id) =>{
        axiosData.cancleOrder(id).then(function (data){
            initialValue();
        })
    }

    const orderDetailById = (id) =>{
        const or_id={Or_orderid:id};
        axiosData.getOrdersById(or_id).then(function (data){
            
            setOrderData(data[0])
        })
    }

    const ManageModalOrdersInfo = (status) => {
        var modal = document.getElementsByClassName('ModalInfoOrderPageAdmin')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }

    const ManageModalOrdersInfoComfirm = (status) =>{
        var modal = document.getElementsByClassName('ModalInfoOrderPageAdminComfirm')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }

 
    return (
        <div className="brand-body-page">
            <div className="Head-brand">
                <h1>รายการสั่งซื้อ</h1>
            </div>
            <div className="Orders_card_layout">
            {
            orderShow.map((item)=>{
                return(
                <div className="Orders_card">
                    <h5 className="h5_Orders_Id">{item.Or_orderid}</h5>
                    <h3 className="h3_Orders_Name">{item.C_name} {item.C_lastname}</h3>
                    <div className="order_info_group_card">
                        <p className="data_order_info_head">วันที่และเวลา :</p>
                        <p className="data_order_info">{item.Or_date}</p>
                    </div>
                    <div className="order_info_group_card">
                        <p className="data_order_info_head">ยอดรวม :</p>
                        <p className="data_order_info">{item.Or_price}.00 ฿</p>
                    </div>
                    <div className="order_info_group_card">
                        <p className="data_order_info_head">สถานะ :</p>
                        {item.OS_statusid == 5 ?
                        <p className="data_order_info_Status WaitMoney">รอการยืนยันชำระเงิน</p>
                        : item.OS_statusid == 6 ?
                        <p className="data_order_info_Status YesMoney">ชำระเงินเสร็จสิ้น</p>
                        :
                        <p className="data_order_info_Status CancleMoney">ยกเลิกคำสั่งซื้อ</p>
                        }
                    </div>
                    
                    <button className="Go_Info_Orders_button" onClick={()=>{ManageModalOrdersInfo('show');orderDetailById(item.Or_orderid);callOrderDetail(item.Or_orderid)}}>รายละเอียด</button>
                </div>
           
             )}) }
            </div>



            {/* Modal InFo Orders */}
            <div id="ModalInfoOrderPageAdmin" className="ModalInfoOrderPageAdmin">
                <div className="ModalInfoOrderPageAdmin_body">
                    <h5 onClick={()=>{ManageModalOrdersInfo('close');}}><AiIcons.AiOutlineClose className="CloseModelInfoOrder"/></h5>
                    
                    <div className="InfoOrdersGroupAdmin">
                        <div className="InfoOrderMoneyImg">
                            <img src={orderData.Or_imgpayment} />
                            
                        </div>
                        <div className="InfoOrderBill">
                            <div className="headInFoOrderBill">
                                <p>รายละเอียดคำสั่งซื้อ</p>
                            </div>
                            <div className="OrderDataCustomerBody">
                                <div className="detailCustomer_adminPage_order">
                                    <h5 className="head_cus_detailOrder">ผู้ซื้อสินค้า :</h5>
                                    <p className="data_cus_detailOrder">{orderData.C_name} {orderData.C_lastname} ({orderData.C_tel})</p>
                                </div>
                                <div className="detailCustomer_adminPage_order">
                                    <h5 className="head_cus_detailOrder">ผู้รับสินค้า :</h5>
                                    <p className="data_cus_detailOrder">{orderData.A_receive_name} ({orderData.A_phone})</p>
                                </div>
                                <div className="detailCustomer_adminPage_order">
                                    <h5 className="head_cus_detailOrder">ที่อยู่ :</h5>
                                    <p className="data_cus_detailOrder">{orderData.A_homenumber} หมู่{orderData.A_moo} ต.{orderData.A_canton} อ.{orderData.A_district} จ.{orderData.A_province} {orderData.A_postal_code}</p>
                                </div>
                            </div>
                            <div className="orders_detail_body">
                                {orderDetailData.map((item)=>{
                                return(
                                    <div className="orders_Product_detail">
                                        <p className="P_OrderDetail_Name">{item.Od_amount} {item.P_name} ({item.P_size})</p>
                                        <p className="P_OrderDetail_Price">{item.Od_amount * item.P_price}.00฿</p>
                                    </div>
                                )})}
                                
                            </div>
                            <div className="orders_Product_Total_money">
                            <div className="orders_Product_detail">
                                        <p className="P_OrderDetail_shipping">subTotal</p>
                                        <p className="P_OrderDetail_Price_shipping">{orderData.Or_price - 50}.00฿</p>
                                    </div>
                                    <div className="orders_Product_detail">
                                        <p className="P_OrderDetail_shipping">shipping</p>
                                        <p className="P_OrderDetail_Price_shipping">50.00฿</p>
                                    </div>
                                    <div className="orders_Product_detail">
                                        <p className="P_OrderDetail_shipping">Total</p>
                                        <p className="P_OrderDetail_Price_shipping">{orderData.Or_price}.00฿</p>
                                    </div>
                            </div>
                            {orderData.OS_statusid == 5 ?
                            <div>
                                <button onClick={()=>{YesMoneyOrder(orderData.Or_orderid)}} className="Button_yes_money">ยืนยันการชำระเงิน</button>
                                <button onClick={()=>{setOrderCancle(orderData.Or_orderid);ManageModalOrdersInfoComfirm('show');}} className="Button_No_money">ยกเลิกคำสั่งซื้อ</button>
                           </div> 
                           :null
                            }
                        </div>
                    </div>
                    
                    
                    
                </div>    
            </div>

            {/* Modal InFo Orders */}

            {/* Modal InFo Orders Comfirm*/}
            <div id="ModalInfoOrderPageAdminComfirm" className="ModalInfoOrderPageAdminComfirm">
                <div className="ModalInfoOrderPageAdminComfirm_body">
                    <h5 onClick={()=>{ManageModalOrdersInfoComfirm('close');}}><AiIcons.AiOutlineClose className="CloseModelInfoOrder"/></h5>
                    <p>คุณต้องการยกเลิกคำสั่งซื้อใช่หรือไม่</p>
                    <div className="button_group_comfirmCancle">
                        <button className="NoCancleOrderButton" onClick={()=>{ManageModalOrdersInfoComfirm('close');}}>ไม่ใช่</button>
                        <button className="YesCancleOrderButton" onClick={()=>{CancleOrderbutton(orderCancle);}}>ใช่</button>
                    </div>
                    
                    
                    
                </div>    
            </div>


            {/* Modal InFo Orders Comfirm*/}
               
        </div>
    )
}

export default ManageOrders
