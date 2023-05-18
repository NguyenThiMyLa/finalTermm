import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, Route, Routes,NavLink} from 'react-router-dom';
import AppHeader from './AppHeader';
import Home from './Home';
import Contact from './Contact';
import Error from './Error';
import Registeration from './registrer/registeration';
import Login from './login/login';
import User from './user/User';
import AddUser from './user/AddUser';
import EditUser from './user/EditUser';
import Store from './store/Store';
import AddStore from './store/AddStore';
import EditStore from './store/EditStore';
import StoreMerchandise from './storeMerchandise/storeMerchandise';
import AddStoreMerchandise from './storeMerchandise/addStoreMerchandise';
import EditStoreMerchandise from './storeMerchandise/editStoreMerchandise';
import Merchandise from './merchandise/Merchandise';
import AddMerchandise from './merchandise/AddMerchandise';
import EditMerchandise from './merchandise/EditMerchandise';
import Appraisal from './appraisal/Appraisal';
import EditAppraisal from './appraisal/editAppraisal';
import NotAppraisal from './notAppraisal/notAppraisal';
import { ToastContainer} from 'react-toastify';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AppHeader></AppHeader>
        <Routes>
          <Route path='' element={<Home/>}></Route>
          <Route path='register' element={<Registeration/>}></Route>
          <Route path='login' element={<Login/>}></Route>
          <Route path='contact' element={<Contact/>}></Route>
          <Route path='store' element={<Store/>}></Route>
          <Route path='store/create' element={<AddStore/>}></Route>
          <Route path='store/edit/:Id' element={<EditStore/>}></Route>
          <Route path='user' element={<User/>}></Route>
          <Route path='user/create' element={<AddUser/>}></Route>
          <Route path='user/edit/:Id' element={<EditUser/>}></Route>
          <Route path='store/storeMerchandise/:Id' element={<StoreMerchandise/>}></Route>
          <Route path='store/storeMerchandise/create' element={<AddStoreMerchandise/>}></Route>
          <Route path='store/storeMerchandise/edit/:Id' element={<EditStoreMerchandise/>}></Route>
          <Route path='merchandise' element={<Merchandise/>}></Route>
          <Route path='merchandise/create' element={<AddMerchandise/>}></Route>
          <Route path='merchandise/edit/:Id' element={<EditMerchandise/>}></Route>
          <Route path='appraisal' element={<Appraisal/>}></Route>
          <Route path='appraisal/edit/:Id' element={<EditAppraisal/>}></Route>
          <Route path='notAppraisal' element={<NotAppraisal/>}></Route>
          <Route path='*' element={<Error></Error>}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer></ToastContainer>
    </div>
  );
}
export default App;