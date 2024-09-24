import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axiosInstance from "../../axiosInstance/axiosInstance";
import { end_points } from "../../api.url/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
    let api=end_points.auth
    console.log("api",api);
    let[state,setState]=useState([])
    let navigate=useNavigate()
    

    const formValidator=(formData)=>{
        let err={};
        if(formData.email.length<1) {err.email="Required field"}
        else if(formData.email<6){
            err.email="Minimum 6 character"
        }
        if(formData.password.length<1){
            err.password="Required field"
        }
        else if(formData.password.length<8){
            err.password="Minimum 8 character"
        }

        return err;
    }

    const getDetail=()=>{
        axiosInstance.get(api)
        .then((res)=>{
            console.log("res for login",res);
            setState(res.data)
            
        })
        .catch(err=>{
            console.log("err for edit",err);
            
        })
    }
    useEffect(()=>{
        getDetail()
    },[setState,api])

    const submitValidator=(formData)=>{
        console.log("formData",formData);
        let mail=state.find((val)=>val.email===formData.email);
        let pass=state.find((val)=>val.password===formData.password)
    if(!mail){
        alert("Entered email is wrong","error",700)
    }
    else if(!pass){
        alert("Password is wrong","error",700)
    }
    else{
        alert("logged in Successfully","success",800)
        navigate("/profile")
    }
        

    }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate:formValidator,
    onSubmit:submitValidator
  });

  return (
    <div>
      <section className="text-start d-flex justify-content-center p-5">
        <Form
          onSubmit={formik.handleSubmit}
          className="border border-info rounded-4 p-4 shadow"
        >
          <h4>Log-in</h4>
          <hr />

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors?.email ? (
              <p className="text-end text-danger">{formik.errors?.email}</p>
            ) : (
              ""
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors?.password ? (
              <p className="text-end text-danger">{formik.errors?.password}</p>
            ) : (
              ""
            )}
          </Form.Group>

          <div className="d-flex justify-content-end mt-3">
            <Button
              variant="outline-info"
              type="submit"
              disabled={!(formik.dirty && formik.isValid)}
            >
              Submit
            </Button>
          </div>
        </Form>
      </section>
    </div>
  );
};

export default Login;
