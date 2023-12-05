import { IconType } from "react-icons";


interface ActionBtnProps {
    icon: IconType,
    onClick : (e: React.MouseEvent<HTMLButtonElement>) => void;
    disable?: boolean
}

import React from 'react'

const ActionBtn:React.FC<ActionBtnProps> = ({icon:Icon, onClick, disable}) => {
  return (
   <button  onClick={onClick} disabled={disable} className={`flex items-center justify-center rounded cursor-pointer w-[40px] h-[30px] text-slate-700 border border-slate-400 ${disable && "opacity-50 cursor-not-allowed"}`}>
    <Icon size={18}/>
   </button>
  )
}

export default ActionBtn