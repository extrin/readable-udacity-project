import React from 'react';
import {Categories, Posts} from './'
import {Link} from 'react-router-dom'

function MainView()=>{
  return(
    <div className='default-view'>
      <Categories/>
      <Posts/>
      <div className='create-post'>
      <Link to="/create">Create new post</Link>
      </div>
    </div>
  )
}

export default MainView;
