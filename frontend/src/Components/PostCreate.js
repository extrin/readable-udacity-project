import React from 'react';
import { Link } from 'react-router-dom';

function PostCreate(props) {
  return (
    <div className="post-create">
      <Link to="/">Home</Link>
      <input type="text" placeholder="Post title..." required />
      <input type="text" plceholder="Post body..." required />
      <select className="post-category-select">
        <option disabled value="Select category">
          Select category
        </option>
        {props.categories &&
          props.categories.map(cat => (
            <option key={cat.name} value={cat.value}>
              {cat.value}
            </option>
          ))}
      </select>
      <input type="text" placeholder="Author nickname" required />
      <button className="post-save-btn">
        <Link to="/">Save</Link>
      </button>
    </div>
  );
}

export default PostCreate;
