import React, { useEffect } from "react";
import { Redirect } from "react-router-dom"; 

const PopupLink = (props) => {
  useEffect(() => {
    props.setPopup(true)
  },[])
  return(
    <div className="">
      <Redirect to={'../'} exact/>
    </div>
  )
}
export default PopupLink