import { emoje } from 'img'
import { createStage } from 'redux/asyncRedux/CreateStage'

function createNewStage (imgRef, dispatch, title, userId, setTitle, stagesAction) {
  return async () => {
    const img = imgRef.current.src.split('/').pop()
    createStage(dispatch, title, img, userId)
    imgRef.current.setAttribute('src', emoje)

    setTitle('')

    stagesAction.forEach(
      action => {
        action(false)
      }
    )
  }
}

function clickOnStageTitle (stage, callBack) {
  const { _id, title } = stage
  return () => {
    callBack(_id, title)
  }
}

function updateStageTitle (config, accessCallback, neitrallCallBack) {
  const {
    stage, updateStageImgRef, stageTitle, stageImg
  } = config
  return async () => {
    const img = typeof updateStageImgRef.current.src.split('/').pop() !== 'undefined'
      ? updateStageImgRef.current.src.split('/').pop()
      : stage.stageImg

    console.log('img', img)
    if (stageTitle === stage.title && img === stage.stageImg) {
      neitrallCallBack()
      return
    }
    if (!stageTitle.length > 0) {
      return
    }
    if (stageTitle !== stage.title || img !== stageImg) {
      accessCallback(img)
    }
  }
}

export {
  createNewStage,
  clickOnStageTitle,
  updateStageTitle
}
