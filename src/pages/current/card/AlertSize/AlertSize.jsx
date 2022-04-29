import React from "react";
import './AlertSize.scss'

const AlertSize = (props) => {
  return(
    <div className={!props.active ? 'non_active' : "alert_size_cont"}>
      <div className="alert_size_wrap">
        <h1 className="alert_size_zag">Невозможно загрузить файл больше 15 мб</h1>
        <div className="alert_size_footer">
          <button onClick={() => props.setActive(false)} className='alert_size_btn'>Ок</button>
        </div>
      </div>
    </div>
  )
}

export default AlertSize