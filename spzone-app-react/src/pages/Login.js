import React from 'react';
//import '../css/login.css';


function Login() {
    return (
        <div>
            <div className="login-box">
                <div className="welcome-box">
                    <p id="welcome-p"> Welcome To </p>  
                    <p id="spzone-p"> SP Zone </p> 
                </div>

                <form action="#" method="POST">
                    <h2 id="spzone-h2"> Sp Zone </h2>
                    <h4 id="login-h4"> login account </h4> <br/>
                    <p id="username-p"> Username </p>
                    <input type="text" /> <br/> <br />
                    <p id="password-p"> Password </p>
                    <input type="password" id="input-pass" /> <br/> 
                    <a href="#" className="forget-a"> Forget your password? </a> <br/><br/>
                    
                    <input type="submit" value="login" /> 
                    
                <br/><br/><br/><br/><br/><br/><br/><br/>
                    <a href="/NewRegister" className="create-a"> New Create your account </a>
                </form>
                <div className="button-div">
                    <a href="/"><button> cancle </button></a>
                </div>
            </div>
        </div>
    )
}

export default Login