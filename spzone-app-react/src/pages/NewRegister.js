import React,{useState} from 'react';
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";
import * as RiIcons from "react-icons/ri";
import '../css/Newregister.css';
import {Form,Input} from 'antd';
import * as d from '../const/AllData';
import * as axiosData from '../service/Service';



const NewRegister = () => {
    const [eye, setEye] = useState(false);
    const [eye01, setEye01] = useState(false);
    const [register, setRegister] = useState(d.jsonRegister);
    const[form01] = Form.useForm();
    
    const onFinish = () => {
        setRegister({
            "C_name" : register.C_name,
            "C_lastname" : register.C_lastname,
            "C_tel" : register.C_tel,
            "C_image" : 'test',
            "L_email" : register.L_email,
            "L_password" : register.L_password
        })
        
        

        axiosData.sendDataRegister(register).then(function (data){
            console.log(data);
        })
    }
    const handleChange = (e)=>{
        e.persist();
        setRegister((prev) => ({ ...prev, [e.target.name]: e.target.value}));
    };
    const  test = (index) => {
        var w = document.getElementsByClassName('Register-step');
        
        for(let i = 0 ; i < w.length ; i++){
            if( i === index){
                var x = document.getElementsByClassName('Register-bullet')[index];
                var y = document.getElementsByClassName('Register-check')[index];
                var z = document.getElementsByClassName('Regis-progress-p')[index];
                const slidePage = document.querySelector(".slidepage");
                
                x.classList.add("active");
                y.classList.add("active");
                z.classList.add("active");
                if(i === 0){
                    
                    slidePage.style.marginLeft="-25%";
                }
                else if(i === 1){
                    slidePage.style.marginLeft="-50%";
                }
                else if(i === 2){
                    setTimeout(function(){
                        alert("You're successfully register");
                        
                    },800)
                }
            }
        }
}
const test01 = (index) => {
    var w = document.getElementsByClassName('Register-step');
    for(let i = 0 ; i < w.length ; i++){
        if(i === index){
            var x = document.getElementsByClassName('Register-bullet')[index];
            var y = document.getElementsByClassName('Register-check')[index];
            var z = document.getElementsByClassName('Regis-progress-p')[index];
            const slidePage = document.querySelector(".slidepage");
            
            x.classList.remove("active");
            y.classList.remove("active");
            z.classList.remove("active");
            if(i === 0){
                slidePage.style.marginLeft="0%";
            }
            else if(i === 1){
                slidePage.style.marginLeft="-25%";
            }
            else if(i === 2){
                slidePage.style.marginLeft="-50%";
            }
            else if(i === 3){
                slidePage.style.marginLeft="-75%";
            }
        }
    }
}
    return (
        
        <div className="register-body">
            <div className="Register-contrainer">
                <h2 >Register</h2>
                <div className="Register-progress-bar">
                    <div className="Register-step">
                        <div className="Register-bullet">
                            <p className='Regis-progress-p'> <HiIcons.HiUser/></p>
                            <div className="Register-check "><AiIcons.AiOutlineCheck /></div>
                        </div>
                    </div>
                    <div className="Register-step">
                        <div className="Register-bullet">
                            <p className='Regis-progress-p'><AiIcons.AiFillPhone/></p>
                            <div className="Register-check"><AiIcons.AiOutlineCheck /></div>
                        </div>
                    </div>
                    <div className="Register-step">
                        <div className="Register-bullet">
                            <p className='Regis-progress-p'><RiIcons.RiShieldKeyholeFill /></p>
                            <div className="Register-check"><AiIcons.AiOutlineCheck /></div>
                        </div>
                    </div>
                </div>
                <div className="Register-layout-form">
                    <Form onFinish={onFinish} form={form01} className="Register-form">
                        <div className="Register-page slidepage">
                            <div className="Register-field">
                                
                                {/*input*/}
                                <div className="Regis-input">
                                        <Input required name="C_name" onChange={(e)=> handleChange(e)}/>
                                        <div className="Regis-underline"></div>
                                        <label className="Regis-input-label">Name</label> 
                                </div>
                                <br />
                                <div className="Regis-input">
                                        <Input required name="C_lastname" onChange={(e)=> handleChange(e)}/>
                                        <div className="Regis-underline"></div>
                                        <label>Lastname</label>
                                </div>
                                <div className="Register-button">
                                    <Form.Item
                                        name="Cancle"
                                    >
                                        <a href="/Login" className="Back-button-regis01">
                                            Cancle
                                        </a>
                                    </Form.Item>
                                    <Form.Item
                                        name="next01"
                                    >
                                        <a  onClick={() => {test(0);}} className="Next-button-regis01">
                                            Next
                                        </a>
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    

                    
                        <div className="Register-page ">
                            <div className="Register-field">

                                {/*input*/}
                                <div className="Regis-input">
                                        <Input required name="L_email" onChange={(e)=> handleChange(e)}/>
                                        <div className="Regis-underline"></div>
                                        <label className="Regis-input-label">Email</label> 
                                </div>
                                <br />
                                <div className="Regis-input">
                                        <Input required  maxLength='10' name="C_tel" onChange={(e)=> handleChange(e)}/>
                                        <div className="Regis-underline"></div>
                                        <label>Phone</label>
                                </div>
                                <div className="Register-button">
                                    <Form.Item
                                        name="previous01"
                                    >
                                        <a type="primary" htmlType="submit"
                                            onClick={() => {test01(0);}}
                                            className="Back-button-regis01"
                                        >
                                            Previous
                                        </a>
                                    </Form.Item>
                                    <br /><br />
                                    <Form.Item
                                        name="next02"
                                    >
                                        <a onClick={() => {test(1);}} className="Next-button-regis01">
                                            Next
                                        </a>
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                                   
                    
                        <div className="Register-page ">
                            <div className="Register-field">

                                    {/*input*/}
                                <div className="Regis-input">
                                    <Input required type={eye01 ? "text":"password"} maxLength='15' name="L_password" onChange={(e)=> handleChange(e)}/>
                                    <div className="Regis-underline"></div>
                                    <label className="Regis-input-label">Password</label> 
                                    {eye01 ? <a onClick={() => {setEye01(false);}}><AiIcons.AiOutlineEye /></a>:<a onClick={() => {setEye01(true);}}><AiIcons.AiOutlineEyeInvisible /></a>}
                                </div>
                                <br />
                                <div className="Regis-input" >
                                    <Input required type={eye ? "text":"password"} maxLength='15' onChange={(e)=> handleChange(e)}/>
                                    <div className="Regis-underline"></div>
                                    <label>Comfirm Password</label>
                                    {eye ? <a onClick={() => {setEye(false);}}><AiIcons.AiOutlineEye /> </a>:<a onClick={() => {setEye(true);}}><AiIcons.AiOutlineEyeInvisible /></a>}
                                   
                                </div>
                                
                                <div className="Register-button">
                                    <Form.Item
                                        name="previous03"
                                    >
                                        <a type="primary" htmlType="submit"
                                            onClick={() => {test01(1);}}
                                            className="Back-button-regis01"
                                        >
                                            Previous
                                        </a>
                                    </Form.Item>
                                    <Form.Item
                                        name="submit"
                                    >
                                        <button onClick={() => {test(2);}} className="Next-button-regis02">
                                            Submit
                                        </button>
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default NewRegister;
