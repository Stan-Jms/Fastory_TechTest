import React,{useEffect, useState} from "react";
import axios from "axios"
import Search from "../Components/Search";
import Navbar from "../Components/Navbar"
import Foobar from "../Components/Foobar";

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


    return (
        <>
            <Navbar/>
            <div className="swapi">
                <h1>SWAPI INDEXOR</h1>
                <h4>The Indexor for Swapi's database</h4>
            </div>
            <Search data={data}/>
            <div className="void">
                <p>All the data from the database now simplified with this engine !</p>
            </div>
            <Foobar/>
        </>
    )
}

export default Home;