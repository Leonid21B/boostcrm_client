import React, { useState, useEffect } from 'react'
import csm from 'componentStore/moduleScss/columnSettings.module.scss'
import { close, closeGraySvg, verticalDots } from 'img'
import GrayBtn from 'ui/btns/GrayBtn'
import BlueBtn from 'ui/btns/BlueBtn'
import ClientService from 'requests/service/ClientService'
import { useDispatch } from 'react-redux'
import { _setColumns } from 'redux/redusers/ClientReduser'
import { _getFieldsStr } from 'redux/redusers/CompanyReduser'

function ColumnSettings ({ focus, active, setActive, func, dataColumns, setColumns, valuesOfInputs, setValuesOfInputs, userId }) {
  const [newValuesOfInputs, setNewValuesOfInputs] = useState(dataColumns)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(_setColumns(dataColumns))
    setOldColumns(dataColumns)
    console.log(dataColumns)
  }, [dataColumns])

  const [currentRow, setCurrentRow] = useState(null)

  const [oldCollumns, setOldColumns] = useState(dataColumns)

  /*function dragStartHandler (e, item) {
    setCurrentRow(item)
    e.target.classList.remove('drag_over_item')
  }

  function dragLeaveHandler (e) {
    e.target.classList.remove('drag_over_item')
    console.log(e.target)
  }

  function dragEndHandler (e) {
    e.target.classList.remove('drag_over_item')
  }

  function dragOverHandler (e) {
    e.preventDefault()
    e.target.classList.add('drag_over_item')
  }
  function dropHandler (e, item) {
    e.target.classList.remove('drag_over_item')
    dispatch(_setColumns(dataColumns.map(c => {
      if (c.id == item.id) {
        return { ...c, order: currentRow.order }
      }
      if (c.id == currentRow.id) {
        return { ...c, order: item.order }
      }
      return c
    })))

    setNewValuesOfInputs(newValuesOfInputs.map(c => {
      if (c.id == item.id) {
        return { ...c, order: currentRow.order }
      }
      if (c.id == currentRow.id) {
        return { ...c, order: item.order }
      }
      return c
    }))
  }
  */
  function sortRows (first, second) {
    if (first.order > second.order) {
      return 1
    }
    return -1
  }

  /*function addColumn () {
    const column = {
      id: newValuesOfInputs.length + 1, title: `${newValuesOfInputs.length + 1}`, value: `title_${newValuesOfInputs.length + 1}`, order: newValuesOfInputs.length + 1
    }
    setValuesOfInputs({
      ...valuesOfInputs, [column.value]: ''
    })
    setNewValuesOfInputs([...newValuesOfInputs, column])
  }*/

  function saveSettings () {
    return async () => {
      let newStr = newValuesOfInputs[0]
      for (let it of newValuesOfInputs.slice(1,5)){
        newStr += '|' + it
        
      }
      console.log(newStr)
      dispatch(_getFieldsStr(newStr))
      setColumns(newValuesOfInputs)
      setActive(false)
      await ClientService.updateClientFields(newStr, userId)
    }
  }

  function inputChangeHandler (e, indx) {
    console.log(e,indx,newValuesOfInputs)
    const newArr = [...newValuesOfInputs]
    console.log('newArr', newArr)
    newArr[indx] = e.target.value
    setNewValuesOfInputs(newArr)
    let val = e.target.value
    setTimeout(() => {
      let elem = document.querySelector(`[data-type="${val}"]`)
      focus(elem)
    },0)
    
  }

  function resetChanges () {
    return () => {
      setNewValuesOfInputs(oldCollumns)
      dispatch(_setColumns(oldCollumns))
      setActive(false)
    }
  }

  return (
    <div className={csm.columnSettings} style={active ? { display: 'block' } : null}>
      <div className={csm.columnSettingsInner}>
        <div className={csm.columnSettingsModal}>
          <div className={csm.columnSettingsModalTop}>
            <h1>Настройка колонок</h1>
            <img onClick={resetChanges()} src={closeGraySvg} alt='' />
          </div>
          <p>Поменяйте названия колонок на своё усмотрение</p>
          <ul className={csm.columnSettingsModalTopItems}>
            {
                            newValuesOfInputs.map((item, index) =>
                              <li
                                /*onDragStart={e => dragStartHandler(e, item)}
                                onDragLeave={e => dragLeaveHandler(e)}
                                onDragEnd={e => dragEndHandler(e)}
                                onDragOver={e => dragOverHandler(e)}
                                onDrop={e => dropHandler(e, item)}
                                draggable*/
                                key={item}
                                className={csm.columnSettingsModalTopItem}
                              >
                                <span>
                                  <input
                                    type='text'
                                    value={newValuesOfInputs[index]}
                                    data-type={item}
                                    onChange={e => inputChangeHandler(e, index)}
                                    maxLength={20}
                                  />
                                </span>
                                {/*<img src={verticalDots} alt='' />*/}
                              </li>
                            )
                        }
          </ul>
          <div className={csm.columnSettingsModalTopItemsAdd}>
          {/*  <button onClick={addColumn}>Добавить колонку</button>*/}
          </div>
          <div className={csm.columnSettingsModalTopItemsBtns}>
            <GrayBtn func={resetChanges()}>Отменить</GrayBtn>
            <BlueBtn func={saveSettings()}>Сохранить</BlueBtn>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ColumnSettings
