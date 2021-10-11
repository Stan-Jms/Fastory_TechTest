import React,{useEffect, useState} from "react";
import axios from "axios"
import Search from "../Components/Search";
import Navbar from "../Components/Navbar"
import Foobar from "../Components/Foobar";

const Home = () =>{
    const [data,setData] = useState([]);
    /*Connection at the api made make sure to change the url */
    useEffect(()=> {
        axios.get(/*Your url where the server is started with port*/"http://localhost:3001/", {
                auth: {
                username: 'Luke',
                password: 'dadsucks' 
                }
            }).then((res) => setData(res.data));
    },[]);


    return (
        <>
            <Navbar/>{/*Navigation bar at header*/}
            <div className="swapi">
                <h1>SWAPI INDEXOR</h1>
                <h4>The Indexor for Swapi's database</h4>
            </div>
            <Search data={data}/>{/*Searchbar with the data linked to it*/}
            <div className="void">
                <p>All the data from the database now simplified with this engine !</p>
            </div>
            <Foobar/>{/*Footerbar at the footer*/}
        </>
    )
}

export default Home;