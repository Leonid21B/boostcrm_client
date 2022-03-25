import { closeGraySvg } from 'img'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import asm from '../moduleScss/analiticasuccessmodal.module.scss'

function AnaliticaSuccessModal ({ activeSuccessModal, setActiveSuccessModal }) {
  const { successCarts } = useSelector(state => state.newCart)

  function closeSuccessModal () {
    setActiveSuccessModal(false)
  }

  return (
    <div className={asm.analiticaSuccess} style={activeSuccessModal ? { display: 'block' } : null}>
      <div className={asm.analiticaSuccess__inner}>
        <div className={asm.analiticaSuccess__modal}>
          <div className={asm.analiticaSuccess__modalTop}>
            <h1>Сделок <span>“Успешно”</span> <span>{successCarts.length}</span> </h1>
            <img onClick={closeSuccessModal} src={closeGraySvg} alt='' />
          </div>
          <div className={asm.analiticaSuccess__modalContent}>
            <ul className={asm.analiticaSuccess__contentTop}>
              <li>Статус</li>
              <li>Название сделки</li>
              <li>Сумма</li>
              <li>Изменение</li>
            </ul>
            {
                            successCarts.map(sc =>
                              <Link
                                key={sc._id}
                                to={`/card/${sc._id}`}
                                onClick={e => localStorage.setItem('linkCardId', sc._id)}
                              >
                                <ul className={asm.analiticaSuccess__contentItem}>
                                  <li>
                                    успешно
                                  </li>
                                  <li>{sc.title}</li>
                                  <li>{sc.price}</li>
                                  <li>{
                                            new Date(sc.updatedAt)
                                              .toLocaleDateString('Ru-ru', { day: 'numeric', month: 'numeric', year: 'numeric' })
                                        }
                                  </li>
                                </ul>
                              </Link>
                            )
                        }
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnaliticaSuccessModal
