import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import './App.css';
import Home from './Pages/home';
import Login from './Pages/login';
import Register from './Pages/register';
import Navigation from './Components/navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateProject from './Pages/createProject';
import UserProfile from './Pages/UserProfile';
import ProjectPage from './Pages/projectPage';
import Searchuser from './Pages/searchuser';
import GetSearchedUser from './Pages/getSearchedUser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
   const [input, setInput] = useState('');
   return (
      <Router>
         <Switch>
            <Route exact path='/'>
               <Login />
            </Route>
            <Route exact path='/signup'>
               <Register />
            </Route>
            <Route exact path='/home'>
               <Navigation />
               <Home />
            </Route>
            <Route exact path='/search_user'>
               <Navigation keyword={input} setKeyword={setInput} />
               <Searchuser user={input} />
            </Route>
            <Route exact path='/search_user/:userId'>
               <Navigation />
               <GetSearchedUser />
            </Route>
            <Route exact path='/create_project'>
               <Navigation />
               <CreateProject />
            </Route>
            <Route exact path='/user_profile'>
               <Navigation />
               <UserProfile />
            </Route>
         </Switch>
         <ToastContainer
            position='bottom-right'
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
         />
      </Router>
   );
}

export default App;
