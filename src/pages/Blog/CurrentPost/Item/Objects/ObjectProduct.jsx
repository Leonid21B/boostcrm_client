import SuccesRegistrationModal from "componentStore/modals/SuccesRegistrationModal";
import Registraton from "pages/home/src/components/regModal/Registraton";
import React, { useEffect, useState } from "react";


const ObjectProduct = (props) => {
  const body = document.querySelector('body')
  const [activeReg,setActiveReg] = useState(false)
  const [activeSuccess, setActiveSuccess] = useState(false)
  return (
    <div className="blog-object">
      <div className="blog-object__prod">
        <div className="prod__left">
          <h1>{props.object.value[0]}</h1>
          <p>{props.object.value[1]}</p>
        </div>
        <div className="prod__right">
          <button onClick={() => setActiveReg(true)}>Попробовать бесплатно</button>
        </div>
        <Registraton
          isBlog = {true}
          body={body}
          active={activeReg}
          setActive={setActiveReg}
          setActiveSuccessRegistrationModal={setActiveSuccess}
        />
        <SuccesRegistrationModal
          body={body}
          active={activeSuccess}
          setActive={setActiveSuccess}
        />
      </div>
    </div>
  )
}

export default ObjectProduct