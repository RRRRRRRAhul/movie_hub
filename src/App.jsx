import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import MovieDetails from "./pages/MovieDetails";
import TopRated from "./pages/TopRated";
import Popular from "./pages/Popular";
import Upcoming from "./pages/Upcoming";
import Genre from "./pages/Genre";

function App() {

  return (
    <>
      <Navbar />

      <div className="bg-dark text-white min-vh-100 p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/movie/top_rated" element={<TopRated/>} />
          <Route path="/movie/popular" element={<Popular/>} />
          <Route path="/movie/upcoming" element={<Upcoming/>} />
          <Route path="/movie/genre/:genreId/:genreName" element={<Genre/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
