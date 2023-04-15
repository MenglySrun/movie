
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {motion} from 'framer-motion'
const Detail = () => {
  const { id } = useParams();
  const [singleMovie, setSingleMovie] = useState({})
  const [trailerKey, setTrailerKey] = useState("")
  const [displayTrailer, setDisplayTrailer] = useState(false)
  const getMovie = async () => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=7f16c59997f05e465818f219212725cb&&append_to_response=videos`
    const res = await fetch(url);
    const movie = await res.json();
    
    setSingleMovie(movie)
    console.log(movie)
  }
  useEffect(() => {
    getMovie();
    
  }, []);

  
  const playTrailer =()=>{
    const trailer = singleMovie.videos.results.find((video)=>video.name === "Official Trailer")
    setTrailerKey(trailer.key)
    setDisplayTrailer(!displayTrailer)
  }
  const url_img = 'https://image.tmdb.org/t/p/w500';
  return (
    <div>
      <img src={url_img +singleMovie.backdrop_path} className='fixed w-full h-screen object-cover blur-sm -z-10' />
      <div className='W-[70%] mx-auto'>
        <div className='flex justify-between'>
          <div className='pt-10 ml-32'>
            <img src={url_img +singleMovie.poster_path} className='w-96 h-136 rounded-lg'/>
            <button className='mt-5 rounded bg-red-500' onClick={playTrailer}>{displayTrailer?"Hide":"Trailer"}</button>
           {
            displayTrailer&& (
              <div className='pt-5'>
              <iframe width="520" height="345" allowFullScreen src={`https://www.youtube.com/embed/${trailerKey}`} ></iframe>
              </div>
            )
           }
          </div>
          <div className='fixed right-0 backdrop-blur-lg h-screen w-[50vw] top-0 flex flex-col p-10 overflow-hidden'>
            <motion.div layout>
            <h1 className='mt-10 font-bold text-2xl tracking-wide'>{singleMovie.title}</h1>
            </motion.div>
            <p className='mt-10 font-extrabold text-2xl tracking-wide text-white'>Release Date:{singleMovie.release_date}</p>
            <p className='mt-10 font-extrabold text-2xl tracking-wide text-white'>{singleMovie.overview}</p>
            <motion.div>
            <hr className='mt-7'/>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail
