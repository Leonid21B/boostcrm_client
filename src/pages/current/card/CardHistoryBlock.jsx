import { formatFyllDate } from 'functions/FormatDate'
import React, { useRef } from 'react'

import { useSelector } from 'react-redux'
import { switchHeler } from '../functions/swittchHelpers'

function CardHistoryBlock ({ logRef }) {
  // const logRef = useRef()

  const { currentCart } = useSelector(state => state.newCart)

  function setDownLoadLink (nameLink) {
    const filePath = `${process.env.REACT_APP_STATIC_SERVER_PATH_FILE}/${nameLink}`
    return filePath
  }

  return (
    <div className='currentcart__content-top'>
      <h3 className='currentcart__content-title'>История действий</h3>

      <div ref={logRef} className='overflowHiddenX'>

        <span className='currentcart__content-data'>
          {/* { formatFyllDate(cardsInputsStates['day']) } */}
          {formatFyllDate(currentCart.day)}
        </span>

        <div className='currentcart__content-wrapper row'>
          {
                        currentCart
                          ?.history?.map(history =>
                            <p key={history.id} className='currentcart__content-row'>
                              <span className='currentcart__content-time'>{history.date}</span>

                              <strong>{history.name}</strong>
                              <span className='currentcart__content-text'>
                                {
                                            switchHeler(history.helper)
                                        }
                              </span>

                              <strong
                                className={`${history.helper == 'task' ? 'task' : null}`}
                              >
                                {
                                            history.helper == 'download'
                                              ? <a download href={setDownLoadLink(history.title)}>{history.title}</a>
                                              : history.title
                                        }
                              </strong>
                            </p>
                          )

                    }
        </div>
      </div>
    </div>
  )
}

export default CardHistoryBlock
