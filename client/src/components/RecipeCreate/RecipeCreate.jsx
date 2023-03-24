import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postRecipe, getDiets } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import style from './RecipeCreate.module.css'

function validate(input) {
    let errors = {};
  
    if (!input.title) {
      errors.title = "Name is required";
    } else if (!input.title.match(/^[A-Za-z\s]+$/)) {
      errors.title = "Only letters, please";
    }
  
    if (!input.summary) errors.summary = "Can't be empty";
    else if (input.summary.length < 20) {
      errors.summary = "Must be more than 20 characters";
    }
  
    if (!input.healthScore) errors.healthScore = "The Score can't be empty";
    else if (input.healthScore <= 0 || input.healthScore > 100)
      errors.healthScore = "Must be between 0 and 100";
  
    if (!input.steps) errors.steps = "Can't be empty";
    else if (input.steps.length < 10) {
      errors.steps = "Must be more than 10 characters";
    }
    if (!input.diets.length) {
      errors.diets = 'You must select at least one diet';
    }
    if (!input.image) {
      errors.image = 'An image is required';
    }
    return errors;
  }


export default function RecipeCreate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const diets = useSelector((state) => state.diets);
    console.log(diets)
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        title: "",
        summary: "",
        healthScore: "",
        image: "",
        steps: "",
        diets: [],
        })

        function handleChange(e){
          const updatedInput = {
            ...input,
            [e.target.name] : e.target.value
        };
        setInput(updatedInput);
        setErrors(validate(updatedInput));
    }

        function handleSelect(e) {
          const newDiet = e.target.value;
          if (!input.diets.includes(newDiet)) {
            setInput({
              ...input,
              diets: [...input.diets, newDiet]
            });
          }
        }

        function handleSubmit(e) {
          e.preventDefault();
          const errors = validate(input);
          setErrors(errors);
          const hasErrors = Object.keys(errors).length > 0;
          if (!hasErrors) {
            dispatch(postRecipe(input));
            alert("Recipe created");
            setInput({
              title: "",
              summary: "",
              healthScore: "",
              image: "",
              steps: "",
              diets: [],
            });
            history.push("/home");
          }else {
            alert("Please fix the errors in the form.");
          }
        }

            function handleDelete  (e, value) {
              e.preventDefault();
              setInput({ ...input, diets: input.diets.filter((diet) => diet !== value) });
            };

        useEffect(()=>{
            dispatch(getDiets())
        },[dispatch])
        

        return(
          <div className={style.fondo}>
          <h1  className={style.titulo}>Create your recipe!</h1>
          <div className={style.create}>
                <form className={style.content} onSubmit={(e) => {handleSubmit(e)}}>
                    <div>
                        <div>
                        <label>Title: </label>
                        <input
                        type="text"
                        value={input.title}
                        name="title"
                        onChange={(e) => {handleChange(e)}}
                        />
                        {errors.title && (<p className={style.error}>{errors.title}</p>)}
                        </div>
                        <div>
                        <label>Summary: </label>
                        <input 
                        type="text"
                        value={input.summary}
                        name="summary"
                        onChange={(e) => {handleChange(e)}}
                        />
                        {errors.summary && (<p className={style.error}>{errors.summary}</p>)}
                        </div>
                        <div>
                        <label>Health Score: </label>
                        <input
                        type= "number"
                        value={input.healthScore}
                        name="healthScore"
                        onChange={(e) => {handleChange(e)}}
                         />
                         {errors.healthScore && (<p className={style.error}>{errors.healthScore}</p>)}
                         </div>
                         <div>
                         <label>Steps: </label>
                         <input 
                         type="text"
                         value={input.steps}
                         name="steps"
                         onChange={(e) => {handleChange(e)}}
                         />
                         {errors.steps && (<p className={style.error}>{errors.steps}</p>)}
                         </div>
                         <div>
                         <label>Image: </label>
                         <input
                         type="text"
                         value={input.image}
                         name="image"
                         onChange={(e) => {handleChange(e)}}
                         />
                         {errors.image && (<p className={style.error}>{errors.image}</p>)}
                         </div>
                         <label>Diets: </label>
                         <select onChange={(e)=>handleSelect(e)}>
                          {diets.length > 0 && diets.map(d =>(
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    {input.diets.map((c,i) =>
                            <span key={i}> {c}
                                <button className={style.eliminar} onClick={(e) =>handleDelete(e, c)}>x</button>
                                </span>
                                )}
                    {errors.diets && (<p className={style.error}>{errors.diets}</p>)}
                    <ul><li>{input.diets.map(el => el +" ,")}</li></ul>
                         <button type="submit">Create Recipe</button>
                    </div>
                </form>
                </div>
        <br/>
        <br/>
        <Link to= '/home'><button className={style.boton}>Go Back</button></Link>
        <br/>
        </div>
    )
}