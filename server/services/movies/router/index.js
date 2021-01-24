const router = require("express").Router()
const Movie = require('../controllers/movie-controller')

router.get("/movies", Movie.getMovieHandler)
router.get("/movies/:id", Movie.getMovieByIdHandler)
router.post("/movies", Movie.postMovieHandler)
router.put("/movies/:id", Movie.putMovieHandler)
router.patch("/movies/:id", Movie.patchMovieHandler)
router.delete("/movies/:id", Movie.deleteMovieHandler)

module.exports = router