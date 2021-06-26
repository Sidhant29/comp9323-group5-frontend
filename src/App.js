import './App.css';
import Home from './Pages/home';
import Login from './Pages/login';
import Register from './Pages/register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Components/navbar';

function App() {
   return (
      <Router>
         <div className='App'>
            <Switch>
               <Route exact path='/'>
                  <Login />
               </Route>

               <Route exact path='/signup'>
                  <Register />
               </Route>
               <Route exact path='/home'>
                  <Navbar />
                  <Home />
               </Route>
            </Switch>
         </div>
      </Router>
   );
}

export default App;
