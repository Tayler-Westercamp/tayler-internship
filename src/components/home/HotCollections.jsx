import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";

const HotCollections = () => {
  const [collectionArray, setCollectionArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const options = {
    items: 4,
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    slideBy: 1,
    autoplay: false,
    responsive: {
      0: {
        items: 1,
      },
      575: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  useEffect(() => {
    pullHotCollectionsApi();
  }, []);

  const pullHotCollectionsApi = async () => {
    setIsLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setCollectionArray(data);
    setIsLoading(false);
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {isLoading ? (
            <div className="row">
              {new Array(4).fill(0).map((_, i) => (
                <div className="col-md-3" key={i}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <div
                        className="skeleton-box w-100 "
                        style={{ height: "200px" }}
                      />
                    </div>
                    <div className="nft_coll_pp">
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
                    <div className="nft_coll_info">
                      <div
                        className="skeleton-box"
                        style={{ width: "100px", height: "20px" }}
                      />
                      <br />
                      <div
                        className="skeleton-box"
                        style={{ width: "60px", height: "20px" }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <OwlCarousel className="owl-theme" {...options}>
              {collectionArray.map((NFT) => (
                <div key={NFT.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${NFT.nftId}`}>
                        <img
                          src={NFT.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${NFT.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={NFT.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{NFT.title}</h4>
                      </Link>
                      <span>ERC-{NFT.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
