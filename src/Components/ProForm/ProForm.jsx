import { useFormik } from 'formik'
import React from 'react'
import "./ProForm.css"
import { end_points } from '../../api.url/api'
import axiosInstance from '../../axiosInstance/axiosInstance'
import { useNavigate } from 'react-router-dom'

const ProForm = () => {
  let api=end_points.product
  console.log("api",api);
  
  let navigate=useNavigate()
  

  let formik=useFormik({
    initialValues:{
      prod_name:"",
      price:"",
      company:"",
      description:"",
      color:"",

    },
    onSubmit:(data)=>{
      console.log("Received values from the form",data);

      let formData={
        prod_name:formik.values.prod_name,
        price:formik.values.price,
        company:formik.values.company,
        description:formik.values.description,
        color:formik.values.color
      }
      axiosInstance.post(api,formData)
      .then(res=>{
        console.log("res",res);
        alert("submitted")
        navigate("/view_item")
      })
      .catch(err=>{
        console.log("err",err);
        
      })
      
    }
  })
  return (
    <div className="text-start d-flex justify-content-center p-5">
      <form onSubmit={formik.handleSubmit}>

      <label htmlFor="prod_name">Product Name:</label>
        <input
          type="text"
          name="prod_name"
          id="prod_name"
          value={formik.values.prod_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <br />
        <br />
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          name="price"
          id="price"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <br />
        <br />
        <label htmlFor="company">Company:</label>
        <input
          type="text"
          name="company"
          id="company"
          value={formik.values.company}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <br />
        <br />
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          name="description"
          id="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <br />
        <br />
        <label htmlFor="color">Color:</label>
        <input
          type="text"
          name="color"
          id="color"
          value={formik.values.color}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <br />
        <br />

        <input type="submit" value="Add data"  />
      </form>
    </div>
  )
}

export default ProForm