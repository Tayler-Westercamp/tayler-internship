import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Author = () => {
  const [authorArray, setAuthorArray] = useState([]);
  const [authorNFTArray, setAuthorNFTArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [followerCounter, setFollowerCounter] = useState(0);
  const [calcFollowers, setCalcFollowers] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    pullAuthorApi();
  }, []);

  const pullAuthorApi = async () => {
    setIsLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );
    setAuthorArray(data);
    setAuthorNFTArray(data.nftCollection);
    setIsLoading(false);
  };

  const followFunction = () => {
    if (followerCounter === 0) {
      setFollowerCounter(1);
    } else {
      setFollowerCounter(0);
    }
  };

  useEffect(() => {
    setCalcFollowers(authorArray.followers + followerCounter);
  }, [followerCounter]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              {isLoading ? (
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <div
                          className="skeleton-box"
                          style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "50%",
                          }}
                        />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            <div
                              className="skeleton-box"
                              style={{
                                width: "200px",
                                height: "20px",
                              }}
                            />
                            <br />
                            <div
                              className="skeleton-box"
                              style={{
                                width: "100px",
                                height: "15px",
                              }}
                            />
                            <br />
                            <div
                              className="skeleton-box"
                              style={{
                                width: "200px",
                                height: "15px",
                              }}
                            />
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div
                          className="skeleton-box"
                          style={{
                            width: "150px",
                            height: "40px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={authorArray.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {authorArray.authorName}
                            <span className="profile_username">
                              @{authorArray.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {authorArray.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {calcFollowers || authorArray.followers} followers
                        </div>
                        {followerCounter === 0 ? (
                          <button onClick={followFunction} className="btn-main">
                            Follow
                          </button>
                        ) : (
                          <button onClick={followFunction} className="btn-main">
                            Unfollow
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  {isLoading ? (
                    new Array(8).fill(0).map((_, index) => (
                      <div
                      key={index}
                        className="skeleton-box m-2"
                        style={{
                          width: "300px",
                          height: "400px",
                        }}
                      />
                    ))
                  ) : (
                    <AuthorItems authorNFTArray={authorNFTArray} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
