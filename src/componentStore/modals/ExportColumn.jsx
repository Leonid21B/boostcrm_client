import React, { useRef, useState, useContext } from 'react'
import ecm from 'componentStore/moduleScss/exportColumnModal.module.scss'
import GrayBtn from 'ui/btns/GrayBtn'
import { closeGraySvg } from 'img'

import bb from 'ui/scssModule/blueBtn.module.scss'

import { _getClients } from 'redux/redusers/ClientReduser'

import { ContentStatesStore } from 'StoreStates'

function ExportColumn ({ active, func, setActiveErrorAlert, setErrorText, importFile }) {
  const loadFile = useRef()
  const [error, setError] = useState(false)

  const { importedClientsFile, setImportedClientsFile } = useContext(ContentStatesStore)

  async function importClients (e) {
    const file = e.target.files[0]
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    console.log(file)
    if (file.size >= 104857600 && file.type != fileType) {
      setActiveErrorAlert(true)
      setErrorText('Слишком большой файл и неверный формат файла')
      func()
      setError(true)
      return
    }

    if (file.type != fileType) {
      setActiveErrorAlert(true)
      setErrorText('Неверный формат файла')
      func()
      return
    }

    importFile(file)
    setImportedClientsFile(file)
    setError(false)

    func()
  }

  return (
    <div className={ecm.exportColumn} style={active ? { display: 'block' } : null}>
      <div className={ecm.exportColumnInner}>
        <div className={ecm.exportColumnModal}>
          <div className={ecm.exportColumnModalTop}>
            <h1>Импорт колонок</h1>
            <img onClick={func} src={closeGraySvg} alt='' />
          </div>
          <p>В первой строке должны находиться заголовки
            столбцов (заголовки должны идти подряд без пустых
            полей). Импортировать можно только первый лист.
            Поддерживаемые форматы: .хlsх, .сsv.
          </p>
          <p>Максимальный размер файла: 100 МБ или 10.000 строк.</p>
          {
                        error && <p>Файл не подходит по требованиям.</p>
                    }
          {/* <p>Файл не подходит по требованиям.</p> */}
          <div className={ecm.exportColumnModalBtns}>
            <GrayBtn func={func}>Отменить</GrayBtn>
            <label>
              <div className={bb.btn} style={{ cursor: 'pointer' }}>Выбрать  файл</div>
              <input
                onChange={e => importClients(e)}
                ref={loadFile}
                type='file'
                accept='txt'
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExportColumn
