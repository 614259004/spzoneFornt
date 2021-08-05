import React,{useState, useEffect} from 'react'
import '../css/cart.css';
import * as axiosData from '../service/Service';
import * as IoIcons5 from "react-icons/io5";


const Cart = () => {


    const [cartShow,setCartShow] = useState([]);
    const [totalShow,setTotalShow] = useState(0);
   
    
    const UserId = {C_customerid:localStorage.getItem('UserId')};

    useEffect(initialValue,[]);
    
    

    function initialValue(){
        axiosData.getCart(UserId).then(function (data){
            setCartShow(data)
        })

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
                        </div>
                        <div className="info_cart_bottom">
                            <div className="info_cart_bottom_01">
                                <h3>Total</h3>
                                
                            </div>
                            <div className="info_cart_bottom_02">
                                {totalShow != undefined?
                                    <h3>{totalShow + 50}.00 ฿</h3>
                                :
                                    <h3>0.00 ฿</h3>
                                }
                            </div>
                        </div>
                </div>
                <div className="cart_Info_checkout">
                    {cartShow != '' ?
                    <a  href="/Home/Payment">Checkout</a>
                    :
                    <a  href="">Checkout</a>
                    }
                </div>
            </div>
        </div>
    )
}

export  default Cart;
