import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../nav/AuthContext"

import { Recipes_list, Del_btn, Right_part_uu, Recipes_name } from "../../styles/Recipespage.styled";


const MyRecipes = ({ recipes, deletingRecipe }) => {
  const { userData, isLogin } = useContext(AuthContext);
  const [Lecipes, setLecipes] = useState([])
  // useEffect(() => {
  //   setLecipes(userData.data.myrecipe)
  // }, [userData.data.myrecipe])
  return (
    <>
      <Right_part_uu>
        <Recipes_name>My Recipes</Recipes_name>
        <ul>
          {isLogin && userData ?
            (userData.data.myrecipe.map((item, index) => {
              return (
                  <Recipes_list key={index}>
                    <p>{item.title}</p>
                    <Del_btn onClick={() => deletingRecipe(item.id)}>
                      X
                    </Del_btn>
                  </Recipes_list>
              );
            })) : (Lecipes.map((item, index) => {
              return (
                <li className="recipes_list" key={index}>
                  <p>{item.title}</p>
                  <i onClick={() => deletingRecipe(item.id)} className="fa-solid fa-trash-can"></i>
                </li>
              );
            }))}
        </ul>
      </Right_part_uu>
    </>
  );
};

export default MyRecipes;
