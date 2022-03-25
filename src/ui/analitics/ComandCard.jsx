import { urn } from 'img'
import { s1 } from 'img/emojiesPack'
import React from 'react'
import { countMovementCard } from './functions/CountMovementCard'
import { countPercent } from './functions/CountPersent'

function ComandCard ({ cmd, stageCards, carts, removeComandFromList, success, refusual }) {
  return (
    <div key={cmd?._id} className='analitics__blocks-block'>
      <div className='analitics__block-top'>
        <div className='analitics__block-top-title'>
          <img
            src={
                        cmd.comandImg?.length != 0
                          ? `${process.env.REACT_APP_STATIC_PATH}/${cmd.comandImg}`
                          : s1
                    } alt=''
          />
          <h3 className='analitics__blocks-title'>{cmd?.title}</h3>
        </div>
        <img
          style={{ cursor: 'pointer' }}
          onClick={e => removeComandFromList(cmd._id)}
          src={urn}
          alt=''
        />
      </div>
      <div className='analitics__block-content'>
        <ul className='analitics__block-content-top'>
          <li>Воронка продаж</li>
          <li>
            <span>Перешли</span>
            <span>Отказы</span>
          </li>
          <li>Сделки</li>
          <li>Выполнено</li>
        </ul>
        {
                    stageCards.map(stage =>
                      <ul key={stage._id} className='analitics__block-content-stages'>
                        <li>
                          {stage.title}
                        </li>
                        <li>
                          <span>
                            {
                                        countMovementCard(
                                          carts.length,
                                          stage.cards.filter(c => c.comandId == cmd._id).length
                                        )
                                    }
                            %
                          </span>
                        </li>
                        <li>
                          <div className='slider'>
                            <div
                              className='slider__back'
                              style={
                                            {
                                              width: `${countMovementCard(
                                                    carts.length,
                                                    stage.cards.filter(c => c.comandId == cmd._id).length)
                                                    }%`
                                            }
                                        }
                            />
                          </div>
                        </li>
                        <li>
                          {
                                    countPercent(
                                      refusual.filter(card => card.stageId == stage._id).length,
                                      stage.cards.filter(card => card.comandId == cmd._id).length
                                    )
                                }
                          %
                        </li>
                        <li>
                          {
                                    carts
                                      .filter(card => card.stageId == stage._id)
                                      .length
                                }
                        </li>
                        <li>
                          {
                                    countPercent(
                                      success.filter(card => card.stageId == stage._id).length,
                                      stage.cards.filter(card => card.comandId == cmd._id).length
                                    )
                                }
                          %
                        </li>
                      </ul>
                    )

                }
      </div>
    </div>
  )
}

export default ComandCard
