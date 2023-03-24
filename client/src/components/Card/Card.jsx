import React from "react";
import style from './Card.module.css'


export default function Card({ title, image, diets }) {
  return (
      <div className={style.container}>
        <div>
          <h3 className={style.name}>{title}</h3>
        </div>
        <div className={style.image}>
        <img src={image} alt="There is no img" width='270px' height='260px'/>
        </div >
        <h5 className={style.types}>Type of Diet:</h5>
        <div>
        {typeof diets === "string"
              ? diets
              : diets?.map((e, i) => {
                  return <p key={i}>{e}</p>;
                })}
            </div>
      </div>
    );
  }
  