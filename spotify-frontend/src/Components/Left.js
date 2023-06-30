import React from 'react';
import "../Styles/Left.css"
import  {MdHomeFilled} from "react-icons/md";
import {FiSearch} from "react-icons/fi";

function Left() {

  function handleHomeButtonClick() {
    const event = new CustomEvent('hideSearchBar');
    window.dispatchEvent(event);

  }

  function handleSearchButtonClick() {
    const event = new CustomEvent('showSearchBar');
    window.dispatchEvent(event);
  }

  
  return (
    <div className='leftMenu'>
      <div className='logoHome'>
        <button className='text-home'
        onClick={handleHomeButtonClick}>
          <i className='ihome'><MdHomeFilled/></i>
          Home
          </button>
      </div>
      <div className='searchBox'>
        <button className='text-search'
        onClick={handleSearchButtonClick}><i className='isearch'><FiSearch/></i>
        Search
        </button>
      </div>
    </div>
  )
}

export default Left;
