import React from 'react'
import 'scss/commonStyleOfModal.scss'

function CloseTask (
  { closeTask, succsessTask, succsessTaskHandler, notSuccsessTaskHandler, notSuccsessTask, notSuccesCartCaption, setNotSuccesCartCaption, sendNotSuccessCart, setCloseTask, id, historeBack }
) {
  function closeModalByclickOnParandja (e) {
    const isClick = e.target.classList.contains('close-by-click')
    if (isClick) {
      setCloseTask(false)
    }
  }
  return (
    <div className='closetask' style={closeTask ? { display: 'block' } : { display: 'none' }}>
      <div className='modalParandja'>
        <div
          className='close-by-click'
          style={
                        {
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: '7'
                        }
                    }
          onClick={closeModalByclickOnParandja}
        >
          <div className='modal w_350'>
            <h3 className='modalTopLine__title mb_32'>Как прошла сделка?</h3>

            <div className='closetask__modal-btns'>

              <button
                onClick={() => succsessTaskHandler()}
                className={`closetask__modal-sucsses ${succsessTask ? 'active' : ''}`}
              >
                <div className='img' />
                <span>Успешно</span>
              </button>

              <button
                onClick={() => notSuccsessTaskHandler()}
                className={`closetask__modal-notsucsses ${notSuccsessTask ? 'active' : ''}`}
              >
                <div className='img' />
                <span>Неудачно</span>
              </button>

            </div>

            <div className='closetask__modal-why' style={notSuccsessTask ? { display: 'block' } : null}>

              <label className='modal__Label primary' htmlFor='why'>Почему? *</label>

              <textarea value={notSuccesCartCaption} onChange={e => setNotSuccesCartCaption(e.target.value)} name='why' id='' cols='30' rows='10' maxLength={500} />

              <div className='modal__Btns'>
                <button
                  className={`send__btn ${notSuccesCartCaption.length > 1 ? 'active' : null}`}
                  disabled={!(notSuccesCartCaption.length > 1)}
                  onClick={sendNotSuccessCart}
                >Отправить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CloseTask
