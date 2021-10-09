import React,{useEffect, useState} from "react";
import axios from "axios"
import Search from "../Components/Search";

const Home = () =>{
    const [data,setData] = useState([]);
    
    useEffect(()=> {
        axios.get(/*"https://hapi-fastory.herokuapp.com/"*/"http://localhost:3001/", {
                auth: {
                username: 'Luke',
                password: 'dadsucks' 
                }
            }).then((res) => setData(res.data));
    },[]);
    console.log(data);
    return (
        <div>
            <Search data={data}/>
        </div>
    )
}

export default Home;