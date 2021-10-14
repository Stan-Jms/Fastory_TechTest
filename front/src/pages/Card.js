import React,{useState} from "react";
import Navbar from "../Components/Navbar"
import Foobar from "../Components/Foobar"

const Card = () => {

    const [Activated,setActivated] = useState("false");

    const url = window.location.search;
    const data = JSON.parse(localStorage.getItem("allDatas"));/*Get data in localstorage */
    const urlParam = new URLSearchParams(url);
    const param = parseInt(urlParam.get("value"));
    let query = null;

    for(let i=0;i< data.length;i+=1){
        if(data[i].id === param){
            query = data[i];
            i = data.length;
        }
    }

    const trigger = () =>{
        setActivated(!Activated);
    }

    

    switch(query){
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
            switch(query.type){
                /*Switch for the type of datas */
                case "films":
                    return(
                        <>
                            <Navbar />
                            <div className="card_body">
                                <div className="base">
                                    <h2>Title of the movie : {query.title}</h2>
                                    <p>Opening scrolling intro : <br/>{query.opening_crawl}</p>
                                    <p>Made by :{query.director}</p>
                                    <button onClick={trigger}>See more</button>
                                    <div className={Activated ? "off" : "on"}>
                                        <p>Executive producer : {query.producer}</p>
                                        <p>Date of release : {query.release_date}</p>
                                    </div>
                                </div>
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
                                    <h2>Name : {query.name}</h2>
                                    <p>Manufacturer : {query.manufacturer}</p>
                                    <p>Model : {query.model}</p>
                                    <p>Vehicle class : {query.vehicle_class}</p>
                                    <button onClick={trigger}>See more</button>
                                    <div className={Activated ? "off" : "on"}>
                                        <p>Crew on board : {query.crew}</p>
                                        <p>Max speed : {query.max_atmosphering_speed}</p>
                                    </div>
                                </div>
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
                                    <h2>Name : {query.name}</h2>
                                    <p>Birth Date {query.birth_year}</p>
                                    <p>Gender :{query.gender}</p>
                                    <button onClick={trigger}>See more</button>
                                    <div className={Activated ? "off" : "on"}>
                                        <p>Hair colour :{query.hair_color}</p>
                                        <p>Eyes colour :{query.eye_color}</p>
                                        <p>Height :{query.height}</p>
                                    </div>
                                </div>
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
                                    <h2>Name :{query.name}</h2>
                                    <p>Climate : {query.climate}</p>
                                    <p>Terrain :{query.terrain}</p>
                                    <p>Population :{query.population}</p>
                                    <button onClick={trigger}>See more</button>
                                    <div className={Activated ? "off" : "on"}>
                                        <p>Gravity :{query.gravity}</p>
                                        <p>Diameter :{query.diameter}</p>
                                    </div>
                                </div>
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
                                    <h2>Name : {query.name}</h2>
                                    <p>Classification : {query.classification}</p>
                                    <p>Average lifespan :{query.average_lifespan}</p>
                                    <p>Language used :{query.language}</p>
                                    <button onClick={trigger}>See more</button>
                                    <div className={Activated ? "off" : "on"}>
                                        <p>Avg. Height : {query.average_height}</p>
                                        <p>Hair colour : {query.hair_color}</p>
                                        <p>Eyes colour : {query.eye_color}</p>
                                    </div>
                                </div>
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
                                    <h2>Name :{query.name}</h2>
                                    <p>Model : {query.model}</p>
                                    <p>Price in Galactacal credits :{query.cost_in_credits}</p>
                                    <button onClick={trigger}>See more</button>
                                    <div className={Activated ? "off" : "on"}>
                                        <p>Crew on board : {query.crew}</p>
                                        <p>Passengers possible : {query.passengers}</p>
                                    </div>
                                </div>
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