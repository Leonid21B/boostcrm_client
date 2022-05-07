
import { activeItem, arrowdwn, smile } from 'img'
import React, { useRef, useState, useContext } from 'react'

import { ContentStatesStore } from 'StoreStates'

function CustomSingleSelectCountries (
  { itemsForDropDown, itemForView, sortId, idType, whatToDo, multiSelectRef, whereIsSelect }) {
  // const ref = useRef()
  const singleSelectRef = useRef()
  const { checkClickOnSomeOfSelect } = useContext(ContentStatesStore)
  const [title, setTitle] = useState(itemForView?.title || itemForView)
  const [itemsDropDown, setItemsDropDown] = useState(
      itemsForDropDown
  )

  function openDropDown (e) {
    if (itemsDropDown) {
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
      singleSelectRef.current.querySelectorAll(`[data-type="${type}"]`).forEach(item => {item.classList.remove('selected') })
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
          itemsForDropDown.filter(item => {return item.slice(1,item.indexOf(' ')) == singleSelectRef.current.querySelector(`[data-id="${id}"]`).dataset.id})[0]
        )
        setItemsDropDown(itemsForDropDown
          .filter(item => item.slice(1, item.indexOf(' ')) != singleSelectRef.current.querySelector(`[data-id="${id}"]`).dataset.id)
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
    style={{width:'70%'}}
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
              fontSize:'15px',
              maxWidth: '200px'
            }}
          >
            {title}
          </div>
          <img src={arrowdwn} alt='' />
        </div>

        <div ref = {singleSelectRef} className='select__dropDown-single selectDropDown'>
          <ul className='oVY'>
            {
                            itemsDropDown.map((item,ind) =>
                              <li
                                key={item.slice(1, item.indexOf(' ')) }
                                data-id={item.slice(1, item.indexOf(' ')) }
                                data-type='selectedItem'
                                className='selectedItem'
                              >
                                <img className='customSelectedItemImg' src={activeItem} alt='' />
                                <span data-type='text' style={{ pointerEvents: 'none', fontSize:'15px' }}>{item || item}</span>
                              </li>
                            )
                        }
          </ul>
        </div>
      </div>

    </div>
  )
}

export default CustomSingleSelectCountries
