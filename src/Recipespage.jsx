// import fakeData from "./fakeData";
import fakeDataFridge from "./fakeDataFridge";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Recipespage.css";
// import { MidPart } from "./Recipespage.styled";

const Recipespage = () => {
  const [cards, setCards] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [checkBox, setCheckBox] = useState();
  const [checkBoxValue, setCheckBoxValue] = useState("");
  const [checked,setChecked] = useState(false)

  const handleCheckbox = (event) => {
    setChecked(!checked)
    const val = !checked ? event.target.value : ""
    console.log(val);
    console.log("test const", checkBoxValue);
    setCheckBoxValue(!checked ? event.target.value : "");
    // setCheckBoxValue(event.target.value);
  };
  
  
  const getData = () => {
    // setCards(fakeData);
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${checkBoxValue}&number=50&apiKey=fa8a9d46ee714e2bbd0da09419e280e6`
      )
      .then(function (response) {
        // handle success
        console.log(response.data.results);
        console.log(response.data);
        setCards(response.data.results);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const getFridgeItems = () => {
    setCheckBox(fakeDataFridge);
  };

  useEffect(() => {
    getData();
    getFridgeItems();
  }, [checkBoxValue]);


  return (
    <>
      <div>
        <div>
          <input
            className="search_bar"
            type="text"
            placeholder="Search.."
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
        <div>
          {checkBox &&
            checkBox.map((foods, i) => {
              return (
                <>
                  <input
                    key={i}
                    className="check_boxes"
                    onChange={handleCheckbox}
                    type="checkbox"
                    id={foods.name}
                    name={foods.name}
                    value={foods.name}
                  />
                  <label for={foods.name}> {foods.name} </label>
                </>
              );
            })}
        </div>
        <div className="cards">
          {cards &&
            cards
              .filter((item) => {
                if (searchTerm === "") {
                  return item;
                } else if (
                  item.title.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return item;
                }
              })
              .map((item, index) => {
                return (
                  <div key={index} className="card">
                    <p>{item.title}</p>
                    <img src={item.image} alt="" />
                    <div>
                      <button>More</button>
                      <button>Add</button>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
};

export default Recipespage;
