import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/global.scss'

import LayoutContextProvider from './context/layout.context';
import { UserContextComponent } from './context/user.context';
import { withToaster } from './context/Toaster.context';

import CustomToasters from './components/CustomToasters';

import {
  BrowserRouter,
  Routes,
  Route,
  withRouter,
} from "react-router-dom";

import Login from './pages/auth/login';
import Notfound from './components/Notfound';
import Signup from './pages/auth/signup';
import {AdminAuthGuard } from './utils/RouteGuards';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import ForgotPassword from './pages/auth/forgotpassword';
import { CartContextComponent } from './context/cart.context';

//Admin Works
import AdminDashboard from './pages/admin/dashboard';
import Projects from './pages/admin/projects';
import Archived from './pages/admin/archived';
import Completed from './pages/admin/completed';


function App(props) {
  return (
    <div className="App">
       <LayoutContextProvider>
          <UserContextComponent {...props}>
            <CartContextComponent {...props} >
              <BrowserRouter>
                  <CustomToasters/>
                  <Navbar/>
                  <Routes>
                    <Route exact path  = "/" element                     = {<Login/>}/>
                    
                    <Route exact path  = { '/forgotpassword'}    element = {<ForgotPassword/>}    />
                    <Route exact path  = { ':id/dashboard'}     element          = {<AdminAuthGuard><AdminDashboard/></AdminAuthGuard>}    />
                    <Route exact path  = { ':id/dashboard/projects/all'}     element          = {<AdminAuthGuard><Projects/></AdminAuthGuard>}    />
                    <Route exact path  = { ':id/dashboard/projects/archived'}     element          = {<AdminAuthGuard><Archived/></AdminAuthGuard>}    />
                    <Route exact path  = { ':id/dashboard/projects/completed'}     element          = {<AdminAuthGuard><Completed/></AdminAuthGuard>}    />

                    <Route exact path = "/signup" 
                      element   = {
                        <Signup/>
                      } 
                    />

                    <Route path="*" element={<Notfound/>} />
                  </Routes>
                <Footer/>
              </BrowserRouter>
            </CartContextComponent>
          </UserContextComponent>
        </LayoutContextProvider>
    </div>
  );
}

export default withToaster(App);
