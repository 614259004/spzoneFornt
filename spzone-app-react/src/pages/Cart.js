import React,{useState, useEffect} from 'react'
import '../css/cart.css';
import * as axiosData from '../service/Service';
import * as IoIcons5 from "react-icons/io5";
import Item from 'antd/lib/list/Item';
import { Link } from "react-router-dom";


const Cart = () => {


    const [cartShow,setCartShow] = useState([]);
    const [totalShow,setTotalShow] = useState(0);
    const [allPromotion,setAllPromotion] = useState([]);
    const [usePro,setUsePro] = useState();
    const [backupPro,setBackupPro] = useState([]);
    const [spid,setspid] = useState();
    const [salePrice,setSalePrice] = useState();
   
    
    const UserId = {C_customerid:localStorage.getItem('UserId')};

    useEffect(initialValue,[]);
    
    

    function initialValue(){
        axiosData.getCart(UserId).then(function (data){
            setCartShow(data)
        })
        axiosData.getPromotionUse().then(function (data){
            setAllPromotion(data)
        })
        setBackupPro([]);
        setspid();
     }  
     
    
     

    const findTotal = () => {
        if(cartShow.length !== 0 ){
            let total = 0
            for( var i = 0 ; i < cartShow.length ; i++){
                var sum = cartShow[i].P_price * cartShow[i].Ca_amount;
                
                 total = total + parseInt(sum);
                 setTotalShow(total);
                 
            }
            //  console.log(totalShow);
        }else{
            setTotalShow(0);
            
        }
    }

    useEffect(findTotal,[cartShow]);

    

    const deleteCart = (id) => {
        var c_id={Ca_cartid:id}
        axiosData.delCart(c_id).then(function (data){
            initialValue();
        })
    }

    const BackupPromotion = (prid) => {
        setBackupPro(allPromotion)
        setUsePro(prid);
       
        if(prid != undefined){
            for(let i=0; i<allPromotion.length; i++){
                if(allPromotion[i].Pr_promotion_code===prid){
                    setspid(allPromotion[i].P_productid)
                    setSalePrice(allPromotion[i].Pr_sale)
                }
            }
            }

    }


    return (
        <div className="cart_Body">
            <div className="Cart_table">
                <div className="head_tabel_cart">
                    <div className="product_cart">
                       <p>Product</p>
                    </div>
                    <div className="price_cart">
                        <p>Price</p>
                    </div>
                    <div className="total_cart">
                        <p>Sale</p>
                    </div>
                    <div className="amount_cart">
                        <p>Amount</p>
                    </div>
                    <div className="total_cart">
                        <p>Total</p>
                    </div>
                    <div className="clear_cart">

                    </div>
                </div>
                
                {cartShow !== undefined?cartShow.map((item)=>(
                    
                    <div className="Product_tabel_cart">
                        
                        <div className="product_cart_02">
                            <img src={item.P_image1} />
                            <div>
                                <h4>{item.P_name}</h4>
                                <h6>size : {item.P_size}</h6>
                            </div>
                        </div>

                        <div className="price_cart">
                            <h4>{item.P_price}.00 ฿</h4>
                        </div>
                        <div className="total_cart">
                        {backupPro.length != 0?
                        item.P_productid === spid?
                            allPromotion.filter(P => item.P_productid === P.P_productid).map(allS => (
                            usePro != null && usePro === allS.Pr_promotion_code && allS.P_productid === item.P_productid ?
                                
                                    <h4>{allS.Pr_sale}.00 ฿</h4>
                                
                            :<h4>0.00 ฿</h4>
                                
                            
                        )):<h4>0.00 ฿</h4>:
                        
                        <h4>0.00 ฿</h4>
                    }
                    </div>

                        <div className="amount_cart">
                            <h4>{item.Ca_amount}</h4>
                        </div>

                        <div className="total_cart">
                            <h4>{item.P_price * item.Ca_amount}.00 ฿</h4>
                        </div>
                        
                        <div className="clear_cart">
                            <button onClick={()=>{deleteCart(item.Ca_cartid)}}><IoIcons5.IoCloseSharp /></button>
                        </div>
                    </div>
                )):null}

                
            </div>
            <div className="inFoCart_Head">
                <div className="inFoCartbody">
                        <div className="info_cart_head">
                            <h3>Order summary</h3>
                        </div>
                        <div className="info_cart_Center">
                            <div className="info_cart_one">
                                <h5 className="info_cart_Center_subtotal">subtotal</h5>
                                {totalShow != null?
                                    <h5 className="info_cart_Center_subtotal_price">{totalShow}.00 ฿</h5>
                                :
                                    <h5 className="info_cart_Center_subtotal_price">0.00 ฿</h5>
                                }
                            </div>
                            <div className="info_cart_one">
                                <h5 className="info_cart_Center_subtotal">shiping</h5>
                                <h5 className="info_cart_Center_subtotal_price">50.00 ฿</h5>
                            </div>
                            <div className="info_cart_one">
                                <select onChange={(e)=>{BackupPromotion(e.target.value)}}>
                                    <option></option>
                                    {cartShow.length != 0? cartShow.map((cs)=>(
                                        (allPromotion.length != 0?
                                            allPromotion.filter(Item => Item.P_productid === cs.P_productid).map(allS => (
                                                <option value={allS.Pr_promotion_code}>{allS.Pr_promotion_code}</option>
                                                
                                        )):null)
                                    )):null}
                                </select>
                            </div>
                        </div>
                        <div className="info_cart_bottom">
                            <div className="info_cart_bottom_01">
                                <h3>Total</h3>
                                
                            </div>
                           {usePro === undefined?
                           <div className="info_cart_bottom_02">
                                {totalShow != undefined?
                                    <h3>{totalShow + 50}.00 ฿</h3>
                                :
                                    <h3>0.00 ฿</h3>
                                }
                            </div>
                            :
                            <div className="info_cart_bottom_02">
                                {totalShow != undefined?
                                    <h3>{totalShow - salePrice + 50}.00 ฿</h3>
                                :
                                    <h3>0.00 ฿</h3>
                                }
                            </div>
                            }

                        </div>
                </div>
                <div className="cart_Info_checkout">
                    {cartShow != '' ?
                    <Link true={{pathname:"/Home/Payment",
                    state:{
                        Pr_sale:salePrice
                    }}}>
                        <a>Checkout</a>
                    </Link>
                    :
                    <a  href="">Checkout</a>
                    }
                </div>
            </div>
        </div>
    )
}

export  default Cart;
