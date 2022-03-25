import { closeGraySvg, closeWhiteSvg } from 'img'
import React, { useContext } from 'react'

import { ContentStatesStore } from 'StoreStates'

function ErrorAlert ({ errorText, active, setActive, importFile }) {
  const { importedClientsFile, setImportedClientsFile } = useContext(ContentStatesStore)

  function closeErrorAlert () {
    setActive(false)
  }

  function onClickFunctionHandler () {
    return () => {
      setActive(false)
      importFile(importedClientsFile)
    }
  }

  return (
    <div className={`error_alert ${active ? 'active' : null}`}>
      <span>
        {errorText}
      </span>
      <div>
        <button onClick={onClickFunctionHandler()}>Повторить</button>
        <img onClick={closeErrorAlert} src={closeWhiteSvg} alt='' />
      </div>
    </div>
  )
}

export default ErrorAlert
