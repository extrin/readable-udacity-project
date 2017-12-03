import React from 'react'

function Categories(props)=>{
  return(
    <div className='categories'
    <h1>Categories</h1>
    <ul className='categories-list'>
      {props.categories && props.categories.map(cat=>(
        <li key={cat}>{cat}</li>
      ))}
    </div>
  )
}

export default Categories;
