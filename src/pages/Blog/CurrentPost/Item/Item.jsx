import getObjectComponent from "pages/Blog/functions/getObjectComponent";
import React from "react";

const Item = (props) => {
  return(
    <div id={`scroll_${props.index}`} className="cur-post__item">
      <h1 className="item__zag">{props.item.zag}</h1>
      {props.item.objects.map(obj => getObjectComponent(obj.type,obj))}
    </div>
  )
}

export default Item