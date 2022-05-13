import React  from 'react';
import  { useState, useEffect } from 'react'
import axios from 'axios';
import "./movies.styles.css";
import SingleContent from '../../SingleContent/SingleContent.component';
import CustomPagination from '../../Pagination/CustomPagination.component';
import Genres from '../../Genres';
import useGenres from '../../../hooks/useGenre';


const Movies= () => {
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPage, setnumOfPage] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreforURL=useGenres(selectedGenres)

    const fetchMovies = async() => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=3db9d299a32370301f4c9c2d3c47eb0a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&with_genres=${genreforURL}`)
        setContent(data.results)
        setnumOfPage(data.total_pages)
    }
    useEffect(() => {
        fetchMovies()
        //eslint-disable-next-line
    }, [page,genreforURL]);
    return(
        <div>
            <span className='pageTitle'>
                Movies
            </span>
            <Genres type="movie" selectedGenres={selectedGenres} genres={genres} setGenres={setGenres} setSelectedGenres={setSelectedGenres} setPage={setPage}
            />
            <div className='trending'>
                 {
                   content && content.map((c) => (
                     <SingleContent  key={c.id} poster={c.poster_path} title={c.title || c.name} date={c.first_air_date || c.release_date } media_type ="movie"  vote_average={c.vote_average} id={c.id}/>
                   )) 
                 }
              </div>
              {numOfPage > 1 && (
                  <CustomPagination setPage={setPage} numOfPages={numOfPage}/>
              )}
              
        </div>
    )
}
export default Movies;