import React,{useEffect,useState} from 'react'
import appwriteService from "../appwrite/config"
import {Container,PostCard} from '../Components'
import 'bootstrap/dist/css/bootstrap.min.css';


function Home() {
  const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-10">
                <Container>
                    <div className="flex flex-wrap">
                    <div>
                        <h1 className='text-gray-900 text-7xl font-sans flex '> Create Your Blog</h1>
                        <div className='flex'>
                          <div className='w-full h-auto'>
                       <p className='text-slate-900 my-8 text-2xl mr-32 mt-15 w-full font-sans flex '>Transform your ideas into impactful <br /> content with our 
                       <br /> proven strategies and resources. 
                        Start <br /> crafting engaging posts <br /> that resonate  with <br /> your audience today.<br/> 
                     </p>
                            </div>
                          <div className='w-full h-auto'> 
                      <img className='transition-transform duration-500 ease-in-out transform hover:translate-y-[-20%] w-[550px] max-w-full h-auto'
                               src="https://cdni.iconscout.com/illustration/premium/thumb/blogging-illustration-download-in-svg-png-gif-file-formats--blogger-logo-blog-content-article-web-and-mobile-ui-pack-user-interface-illustrations-1784890.png?f=webp" alt="" />
                       </div>
                      </div>
                    </div>
                        
                    </div>
                </Container>
            </div>
        )
    }

     return (
     <div className='w-full py-8 my-24'>
            <Container>
            <div className="flex flex-wrap">
                        <h1 className='text-gray-900 font-snas text-7xl flex'> Create Your Blog</h1>
                        <div className='flex'>
                             <div className='w-full h-auto'>
                       <p className='text-slate-900 my-8 text-2xl mr-32 w-full font-sans '>Transform your ideas into impactful <br /> content with our 
                       <br /> proven strategies and resources. 
                        Start <br /> crafting engaging posts <br /> that resonate  with <br /> your audience today.<br/> 
                     </p>
                        </div>
                             <div className='w-full h-auto'>
                      <img className='transition-transform duration-500 ease-in-out transform hover:translate-y-[-20%] w-[550px] -m-10 flex '
                               src="https://cdni.iconscout.com/illustration/premium/thumb/blogging-illustration-download-in-svg-png-gif-file-formats--blogger-logo-blog-content-article-web-and-mobile-ui-pack-user-interface-illustrations-1784890.png?f=webp" alt="" />
                       
                       </div>
                      </div>
                    </div>
                        
                <div className='flex flex-wrap my-40'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4 mt-16 transition-transform duration-500 ease-in-out transform hover:translate-y-[-20%] h-auto'>
                      <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
    
        </div>
  )
}


export default Home
