import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { _setPage } from "redux/redusers/PostReducer";
import left from '../../images/left.svg'
import right from '../../images/right.svg'
const ChangePage = (props) => {
  const [arrPages,setArr] = useState([])
  const page = useSelector(state => state.post.currentPage)
  const dispatch = useDispatch()
  useEffect(() => {
    console.log(props.allPage)
    if (arrPages.length != props.allPage && props.allPage) {
      let resArr = []
      for (let i = 1; i <= props.allPage; i++) {
        resArr.push(i)
      }
      setArr([...resArr])
    }
  },[props.allPage])
  const change = async(page) =>{
    console.log(props.allPage)
    dispatch(_setPage(page))
  }
  return(
    <div className="pages-posts">
      {page != 1 && <img src={left} onClick={() => change(page - 1) } alt="" />}
      {props.allPage <= 5 && arrPages.map(it => <p onClick={() => change(it)} className={it === page ? 'active' : ''} >{it}</p>)}
      {props.allPage > 5 &&
        <>
        <p onClick={() => change(1)} >1</p>
        <p>...</p>
        {page != 1 && <p onClick={() => change(page-1)}>{page-1}</p>}
        <p className={'active'}>{page}</p>
        {page != props.allPage && <p onClick={() => change(page+2)}>{page+1}</p>}
        <p>...</p>
        <p onClick={() => change(props.allPage)} >{props.allPage}</p>
        </>
      }
      {page != props.allPage && <img src={right} onClick={() => change(page + 1)} alt="" />}
    </div>
  )
}

export default ChangePage