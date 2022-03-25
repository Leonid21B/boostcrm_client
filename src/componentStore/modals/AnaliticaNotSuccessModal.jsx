import { closeGraySvg } from 'img'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateCardStatus } from 'redux/asyncRedux/CreateCart'
import ansm from '../moduleScss/analiticanotsuccessmodal.module.scss'

function AnaliticaNotSuccessModal ({ activeNotSuccessModal, setActiveNotSuccessModal }) {
  function closeNotSuccessModal () {
    setActiveNotSuccessModal(false)
  }

  const { notSuccessCarts } = useSelector(state => state.newCart)
  const { user } = useSelector(state => state.user)

  function returnToWork (cardId) {
    return () => {
      localStorage.setItem('linkCardId', cardId)
      window.location.href = `card/${cardId}`
      updateCardStatus('active', cardId, notSuccessCarts.find(c => c._id == cardId).title, user.id, 'restart-card')
      setActiveNotSuccessModal(false)
    }
  }

  function showCardInfo (cardId) {
    return () => {
      localStorage.setItem('linkCardId', cardId)
      // updateCardStatus('active', cardId,notSuccessCarts.find(c=>c._id == cardId).title,user.id,'restart-card')
      setActiveNotSuccessModal(false)
    }
  }

  return (
    <div className={ansm.analiticaNotSuccess} style={activeNotSuccessModal ? { display: 'block' } : null}>
      <div className={ansm.analiticaNotSuccess__inner}>
        <div className={ansm.analiticaNotSuccess__modal}>
          <div className={ansm.analiticaNotSuccess__modalTop}>
            <h1>Сделок <span>“Отказ”</span> <span>{notSuccessCarts.length}</span> </h1>
            <img onClick={closeNotSuccessModal} src={closeGraySvg} alt='' />
          </div>
          <div className={ansm.analiticaNotSuccess__modalContent}>
            <ul className={ansm.analiticaNotSuccess__contentTop}>
              <li>Статус</li>
              <li>Название сделки</li>
              <li>Сумма</li>
              <li>Изменение</li>
              <li>Действия</li>
            </ul>
            {
                            notSuccessCarts.map(nsc =>
                              <div key={nsc._id}>
                                <Link to={`/card/${nsc._id}`} onClick={showCardInfo(nsc._id)}>
                                  <span>отказ</span>
                                  <span>{nsc.title}</span>
                                  <span>{nsc.price}</span>
                                  <span>
                                    {
                                                new Date(nsc.updatedAt)
                                                  .toLocaleDateString('Ru-ru', { hour: 'numeric', minute: 'numeric' })
                                            }
                                  </span>
                                </Link>
                                <span onClick={returnToWork(nsc._id)}>В работу</span>
                              </div>
                            )
                        }
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnaliticaNotSuccessModal
