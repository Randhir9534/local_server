import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { end_points } from "../../api.url/api";
import axiosInstance from "../../axiosInstance/axiosInstance";

const Product_edit = () => {
  let { id } = useParams();
  let api = end_points.product + "/" + id;
  let [data, setData] = useState();
  let navigate=useNavigate()

  let getData_forEdit = () => {
    axiosInstance
      .get(api)
      .then((res) => {
        console.log("axios res", res);
        setData(res.data);
      })
      .catch((err) => {
        console.log("axios err", err);
      });
  };
  useEffect(() => {
    getData_forEdit();
  }, [setData, api]);

  let formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      prod_name: data?.prod_name,
      price: data?.price,
      company: data?.company,
      description: data?.description,
      color: data?.color,
    },
    onSubmit:(editData)=>{
        console.log(" Data recived after form submit",editData)
        axiosInstance.put(api,editData)
        .then(res=>{
            console.log(" axios res after edit",res);
            navigate('/view_item')
            
        })
        .catch(err=>{
            console.log(" axios err",err);
            
        })
        console.log(editData);
        
      }
  });

  

  return (
    <div className="text-start d-flex justify-content-center p-5">
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="prod_name">Edit Product:</label>
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

        <input type="submit" value="Add data" />
      </form>
    </div>
  );
};

export default Product_edit;
