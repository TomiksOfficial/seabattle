import React from "react";
import classes from './HelpMenu.module.css';

const HelpMenu = ({ active, setActive }) => {

    return (
        <div className={active ? classes.modal : classes.nomodal}>
            <div className={classes.modalContent}>
                <button className={classes.button} onClick={() => setActive(false)}>
                    X
                </button>
                <div className={classes.block}>
                    <span>
                        Правила Морского боя
                        <p>Игра для двух участников, в которой игроки по очереди атакуют корабли, находящиеся на поле соперника.
                        <br />Если у соперника по указанным координатам имеется корабль, то корабль или его часть «топится», а попавший получает право сделать ещё один ход.
                        <br />Цель игрока — первым поразить все корабли противника.</p>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default HelpMenu;