import React from 'react';
import {Link} from 'react-router-dom'

const selectOptions = {
{name: 'Vote score (asc.)', value: 'Vote score (asc.)'},
{name: 'Vote score (desc.)', value: 'Vote score (desc.)'},
{name: 'Timestamp (asc).', value: 'Timestamp (asc).'},
{name: 'Timestamp (desc.)', value: 'Timestamp (desc.)'}
}

function trim(str) {
  return str.length > 255 ? str.slice(0, 16) + '...' : str;
}

function Posts(props) {
  return (
    <div className="posts">
      <h1>Posts</h1>
      <div className="sort">
        Sort by...
        <select className='sort-select'>
          {selectOptions.map(opt=>(
            <option value={opt.name}>{opt.value}</option>
          ))}
        </select>
      </div>
      <div className='posts-list'>
        {props.posts.map(post=>(
          <h2>{post.title}</h2>
          <span className='post-timestamp'>{post.timestamp}</span>
          <div className='post-votes'>
            {post.voteScore}
            <button className='vote-up'/>
            <button className='vote-down'/>
          </div>
          <p className='post-body-cut'>{trim(post.body)}</p>
        ))}
      </div>
    </div>
  );
}

export default Posts;
