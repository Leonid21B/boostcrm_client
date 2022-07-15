import ObjectImg from "../CurrentPost/Item/Objects/ObjectImg"
import ObjectList from "../CurrentPost/Item/Objects/ObjectList"
import ObjectAdvice from "../CurrentPost/Item/Objects/ObjectAdvice"
import ObjectQuote from "../CurrentPost/Item/Objects/ObjectQuote"
import ObjectText from "../CurrentPost/Item/Objects/ObjectText"
import ObjectProduct from "../CurrentPost/Item/Objects/ObjectProduct"

const getObjectComponent = (type,object) => {
  switch(type){
    case 'text':
      return <ObjectText object = {object} key={object.id}/>
    case 'list':
      return <ObjectList object = {object} key={object.id}/>
    case 'img':
      return <ObjectImg object = {object} key={object.id}/>
    case 'quote':
      return <ObjectQuote object = {object} key={object.id}/>
    case 'advice':
      return <ObjectAdvice object = {object} key={object.id}/>
    case 'prod':
      return <ObjectProduct object = {object} key={object.id}/>
  }
}

export default getObjectComponent