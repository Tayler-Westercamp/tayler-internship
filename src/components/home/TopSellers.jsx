import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [topSellersArray, setTopSellersArray] = useState([]);

  useEffect(() => {
    pullTopSEllersApi();
  }, []);

  const pullTopSEllersApi = async () => {
    setIsLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    setTopSellersArray(data);
    setIsLoading(false);
  };
  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {isLoading
                ? new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <div
                          className="skeleton-box"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                        />
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="author_list_info">
                        <div
                          className="skeleton-box"
                          style={{
                            width: "100px",
                            height: "20px",
                          }}
                        />
                        <br />
                        <div
                          className="skeleton-box"
                          style={{
                            width: "40px",
                            height: "20px",
                          }}
                        />
                      </div>
                    </li>
                  ))
                : topSellersArray.map((seller) => (
                    <li key={seller.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${seller.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={seller.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${seller.authorId}`}>
                          {seller.authorName}
                        </Link>
                        <span>{seller.price} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
