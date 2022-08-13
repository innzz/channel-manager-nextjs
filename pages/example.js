import React, { useState, useEffect } from "react";

const Example = () => {
  const [item, setItem] = useState([]);

  const id = "458585";
  const eventHandler = (e) => {
    e.preventDefault();
    localStorage.setItem("id", id);
  };

  useEffect(() => {
    // localStorage.setItem("id", id);
    localStorage.setItem("items", JSON.stringify(item));
  }, [item]);
  return (
    <div>
      <button onClick={eventHandler}>Button</button>
    </div>
  );
};

export default Example;
