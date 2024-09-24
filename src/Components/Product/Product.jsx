import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { end_points } from "../../api.url/api";
import axiosInstance from "../../axiosInstance/axiosInstance";
import { Button, Card, ListGroup } from "react-bootstrap";

const Product = () => {
  let { id } = useParams();

  let api = end_points.product;
  console.log("product api", api);

  let [state, setState] = useState([]);

  const getSingleProduct = () => {
    axiosInstance
      .get(api)
      .then((res) => {
        console.log("axios res", res);
        setState(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getSingleProduct();
  }, [setState, api]);
  let v = state.find((prod) => prod.id === id);

  return (
    <div>
      <section className="d-flex justify-content-center m-5">
        <Card style={{ width: "18rem" }} key={v?.id} className="shadow">
          <Card.Img
            variant="top"
            src="https://img.freepik.com/free-psd/new-smartphone-mockup-floating_252953-7.jpg?t=st=1725045176~exp=1725048776~hmac=374026fc9a9e7d5d5fda675385cbb64ebb3323a8bbd4808e7006d1d4365654c4&w=1060"
          />
          <Card.Body>
            <Card.Title>{v?.prod_name}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Price - {v?.price}</ListGroup.Item>
            <ListGroup.Item>Color - {v?.color}</ListGroup.Item>
            <ListGroup.Item>Color - {v?.company}</ListGroup.Item>
            <ListGroup.Item>Color - {v?.description}</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Button variant="outline-success">Buy Now</Button>
          </Card.Body>
        </Card>
      </section>
    </div>
  );
};

export default Product;
