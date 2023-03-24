import React from 'react';
import {Link} from 'react-router-dom'
import style from './LandingPage.module.css'

export default function LandingPage() {
   return (
    <div className={style.container}>
        <div className={style.containerlanding}>
        <h1 className={style.title}> Welcome to Food PI</h1>
        <div className={style.btnlandin}>
        <Link to ='/home'>
            <button className={style.btnLan}>Enter</button>
        </Link>
    </div>
    </div>
    </div>
   )
}