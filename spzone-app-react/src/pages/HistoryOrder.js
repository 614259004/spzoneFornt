import React,{useState, useEffect} from 'react'
import '../css/HistoryOrders.css';
import * as axiosData from '../service/Service';
import * as FaiIcons from "react-icons/fa";
import * as TiIcons from "react-icons/ti";
import * as GoiIcons from "react-icons/go";
import {  useHistory } from 'react-router-dom';
import Moment from "moment"

const HistoryOrder =()=> {

    const history = useHistory();
    const [allOrder,setAllOrder] = useState([]);
    const [allDetail,setDetail] = useState([]);
    const [allTrack,setAllTrack] = useState([]);
    const [openTrack,setOpenTrack] = useState([]);
    const [selectTrack,setSelectTrack] = useState();
    

    const UserId = {C_customerid:localStorage.getItem('UserId')};

    useEffect(initialValue,[]);
    function initialValue(){
        axiosData.getOrdersByCusId(UserId).then(function (data){ 
            setAllOrder(data)       
        })
        axiosData.getAllOrdersDetail().then(function (data){ 
            setDetail(data)       
        })
        axiosData.showTracking().then(function (data){ 
            setAllTrack(data)       
        })
    }

    const manageNoTrackingModal = (status) => {
        var modal = document.getElementsByClassName('Modal_NoTracking_History')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }

    const manageTrackingModal = (status) => {
        var modal = document.getElementsByClassName('Modal_Tracking_History')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }

    const checkEms = (trackId) => {
        setSelectTrack(trackId)
        const emsTrack={   
                status: "all",
                language: "TH",
                barcode:[ 
                    trackId
                ],
                "req_previous_status": true
        }
        axiosData.followTracking(emsTrack).then(function (data){ 
             const data1 = Object.values(data.response.items)
             setOpenTrack(data1[0]);
             console.log(data1[0]);

            
        })
        
    }

    const getDateString = (timeDt,st,end) =>{
        var str = timeDt.substr(st,end)
        return str
    }

    const goBackBefore = () =>{
        history.goBack()
    }

    return (
        <div className="body_HistoryOrder">
             <div className="ProInfo-back-Pro" onClick={()=>{goBackBefore()}}>
                    <TiIcons.TiArrowLeft />
                </div>
            <div className="horderheader">
                <h1>Purchase History</h1>
            </div>

            {allOrder != ''? allOrder.map(item=>(
                <div className="hordergroup">
                    <div className="orderidAbdDateOfOrder">
                        <h3>{item.Or_orderid}</h3>
                        <h4>date : {item.Or_date}</h4>
                        <div className="statusOrderHisGroup">
                            <p className="statusOrderHisGroup_head">status :</p>
                            {item.OS_statusid == 5?
                                <p className="statusOrderHisGroup_status yell">check payment</p>
                            :item.OS_statusid == 6 ?
                                <p className="statusOrderHisGroup_status gree">successful payment</p>
                            :
                                <p className="statusOrderHisGroup_status redd">payment failed</p>
                            }
                        </div>
                    </div>
                    {/* <div className="orderDetailBox_history">
                        {allDetail != '' ? allDetail.filter(ad => ad.Or_orderid === item.Or_orderid).map(detail =>(
                            <div className="BoxToOneItemHistory">
                                <img src={detail.P_image1}/>
                                <h6 className="BoxToOneItemHistory_name">{detail.P_name}({detail.P_size})</h6>
                                <h6 className="BoxToOneItemHistory_amount">x{detail.Od_amount}</h6>
                            </div>
                        )):null}
                    </div> */}
                    <div className="TotalHistory_group">
                        <h2 className="TotalHistory_Head">Total</h2>
                        <h2 className="TotalHistory_Price">{item.Or_price}.00 ฿</h2>
                    </div>
                    <div className="ToolOfHistoryGroup">
                        <p>something...</p>
                        <button className="ToolOfHistory_info"><GoiIcons.GoInfo className="GoInfoIcon"/> info</button>
                        {allTrack != ''?
                            allTrack.some(tk=> tk.ems_or_id === item.Or_orderid) === true?
                            allTrack.filter(trac => trac.ems_or_id === item.Or_orderid).map(ems=>(
                                <button onClick={()=>{manageTrackingModal('show');checkEms(ems.tracking);}} className="ToolOfHistory_tracking"><FaiIcons.FaShippingFast className="ShippingFastIcon"/> tracking</button>
                            ))
                            :
                                <button onClick={()=>{manageNoTrackingModal('show')}} className="ToolOfHistory_tracking"><FaiIcons.FaShippingFast className="ShippingFastIcon"/> tracking</button>
                        :null}
                    </div>
                </div>
            )):null}


            {/*NoTracking_History modal*/}

            <div id="Modal_NoTracking_History" className="Modal_NoTracking_History"> 
                <div className="Modal_NoTracking_History_body">
                    <h4>This order havn't tracking</h4>
                    <div className="Button_Yep">
                        <button onClick={()=>{manageNoTrackingModal('close')}}>Yep!</button>
                    </div>
                </div>    
            </div>

            {/*NoTracking_History modal*/}


            {/*Tracking_History modal*/}

            <div id="Modal_Tracking_History" className="Modal_Tracking_History"> 
                <div className="Modal_Tracking_History_body">
                    <h2>Tracking</h2>
                    <div>
                        <h4>{selectTrack}</h4>
                    </div>
                    <div className="Box_follow_tracking">
                        <div className="timeOftimelineTrackGroup">
                            <ul>
                                {openTrack != 0?openTrack.map(ot2=>(
                                    <li>
                                        <div className="timeOfEms">
                                            <h5>{getDateString(ot2.status_date,0,10)}</h5>
                                            <h6>{getDateString(ot2.status_date,10,6)}</h6>
                                        </div>
                                    </li>
                                ))
                                :null}
                            </ul>
                        </div>
                        <div className="timelineGroup">
                            <ul>
                                {openTrack != 0? openTrack.map(ot=>(
                                    <li>
                                        <div className="timelineBox">
                                            <h5>{ot.status_description}</h5>
                                            <h6>{ot.location},{ot.postcode}</h6>
                                        </div>
                                    </li>
                                ))    
                                :null}
                            </ul>
                        </div>
                    </div>
                    <div className="Button_Yep">
                        <button onClick={()=>{manageTrackingModal('close')}}>Yep!!</button>
                    </div>
                </div>    
            </div>

            {/*Tracking_History modal*/}




        </div>




    )
}

export default HistoryOrder
