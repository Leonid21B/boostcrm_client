import React from "react";

const ObjectAdvice = (props) => {
  console.log(props.object)
  return (
    <div className="blog-object">
      <div className="blog-object__advice">
        <h1>{props.object.value[0]}</h1>
        <p>{props.object.value[1]}</p>
      </div>
    </div>
  )
}

export default ObjectAdvice