import { formatFyllDate } from 'functions/FormatDate'
import React, { useEffect, useRef, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { deleteFileAsync } from 'redux/asyncRedux/CartTasks'
import { getHistory } from 'redux/asyncRedux/NewFieldAsync'
import { switchHeler } from '../functions/swittchHelpers'

function CardHistoryBlock ({ logRef ,currentCart}) {
  // const logRef = useRef()
  const [historyState, setHistory] = useState([])
  
  console.log(historyState)
  useEffect(() => {
    if(currentCart.history){
      setHistory(Array.from(currentCart.history))
      console.log(Array.from(currentCart.history))
    }
    
    
  },[currentCart?.history])
  const dispatch = useDispatch()
  //const { currentCart } = useSelector(state => state.newCart)
  const deleteFile = async (file) => {
    deleteFileAsync(dispatch, file,currentCart._id)
    console.log(file)
    console.log(currentCart._id)
    
  }
  useEffect(() => {
    if(currentCart?._id){
      getHistory(dispatch,currentCart._id)
    }
  }, [])
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
          {formatFyllDate(currentCart?.day)}
        </span>

        <div className='currentcart__content-wrapper row'>
          {         
            historyState?.map(history =>
                            <div key={history.id} className='currentcart__content-row'>
                              <span className='currentcart__content-time'>{history.date}</span>

                              <strong>{history.name}</strong>
                              <span className='currentcart__content-text'>
                                {
                                  history.helper == 'download' && history.deleted == true ? switchHeler('deletedFile') : history.helper == 'task' && history.deleted == true ? switchHeler('deleteTask') : switchHeler(history.helper)
                                        }
                              </span>

                              <strong
                                className={`${history.helper == 'task' ? 'task' : null}`}
                              >
                                {
                                            (history.helper == 'download' && history.deleted == false)
                      ? <div className=""> <a download href={setDownLoadLink(history.title)}>{history.title}</a> <div onClick={() => deleteFile(history.title)} alt="" className="delete_file_img" /> </div> : ((history.helper == 'task' || history.helper == 'download')&& history.deleted == true  ) ? <div className=""> <p className='delete_file_history'>{history.title}</p></div>
                                              : history.title
                                        }
                              </strong>
                            </div>
                          )

                    }
        </div>
      </div>
    </div>
  )
}

export default CardHistoryBlock
