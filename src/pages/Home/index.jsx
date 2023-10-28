import React from 'react'
import {Header} from '../../components/Home/Header'
import SearchBar from '../../components/Home/SearchBar'
import BlogList from '../../components/Home/BlogList';
import { blogList} from '../../components/config/data'

export const Home = () => {
  return (
    <div>
       {/* Page header  */}
        <Header />
       {/* Search bar  */}
        <SearchBar />
       {/* Blog List & Empty List  */}
        <BlogList blogList={blogList}/>
    </div>
  )
}

export default Home
