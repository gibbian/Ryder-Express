import { useEffect, useState } from "react";
import axios from "axios";



export const Login = () =>{
    return <>
    <h1>Login</h1>
    <button onClick={fetchData}>Fetch Data</button>
    </>
}