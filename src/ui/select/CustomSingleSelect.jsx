
import { activeItem, arrowdwn, smile } from 'img'
import React, { useRef, useState, useContext } from 'react'

import { ContentStatesStore } from 'StoreStates'

function CustomSingleSelect (
  { itemsForDropDown, itemForView, sortId, idType, whatToDo, singleSelectRef, multiSelectRef, whereIsSelect }) {
  // const ref = useRef()

  const { checkClickOnSomeOfSelect } = useContext(ContentStatesStore)
  const [title, setTitle] = useState(itemForView?.title || itemForView)
  const [itemsDropDown, setItemsDropDown] = useState(
    idType == '1'
      ? itemsForDropDown.filter(item => item._id != sortId)
      : itemsForDropDown.filter(item => item._id != sortId)

  )

  function openDropDown (e) {
    if (itemsDropDown.length != 0) {
      if (whereIsSelect == 'FROM_CARD') {
        checkClickOnSomeOfSelect('MULTI', multiSelectRef.current)
      }
      singleSelectRef.current.classList.toggle('open')
      if (e.target.dataset.type == 'selectedItem') {
        selecItem(e.target.dataset)
      }
    }
  }

  function selecItem ({ type, id }) {
    if (!singleSelectRef.current.querySelector(`[data-id="${id}"]`).classList.contains('selected')) {
      singleSelectRef.current.querySelectorAll(`[data-type="${type}"]`).forEach(item => { item.classList.remove('selected') })
      singleSelectRef.current.querySelector(`[data-id="${id}"]`).classList.add('selected')
      if (idType == '1') {
        setTitle(
          itemsForDropDown.filter(item => item._id == singleSelectRef.current.querySelector(`[data-id="${id}"]`).dataset.id)[0].title
        )
        setItemsDropDown(itemsForDropDown
          .filter(item => item._id != singleSelectRef.current.querySelector(`[data-id="${id}"]`).dataset.id)
        )
        whatToDo(singleSelectRef.current.querySelector(`[data-id="${id}"]`).dataset.id)
      } else {
        setTitle(
          itemsForDropDown.filter(item => item._id == singleSelectRef.current.querySelector(`[data-id="${id}"]`).dataset.id)[0].fio
        )
        setItemsDropDown(itemsForDropDown
          .filter(item => item.id != singleSelectRef.current.querySelector(`[data-id="${id}"]`).dataset.id)
        )
        whatToDo(singleSelectRef.current.querySelector(`[data-id="${id}"]`).dataset.id)
      }
    }
  }

  // function onMouseLeave() {
  //     ref.current.classList.remove('open')

  // }

  return (

    <div
      onClick={e => openDropDown(e)}
      className='custom__select-single customSelect mb-16'
      ref={singleSelectRef}
    >
      <div>

        <div className='select__input-single selectInput '>
          <div
            className='select__input-single-title'
                        // style={ { display: "flex", alignItems: 'center' } }
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '200px'
            }}
          >
            {title}
          </div>
          <img src={arrowdwn} alt='' />
        </div>

        <div className='select__dropDown-single selectDropDown'>
          <ul className='oVY'>
            {
                            itemsDropDown.map(item =>
                              <li
                                key={item._id || item.id}
                                data-id={item._id || item.id}
                                data-type='selectedItem'
                                className='selectedItem'
                              >
                                <img className='customSelectedItemImg' src={activeItem} alt='' />
                                <span data-type='text' style={{ pointerEvents: 'none' }}>{item?.title || item.fio}</span>
                              </li>
                            )
                        }
          </ul>
        </div>
      </div>

    </div>
  )
}

export default CustomSingleSelect
