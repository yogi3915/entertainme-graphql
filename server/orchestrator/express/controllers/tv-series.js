const axios = require("axios")
const Redis = require("ioredis");
const redis = new Redis();
const urlTvSeries = 'http://localhost:3001/tv-series'

class tvSeriesController {

    static async getTvSeriesHandler(req, res) {

        try {
            const tvSeries = await redis.get("dataTvSeries")

            if (tvSeries) {
                res.status(200).json(JSON.parse(tvSeries))
            } else {

                const response = await axios({
                    method: 'GET',
                    url: urlTvSeries
                })
                const setRedis = await redis.set("dataTvSeries", JSON.stringify(response.data), "EX", 60)
                res.status(200).json(response.data)
            }

        } catch (error) {
            res.status(401).json(error)
        }
    }

    static async getTvSeriesByIdHandler(req, res) {

        const idParams = req.params.id
        try {
            const tvSeries = await redis.get("dataTvSeriesById")
            if (tvSeries) {
                res.status(200).json(JSON.parse(tvSeries))
            } else {

                const response = await axios({
                    method: 'GET',
                    url: urlTvSeries + `/${idParams}`
                })
                const setRedis = await redis.set("dataTvSeriesById", JSON.stringify(response.data), "EX", 60)
                res.status(200).json(response.data)
            }

        } catch (error) {
            res.status(401).json(error)
        }
    }

    static async postTvSeriesHandler(req, res) {
        const { title, overview, poster_path, popularity, tags } = req.body

        try {
            const response = await axios({
                method: "POST",
                url: urlTvSeries,
                data: {
                    title, overview, poster_path, popularity, tags
                }
            })
            const setRedis = await redis.del("dataTvSeries")
            res.status(201).json(response.data)
        } catch (error) {
            res.status(401).json(error)
        }
    }

    static async putTvSeriesHandler(req, res) {
        const idParams = req.params.id
        const { title, overview, poster_path, popularity, tags } = req.body

        try {
            const response = await axios({
                method: "PUT",
                url: urlTvSeries + `/${idParams}`,
                data: {
                    title, overview, poster_path, popularity, tags
                }
            })
            const setRedis = await redis.del("dataTvSeries")
            res.status(200).json(response.data)
        } catch (error) {
            res.status(401).json(error)
        }
    }

    static async patchTvSeriesHandler(req, res) {
        const idParams = req.params.id
        const { title, overview, poster_path, popularity, tags } = req.body

        try {
            const response = await axios({
                method: "PATCH",
                url: urlTvSeries + `/${idParams}`,
                data: {
                    title, overview, poster_path, popularity, tags
                }
            })
            const setRedis = await redis.del("dataTvSeries")
            res.status(200).json(response.data)
        } catch (error) {
            res.status(401).json(error)
        }
    }

    static async deleteTvSeriesHandler(req, res) {
        const idParams = req.params.id

        try {
            const response = await axios({
                method: "DELETE",
                url: urlTvSeries + `/${idParams}`
            })
            const setRedis = await redis.del("dataTvSeries")
            res.status(200).json(response.data)
        } catch (error) {
            res.status(401).json(error)
        }
    }

}

module.exports = tvSeriesController