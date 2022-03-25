import { emptyAvatar, hand, smile } from 'img'
import { fif, fst, fut, scd, sev, six, trd } from 'img/analitica'
import { s1 } from 'img/emojiesPack'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import 'scss/analiticaresult.scss'

function AnaliticaResult ({ selectedComand, typeOfSort }) {
  const { workers } = useSelector(state => state.worker)

  function countPriceSum (cards) {
    const cardsPrice = cards.map(c => c.price)
    if (cardsPrice.length != 0) {
      return cardsPrice.reduce((acc, elem) => acc + elem)
    }
    return 0
  }

  return (
    <div className='analiticsresult'>
      <div className='container'>
        <ul className='analiticsresult__top'>
          <li>Сотрудник</li>
          <li>Новые сделки</li>
          <li>Новые задачи</li>
          <li>Сделки без задач</li>
          <li>Созданные клиенты</li>
          <li>Комментарии</li>
          <li>Отказ</li>
          <li>Выполненные</li>
        </ul>
        <div className='analiticsresult__blocks'>
          {
                        // comands.map(cmd =>
                        selectedComand.map(cmd =>
                          <div key={cmd._id} className='analiticsresult__blocks-block'>
                            <div className='analiticsresult__blocks-block-title'>
                              <img
                                src={
                                        cmd.comandImg.length != 0
                                          ? `${process.env.REACT_APP_STATIC_PATH}/${cmd.comandImg}`
                                          : s1
                                    } alt=''
                              />
                              <h3 className='analiticsresult__blocks-title'>{cmd.title}</h3>
                            </div>
                            {
                                    workers.map(worker =>
                                      worker.comandId == cmd._id
                                        ? <ul key={worker._id} className='analiticsresult__blocks-item'>
                                          <li>
                                            <div className='analiticsresult__blocks-item-img'>
                                              <img
                                                src={
                                                            worker.avatar.length != 0
                                                              ? `${process.env.REACT_APP_STATIC_SERVER_PATH}/${worker.avatar}`
                                                              : emptyAvatar
                                                        }
                                                alt=''
                                              />
                                            </div>
                                            <span>{worker.fio}</span>
                                          </li>
                                          <li>
                                            <img src={fst} alt='' />
                                            <span>
                                              {
                                                            worker.cards.length
                                                        }
                                            </span>
                                          </li>
                                          <li>
                                            <img src={scd} alt='' />
                                            <span>{worker.tasks.length}</span>
                                          </li>
                                          <li>
                                            <img src={trd} alt='' />
                                            <span>{
                                                        worker.cards.filter(card => card.tasks.length == 0).length
                                                    }
                                            </span>
                                          </li>
                                          <li>
                                            <img src={fut} alt='' />
                                            <span>{worker.clients.length}</span>
                                          </li>
                                          <li>
                                            <img src={fif} alt='' />
                                            <span>{worker.comments.length}</span>
                                          </li>
                                          <li>
                                            <img src={six} alt='' />
                                            <span>
                                              {worker.refusual.length}
                                            </span>
                                          </li>
                                          <li>
                                            <img src={sev} alt='' />
                                            <span>
                                              {worker.success.length} на {
                                                            countPriceSum(worker.success)
                                                        } $
                                            </span>
                                          </li>
                                        </ul>
                                        : null
                                    )
                                }
                          </div>
                        )
                    }
        </div>
      </div>
    </div>
  )
}

export default AnaliticaResult
