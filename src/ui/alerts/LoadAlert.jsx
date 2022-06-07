import { closeGraySvg, closeWhiteSvg } from 'img'
import React, { useContext } from 'react'

import { ContentStatesStore } from 'StoreStates'

function LoadAlert({ errorText, active, setActive }) {
  const { importedClientsFile, setImportedClientsFile } = useContext(ContentStatesStore)

  function closeErrorAlert() {
    setActive(false)
  }

 

  return (
    <div className={`error_alert_green ${active ? 'active' : null}`}>
      <span>
        Загрузка файла может занять некоторое время
      </span>
      <div>
        <img onClick={closeErrorAlert} src={closeWhiteSvg} alt='' />
      </div>
    </div>
  )
}

export default LoadAlert