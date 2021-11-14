import React,{useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import axios from "axios";


const Search = () => {

    const [query,setQuery] = useState([]);
    const [wordfilter,setWordFilter] = useState("");
    const [data,setData] = useState([]);
    /*Connection at the api made make sure to change the url */

    
    useEffect(()=> {
        axios.get(/*Your url where the server is started with port*/"http://localhost:3001/name", {
                auth: {
                username: 'Luke',
                password: 'dadsucks' 
                }
            }).then((res) => {setData(res.data);});
    },[]);
    
    /*Called function when input*/
    const searching = () =>{
        /*Among all elements add them a name if they only have a title then return their name*/ 
        const filter = data.filter((val) =>{
            if(wordfilter === ''){
                setQuery([]);
            }
            if(val[0] === wordfilter.toLowerCase()){
                return val[1].toLowerCase().includes(wordfilter.toLowerCase());
            }
            else if(wordfilter === ""){
                return val[1].toLowerCase().includes(wordfilter.toLowerCase());
            }
        });
        
        setQuery(filter);
    }

    return (
        <>
                    
            {/*Bundle of seachbar + small text */}
            <div className="compo">
                <h2>Try it now !</h2>
                <div className="bar">
                    <input 
                        type="text"
                        name="search" 
                        placeholder="Search here" 
                        onChange= {searching} /*Function call for each input */
                    />
                    <select id="watching" onChange={(event) => setWordFilter(event.target.value)}>
                        <option value="">All datas</option>
                        <option value="vehicles">Vehicles</option>
                        <option value="planets">Planets</option>
                        <option value="films">Films</option>
                        <option value="people">People</option>
                        <option value="starships">Starships</option>
                        <option value="species">Species</option>
                    </select>
                </div>
                {/*This thing maps the whole datas and only displays the matching ones to lead the user thowards a new page where it will find it's query, to save a call to the api we will stock the data in the localstorage */}
                        {query.map((val)=> {
                            
                            return(
                                <div className="query_value" key={val[2]}>
                                    <Link
                                        to={{
                                            pathname: "/card",
                                            search: "?type=" + val[0] + "&id=" + val [2] + "&format=json",
                                            state: { fromDashboard: true }
                                        }}
                                        >
                                            {val[1]}
                                        
                                        </Link>
                                    <br />
                                </div>
                            )
                        })}
                
            </div>
        </>
    );

}
export default Search;