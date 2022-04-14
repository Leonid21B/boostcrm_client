import React from 'react'
import icm from 'componentStore/moduleScss/importColumnModal.module.scss'
import { close, closeGraySvg } from 'img'
import GrayBtn from 'ui/btns/GrayBtn'
import BlueBtn from 'ui/btns/BlueBtn'

function ImportColumn ({ active, func, exportFunc, clients,size, rows }) {
  return (
    <div className={icm.importColumn} style={active ? { display: 'block' } : null}>
      <div className={icm.importColumnInner}>
        <div className={icm.importColumnModal}>
          <div className={icm.importColumnModalTop}>
            <h1>Экспорт клиентов</h1>
            <img onClick={func} src={closeGraySvg} alt='' />
          </div>
          <div className={icm.span}>
            <span>{clients.length} клиентов.</span>
            <span>{rows} строк.</span>
            <span>Формат xls.</span>
            <span>Размер {size}МБ.</span>
          </div>
          <div className={icm.importColumnModalBtns}>
            <GrayBtn func={func}>Отменить</GrayBtn>
            <BlueBtn func={exportFunc}>Экспортировать</BlueBtn>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImportColumn
