import React from 'react'
import BlogItem from './BlogItem';
import './style.css'

export const BlogList = ({blogList}) => {

  return (
    <div className="listBlog-wrap">
            { blogList.map((blog) => (
                <BlogItem blog={blog} key={blog.id} />
            ))}
    </div>
  )
}

export default BlogList;
