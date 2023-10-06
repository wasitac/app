import "./App.css";
import React from "react";
const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    console.log("get");
    return JSON.parse(localStorage.getItem(key));
  },
};

// component
const Title = (props) => {
  return <h1>{props.children}</h1>;
};

// component
const Form = ({ updateCounter }) => {
  const [value, setValue] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  // 한글 검증
  const hangul = (text) => /[ㄱ-ㅣ|가-힣]/.test(text);

  function handleInputChange(data) {
    const userValue = data.target.value;

    if (hangul(userValue)) {
      setErrorMessage("한글은 입력할 수 없습니다.");
    } else {
      setErrorMessage("");
    }
    setValue(userValue);
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    if (!value.trim()) {
      setErrorMessage("값이 없으므로 추가할 수 없습니다");
      return;
    }

    if (errorMessage == "") {
      updateCounter();
    }
  }

  return (
    <form action="" onSubmit={handleFormSubmit}>
      <input
        type="text"
        name="name"
        placeholder="상품명을 입력하세요"
        onChange={handleInputChange}
        value={value}
      />
      <button type="submit">추가</button>

      <p style={{ color: "#f00" }}>{errorMessage}</p>
    </form>
  );
};

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

const FoodItem = ({ src }) => {
  return (
    <li>
      <img
        src={src}
        alt="음식"
        sytle={{
          width: "150px",
          height: "100px",
          backgroundSize: "contain",
        }}
      />
    </li>
  );
};

// date를 사용해서 key중복 해결
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
      <Title>페이지 {counter}</Title>
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
