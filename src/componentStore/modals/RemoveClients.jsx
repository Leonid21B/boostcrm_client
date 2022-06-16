import React from 'react'
import { close, closeGraySvg } from 'img'
import BlueBtn from 'ui/btns/BlueBtn'
import GrayBtn from 'ui/btns/GrayBtn'
import { deleteClient } from 'redux/asyncRedux/ClientsAsync'
import { useDispatch, useSelector } from 'react-redux'

import { _getClients } from 'redux/redusers/ClientReduser'

function RemoveClients ({ activeModal, closeClientModal, rowId }) {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)
  const { clients, clientsCarts } = useSelector(state => state.client)

  const remove = () => {
    deleteClient(dispatch, rowId, user.id)
    //dispatch(_getClients(clients.filter(client => client._id != rowId)))
    closeClientModal()
  }
  return (
    <div className='remove__client' style={activeModal ? { display: 'block' } : null}>
      <div className='remove__client-inner'>
        <div className='remove__client-modal'>
          <div className='remove__client-top'>
            <h1>Вы точно хотите удалить клиента?</h1>
            <img onClick={closeClientModal} src={closeGraySvg} alt='' />
          </div>
          <span>Восстановить невозможно</span>
          <div className='remove__client-btns'>
            <GrayBtn func={closeClientModal}>Отменить</GrayBtn>
            <BlueBtn func={remove}>Удалить</BlueBtn>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemoveClients
