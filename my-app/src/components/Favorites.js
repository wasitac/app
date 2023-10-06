import FoodItem from "./FoodItem";

const Favorites = ({ favorites }) => {
  const time = Date.now();
  return (
    <ul className="favorites">
      {favorites.map((food, index) => (
        <FoodItem key={index + time} src={food} />
      ))}
    </ul>
  );
};

export default Favorites;