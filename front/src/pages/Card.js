import React,{useState} from "react";


const Card = () => {
    const query = JSON.parse(localStorage.getItem("obj"));
    switch(query){
        case null:
            return(
                <h1>Une erreur est survenue !</h1>
            );
        default:
            switch(query.type){
                case "films":
                    return(
                        <div className="card_body">
                            <div className="true">
                                <h2>{query.title}</h2>
                                <p>Opening scrolling intro : {query.opening_crawl}</p>
                                <p>Made by :{query.director}</p>
                                <a href="ok">See more</a>
                            </div>
                            <div className="false">
                                <p>{query.producer}</p>
                                <p>{query.release_date}</p>
                            </div>
                        </div>
                    );
                case "vehicles":
                    return(
                        <div>
                            <div className="true">
                                <h2>{query.name}</h2>
                                <p>{query.manufacturer}</p>
                                <p>{query.model}</p>
                                <p>{query.vehicle_class}</p>
                                <a href="ok">See more</a>
                            </div>
                            <div className="false">
                                <p>{query.crew}</p>
                                <p>{query.max_atmosphering_speed}</p>
                            </div>
                        </div>
                    );
                case "people":
                    return(
                        <div>
                            <div className="true">
                                <h2>{query.name}</h2>
                                <p>Opening scrolling intro : {query.birth_year}</p>
                                <p>Made by :{query.gender}</p>
                                <a href="ok">See more</a>
                            </div>
                            <div className="false">
                                <p>{query.hair_color}</p>
                                <p>{query.eye_color}</p>
                                <p>{query.height}</p>
                            </div>
                        </div>
                    );
                case "planets":
                    return(
                        <div>
                            <div className="true">
                                <h2>{query.name}</h2>
                                <p>Opening scrolling intro : {query.climate}</p>
                                <p>Made by :{query.terrain}</p>
                                <p>Made by :{query.population}</p>
                                <a href="ok">See more</a>
                            </div>
                            <div className="false">
                                <p>{query.gravity}</p>
                                <p>{query.diameter}</p>
                            </div>
                        </div>
                    );
                case "species":
                    return(
                        <div>
                            <div className="true">
                                <h2>{query.name}</h2>
                                <p>Opening scrolling intro : {query.classification}</p>
                                <p>Made by :{query.average_lifespan}</p>
                                <p>Made by :{query.language}</p>
                                <a href="ok">See more</a>
                            </div>
                            <div className="false">
                                <p>{query.average_height}</p>
                                <p>{query.hair_color}</p>
                                <p>{query.eye_color}</p>
                            </div>
                        </div>
                    );
                case "starships":
                    return(
                        <div>
                            <div className="true">
                                <h2>{query.name}</h2>
                                <p>Opening scrolling intro : {query.model}</p>
                                <p>Made by :{query.cost_in_credits}</p>
                                <a href="ok">See more</a>
                            </div>
                            <div className="false">
                                <p>{query.crew}</p>
                                <p>{query.passengers}</p>
                            </div>
                        </div>
                    );
                default:
                    return(
                        <h1>Une erreur est survenue !</h1>
                    );
            }
    }
        
    

   
}
export default Card;