import React from "react";

const ObjectText = (props) => {
  return(
    <div className="blog-object">
      {props.object.value.map((val,ind) => <p key={`${ind}${props.object.id}${val}`}>{val}</p>)}
    </div>
  )
}

export default ObjectText