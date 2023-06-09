import React from "react";
import bb from '../../../Styles/StyleModul/BlueBtn.module.scss'
import '../../../Styles/AlertHome.scss'

const Alert = (props) => {
  return(
    <div className={!props.activePopup ? 'non_active' : "alert_home_cont"}>
      <div className="alert_home_wrap">
        <h1 className="alert_home_zag">Почта успешно подтверждена!</h1>
        <div className="footer_home_btn">
          <button onClick={() => props.setActive(false)} className={bb.btn}>Ок</button>
        </div>
      </div>
    </div>
  )
}
export default Alert