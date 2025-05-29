const ItemSkeleton = () => {
  return (
    <div
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
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
  )
}

export default ItemSkeleton