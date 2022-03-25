import { arrowdwn } from 'img'
import AuthService from 'requests/service/AuthService'
import CartService from 'requests/service/CartService'
import './customSelet.scss'

function CustomSelect (
  { dataTypeItem, refOnSelectMenu, items, currentItem, currentStage, multiselect = false, imgPlace, sortType, disabled }) {
  function clickHandler (e, datatypeitem, refonselectmenu) {
    const { type, value } = e.target.dataset

    if (type === 'input') {
      toggle(refOnSelectMenu)
      return
    }
    if (type === datatypeitem) {
      selectedItem(value, multiselect, datatypeitem, refonselectmenu)
    }
  }

  const toggle = (item) => item.current.classList.contains('open') ? close(item) : open(item)
  const open = (i) => i.current.classList.add('open')
  const close = (i) => i.current.classList.remove('open')

  function selectedItem (val, multiselect, datatypeitem, refonselectmenu) {
    if (multiselect) {
      if (!refonselectmenu.current.querySelector(`[data-value="${val}"]`).classList.contains('selected')) {
        refonselectmenu.current.querySelector(`[data-value="${val}"]`).classList.add('selected')
        close(refonselectmenu)
        return
      }
    }
    refonselectmenu.current.querySelectorAll(`[data-type="${datatypeitem}"]`).forEach(el => {
      el.classList.remove('selected')
    })
    refonselectmenu.current.querySelector(`[data-value="${val}"]`).classList.add('selected')
    switch (dataTypeItem) {
      case 'stages':
        CartService.updateCartStage(
          refonselectmenu.current.querySelector(`[data-value="${val}"]`).dataset.value,
          JSON.parse(localStorage.getItem('cartId')))
        refOnSelectMenu.current.querySelector('[data-value="text"]').innerText = items.filter(item => item._id == refonselectmenu.current.querySelector(`[data-value="${val}"]`).dataset.value)[0].title
        break
      case 'users':
        console.log('user', refonselectmenu.current.querySelector(`[data-value="${val}"]`).dataset.value)
        CartService.updateCartWorker(JSON.parse(localStorage.getItem('cartId')), refonselectmenu.current.querySelector(`[data-value="${val}"]`).dataset.value)
        refOnSelectMenu.current.querySelector('[data-value="text"]').innerText = items.filter(item => item._id == refonselectmenu.current.querySelector(`[data-value="${val}"]`).dataset.value)[0].fio
        break
      case 'comands':
        AuthService.updateUserComand(JSON.parse(localStorage.getItem('userIdForUpdate')), refonselectmenu.current.querySelector(`[data-value="${val}"]`).dataset.value)
        console.log('comand', refonselectmenu.current.querySelector(`[data-value="${val}"]`).dataset.value)
        console.log('comand', items)
        refOnSelectMenu.current.querySelector('[data-value="text"]').innerText = items.filter(item => item._id == refonselectmenu.current.querySelector(`[data-value="${val}"]`).dataset.value)[0].title
        break
      default:
        break
    }
    close(refonselectmenu)
  }
  return (
    <div>
      <div
        className='select'
        onClick={e => clickHandler(e, dataTypeItem, refOnSelectMenu)}
        data-type='input'
        ref={refOnSelectMenu}
      >
        <div className='select__input'>
          <span>
            <img src={imgPlace} alt='' />
            <span data-value='text'>
              {

                                sortType === 1
                                  ? currentItem?.filter(item => item._id == currentStage).map(item => item.title)
                                  : sortType === 2
                                    ? currentItem.fio
                                    : null

                            }
            </span>
          </span>
          <img src={arrowdwn} alt='' />
        </div>
        <div className='select__dropdown'>
          <ul className='select__list'>
            {
                            items.filter(item => item._id !== currentStage || null).map(item =>
                              item._id !== 0
                                ? <li
                                    className='select__item'
                                    data-type={dataTypeItem}
                                    data-value={item._id}
                                    key={item._id}
                                  >
                                  <img src={imgPlace} alt='' />
                                  {
                                            item.title || item.fio
                                        }
                                </li>
                                : null
                            )
                        }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CustomSelect
