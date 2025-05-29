import ItemCard from "../ItemCard";


const AuthorItems = ({ authorNFTArray }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {authorNFTArray.map((item) => (
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
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
