import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";

const Restromenu = () => {
    const { resId } = useParams();
    const [menu, setMenu] = useState(null);
    const [restaurantInfo, setRestaurantInfo] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            try {
                setError("");
                setMenu(null);
                setRestaurantInfo(null);

                // 1) Fetch same list API used by cards to get base restaurant info.
                const fetchJsonSafe = async (url, retries = 1) => {
                    for (let i = 0; i <= retries; i++) {
                        const response = await fetch(url, { headers: { accept: "application/json" } });
                        if (!response.ok) {
                            throw new Error(`Request failed (${response.status}).`);
                        }
                        const raw = await response.text();
                        const text = raw?.trim();
                        if (!text) {
                            if (i < retries) continue;
                            return null;
                        }
                        try {
                            return JSON.parse(text);
                        } catch {
                            if (i < retries) continue;
                            throw new Error("API did not return valid JSON (often CORS/blocked).");
                        }
                    }
                    return null;
                };

                const listJson = await fetchJsonSafe(
                    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.566824418493685&lng=77.38126136362553&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
                );
                if (listJson) {
                    try {
                        const restaurants =
                            listJson?.data?.cards
                                ?.find((c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants)
                                ?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
                        const selected = restaurants.find((r) => String(r?.info?.id) === String(resId));
                        setRestaurantInfo(selected?.info || null);
                    } catch {
                        // Ignore list parse failures; menu API may still succeed.
                    }
                }

                // 2) Fetch menu API for full menu items.
                const menuJson = await fetchJsonSafe(
                    `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.566824418493685&lng=77.38126136362553&restaurantId=${resId}`,
                    2
                );
                setMenu(menuJson || { data: { cards: [] } });
            } catch (e) {
                setError(e?.message || "Failed to load menu.");
            }
        })();
    }, [resId]);

    if (error) {
        return (
            <div style={{ padding: "16px" }}>
                <h2>Menu not available</h2>
                <p>{error}</p>
            </div>
        );
    }
    if (!menu) return <Shimmer />;

    const info = menu?.data?.cards?.find((c) => c?.card?.card?.info)?.card?.card?.info || restaurantInfo;
    const itemCards =
        menu?.data?.cards
            ?.find((c) => c?.groupedCard?.cardGroupMap?.REGULAR)
            ?.groupedCard?.cardGroupMap?.REGULAR?.cards
            ?.flatMap((c) => c?.card?.card?.itemCards || []) || [];

    return (
        <div style={{ padding: "16px" }}>
            <h2>{info?.name}</h2>
            <p>{info?.cuisines?.join(", ")}</p>

            <h3>Menu</h3>
            {itemCards.length === 0 ? (
                <p>Menu items are unavailable for this restaurant right now.</p>
            ) : (
                <ul>
                    {itemCards.map((it) => (
                        <li key={it?.card?.info?.id}>
                            {it?.card?.info?.name}{" "}
                            {((it?.card?.info?.price ?? it?.card?.info?.defaultPrice) ? `- ₹${((it.card.info.price ?? it.card.info.defaultPrice) / 100).toFixed(0)}` : "")}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Restromenu;