import React from 'react'
import "../Styles/Library.css";
import {MdLibraryMusic} from "react-icons/md";
import {AiOutlinePlus} from "react-icons/ai";
function Library() {
  return (
    <div className='libraryMenu'>
     <div className='yourLibrary'>
      <i className='ilibrary'>
        <MdLibraryMusic/>
      </i>
      <h2 className='h2library'>
        Your Library
      </h2>
      </div>
      <div className='plus'>
      <i className='iplus'>
        <AiOutlinePlus/>
      </i>
     </div>
     <div className='playlist'>
      <h2 className='text-playlist'>
        Playlists
      </h2>
     </div>
    </div>
  )
}

export default Library;