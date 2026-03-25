import { useState, useEffect } from "react"

const useRestaurantMenu = (resId) => {
    const[resinfo,setresinfo] =useState(null)

useEffect(()=>{
fetchdata()
},[])
const fetchdata= async ()=>{
    const data= await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.566824418493685&lng=77.38126136362553&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
    const json = data.json
    setresinfo(json)
}
  return (resinfo)
}

export default useRestaurantMenu