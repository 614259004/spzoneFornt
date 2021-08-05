import React,{useState, useEffect} from 'react';
import "../css/Promotion.css";
import * as axiosData from '../service/Service';

function Promotion() {

    const [dataPromotion,setDataPromotion] = useState([]);

    useEffect(initialValue,[]);
    function initialValue(){
        axiosData.getPromotionUse().then(function(data){
            setDataPromotion(data);
        })
    }
    console.log(dataPromotion);
    return(
        <div>
            <div className="body">
                {dataPromotion != null ? dataPromotion.map((proItem)=>(
                <div className="body-card">
                        <img src={proItem.P_image1} />
                            <br/>
                        <h3> {proItem.P_name} </h3>
                        <br />
                            <p> เหลือ {proItem.P_price-proItem.Pr_sale}.00 ฿</p>
                            <p> หมดอายุ {proItem.Pr_time_out} </p>
                        <br />
                    <div>
                        
                        {/* <a href="#" className="button">
                            Add to cart
                        </a> */}
                    </div>
                </div>
               )): null }
            </div>
        </div>
    )
}

export default Promotion