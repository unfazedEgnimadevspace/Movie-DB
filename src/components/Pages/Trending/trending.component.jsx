import React, { useEffect, useState } from 'react';
import "./trending.styles.css";
import axios from 'axios'
import SingleContent from '../../SingleContent/SingleContent.component';
import CustomPagination from '../../Pagination/CustomPagination.component';
const Trending = () => {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1)
    const fetchTrending = async() => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=3db9d299a32370301f4c9c2d3c47eb0a&page=${page}`);
        setContent(data.results)

    }
    useEffect(() => {
         fetchTrending();
          // eslint-disable-next-line
    },[page])
    return(
        <div>
            <span className='pageTitle'>
              Trending
              </span>
              <div className='trending'>
                 {
                   content && content.map((c) => (
                     <SingleContent  key={c.id} poster={c.poster_path} title={c.title || c.name} date={c.first_air_date || c.release_date } media_type ={c.media_type}  vote_average={c.vote_average} id={c.id}/>
                   )) 
                 }
              </div>
              <CustomPagination setPage={setPage}/>
        </div>
    )
}
export default Trending;