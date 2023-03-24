import React from 'react'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesName, resetRecipes } from "../../redux/actions";
import style from './SearchBar.module.css'

export default function SearchBar ({setCurrentPage}){
const dispatch = useDispatch()
const allRecipes = useSelector(state => state.recipes);
const [title, setTitle] = useState("")

function handleSubmit(e) {
    e.preventDefault();
    if (title) {
      dispatch(resetRecipes());
      dispatch(getRecipesName(title));
      setCurrentPage(1); // Actualizamos el estado de currentPage a 1 después de la búsqueda
      setTitle("");
    } else {
      alert("Enter a recipe.");
    }
  }

  function handleChange(e) {
    e.preventDefault();
    setTitle(e.target.value);
  }

return(
    <div>
        <input
        className={style.boton}
        type="text"
        value={title}
        placeholder="Recipe.." 
        onChange={(e) => handleChange(e)}
        />
        <button className={style.boton2} type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
    </div>
)
}