const router = require("express").Router()
const Movie = require('../controllers/movies')

router.get("/", Movie.getMovieHandler)
router.get("/:id", Movie.getTvSeriesByIdHandler)
router.post("/", Movie.postMovieHandler)
router.put("/:id", Movie.putMovieHandler)
router.patch("/:id", Movie.patchMovieHandler)
router.delete("/:id", Movie.deleteMovieHandler)

module.exports = router