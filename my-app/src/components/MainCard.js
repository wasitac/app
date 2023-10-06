const MainCard = (props) => {
  const heartIcon = props.choiceFavorites ? "❤" : "🤍";
  return (
    <div className="main-card">
      <img
        src={props.src}
        alt="올리브 오일"
        width="400"
        style={{ border: "1px solid #111" }}
      />
      <button onClick={props.handleHeartClick}>
        {heartIcon}
        {props.heartCounter}
      </button>
    </div>
  );
};

export default MainCard;