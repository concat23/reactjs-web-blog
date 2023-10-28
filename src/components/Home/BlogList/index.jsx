import React from 'react'
import BlogItem from './BlogItem';
import './style.css'

export const BlogList = ({blogs}) => {

  return (
    <div className="listBlog-wrap">
            { blogs.map((blog) => (
                <BlogItem blog={blog} key={blog.id} />
            ))}
    </div>
  )
}

export default BlogList;
