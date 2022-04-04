import React from "react";
import {closeGraySvg } from 'img'
import '../../../scss/exitCrm.scss'
import { Link } from "react-router-dom";

const RebuildPass = (props) => {

  const closeExit = () => {
    //props.setPopupReb('non_active')
  }

  const exit = () => {
    //props.setPopupReb('non_active')
  }
  
  //if('non_active' === props.activePopup){
   // return(<div className={props.activePopup}></div>)
  //}
  return(
    <div className={props.activePopup}>
      <div className="exit_wrapper">
        <div className="exit_head">
          <h2 className="exit_zag">Получить новый пароль?</h2>
          <img src={closeGraySvg} onClick = {closeExit} className="close_exit" />
        </div>
        <div className="exit_footer">
          <div className="btns_cont">
            <button onClick = {closeExit}  className="grey_btn_exit">Отмена</button>
              <button onClick={exit} className="blue_btn_exit">Сбросить</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default RebuildPass