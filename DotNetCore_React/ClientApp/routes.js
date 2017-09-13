import React, { Component } from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom'

import { FrontRoute } from './routes/FrontRoute'
import { LoginRoute } from './routes/LoginRoute'
import { BackendRoute } from './routes/BackendRoute'
import { EmptyRoute } from './routes/EmptyRoute'

import Home from './views/Front/Home'

import Login from './views/Front/User/Login'
import Forgot from './views/Front/User/Forgot'
import changePwd from './views/Front/User/changePwd'

import Dashboard from './views/Backend/Dashboard/Dashboard'
import Role_Create from './views/Backend/Role/Role_Create'
import Role_Delete from './views/Backend/Role/Role_Delete'
import Role_Edit from './views/Backend/Role/Role_Edit'
import Role_View from './views/Backend/Role/Role_View'

import User_Create from './views/Backend/User/User_Create'
import User_Delete from './views/Backend/User/User_Delete'
import User_Edit from './views/Backend/User/User_Edit'
import User_Personal_Edit from './views/Backend/User/User_Personal_Edit'
import User_View from './views/Backend/User/User_View'

import News_Create from './views/Backend/News/News_Create'
import News_Delete from './views/Backend/News/News_Delete'
import News_Edit from './views/Backend/News/News_Edit'
import News_View from './views/Backend/News/News_View'

import AboutUs_View from './views/Backend/AboutUs/AboutUs_View'
import AboutUs_Create from './views/Backend/AboutUs/AboutUs_Create'
import AboutUs_Delete from './views/Backend/AboutUs/AboutUs_Delete'
import AboutUs_Edit from './views/Backend/AboutUs/ABOUTUS_EDIT'


import ContactUs_View from './views/Backend/ContactUs/ContactUs_View'
// import ContactUs_Create from './views/Backend/ContactUs/ContactUs_Create'
import ContactUs_Delete from './views/Backend/ContactUs/ContactUs_Delete'
import ContactUs_Edit from './views/Backend/ContactUs/ContactUs_EDIT'


import Location_View from './views/Backend/Location/Location_View'
import Location_Create from './views/Backend/Location/Location_Create'
import Location_Delete from './views/Backend/Location/Location_Delete'
import Location_Edit from './views/Backend/Location/Location_EDIT'



import Product_Category_View from './views/Backend/Product_Category/Product_Category_View'
import Product_Category_Create from './views/Backend/Product_Category/Product_Category_Create'
import Product_Category_Delete from './views/Backend/Product_Category/Product_Category_Delete'
import Product_Category_Edit from './views/Backend/Product_Category/Product_Category_EDIT'

import Product_View from './views/Backend/Product/Product_View'
import Product_Create from './views/Backend/Product/Product_Create'
import Product_Delete from './views/Backend/Product/Product_Delete'
import Product_Edit from './views/Backend/Product/Product_EDIT'

/**
  * 
  * 相關路由設置
  */
export default (
  <Switch>
    {/* <FrontRoute path='/' exact component={Home} /> */}
    {/* <FrontRoute path='/Index' exact component={Home} /> */}
    <LoginRoute path='/' exact component={Login} />
    <LoginRoute path='/login' component={Login} />
    <LoginRoute path='/forgot' component={Forgot} />
    <EmptyRoute path='/changePwd' component={changePwd} />
    <BackendRoute path='/dashboard' component={Dashboard} />
    <BackendRoute path='/Role' exact component={Role_View} />
    <BackendRoute path='/Role/Create' component={Role_Create} />
    <BackendRoute path='/Role/Delete/:id' component={Role_Delete} />
    <BackendRoute path='/Role/Edit/:id/:edit' component={Role_Edit} />
    <BackendRoute path='/User' exact component={User_View} />
    <BackendRoute path='/User/Create' component={User_Create} />
    <BackendRoute path='/User/Delete/:id' component={User_Delete} />
    <BackendRoute path='/User/Edit/:id/:edit' component={User_Edit} />
    <BackendRoute path='/User/Personal_Edit/:userName' component={User_Personal_Edit} />
    <BackendRoute path='/News' exact component={News_View} />
    <BackendRoute path='/News/Create' component={News_Create} />
    <BackendRoute path='/News/Delete/:id/:delete' component={News_Delete} />
    <BackendRoute path='/News/Edit/:id' component={News_Edit} />
    <BackendRoute path='/AboutUs' exact component={AboutUs_View} />
    <BackendRoute path='/AboutUs/Create' component={AboutUs_Create} />
    <BackendRoute path='/AboutUs/Delete/:id/:delete' component={AboutUs_Delete} />
    <BackendRoute path='/AboutUs/Edit/:id' component={AboutUs_Edit} />
    <BackendRoute path='/ContactUs' exact component={ContactUs_View} />
    {/* <BackendRoute path='/ContactUs/Create' component={ContactUs_Create} /> */}
    <BackendRoute path='/ContactUs/Delete/:id/:delete' component={ContactUs_Delete} />
    <BackendRoute path='/ContactUs/Edit/:id' component={ContactUs_Edit} />
    <BackendRoute path='/Location' exact component={Location_View} />
    <BackendRoute path='/Location/Create' component={Location_Create} />
    <BackendRoute path='/Location/Delete/:id/:delete' component={Location_Delete} />
    <BackendRoute path='/Location/Edit/:id' component={Location_Edit} />


    <BackendRoute path='/Product_Category' exact component={Product_Category_View} />
    <BackendRoute path='/Product_Category/Create' component={Product_Category_Create} />
    <BackendRoute path='/Product_Category/Delete/:id/:delete' component={Product_Category_Delete} />
    <BackendRoute path='/Product_Category/Edit/:id' component={Product_Category_Edit} />
   
    <BackendRoute path='/Product' exact component={Product_View} />
    <BackendRoute path='/Product/Create' component={Product_Create} />
    <BackendRoute path='/Product/Delete/:id/:delete' component={Product_Delete} />
    <BackendRoute path='/Product/Edit/:id' component={Product_Edit} />
    <Route render={() => <h3>No Match Route</h3>} />
  </Switch>
)