const router = require("express").Router()
const TvSeriesCollection = require("../controllers/tvSeries-controller")
const Movie = require("../controllers/movie-controller")

router.get("/tv-series", TvSeriesCollection.getTvSeriesHandler)
router.post("/tv-series", TvSeriesCollection.postTvSeriesHandler)
router.put("/tv-series/:id", TvSeriesCollection.putTvSeriesHandler)
router.patch("/tv-series/:id", TvSeriesCollection.patchTvSeriesHandler)
router.delete("/tv-series/:id", TvSeriesCollection.deleteTvSeriesHandler)

router.get("/movies", Movie.getMovieHandler)
router.post("/movies", Movie.postMovieHandler)
router.put("/movies/:id", Movie.putMovieHandler)
router.patch("/movies/:id", Movie.patchMovieHandler)
router.delete("/movies/:id", Movie.deleteMovieHandler)

module.exports = router