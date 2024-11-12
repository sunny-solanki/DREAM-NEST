/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { categories } from "../data";
import "../styles/Listings.scss";
import ListingCard from "./ListingCard";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state";
import axios from "axios"

const Listings = () => {

    const url = "https://dream-nest-guuf.onrender.com";
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const listings = useSelector((state) => state.listings) || [];

    const getFeedListings = async () => {
        try {
            const response = await axios.get(
                selectedCategory !== "All" ?
                    `${url}/properties?category=${selectedCategory}`
                    : `${url}/properties/`
            );

            if (response.status === 200) {
                console.log(response.data)
                dispatch(setListings({ listings: response.data.data }))
                setLoading(false)
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getFeedListings();
    }, [selectedCategory])

    return (
        <>
          <div className="category-list">
            {categories?.map((category, index) => (
              <div
                className={`category ${category.label === selectedCategory ? "selected" : ""}`}
                key={index}
                onClick={() => setSelectedCategory(category.label)}
              >
                <div className="category_icon">{category.icon}</div>
                <p>{category.label}</p>
              </div>
            ))}
          </div>
    
          {loading ? (
            <Loader />
          ) : (
            <div className="listings">
              {listings.map(
                ({
                  _id,
                  creator,
                  listingPhotoPaths,
                  city,
                  province,
                  country,
                  category,
                  type,
                  price,
                  booking=false
                }) => (
                  <ListingCard key={_id}
                    listingId={_id}
                    creator={creator}
                    listingPhotoPaths={listingPhotoPaths}
                    city={city}
                    province={province}
                    country={country}
                    category={category}
                    type={type}
                    price={price}
                    booking={booking}
                  />
                )
              )}
            </div>
          )}
        </>
      );
}

export default Listings