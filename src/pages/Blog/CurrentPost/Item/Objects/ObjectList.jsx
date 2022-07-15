import React from "react";

const ObjectList = (props) => {
  return (
    <div className="blog-object">
      <ul className="blog-object__list">
        {props.object.value.map((val,ind) => {
          return <li key={`${ind}${val}`}>{val}</li>
        })}
      </ul>
    </div>
  )
}

export default ObjectList