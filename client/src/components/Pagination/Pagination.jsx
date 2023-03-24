import React from 'react'
import style from './Pagination.module.css'

export default function Pagination({recipesPerPage, allRecipes, pagination, currentPage}){
    const pageNumbers = []
  
    for(let i= 1; i <= Math.ceil(allRecipes / recipesPerPage); i++){
      pageNumbers.push(i)
    }
  
    return(
      <nav>
        <ul>
          {pageNumbers &&
            pageNumbers.map(number => {
              return(
                <button 
                className={currentPage === number ? `${style.boton} ${style.active}` : style.boton}
                onClick={() => pagination(number)}
                >
                {number}
                </button>
              )
            })
          }
        </ul>
      </nav>
    )
  }