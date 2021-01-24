const axios = require("axios")
const Redis = require("ioredis");
const redis = new Redis();
const urlMovies = 'http://localhost:3002/movies'

class MOviesController {

    static async getMovieHandler(req, res) {

        try {
            const movie = await redis.get("dataMovie")

            if (movie) {
                res.status(200).json(JSON.parse(movie))
            } else {

                const response = await axios({
                    method: 'GET',
                    url: urlMovies
                })
                const setRedis = await redis.set("dataMovie", JSON.stringify(response.data), "EX", 60)
                res.status(200).json(response.data)
            }

        } catch (error) {
            res.status(401).json(error)
        }
    }

    static async getTvSeriesByIdHandler(req, res) {

        const idParams = req.params.id
        try {
            const movie = await redis.get("dataMovieById")
            if (movie) {
                res.status(200).json(JSON.parse(movie))
            } else {

                const response = await axios({
                    method: 'GET',
                    url: urlMovies + `/${idParams}`
                })
                const setRedis = await redis.set("dataMovieById", JSON.stringify(response.data), "EX", 60)
                res.status(200).json(response.data)
            }

        } catch (error) {
            res.status(401).json(error)
        }
    }

    static async postMovieHandler(req, res) {
        const { title, overview, poster_path, popularity, tags } = req.body

        try {
            const response = await axios({
                method: "POST",
                url: urlMovies,
                data: {
                    title, overview, poster_path, popularity, tags
                }
            })
            const setRedis = await redis.del("dataMovie")
            res.status(201).json(response.data)
        } catch (error) {
            res.status(401).json(error)
        }
    }

    static async putMovieHandler(req, res) {
        const idParams = req.params.id
        const { title, overview, poster_path, popularity, tags } = req.body

        try {
            const response = await axios({
                method: "PUT",
                url: urlMovies + `/${idParams}`,
                data: {
                    title, overview, poster_path, popularity, tags
                }
            })
            const setRedis = await redis.del("dataMovie")
            res.status(200).json(response.data)
        } catch (error) {
            res.status(401).json(error)
        }
    }

    static async patchMovieHandler(req, res) {
        const idParams = req.params.id
        const { title, overview, poster_path, popularity, tags } = req.body

        try {
            const response = await axios({
                method: "PATCH",
                url: urlMovies + `/${idParams}`,
                data: {
                    title, overview, poster_path, popularity, tags
                }
            })
            const setRedis = await redis.del("dataMovie")
            res.status(200).json(response.data)
        } catch (error) {
            res.status(401).json(error)
        }
    }

    static async deleteMovieHandler(req, res) {
        const idParams = req.params.id

        try {
            const response = await axios({
                method: "DELETE",
                url: urlMovies + `/${idParams}`
            })
            const setRedis = await redis.del("dataMovie")
            res.status(200).json(response.data)
        } catch (error) {
            res.status(401).json(error)
        }
    }

}

module.exports = MOviesController