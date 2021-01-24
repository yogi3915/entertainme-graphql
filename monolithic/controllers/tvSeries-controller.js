const TvSeriesModel = require("../models/tvSeries")

class TvSeriesCollection {

    static async getTvSeriesHandler(req, res) {
        try {
            const tvSeries = await TvSeriesModel.findAllTvSeries()
            res.status(200).json(tvSeries)
        } catch (error) {
            res.status(401).json(error)
        }
    }

    static async getTvSeriesByIdHandler(req, res) {
        const idParams = req.params.id
        try {
            const tvSeries = await TvSeriesModel.findByIdTvSeries(idParams)
            res.status(200).json(tvSeries)
        } catch (error) {
            res.status(401).json(error)
        }
    }

    static async postTvSeriesHandler(req, res) {
        const { title, overview, poster_path, popularity, tags } = req.body

        try {
            const dataTvSeries = await TvSeriesModel.createTvSeries({
                title, overview, poster_path, popularity, tags
            })
            res.status(201).json(dataTvSeries.ops[0])
        } catch (error) {
            res.status(401).json(error)
        }
    }

    static async putTvSeriesHandler(req, res) {
        const newId = req.params.id
        const { title, overview, poster_path, popularity, tags } = req.body
        const data = {
            title, overview, poster_path, popularity, tags
        }

        try {
            const putData = await TvSeriesModel.updateTvSeries(newId, data)
            res.status(200).json(putData.value)
        } catch (error) {
            res.status(401).json(error)
        }
    }

    static async patchTvSeriesHandler(req, res) {
        const newId = req.params.id
        const { title, overview, poster_path, popularity, tags } = req.body
        const data = {
            title, overview, poster_path, popularity, tags
        }

        try {
            const putData = await TvSeriesModel.updateTvSeries(newId, data)
            res.status(200).json(putData.value)
        } catch (error) {
            res.status(401).json(error)
        }
    }

    static async deleteTvSeriesHandler(req, res) {
        const newId = req.params.id
        try {
            const delData = await TvSeriesModel.deleteTvSeries(newId)
            res.status(200).json(delData.value)
        } catch (error) {
            res.status(401).json(error)
        }
    }
}

module.exports = TvSeriesCollection