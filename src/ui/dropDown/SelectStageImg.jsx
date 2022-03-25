import {
  s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15,
  s16, s17, s18, s19, s20, s21, s22, s23, s24, s25, s26, s27, s28, s29, s30,
  s31, s32, s33, s34, s35, s36, s37, s38, s39, s40, s41, s42, s43, s44, s45, s46, s47, s48, s49, s50, s51, s52, s53, s54, s55, s56, s57, s58, s59, s60, s61, s62, s63, s64, s65, s66, s67, s68, s69, s70, s71, s72, s73, s74, s75, s76, s77, s78, s79, s80, s81, s82, s83, s84, s85, s86, s87, s88, s89, s90, s91, s92, s93, s94, s95, s96, s97, s98, s99, s100
} from 'img/emojiesPack'

import React, { useRef, useEffect, useState } from 'react'

function SelectStageImg ({ activeSetStageImg, setActiveSetStageImg, handler, stageImg, setActiveStageImg }) {
  const selectStageImg = useRef()

  const [imgStore, setImgStore] = useState([
    { id: 1, img: s1 }, { id: 21, img: s21 }, { id: 41, img: s41 },
    { id: 2, img: s2 }, { id: 22, img: s22 }, { id: 42, img: s42 },
    { id: 3, img: s3 }, { id: 23, img: s23 }, { id: 43, img: s43 },
    { id: 4, img: s4 }, { id: 24, img: s24 }, { id: 44, img: s44 },
    { id: 5, img: s5 }, { id: 25, img: s25 }, { id: 45, img: s45 },

    { id: 6, img: s6 }, { id: 26, img: s26 }, { id: 46, img: s46 },
    { id: 7, img: s7 }, { id: 27, img: s27 }, { id: 47, img: s47 },
    { id: 8, img: s8 }, { id: 28, img: s28 }, { id: 48, img: s48 },
    { id: 9, img: s9 }, { id: 29, img: s29 }, { id: 49, img: s49 },
    { id: 10, img: s10 }, { id: 30, img: s30 }, { id: 50, img: s50 },

    { id: 11, img: s11 }, { id: 31, img: s31 }, { id: 51, img: s51 },
    { id: 12, img: s12 }, { id: 32, img: s32 }, { id: 52, img: s52 },
    { id: 13, img: s13 }, { id: 33, img: s33 }, { id: 53, img: s53 },
    { id: 14, img: s14 }, { id: 34, img: s34 }, { id: 54, img: s54 },
    { id: 15, img: s15 }, { id: 35, img: s35 }, { id: 55, img: s55 },

    { id: 16, img: s16 }, { id: 36, img: s36 }, { id: 56, img: s56 },
    { id: 17, img: s17 }, { id: 37, img: s37 }, { id: 57, img: s57 },
    { id: 18, img: s18 }, { id: 38, img: s38 }, { id: 58, img: s58 },
    { id: 19, img: s19 }, { id: 39, img: s39 }, { id: 59, img: s59 },
    { id: 20, img: s20 }, { id: 40, img: s40 }, { id: 60, img: s60 },

    { id: 61, img: s61 }, { id: 66, img: s66 }, { id: 71, img: s71 },
    { id: 62, img: s62 }, { id: 67, img: s67 }, { id: 72, img: s72 },
    { id: 63, img: s63 }, { id: 68, img: s68 }, { id: 73, img: s73 },
    { id: 64, img: s64 }, { id: 69, img: s69 }, { id: 74, img: s74 },
    { id: 65, img: s65 }, { id: 70, img: s70 }, { id: 75, img: s75 },

    { id: 76, img: s76 }, { id: 81, img: s81 }, { id: 86, img: s86 },
    { id: 77, img: s77 }, { id: 82, img: s82 }, { id: 87, img: s87 },
    { id: 78, img: s78 }, { id: 83, img: s83 }, { id: 88, img: s88 },
    { id: 79, img: s79 }, { id: 84, img: s84 }, { id: 89, img: s89 },
    { id: 80, img: s80 }, { id: 85, img: s85 }, { id: 90, img: s90 },

    { id: 91, img: s91 }, { id: 96, img: s96 },
    { id: 92, img: s92 }, { id: 97, img: s97 },
    { id: 93, img: s93 }, { id: 98, img: s98 },
    { id: 94, img: s94 }, { id: 99, img: s99 },
    { id: 95, img: s95 }, { id: 100, img: s100 }

  ])

  function selectStageImgHandler (e) {
    if (e.target.dataset.id) {
      stageImg.current.setAttribute('src', e.target.src)
      setActiveStageImg(stageImg.current.src)
      setActiveSetStageImg(false)
    }
  }

  function closeModal () {
    setActiveSetStageImg(false)
  }

  function onMouseLeave () {
    setActiveSetStageImg(false)
  }

  return (
    <div
      className='selectImgEmojiePack'
      style={
                activeSetStageImg ? { display: 'block' } : null
            }
      draggable={false}
      onClick={e => selectStageImgHandler(e)}
            // onMouseLeave={onMouseLeave}
      ref={selectStageImg}
    >
      {
                imgStore.map(item =>
                  <img
                    key={item.id}
                    data-id={item.id}
                    src={item.img}
                    alt=''
                  />
                )
            }
    </div>
  )
}

export default SelectStageImg
