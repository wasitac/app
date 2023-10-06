import React from "react";

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

    if (errorMessage === "") {
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

export default Form;