import React, { lazy, Suspense } from 'react'
import { Route,Routes,BrowserRouter as Router } from 'react-router-dom' 
import ProForm from '../Components/ProForm/ProForm'
import Header from '../layout/Header/Header'
// import ViewItems from '../Components/viewItems/ViewItems'
import Product from '../Components/Product/Product'
import Registration from '../Components/Registration/Registration'
import Profile from '../Components/Profile/Profile'
import Product_edit from '../Components/ProductEditForm/Product_edit'
import Login from '../Components/LogIn/Login'

// =============lazy loading=================
const viewProd=lazy(()=>import('../Components/viewItems/ViewItems'));

const Routing = () => {
  return (
    <div>
        <Router>
            <Header/>
            <Suspense fallback={<h1>Loading....</h1>}>
            <Routes>
                <Route path='registration' element={<Registration/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='profile' element={<Profile/>}/>
                      {/* product routing */}
                <Route path='proform' element={<ProForm/>} />
                <Route path='view_item' element={<viewProd/>} />
                <Route path='view_item/single_item/:id' element={<Product/>} />
                <Route path='view_item/product_edit/:id' element={<Product_edit/>} />
            </Routes>
            </Suspense>
        </Router>

    </div>
  )
}

export default Routing