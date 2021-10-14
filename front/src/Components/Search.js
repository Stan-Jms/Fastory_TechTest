import React,{useEffect, useState} from "react";


const Search = ({data}) => {

    
    const [query,setQuery] = useState([]);

    /*Called function when input*/
    const searching = (res) =>{
        const word = res.target.value;
        const watch = document.getElementById("watching");
        /*Among all elements add them a name if they only have a title then return their name*/ 
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
                {/*This thing maps the whole datas and only displays the matching ones to lead the user thowards a new page where it will find it's query, to save a call to the api we will stock the data in the localstorage */}
                        {query.map((val)=> {
                            
                            return(
                                <div className="query_value">
                                    <a href={"card?value="+val.id}>{val.name}</a>
                                    <br />
                                </div>
                            )
                        })}
                
            </div>
        </>
    );

}
export default Search;