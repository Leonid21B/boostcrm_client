import React from "react";
import { Link, Redirect } from "react-router-dom";

const PostItem = (props) => {

  return(
    <Link className="blog__item" to={`/blog/${props.post.id}`}>
      <div className="post__image" style={{backgroundImage:`url(${process.env.REACT_APP_STATIC_SERVER_PATH_POST}/${props.post.image})`}}></div> 
      <h1>{props.post.zag}</h1>
      <p>{props.post.startedText.slice(0,110)}...</p>
    </Link>
  )
}

export default PostItem