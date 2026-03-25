import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";

const Restromenu = () => {
    const { resId } = useParams();

    if (resInfo === null) return <Shimmer />;

    const { name, cuisines, costForTwoMessage } =
        resInfo?.cards?.[0]?.card?.card?.info || {};

    const itemCards =
        resInfo?.cards?.[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card?.card?.itemCards || [];

    return (
        <div className="menu">
            <h1>{name}</h1>
            <p>{cuisines?.join(", ")} - {costForTwoMessage}</p>

            <h2>Menu</h2>
            <ul>
                {itemCards.map((item) => (
                    <li key={item?.card?.info?.id}>
                        {item?.card?.info?.name} - Rs.{" "}
                        {(item?.card?.info?.price / 100) ||
                            item?.card?.info?.defaultPrice / 100}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Restromenu;