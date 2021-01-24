const router = require("express").Router()
const TvSeriesCollection = require("../controllers/tv-series")

router.get("/", TvSeriesCollection.getTvSeriesHandler)
router.get("/:id", TvSeriesCollection.getTvSeriesByIdHandler)
router.post("/", TvSeriesCollection.postTvSeriesHandler)
router.put("/:id", TvSeriesCollection.putTvSeriesHandler)
router.patch("/:id", TvSeriesCollection.patchTvSeriesHandler)
router.delete("/:id", TvSeriesCollection.deleteTvSeriesHandler)

module.exports = router