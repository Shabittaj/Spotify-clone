import React from 'react'
import "../Styles/Left.css"
import  {MdHomeFilled} from "react-icons/md";
import {FiSearch} from "react-icons/fi";

function Left() {
  return (
    <div className='leftMenu'>
      <div className='logoHome'>
        <i className='ihome'>
          <MdHomeFilled/>
        </i>
        <h2 className='text-home'>Home</h2>
      </div>
      <div className='searchBox'>
        <i className='isearch'>
          <FiSearch/>
        </i>
        <h2 className='text-search'>Search</h2>
      </div>
    </div>
  )
}

export default Left;