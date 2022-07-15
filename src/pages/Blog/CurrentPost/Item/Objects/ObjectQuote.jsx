import React from "react";

const ObjectQuote = (props) => {
  console.log(props.object)
  return (
    <div className="blog-object">
      <div className="blog-object__quote">
        <h1>Цитата</h1>
        <p>{props.object.value[0]}</p>
      </div>
    </div>
  )
}

export default ObjectQuote