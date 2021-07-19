import React,{useState, useEffect} from 'react';
import * as BiIcons from "react-icons/bi";
import * as AiIcons from "react-icons/ai";
import * as axiosData from '../service/Service';
import { useHistory } from 'react-router-dom';
import '../css/login.css';


function Login() {
    const history = useHistory();

    const dataLogin={
        L_email:"",
        L_password:""
    }


    const [logInData, setLogInData] = useState(dataLogin);
    


    const handleChange = (e) =>{
        e.persist();
        setLogInData({...logInData,[e.target.name]: e.target.value});
    }

    const checkLogIn = () => {
        axiosData.logIn(logInData).then(function (data){
            const datacus = data[0];
            localStorage.setItem('UserId',datacus.C_customerid);
            
            if(datacus.S_statusid == 2){
                history.push("/Home");
            } else if(datacus.S_statusid == 1){
                history.push("/Admin");
            }
        })
    }


    return (
        <div className="body-login">
            <div className="loginform">
                <div className="login-back-home">
                    <a href="/"><AiIcons.AiOutlineClose /></a>
                </div>
                <div className="login-header-logo">
                    <h5>LOGIN</h5>
                </div>
                <div className="input-email-login-group">
                    <input type="text" placeholder="Email" name="L_email" onChange={(e)=> handleChange(e)}></input>
                </div>
                <div className="input-password-login-group">
                    <input type="password" placeholder="Password" name="L_password" onChange={(e)=> handleChange(e)}></input>
                    <h6 className="forgot-password-login">forgot password?</h6>
                </div>
                <div className="input-submit-login">
                    <input type="submit" value="Login" onClick={()=>{checkLogIn();}}></input>
                </div>
                <a href="/NewRegister" className="create-account-a"><h6 className="create-account-h6">create new account</h6></a>
            </div>
        </div>
    )
}

export default Login