import phoneMaskValid from "functions/phoneMask";
import React from "react";
import '../../../Styles/StyleModul/reggistration.scss'
const Countries = (props) => {
  const listC = ['+1 США','+33 Франция','+380 Украина' ,'+374 Армения', '+375 Беларусь' ,'+49 Германия','+7 Россия, Казахстан','+998 Узбекистан' ]
  const handleSel = (e) => {
    console.log(e)
    let arr = []
    let cur = 1
    for(let i = 0; i < 8; i++){
      if(e.target[i].selected == true){
        cur = e.target[i].value
      }
    } 
     
    props.setCountry(cur)
    props.setTel(phoneMaskValid(null,null,cur.length + 1,cur).strNew)
  }
  return(
    <div className="countries_list_cont">
      <select className="countries_list" name="" onChange={handleSel}>
        {listC.map(item => {
          return <option className="option_country" key ={item} value={item.slice(1,item.length).split(' ')[0]}>{item}</option>
        })}
      </select>
    </div>
  )
}

export default Countries