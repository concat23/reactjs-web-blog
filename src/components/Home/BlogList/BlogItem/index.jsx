import React from 'react'
import Chip from '../../../common/Chip';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import './style.css';
export const BlogItem = ({ blog:{id,description, title,createdAt, authorName, authorAvatar,category, cover}, }) => {
    return (
        <div className='blogItem-wrap'>
            <img src={cover} alt="cover" className='blogItem-cover'/>
            <Chip  label={category}/>
            <h3>{title}</h3>
            <p className='blogItem-desc'>{description}</p>
            <footer>
                <div className="blogItem-author">
                    <img src={authorAvatar} alt="authorAvatar" />              
                    <div>
                        <h6>{authorName}</h6>
                        <p>{createdAt}</p>
                    </div>
                </div>
                <Link className='blogItem-link' to={`/blog/${id}`} ></Link>
            </footer>

        </div>
    )
}

export default BlogItem;