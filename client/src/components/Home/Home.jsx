import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getRecipes, filterRecipesByType,orderRecipesByName, orderByScore, filterByCreater } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination"
import SearchBar from "../SearchBar/SearchBar"
import style from './Home.module.css'


export default function Home(){
    const dispatch = useDispatch()
    const allRecipes = useSelector((state)=> state.recipes)
    const [currentPage, setCurrentPage]= useState(1)
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    const indexOfLastRecipe = currentPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)
    const [order, setOrder] = useState("");

const pagination = (pageNumber) =>{
  setCurrentPage(pageNumber)
}

    useEffect(()=>{
        dispatch(getRecipes())
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes())
    }

    function handleFilterType(e) {
      e.preventDefault();
      dispatch(filterRecipesByType(e.target.value));
      setCurrentPage(1);
    }

    function handleFilterCreater(e) {
      e.preventDefault();
      dispatch(filterByCreater(e.target.value));
      setCurrentPage(1);
  }

    const handleOrder = (e) => {
      e.preventDefault();
      dispatch(orderRecipesByName(e.target.value));
      setCurrentPage(1);
      setOrder(`Ordenado ${e.target.value}`);
    };
  
    function handleOrderScore(e) {
      e.preventDefault();
      dispatch(orderByScore(e.target.value));
      setCurrentPage(1);
      setOrder(`Ordenado ${e.target.value}`);
    }

    return(
        <div>
          <div className={style.bg}></div>
            <Link className={style.link} to='/recipe'>Create Recipe</Link>
            <h1 className={style.titulo}>PI FOOD</h1>
            <button className={style.boton2} onClick={(e)=>{handleClick(e)}}>
            Reload recipes
            </button>
            <div>
            <select className={style.boton2}  onChange={(e) => handleFilterType(e)}>
              <option value="All">All Recipes</option>
              <option value="Gluten Free">Gluten Free</option>
              <option value="Ketogenic">Ketogenic</option>
              <option value="Lacto Ovo Vegetarian">Lacto Ovo Vegetarian</option>
              <option value="Dairy free">Dairy free</option>
              <option value="Primal">Primal</option>
              <option value="Vegan">Vegan</option>
              <option value="Pescatarian">Pescetarian</option>
              <option value="Paleolithic">Paleolithic</option>
              <option value="Fodmap Friendly">Fodmap Friendly</option>
              <option value="Whole 30">Whole 30</option>
              <option value="Vegetarian">Vegetarian</option>
            </select>

            <select className={style.boton2}  onChange={(e) => handleOrder(e)}>
              <option disabled defaultValue="selected">
                Order by...
              </option>
              <option value="asc">A - Z</option>
              <option value="des">Z - A</option>
            </select>
            <select className={style.boton2} onChange={e => handleFilterCreater(e)}>
                <option disabled defaultValue="selected">
                  Created...
                  </option>
                    <option value= 'All'>All</option>
                    <option value= 'createdInDb'>Created</option>
                    <option value= 'api'>Api</option>
                </select>
            <select className={style.boton2}  onChange={(e) => handleOrderScore(e)}>
              <option disabled defaultValue="selected">
                Order by Health Score...
              </option>
              <option value="asc"> minor to major</option>
              <option value="desc"> major to minor </option>
            </select> 
            <Pagination
            recipesPerPage={recipesPerPage}
            allRecipes={allRecipes.length}
            pagination={pagination}
            currentPage={currentPage}
            />
            <SearchBar setCurrentPage={setCurrentPage}/>
            <div className={style.card}></div>
            {currentRecipes?.map((c) => (
              <div key={c.id}>
                <Link to={"/detail/" + c.id}>
                  <Card
                    title={c.title}
                    image={c.image}
                    diets={
                      typeof c.diets === "string"
                        ? c.diets
                        : c.diets?.join(", ")
                    }
                  />
                </Link>
              </div>
            ))}
            </div>
        </div>
    )
}