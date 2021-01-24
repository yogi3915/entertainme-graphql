const router = require("express").Router()
const tvSeriesRouter = require("./tvSeries")
const movieRouter = require("./movies")

router.use("/tv-series",tvSeriesRouter)
router.use("/movies", movieRouter)

module.exports = router