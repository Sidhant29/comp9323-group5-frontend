import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './Pages/home';
import Login from './Pages/login';
import Register from './Pages/register';
import Navigation from './Components/navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateProject from './Pages/createProject';
import UserProfile from './Pages/UserProfile';

function App() {
   return (
      <>
         <Router>
            <Switch>
               <Route exact path='/'>
                  <Login />
               </Route>
               <Route path='/signup'>
                  <Register />
               </Route>
               <Route path='/home'>
                  <Navigation />
                  <Home />
               </Route>
               <Route path='/create_project'>
                  <Navigation />
                  <CreateProject />
               </Route>
               <Route path='/user_profile'>
                  <Navigation />
                  <UserProfile />
               </Route>
            </Switch>
         </Router>
      </>
   );
}

export default App;
