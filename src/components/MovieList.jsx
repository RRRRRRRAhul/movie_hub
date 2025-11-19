import MovieCard from "./MovieCard";

const MovieList = ({ movies }) => {
  return (
    <div className="d-flex flex-wrap gap-4">
      {movies.map((movie, index) => (
        <MovieCard key={movie.id + "-" + index} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
