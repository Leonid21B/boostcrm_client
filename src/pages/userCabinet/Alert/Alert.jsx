import React, { useEffect } from "react";
import './Alert.scss'

const Alert = (props) => {
  useEffect(() => {
    if (props.status === 'green_status_alert') {
      setTimeout(() => {
        props.setStatus('non_active')
      }, 2500)

    }
  }, [props.status])
  return (
    <div className={props.status === 'non_active' ? 'non_active' : "container_alert"}>
      <div className={props.status}>{props.status === 'orange_status_alert' ? 'Загрузка аватарки ...' : 'Аватар успешено загружен'}</div>
    </div>
  )
}

export default Alert