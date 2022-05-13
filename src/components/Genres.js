import { Chip } from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";

const Genres = ({
  type,
  selectedGenres,
  genres,
  setGenres,
  setSelectedGenres,
  setPage,
}) => {
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };
  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=3db9d299a32370301f4c9c2d3c47eb0a&language=en-US`
    );

    setGenres(data.genres);
  };

  console.log(genres);

  useEffect(() => {
    fetchGenres();
    return () => {
      setGenres({});
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div
      style={{
        padding: "6px 0",
      }}
    >
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            label={genre.name}
            style={{
              margin: 2,
            }}
            clickable
            size="small"
            color="primary"
            key={genre.id}
            onDelete={() => handleRemove(genre)}
          />
        ))}
      {genres &&
        genres.map((genre) => (
          <Chip
            label={genre.name}
            style={{
              margin: 2,
            }}
            clickable
            size="samll"
            key={genre.id}
            onClick={() => handleAdd(genre)}
          />
        ))}
    </div>
  );
};
export default Genres;
