import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import CountDown from "./CountDown";

const NewItems = () => {
  const [newItemsArray, setNewItemsArray] = useState([]);
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
    pullNewItemsApi();
  }, []);

  const pullNewItemsApi = async () => {
    setIsLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    console.log(data)
    setNewItemsArray(data);
    setIsLoading(false);
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fade-in" data-aos-easing="ease-in-out" data-aos-duration="500" data-aos-delay="0">New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {isLoading ? (
            <div className="row">
              {new Array(4).fill(0).map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft__item">
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
                    <div className="nft__item_wrap">
                      <div
                        className="skeleton-box w-100 mb-3"
                        style={{
                          height: "350px",
                        }}
                      />
                    </div>
                    <div className="nft__item_info">
                      <div
                        className="skeleton-box"
                        style={{
                          width: "180px",
                          height: "30px",
                        }}
                      />
                      <div className="nft__item_price">
                        <div
                          className="skeleton-box"
                          style={{
                            width: "100px",
                            height: "20px",
                          }}
                        />
                      </div>
                      <div className="nft__item_like">
                        <div
                          className="skeleton-box"
                          style={{
                            width: "30px",
                            height: "15px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <OwlCarousel className="owl-theme" {...options}>
              {newItemsArray.map((item) => (
                <div key={item.id} data-aos="fade-in" data-aos-easing="ease-in-out" data-aos-duration="500" data-aos-delay="0">
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${item.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={`Creator: ${item.authorId}`}
                      >
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {item.expiryDate - Date.now() > 0 && (
                      <div className="de_countdown">
                        <CountDown expiryDate={item.expiryDate} />
                      </div>
                    )}
                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.nftId}`}>
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
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

export default NewItems;
