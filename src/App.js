import './App.css';
import Login from './components/Login/Login';
import React, { useEffect, useState } from 'react'
import Topbar from './components/Adminpanel/Topbar';
import Product from './components/Product/Product';
import ProductView from './components/Product/ProductView';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Category from './components/Category/Category';
import Categoryview from './components/Category/Categoryview';
import Searchbycategory from './components/Category/Searchbycategory';
import Item from './components/Category/Item';
import Itemview from './components/Category/Itemview';

function App() {
  const [isloggedin,setIsloggedin] =useState(false);

useEffect(()=>{
const storevalue =localStorage.getItem("isloggedin");
if(storevalue==="1")
 {
  setIsloggedin(true); 
}
},[])

const Logincheck =() =>{
localStorage.setItem("isloggedin",'1')
setIsloggedin(true);
}
const Logoutcheck =() =>{
localStorage.removeItem("isloggedin")
setIsloggedin(false);
}

  return (
    <div className="App">
       <React.Fragment>
          { !isloggedin && <Topbar checkLogOut={Logoutcheck}/>}
          { isloggedin && <Login checkLogin={Logincheck}/>}
       </React.Fragment> 
       
      <BrowserRouter>
        <Routes>
          <Route path={'/product'} element={<Product/>}/>
          <Route path={'/productview'} element={<ProductView/>}/>
          <Route path={'/category'} element={<Category method="post"/>}/>
          <Route path={'/categoryview'} element={<Categoryview method="get"/>}/>
          <Route path={'/searchcategory'} element={<Searchbycategory method="get"/>}/>
          <Route path={'/item'} element={<Item method="post"/>}/>
          <Route path={'/itemview'} element={<Itemview method="get"/>}/>
        </Routes>
      </BrowserRouter>


      {/* <Product/>  */}
       {/* <ProductView/> */}
    </div>
  );
}

export default App;
