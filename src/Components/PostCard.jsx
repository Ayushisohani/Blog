import React from 'react'
import appwriteService from '../appwrite/config.js'
import {Link} from 'react-router-dom'

function PostCard({$id,title,featuredimage}) {
  return (
   <Link to={`/Post/${$id}`}>
    <div className='w-[300px] bg-gray-700 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
            <img src={appwriteService.getFilePreview(featuredimage)} alt={title} 
            className='rounded-xl'
            />
        </div>
        <h2 className='text-xl font-bold text-white'>{title}</h2>
    </div>
   </Link>
  )
}

export default PostCard
