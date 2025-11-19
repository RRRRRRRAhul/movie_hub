import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="card bg-dark text-white" style={{ width: "14rem" }}>
      <img 
        src={imageUrl} 
        className="card-img-top" 
        alt={movie.title} 
      />
      
      <div className="card-body">
        <h5 className="card-title">{movie.title}</h5>
        <p className="card-text">⭐ {movie.vote_average}</p>

        <Link className="btn btn-primary w-100" to={`/movie/${movie.id}`}>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
