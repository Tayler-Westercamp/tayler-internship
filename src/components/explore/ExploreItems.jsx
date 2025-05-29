import { useEffect, useState } from "react";
import axios from "axios";
import ItemCard from "../ItemCard";
import ItemSkeleton from "../ItemSkeleton";

const ExploreItems = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [exploreArray, setExploreArray] = useState([]);
  const [loadedItemsCount, setLoadedItemsCount] = useState(8);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    pullExploreApi();
  }, []);

  const pullExploreApi = async () => {
    setIsLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
    setExploreArray(data);
    setIsLoading(false);
  };

  const loadMoreItems = () => {
    if (loadedItemsCount < exploreArray.length) {
      setLoadedItemsCount((prev) => prev + 4);
    }
  };

  useEffect(() => {
    if (filterValue && filterValue !== "") {
      filterExploreApi();
    } else if (filterValue === "") {
      pullExploreApi();
    }
  }, [filterValue]);

  const filterExploreApi = async () => {
    setIsLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filterValue}`
    );
    setExploreArray(data);
    setIsLoading(false);
  };

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={filterValue}
          onChange={(event) => {
            setFilterValue(event.target.value);
          }}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {isLoading
        ? new Array(8).fill(0).map((_, index) => <ItemSkeleton key={index} />)
        : exploreArray
            .slice(0, loadedItemsCount)
            .map((item) => (
              <ItemCard
                key={item.id}
                authorId={item.authorId}
                authorImage={item.authorImage}
                expiryDate={item.expiryDate}
                nftId={item.nftId}
                nftImage={item.nftImage}
                title={item.title}
                price={item.price}
                likes={item.likes}
              />
            ))}
      {loadedItemsCount < exploreArray.length && (
        <div className="col-md-12 text-center">
          <button
            onClick={loadMoreItems}
            id="loadmore"
            className="btn-main lead"
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
