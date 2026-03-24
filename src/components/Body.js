import RestroCard from "./Restcard";
import { useState,useEffect } from "react";
import Shimmer from "./Shimmer";
import Search from "./Search";  
import { Link } from "react-router-dom";


const Body = ()=>{
    const[list,setlist]=useState([])
    const [error, setError] = useState("");

    useEffect(()=>{
     fetchdata()
    },[])

    const fetchdata = async () =>{
        try {
            setError("");
            const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.566824418493685&lng=77.38126136362553&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING", {
                headers: { accept: "application/json" },
            });

            const text = await data.text();
            if (!data.ok) throw new Error(`Request failed (${data.status}).`);
            if (!text) throw new Error("Empty response from API.");

            let json;
            try {
                json = JSON.parse(text);
            } catch {
                throw new Error("API did not return JSON (likely blocked).");
            }

            console.log(json)

            // Swiggy response shape changes often, so pick the first valid restaurant list safely.
            const cards = json?.data?.cards || [];
            const restaurantCardGroup = cards.find(
                (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
            );

            const restaurants =
                restaurantCardGroup?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

            setlist(restaurants)
        } catch (e) {
            setError(e?.message || "Failed to load restaurants.");
            setlist([]);
        }
    }

    if (error){
        return <div style={{ padding: "16px" }}>{error}</div>
    }

    if (list.length===0){
        return<Shimmer/>
    }
    
    return(
   
             
        <div className='body'>
            <div className='filter'>
            <Search />
                <button className="filter-btn" onClick={()=>{
                    console.log("clicked")
                }}>Top rated</button>
            </div>
            <div className='restro-container'>
               {list.map((restaurant)=>{
                return (
                    <Link key={restaurant?.info?.id} to={`/restaurant/${restaurant?.info?.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                        <RestroCard resData={restaurant}/>
                    </Link>
                );
               })}
               
            </div>
        </div> 
    )
}
export default Body;