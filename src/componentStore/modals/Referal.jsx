import React, { useState } from 'react'
import ref from '../moduleScss/referal.module.scss'
import { close, closeGraySvg } from 'img'
import { v1 } from 'uuid'
function Referal ({ func, active }) {
  const link = v1()
  const [reflink, setReflink] = useState(link)
  return (
    <div className={ref.Referal} style={active ? { display: 'block' } : null}>
      <div className={ref.ReferalModalInner}>
        <div className={ref.ReferalModal}>
          <div className={ref.ReferalModalTop}>
            <h1>Рекомендация</h1>
            <img onClick={func} src={closeGraySvg} alt='' />
          </div>
          <p>Если придет новый клиент по ней то вы оба получите по месяцу в подарок, при условии оплаты приглашенного пользователя</p>
          <div className={ref.ReferalInput}>
            <label>
              <span>Реферальная ссылка</span>
            </label>
            <div className={ref.input}>
              <input type='text' value={reflink} onChange={e => setReflink(reflink)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Referal
