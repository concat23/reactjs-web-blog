import React, { useState } from 'react'
import {Header} from '../../components/Home/Header'
import SearchBar from '../../components/Home/SearchBar'
import BlogList from '../../components/Home/BlogList';
import { blogList} from '../../components/config/data'
import EmptyList from '../../components/common/EmptyList';
import Top from '../../components/Home/Top';


export const Home = () => {
  const [blogs, setBlogs] = useState(blogList);
  const [searchKey, setSearchKey] = useState('');

  const handleSearchSubmit = event =>{
    event.preventDefault();
    handleSearchResults();
  }

  const handleSearchResults = ()=>{
    const allBlogs  = blogList;
    const filteredBlogs = allBlogs.filter( (blog) => 
        blog.category.toLowerCase().includes(searchKey.toLowerCase().trim())
        );
    setBlogs(filteredBlogs);
  }

  const handleClearSearch = () =>{
    setBlogs(blogs);
    setSearchKey('');
  }
  return (
    <div>
        {/* Page header  */}
        <Top />
        {/* Page header  */}
        <Header />
       {/* Search bar  */}
        <SearchBar value={searchKey} 
                   clearSearch={handleClearSearch}
                   formSubmit={handleSearchSubmit} 
                   handleSearchKey ={ (e) => setSearchKey(e.target.value)} 
                  />
        {/* Blog List & Empty List  */}
        {!blogs.length ? <EmptyList /> : <BlogList blogs={blogs}/> } 
    </div>
  )
}

export default Home
