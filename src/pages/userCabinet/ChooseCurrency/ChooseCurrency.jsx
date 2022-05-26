import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCur } from "redux/asyncRedux/UserAuthAsync";

const ChooseCurrency = (props) => {
  const dispatch = useDispatch()
  const currency = useSelector(state => state.user.user?.currency)
  const userId = useSelector(state => state.user.user?.id)
  const [currentItem, setCurrentItem] = useState(0)
  const items = [['$', 80], ['€', 90], ['₽', 1]]

  const clickBtn = async (ind) => {
    setCurrentItem(ind)
    await changeCur(userId, items[ind][1], dispatch)
  }
  useEffect(() => {
    console.log(currency)
    for (let i in items) {
      if (items[i][1] == Number(currency) && Number(currency) != items[currentItem][1]) {
        setCurrentItem(Number(i))
        break
      }
    }
  }, [currency])
  return (
    <div className="btns_currency">
      {items.map((item, index) => {
        return (
          <button key = {item[0]} onClick={index === currentItem ? null : () => clickBtn(index)} className={index === currentItem ? 'active_btn_currency' : 'btn_currency'}>{item[0]}</button>
        )
      })}
    </div>
  )
}

export default ChooseCurrency