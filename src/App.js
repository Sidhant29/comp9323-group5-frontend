import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './Pages/home';
import Login from './Pages/login';
import Register from './Pages/register';
import Navigation from './Components/navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateProject from './Pages/createProject';
<<<<<<< HEAD
import Myaccount from './Pages/myAccount';
=======
import UserProfile from './Pages/UserProfile';
>>>>>>> cb19d3cf0c0898550c53479c768782d3f6c3b7fe

function App() {
   return (
      <>
         <Navigation />
         <Router>
            <Switch>
               <Route path='/signup'>
                  <Register />
               </Route>
               <Route path='/login'>
                  <Login />
               </Route>
               <Route exact path='/'>
                  <Home />
               </Route>
               <Route path='/home'>
                  <Home />
               </Route>
               <Route path='/create_project'>
                  <CreateProject />
               </Route>
<<<<<<< HEAD
               <Route path='/my_account'>
                  <Myaccount />
=======
               <Route path='/user_profile'>
                  <UserProfile />
>>>>>>> cb19d3cf0c0898550c53479c768782d3f6c3b7fe
               </Route>
            </Switch>
         </Router>
      </>
   );
}

export default App;
