import React from 'react'
import {Header} from '../../components/Home/Header'
import SearchBar from '../../components/Home/SearchBar'
export const Home = () => {
  return (
    <div>
       {/* Page header  */}
        <Header />
       {/* Search bar  */}
        <SearchBar />
       {/* Blog List & Empty List  */}
        
    </div>
  )
}

export default Home
