import { useEffect, useState } from "react";
import axios from "axios";

const fetchData = () => {
    axios.get(`http://localhost:8000/shipper`).then((res)=>{
       console.log(res.data);
    })
  };

export const Home = () =>{
    return <>
    <h1>Home</h1>
    <button onClick={fetchData}>Fetch Data</button>
    </>
}