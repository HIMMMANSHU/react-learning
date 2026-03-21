
import { foodlogo } from "../utils/constants";

const RestroCard=({resData })=>{
    const info = resData?.info || {};
    const { name, cuisines, avgRating, sla, cloudinaryImageId } = info;
    const imageUrl = cloudinaryImageId
        ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`
        : foodlogo;

    return (

        <div className='rest-card' style={{backgroundColor:"#f0f0f0"}}>
            <img className='foodlogo'
            alt='img'   
            src={imageUrl}>
            </img>
           <h3 className='restname'>{name}</h3>
           <h4 className='cousins'>{cuisines?.join(", ")}</h4>
           <h4 className='rating'>{avgRating} ⭐Rating </h4>
           <h5 className='time'>{sla?.deliveryTime} minutes </h5>
 
        </div>
    )
}
export default RestroCard;