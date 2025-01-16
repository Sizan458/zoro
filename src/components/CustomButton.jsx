/* eslint-disable react/prop-types */


import { useSnapshot } from 'valtio'
import State from '../store'
import{getContrastingColor} from '../config/helpers'


const CustomButton = ({type,
    title,
    handleClick,
    CustomStyle}) => {
        const snap= useSnapshot(State)
        const generateStyle=(type)=>{
            if(type==='filled'){
                return{
                    backgroundColor:snap.color,
                    color:getContrastingColor(snap.color)
                }
            }else{
                if(type==='outline'){
                    return{
                        borderWidth:'1px',
                        borderColor:snap.color,
                        color:snap.color
                    }
                }
            }
        }
  return (
    
 <button className={`px-2 py-1.5 flex-1  rounded-md ${CustomStyle}`} style={generateStyle(type)} onClick={handleClick}>{title}</button>

   
  )
}

export default CustomButton