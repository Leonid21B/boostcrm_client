import React, { useState, useEffect } from 'react'
import csm from 'componentStore/moduleScss/columnSettings.module.scss'
import { close, closeGraySvg, verticalDots } from 'img'
import GrayBtn from 'ui/btns/GrayBtn'
import BlueBtn from 'ui/btns/BlueBtn'
import ClientService from 'requests/service/ClientService'
import { useDispatch } from 'react-redux'
import { _setColumns } from 'redux/redusers/ClientReduser'

function ColumnSettings ({ active, setActive, func, dataColumns, setColumns, valuesOfInputs, setValuesOfInputs, userId }) {
  const [newValuesOfInputs, setNewValuesOfInputs] = useState(dataColumns)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(_setColumns(dataColumns))
  }, [])

  const [currentRow, setCurrentRow] = useState(null)

  const [oldCollumns, setOldColumns] = useState(dataColumns)

  function dragStartHandler (e, item) {
    setCurrentRow(item)
  }

  function dragLeaveHandler (e) {

  }

  function dragEndHandler (e) {

  }

  function dragOverHandler (e) {
    e.preventDefault()
  }
  function dropHandler (e, item) {
    e.preventDefault()

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

  function sortRows (first, second) {
    if (first.order > second.order) {
      return 1
    }
    return -1
  }

  function addColumn () {
    const column = {
      id: newValuesOfInputs.length + 1, title: `${newValuesOfInputs.length + 1}`, value: `title_${newValuesOfInputs.length + 1}`, order: newValuesOfInputs.length + 1
    }
    setValuesOfInputs({
      ...valuesOfInputs, [column.value]: ''
    })
    setNewValuesOfInputs([...newValuesOfInputs, column])
  }

  function saveSettings () {
    return async () => {
      dispatch(_setColumns(newValuesOfInputs))
      setColumns(newValuesOfInputs)
      setActive(false)
      await ClientService.updateClientFields(Object.keys(valuesOfInputs), userId)
    }
  }

  function inputChangeHandler (e, indx) {
    const newArr = [...newValuesOfInputs]
    console.log('newArr', newArr)
    newArr[indx].title = e.target.value

    setNewValuesOfInputs(newArr)
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
          <p>Настройте поля под себя: измените порядок полей, добавьте новые или удалите ненужные.</p>
          <ul className={csm.columnSettingsModalTopItems}>
            {
                            newValuesOfInputs.sort(sortRows).map((item, index) =>
                              <li
                                onDragStart={e => dragStartHandler(e, item)}
                                onDragLeave={e => dragLeaveHandler(e)}
                                onDragEnd={e => dragEndHandler(e)}
                                onDragOver={e => dragOverHandler(e)}
                                onDrop={e => dropHandler(e, item)}
                                draggable
                                key={item.id}
                                className={csm.columnSettingsModalTopItem}
                              >
                                <span>
                                  <input
                                    type='text'
                                    value={newValuesOfInputs[index].title}
                                    data-type={item.value}
                                    onChange={e => inputChangeHandler(e, index)}
                                  />
                                </span>
                                <img src={verticalDots} alt='' />
                              </li>
                            )
                        }
          </ul>
          <div className={csm.columnSettingsModalTopItemsAdd}>
            <button onClick={addColumn}>Добавить колонку</button>
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
