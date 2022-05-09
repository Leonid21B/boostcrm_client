import React from "react";
import {closeGraySvg } from 'img'
import '../../scss/exitCrm.scss'
import { Link } from "react-router-dom";

const ExitCrm = (props) => {

  const closeExit = () => {
    props.setPopup('non_active')
  }

  const exit = () => {
    props.logout()
    props.setPopup('non_active')
  }

  if('non_active' === props.activePopup){
    return(<div className={props.activePopup}></div>)
  }
  return(
    <div className={props.activePopup}>
      <div className="exit_wrapper">
        <div className="exit_head">
          <h2 className="exit_zag">Выйти из системы?</h2>
        </div>
        <div className="exit_footer">
          <div className="btns_cont">
            <button onClick = {closeExit}  className="grey_btn_exit">Отмена</button>
            <Link to={'/'} draggable = {false}>
              <button onClick={exit} className="blue_btn_exit">Выйти</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ExitCrm 