import './App.css'; 
import { BrowserRouter as Router,  Switch, Route,Redirect } from 'react-router-dom'; 
import Home from './pages/Home'; 
import Login from './pages/Login';    
import NewRegister from './pages/NewRegister';  
import Admin from './pages/Admin'; 
import Profile from './pages/Profile'; 
import HistoryOrder from './pages/HistoryOrder';




function App() {   
  return (     
    <>          
    <Router>      
      <Switch>         
        <Route path='/' exact   component={Home}/>  
        <Route path='/Home'   component={Home}/>         
        <Route path='/Login' exact component={Login}/>        
        <Route path='/NewRegister' exact component={NewRegister}/> 
        <Route path='/Admin' exact  component={Admin}/>
        <Route path='/Profile' exact  component={Profile}/> 
        <Route path='/History'  component={HistoryOrder}/>  
        <Redirect from='/' to='/Home' />   
      </Switch>     
    </Router>       
    </>   
  ); 
}  
    
      
export default App;
