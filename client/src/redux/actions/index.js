import axios from 'axios';
import {
  GET_RECIPES, 
  FILTER_RECIPES_BY_TYPE, 
  FILTER_BY_CREATE,
  GET_RECIPES_NAME, 
  ORDER_RECIPES_BY_NAME, 
  ORDER_RECIPES_SCORE,
  GET_DIETS,
  GET_RECIPES_ID,
  CLEAN_DETAIL, 
  RESET_RECIPES
} from './actions'


export function getRecipes() {
    return async function (dispatch) {
      try {
        const json = await axios.get("http://localhost:3001/recipes");
        return dispatch({
          type: GET_RECIPES,
          payload: json.data,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
  }

  export function getRecipesName(title) {
    return async function (dispatch) {
      try {
        const json = await axios.get(
          `http://localhost:3001/recipes?name=${title}`
        );
        return dispatch({
          type: GET_RECIPES_NAME,
          payload: json.data,
        });
      } catch (error) {
        console.log(error.message);
        alert("Recipe does not exist");
      }
    };
  }

  export function filterRecipesByType(payload) {
    return {
      type: FILTER_RECIPES_BY_TYPE,
      payload,
    };
  }

  export function filterByCreater (payload) {
    return{
        type: FILTER_BY_CREATE,
        payload
    }
}

  export function orderRecipesByName(payload) {
    return {
      type: ORDER_RECIPES_BY_NAME,
      payload,
    };
  }

  
export function orderByScore(payload) {
  return {
    type: ORDER_RECIPES_SCORE,
    payload,
  };
}

export function postRecipe(payload) {
  return async function (dispatch) {
    try {
      const json = await axios.post("http://localhost:3001/recipes",payload);
      return json
    } catch (error) {
      console.log(error);
    }
    
  };
}

export function getDiets() {
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/diets");
    return dispatch({
      type: GET_DIETS,
      payload: json.data,
    });
  };
}

export function getRecipesById(id) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`http://localhost:3001/recipes/${id}`);
      return dispatch({
        type: GET_RECIPES_ID,
        payload: json.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function cleanDetail() {
  return {
    type: CLEAN_DETAIL,
  };
}

export function resetRecipes () {
  return {
    type: RESET_RECIPES
  }
}