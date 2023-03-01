import React from 'react'
import LeftSide from '../LeftSide/LeftSide'
import RightSide from '../Right side/RightSide'
import "./MainPart.css"

const MainPart = () => {
  return (
    // main part
    <div className='main_body'>
        <div className='left_side'><LeftSide/></div>
        <div className='right_side'><RightSide/></div>
    </div>
  )
}

export default MainPart
