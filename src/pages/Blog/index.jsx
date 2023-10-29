import React from 'react'

export const Blog = () => {
   const params = useParams();
   const id = params.id;
   const [blog, setBlog] = useState(null);

   useEffect(() => {
    let blog = blogList.find( (blog) => blog.id === parseInt(id));
    if (blog) {
      setBlog(blog);
    }
  }, [id]);



  return (
    <div>
      <Link className="blog-goBack" to='/'><span> &#8592; </span> Go back</Link>
      {
        blog ? (<div className='blog-wrap'>
                    <header>
                        <p className='blog-date'> Published {blog.createdAt}</p>   
                        <h1>{blog.title}</h1> 
                        <div className='blog-subCategory'>
                            {Array.isArray(blog.subCategory) ? (
                              blog.subCategory.map((category, index) => (
                                <div key={index}>
                                  <Chip key={index} label={category}></Chip>
                                </div>
                              ))
                            ) : null}
                          </div>
                    </header>
                    <img src={ blog.cover } alt="cover" />
                    <p className='blog-desc'>{blog.description}</p>
               </div> ) : <EmptyList /> 
      } 
    </div> 
  )
}

export default Blog
