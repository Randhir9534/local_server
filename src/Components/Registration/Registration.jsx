import { useFormik } from "formik";
import { Form, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance/axiosInstance";
import { end_points } from "../../api.url/api";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  let api = end_points.auth;
  let navigate = useNavigate();

  let [state, setState] = useState([]);

  // =============form validator==========
  const formValidator = (formData) => {
    let err = {};
    if (formData.userName.length < 1) {
      err.userName = "Required field";
    } else if (formData.userName.length < 2) {
      err.userName = "Minimum 2 characters";
    }
    if (formData.email.length < 1) {
      err.email = "Required field";
    } else if (formData.email.length < 8) {
      err.email = "Minimum 8 characters";
    }
    if (formData.password.length < 1) {
      err.password = "Required field";
    } else if (formData.password.length < 6) {
      err.password = "Minimum 6 characters";
    }

    return err;
  };
  //   image send to local session api

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const getDetails = () => {
    axiosInstance
      .get(api)
      .then((res) => {
        console.log("res for email verify in register", res);
        setState(res.data);
      })
      .catch((err) => {
        console.log("axios err for email verification in reg", err);
      });
  };
  useEffect(() => {
    getDetails();
  }, [setState, api]);

  //   data submitted & post to api

  const submitValidator = (formData) => {
    console.log("submit formData", formData);

    // ======== email verification============

    let emailVerify = state.find((value) => value.email === formData.email);
    console.log("Check for matched email:", emailVerify);

    if (emailVerify) {
      alert("email id is already used", "error", 1000);
      console.log("email is used", emailVerify);
    }

    else{
      axiosInstance
      .post(api, formData)
      .then((res) => {
        console.log("res of data for registration", res.data);
        alert("Account Created Successfully");
        navigate("/login");
      })
      .catch((err) => {
        console.log("axios err", err);
      });
      
    }

    
  };
  let formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      profile_pic: "",
    },
    validate: formValidator,
    onSubmit: submitValidator,
  });
  return (
    <div>
      <section className="text-start d-flex justify-content-center p-5">
        <Form
          onSubmit={formik.handleSubmit}
          className="border border-info rounded-4 p-4 shadow"
        >
          <h4>Registration</h4>
          <hr />
          <Form.Group className="mb-3 mt-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              name="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.userName && formik.errors?.userName ? (
              <p className="text-end text-danger">{formik.errors?.userName}</p>
            ) : (
              ""
            )}
          </Form.Group>

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

          <Form.Group className="mb-3" controlId="profile_pic">
            <Form.Label>choose an image</Form.Label>
            <Form.Control
              type="file"
              name="profile_pic"
              onChange={(event) => {
                getBase64(event.target.files[0])
                  .then((res) => {
                    // console.log(res);
                    formik.setFieldValue("profile_pic", res);
                  })
                  .catch((err) => console.log(err));
              }}
              accept="image/*"
            />
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

export default Registration;
