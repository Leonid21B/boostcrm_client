import React from "react";
import { Link } from "react-router-dom";
import './alert.scss'

const Alert = (props) => {
  if(!props.active){
    return null
  }
  return(
    <div className= {props.active ? "container_alert_admin" : 'none_active'}>
      <div className="wrapper_alert_admin">
        <h1 className="zag_alert_admin">Вы точно хотите передать роль админа?</h1>
        <div className="btns_alert_admin">
          <button onClick = {() => props.setAlert(false)} className="close_alert_admin">Отмена</button>
          <Link to={'../'} onClick = {props.changeAd} className="done_alert_admin">Передать</Link>
        </div>
      </div>
    </div>
  )
  
}
export default Alert