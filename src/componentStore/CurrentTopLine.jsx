import { bird, pencil } from 'img'
import React, { Fragment, useState } from 'react'

import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateCardTitle } from 'redux/asyncRedux/CreateCart'
import ctl from './moduleScss/currentTopLine.module.scss'
function CurrentTopLine ({ exit, title, children, path, cardId, card }) {
  const [redact, setRedact] = useState(false)

  const [cardTitle, setCardTitle] = useState(title)

  const dispatch = useDispatch()

  function redactField () {
    setRedact(true)
    setCardTitle(title)
  }
  function inputChangeHanlder (e) {
    setCardTitle(e.target.value)
  }

  async function updateTitle () {
    if (title != cardTitle && cardTitle.length != 0) {
      await updateCardTitle(dispatch, cardId, cardTitle)
      setRedact(false)
      setCardTitle('')
      return
    }
    setRedact(false)
    setCardTitle('')
  }

  return (
    <div className={ctl.currentTop}>
      <div className={ctl.currentcartTopLeft}>
        <div>
          {
                        !redact
                          ? <Link to={path} onClick={exit}>
                            <h1 className={ctl.currentcartTopTitle}>{title}</h1>
                            </Link>
                          : <div className={ctl.currentcartTopInput}>
                            <input
                              type='text'
                              value={cardTitle}
                              onChange={e => inputChangeHanlder(e)}
                              maxLength={50}
                              style={
                                        {
                                          backgroundColor: '#FFF'
                                        }
                                    }
                            />

                            <img onClick={updateTitle} src={bird} alt='' />
                          </div>
                    }
          {
                        card?.status == 'active'
                          ? <img
                              src={pencil}
                              onClick={redactField}
                              style={redact ? { display: 'none' } : { display: 'block' }}
                            />
                          : null
                    }

        </div>
      </div>
      {
                children
            }
    </div>
  )
}

export default CurrentTopLine
