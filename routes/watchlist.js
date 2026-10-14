import express from "express";
import { addMovie, getWatchlist, updateMovie, deleteMovie } from "../utils/db.js";
import { authorizeModification } from "../middleware/authorize.js";

const router = express.Router();


router.get("/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  const watchlist = getWatchlist(userId);

  return res.status(200).json(watchlist);
});

router.post("/:userId/movies", authorizeModification, (req, res) => {
  const userId = Number(req.params.userId);
  const movie = addMovie(userId, req.body);

  return res.status(201).json(movie);
});

router.put("/:userId/movies/:movieId", authorizeModification, (req, res) => {
  const userId = Number(req.params.userId);
  const movieId = Number(req.params.movieId);
  const movie = updateMovie(userId, movieId, req.body);

  if (!movie) {
    return res.status(404).json({ error: "Movie or user not found" });
  }

  return res.status(200).json(movie);
});

router.delete("/:userId/movies/:movieId", authorizeModification, (req, res) => {
  const userId = Number(req.params.userId);
  const movieId = Number(req.params.movieId);
  const deleted = deleteMovie(userId, movieId);

  if (!deleted) {
    return res.status(404).json({ error: "Movie or user not found" });
  }

  return res.status(200).json({ message: "Movie deleted successfully" });
});

export default router;
