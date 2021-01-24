const router = require("express").Router()
const TvSeriesCollection = require("../controllers/collection")

router.get("/tv-series", TvSeriesCollection.getTvSeriesHandler)
router.get("/tv-series/:id", TvSeriesCollection.getTvSeriesByIdHandler)
router.post("/tv-series", TvSeriesCollection.postTvSeriesHandler)
router.put("/tv-series/:id", TvSeriesCollection.putTvSeriesHandler)
router.patch("/tv-series/:id", TvSeriesCollection.patchTvSeriesHandler)
router.delete("/tv-series/:id", TvSeriesCollection.deleteTvSeriesHandler)

module.exports = router