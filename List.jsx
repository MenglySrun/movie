import React from 'react'
import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from 'react-icons/bs';
import {GrNotification} from 'react-icons/gr'
import {motion, useScroll} from 'framer-motion';

const List = () => {

   const url_img = 'https://image.tmdb.org/t/p/w500';
   const [keyWard, setKeyWard] = useState("")
  const [movie, setMovie] = useState([])
 
    
    // const key = 'c04973ee6e8c039d002a22405c9c07e3';
    const key = '7f16c59997f05e465818f219212725cb';
    const getAllMovie  = async (keyWard)=>{
      const url = keyWard? "https://api.themoviedb.org/3/search/movie":"https://api.themoviedb.org/3/discover/movie";
        const res = await fetch(`${url}?api_key=${key}&&query=${keyWard}`)
        const movie = await res.json();
        setMovie(movie.results)
        console.log(movie)
    }
    useEffect(()=>{
      getAllMovie(keyWard)
    },[])

    function Component() {
      const { scrollYProgress } = useScroll();
      
      return (
        <motion.div style={{ scaleX: scrollYProgress }} />  
      )
    }
    Component();

   return (
      <>
 <div className='fixed h-12 top-0 w-screen bg-slate-500 flex items-center justify-center'>
       <div className='flex float-right ml-5 items-center'>
         <img src='https://www.edigitalagency.com.au/wp-content/uploads/Netflix-logo-red-black-png.png' className='h-7 w-12 rounded mr-12' alt='img'/>
       <input type="text" placeholder='Search here...' className='rounded bg-transparent border border-black   'value={keyWard} onChange={e=>setKeyWard(e.target.value)}  />
       <button className='item-center justify-center bg-blue-500 rounded-r-lg' onClick={()=>{getAllMovie(keyWard);setKeyWard("")}}>Search</button>
        <GrNotification className='ml-2'/>
        {/* <img className='w-7 h-7 rounded-full ml-2' src={https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&usqp=CAU} alt="description of image"/> */}
        {/* <select>
         <option>User1</option>
         <option>User2</option>  
         <option>User3</option>
        </select> */}
       </div>
      </div>

            <div className='mx-5 h-96 bg-white'>

            </div>
         <div className='w-[70%] mx-auto grid grid-cols-5 gap-x-5 gap-y-10 py-5'>

            

            {
               movie.length === 0 ? (<h1>Loading...</h1>) : (
                  movie.map((movie) => (


                     <Link to={'watch/' + movie.id} key={movie.id}>
                        <div className='h-[40vh] cursor-pointer group overflow-hidden'>
                           <img src={url_img + movie.poster_path}
                              className='object-cover w-full rounded-lg h-[90%] group-hover:scale-150 transition duration-300 ease-in-out'/>
                              {movie.title}
                        </div>
                       
                       <h1 className='text-sm font-serif text-center'>{movie.title}</h1>
                       
                     </Link>

                  ))
               )}
         </div>
         ))
         <div className='h-32 bg-slate-500 pb-12 flex items-center justify-center'>
            <div className='flex tracking-wide'>
               <BsFacebook className='mr-2 hover:scale-125 transition duration-300 ease-in-out'/>
               <BsInstagram className='mr-2 hover:scale-125 transition duration-300 ease-in-out'/>
               <BsTwitter className='mr-2 hover:scale-125 transition duration-300 ease-in-out'/>
               <BsYoutube className='mr-2 hover:scale-125 transition duration-300 ease-in-out'/>
            </div>
            <div className=''>
               <h1 className='text-black'>@ting Copy Right 2021</h1>
            </div>
         </div>
      </>
   )
}

export default List
