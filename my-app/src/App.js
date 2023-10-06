import "./App.css";
import React from "react";
import Title from "./components/Title";
import Form from "./components/Form";
import MainCard from "./components/MainCard";
import Favorites from "./components/Favorites";

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    console.log("get");
    return JSON.parse(localStorage.getItem(key));
  },
};

const App = () => {
  const foodOne = "img/food-one.jpg";
  const foodTwo = "img/food-two.jpg";
  const foodThree = "img/food-three.jpg";
  const food = [foodOne, foodTwo, foodThree];
  const [mainFood, setMainFood] = React.useState(foodOne);

  // lazy init state
  const [favorites, setFavorites] = React.useState(() => {
    const initialState = jsonLocalStorage.getItem("favorites") || [];
    return initialState;
  });

  const [counter, setCounter] = React.useState(() => {
    const initialState = jsonLocalStorage.getItem("counter");
    return initialState;
  });

  const [heartCounter, setHeartCounter] = React.useState(() => {
    const initialState = jsonLocalStorage.getItem("heartCounter");
    return initialState;
  });

  const choiceFavorites = favorites.includes(mainFood);

  function updateCounter(event) {
    setCounter((pre) => {
      const nextCounter = pre + 1;
      jsonLocalStorage.setItem("counter", nextCounter);
      setMainFood(food[nextCounter % 3]);
      return nextCounter;
    });
  }

  function handleHeartClick(event) {
    setHeartCounter((pre) => {
      const nextCounter = ++pre;
      jsonLocalStorage.setItem("heartCounter", nextCounter);
      return nextCounter;
    });

    setFavorites((pre) => {
      const nextFavorites = [...pre, mainFood];
      jsonLocalStorage.setItem("favorites", [...favorites, mainFood]);
      return nextFavorites;
    });
  }

  return (
    <div>
      <Title>[component] 페이지 {counter}</Title>
      <Form updateCounter={updateCounter} />
      <MainCard
        src={mainFood}
        handleHeartClick={handleHeartClick}
        choiceFavorites={choiceFavorites}
        heartCounter={heartCounter}
      ></MainCard>
      <Favorites favorites={favorites} />
    </div>
  );
};

export default App;
