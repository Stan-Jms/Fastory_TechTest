import React,{useEffect, useState} from "react";
import Navbar from "../Components/Navbar"
import Foobar from "../Components/Foobar"

const axios = require("axios");

const Card = () => {

    const [Activated,setActivated] = useState("false");
    const [data,setData] = useState([]);

    const url = window.location.search;
    const urlParam = new URLSearchParams(url);
    const typeParam = urlParam.get("type");
    const idParam = urlParam.get("id");
    const formatParam = urlParam.get("format");

    useEffect(()=> {
        axios.get("http://localhost:3001/query/?type=" + typeParam + "&id=" + idParam + "&format=" + formatParam, {
                auth: {
                username: 'Luke',
                password: 'dadsucks' 
                }
            }).then((res) => {setData(res.data);});
    },[]);
    
    const trigger = () =>{
        setActivated(!Activated);
    }

    switch(data){
        /*The user get to this page without stored datas */
        case null:
            return(
                <>
                    <Navbar />
                    <h1 className="error">Une erreur est survenue !</h1>
                    <Foobar />
                </>
            );
        /*The user have some datas */    
        default:
            switch(typeParam){
                /*Switch for the type of datas */
                case "films":
                    return(
                        <>
                            <Navbar />
                            <div className="card_body">
                                <div className="base">
                                    <h2>Title of the movie : {data.title}</h2>
                                    <p>Opening scrolling intro : <br/>{data.opening_crawl}</p>
                                    <p>Made by :{data.director}</p>
                                    <button onClick={trigger}>See more</button>
                                    <div className={Activated ? "off" : "on"}>
                                        <p>Executive producer : {data.producer}</p>
                                        <p>Date of release : {data.release_date}</p>
                                    </div>
                                </div>
                                <div className="photo">insert photo</div>
                            </div>
                            <Foobar />
                        </>
                        );
                case "vehicles":
                    return(
                        <>
                            <Navbar />
                            <div className="card_body">
                                <div className="base">
                                    <h2>Name : {data.name}</h2>
                                    <p>Manufacturer : {data.manufacturer}</p>
                                    <p>Model : {data.model}</p>
                                    <p>Vehicle class : {data.vehicle_class}</p>
                                    <button onClick={trigger}>See more</button>
                                    <div className={Activated ? "off" : "on"}>
                                        <p>Crew on board : {data.crew}</p>
                                        <p>Max speed : {data.max_atmosphering_speed}</p>
                                    </div>
                                </div>
                                <div className="photo">insert photo</div>
                            </div>
                            <Foobar />
                        </>
                    );
                case "people":
                    return(
                        <>
                            <Navbar />
                            <div className="card_body">
                                
                                <div className="base">
                                    
                                    <h2>Name : {data.name}</h2>
                                    <p>Birth Date : {data.birth_year}</p>
                                    <p>Gender : {data.gender}</p>
                                    <button onClick={trigger}>See more</button>
                                    <div className={Activated ? "off" : "on"}>
                                        <p>Hair colour :{data.hair_color}</p>
                                        <p>Eyes colour :{data.eye_color}</p>
                                        <p>Height :{data.height}</p>
                                    </div>
                                </div>
                                <div className="photo">insert photo</div>
                            </div>
                            <Foobar />
                        </>
                    );
                case "planets":
                    return(
                        <>
                            <Navbar />
                            <div className="card_body">
                                <div className="base">
                                    <h2>Name :{data.name}</h2>
                                    <p>Climate : {data.climate}</p>
                                    <p>Terrain :{data.terrain}</p>
                                    <p>Population :{data.population}</p>
                                    <button onClick={trigger}>See more</button>
                                    <div className={Activated ? "off" : "on"}>
                                        <p>Gravity :{data.gravity}</p>
                                        <p>Diameter :{data.diameter}</p>
                                    </div>
                                </div>
                                <div className="photo">insert photo</div>
                            </div>
                            <Foobar />
                        </>
                    );
                case "species":
                    return(
                        <>
                            <Navbar />
                            <div className="card_body">
                                <div className="base">
                                    <h2>Name : {data.name}</h2>
                                    <p>Classification : {data.classification}</p>
                                    <p>Average lifespan :{data.average_lifespan}</p>
                                    <p>Language used :{data.language}</p>
                                    <button onClick={trigger}>See more</button>
                                    <div className={Activated ? "off" : "on"}>
                                        <p>Avg. Height : {data.average_height}</p>
                                        <p>Hair colour : {data.hair_color}</p>
                                        <p>Eyes colour : {data.eye_color}</p>
                                    </div>
                                </div>
                                <div className="photo">insert photo</div>
                            </div>
                            <Foobar />
                        </>
                    );
                case "starships":
                    return(
                        <>
                            <Navbar />
                            <div className="card_body">
                                <div className="base">
                                    <h2>Name :{data.name}</h2>
                                    <p>Model : {data.model}</p>
                                    <p>Price in Galactacal credits :{data.cost_in_credits}</p>
                                    <button onClick={trigger}>See more</button>
                                    <div className={Activated ? "off" : "on"}>
                                        <p>Crew on board : {data.crew}</p>
                                        <p>Passengers possible : {data.passengers}</p>
                                    </div>
                                </div>
                                <div className="photo">insert photo</div>
                            </div>
                            <Foobar />
                        </>
                    );
                /*If data not matching our standards */    
                default:
                    return(
                        <>
                            <Navbar />
                            <h1 className="error">Une erreur est survenue !</h1>
                            <Foobar />
                        </>
                    );
            }
    }
        
    

   
}
export default Card;