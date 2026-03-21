import RestroCard from "./Restcard";
import { useState,useEffect } from "react";


const Body = ()=>{
    const[list,setlist]=useState([])

    useEffect(()=>{
     fetchdata()
    },[])

    const fetchdata = async () =>{
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.566824418493685&lng=77.38126136362553&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
    
        const json =  await data.json();
        console.log(json)

        // Swiggy response shape changes often, so pick the first valid restaurant list safely.
        const cards = json?.data?.cards || [];
        const restaurantCardGroup = cards.find(
            (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
        );

        const restaurants =
            restaurantCardGroup?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

        setlist(restaurants)
    }
    


    return(
        <div className='body'>
            <div className='filter'>
                <button className="filter-btn" onClick={()=>{
                    console.log("clicked")
                }}>Top rated</button>
            </div>
            <div className='restro-container'>
               {list.map((restaurant)=>{
                return <RestroCard key={restaurant?.info?.id} resData={restaurant}/>
               })}
               
            </div>
        </div> 
    )
}
export default Body;