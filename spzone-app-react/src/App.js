import './App.css'; 
import { BrowserRouter as Router,  Switch, Route } from 'react-router-dom'; 
import Home from './pages/Home'; 
import Login from './pages/Login';    
import NewRegister from './pages/NewRegister';  
import Admin from './pages/Admin'; 

function App() {   
  return (     
    <>          
    <Router>      
      <Switch>         
        <Route path='/' exact component={Home}/>         
        <Route path='/Login' exact component={Login}/>        
        <Route path='/NewRegister' component={NewRegister}/> 
        <Route path='/Admin'  component={Admin}/>     
      </Switch>     
    </Router>       
    </>   
  ); 
}  
    
      
export default App;
