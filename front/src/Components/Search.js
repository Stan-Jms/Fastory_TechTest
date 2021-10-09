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
            <div className="Bar">
                <input 
                    type="text"
                    name="search" 
                    placeholder="Search here" 
                    onChange= {searching} 
                />
                    {query.map((val)=> {
                        return(
                        <a href="card" onClick={localStorage.setItem("obj",JSON.stringify(val))}>
                            {val.name}
                        </a>
                        )
                    })}
            </div>
            <select id="watching">
                <option value="">--------</option>
                <option value="vehicles">Vehicles</option>
                <option value="planets">Planets</option>
                <option value="films">Films</option>
                <option value="people">People</option>
                <option value="starships">Starships</option>
                <option value="species">Species</option>
            </select>
        </>
        
    );

}
export default Search;