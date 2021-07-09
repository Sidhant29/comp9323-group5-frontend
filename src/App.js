import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './Pages/home';
import Login from './Pages/login';
import Register from './Pages/register';
import Navigation from './Components/navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateProject from './Pages/createProject';
import UserProfile from './Pages/UserProfile';
import ProjectPage from './Pages/projectPage';

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
               <Route path='/user_profile'>
                  <UserProfile />
               </Route>
               <Route path='/project_page'>
                  <ProjectPage />
               </Route>
            </Switch>
         </Router>
      </>
   );
}

export default App;
