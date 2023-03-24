import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesById, cleanDetail } from "../../redux/actions";
import style from './RecipeDetails.module.css'

export default function RecipeDetails(props){
    const dispatch = useDispatch();
    const id = props.match.params.id;

    useEffect(() => {
        dispatch(getRecipesById(id))
        return function()  {
            dispatch(cleanDetail())
        }   
    },[dispatch, id])

    const recipeDetail = useSelector((state) => state.detail)

    return(
        <div className={style.create}>
           { 
           recipeDetail.length ?
           <div className={style.content}>
            <h1 className={style.titulo}>{recipeDetail[0].title}</h1>
            <h3>Diets: {recipeDetail[0].diets?.map(d =>( d.name ? d.name : d)).join(' | ')}</h3>
            <img src= {recipeDetail[0].image ? recipeDetail[0].image : 'https://img.freepik.com/free-photo/white-round-empty-plate-among-spices-ingredients_1150-27325.jpg?size=626&ext=jpg&ga=GA1.2.1109572956.1673889122&semt=sph'} alt= "img"/>
            <h4>Health Score: {recipeDetail[0].healthScore}</h4>
            <h4 className={style.text}>Summary: {recipeDetail[0].summary}</h4>
            <h4>Steps: {recipeDetail[0].steps}</h4>
            </div> : <p>Loading...</p>
           }
           <Link to="/home">
            <button className={style.boton}>Go back</button>
           </Link>
        </div>
    )
    

}