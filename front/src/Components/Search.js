import React,{useEffect, useState} from "react";


const Search = ({data}) => {

    const [query,setQuery] = useState([]);
    const searching = (res) =>{
        const word = res.target.value;
        const watch = document.getElementById("watching");
        const filter = data.filter((val) =>{
            if(val.title !== undefined){
                val.name = val.title;
            }
            if(word === '')
            {
                setQuery([]);
            }
            if(val.type === watch.value)
            {
                return val.name.toLowerCase().includes(word.toLowerCase());
            }
            else if(watch.value === "")
            {
                return val.name.toLowerCase().includes(word.toLowerCase());
            }
        });
        
        setQuery(filter);
    }


    return (
        <>
            
            <div className="compo">
                <h2>Try it now !</h2>
                <div className="bar">
                    <input 
                        type="text"
                        name="search" 
                        placeholder="Search here" 
                        onChange= {searching} 
                    />
                    <select id="watching">
                        <option value="">All datas</option>
                        <option value="vehicles">Vehicles</option>
                        <option value="planets">Planets</option>
                        <option value="films">Films</option>
                        <option value="people">People</option>
                        <option value="starships">Starships</option>
                        <option value="species">Species</option>
                    </select>
                </div>
                        {query.map((val)=> {
                            return(
                                <div className="query_value">
                                    <a href="card" onClick={localStorage.setItem("obj",JSON.stringify(val))}>{val.name}</a>
                                    <br />
                                </div>
                            )
                        })}
                
            </div>
        </>
    );

}
export default Search;