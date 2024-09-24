import React, { useEffect, useState } from "react";
import { end_points } from "../../api.url/api";
import axiosInstance from "../../axiosInstance/axiosInstance";
import "./items.css";
import { Link } from "react-router-dom";

const ViewItems = () => {
  let api = end_points.product;
  let [state, setState] = useState([]);
// =============state for searching============
  let[searchText,setSeachTerm]=useState("");

  const getProduct = () => {
    axiosInstance
      .get(api)
      .then((res) => {
        console.log("res of product", res);
        setState(res.data);
      })
      .catch((err) => {
        console.log("axios err", err);
      });
  };
  useEffect(() => {
    getProduct();
  }, []);
  const deleteItem = (item_id) => {
    console.log("Id of the product to be deleted", item_id);
    axiosInstance
      .delete(`http://localhost:1000/product/${item_id}`)
      .then((res) => {
        console.log("Axios res for delete:", res);
        alert("Data deleted successfully");
        getProduct(); // re- fetching of item after deletion ignore refreshing
      })
      .catch(err=>{
        console.log("Axios err to delete item",err);
        
      })
  };
  return (
    <div className="pro_Table">
      <input className="search" type="text" placeholder="Search product.." onChange={(event)=>{setSeachTerm(event.target.value)}} />
      <table>
        <tr id="heading">
          <td>
            <b>Product Name</b>
          </td>
          <td>
            <b>Company</b>
          </td>
          <td>
            <b>Operation</b>
          </td>
        </tr>
        {state.filter((prod)=>{
          if(searchText===""){
            return prod;
          }else if(prod.prod_name.toLowerCase().includes(searchText.toLowerCase())){
            return prod;
          }
        }).map((prod) => (
          <tr>
            <td>{prod.prod_name}</td>
            <td>{prod.company}</td>
            <td>
              <button
                onClick={() => {
                  deleteItem(prod.id);
                }}
              >
                Delete
              </button>
              <button><Link to={`product_edit/${prod.id}`}>Edit</Link></button>
              <button>
                <Link to={`single_item/${prod.id}`}> Details</Link>
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default ViewItems;
