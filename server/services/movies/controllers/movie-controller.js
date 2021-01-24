const MovieModel = require("../models/movie")

class Movie {

    static async getMovieHandler(req, res) {

        try {
            const Movie = await MovieModel.findAllMovie()
            // console.log(Movie);
            res.status(200).json(Movie)
            console.log(Movie,"ini Movie")
        } catch (error) {
            res.status(401).json(error)
        }
    }

    static async getMovieByIdHandler(req, res) {
        const idParams = req.params.id
  
        try {
            const Movie = await MovieModel.findByIdMovie(idParams)
            res.status(200).json(Movie)
        } catch (error) {
            res.status(401).json(error)
        }
    }
    

    static async postMovieHandler(req, res) {
        const { title, overview, poster_path, popularity, tags } = req.body
        console.log(req, "masuk ke sini");
      
        try {
            const dataMovie = await MovieModel.createMovie({
                title, overview, poster_path, popularity, tags
            })
            res.status(201).json(dataMovie.ops[0])
        } catch (error) {
            res.status(401).json(error)
        }
    }

    static async putMovieHandler(req, res) {
        const newId = req.params.id
        const { title, overview, poster_path, popularity, tags } = req.body

        const data = {
            title, overview, poster_path, popularity, tags
        }

        try {
            const putData = await MovieModel.updateMovie(newId, data)
            res.status(200).json(putData.value)
        } catch (error) {
            res.status(401).json(error)
        }
    }

    static async patchMovieHandler(req, res) {
        const newId = req.params.id
        const { title, overview, poster_path, popularity, tags } = req.body
        const data = {
            title, overview, poster_path, popularity, tags
        }

        try {
            const putData = await MovieModel.updateMovie(newId, data)
            res.status(200).json(putData.value)
        } catch (error) {
            res.status(401).json(error)
        }
    }

    static async deleteMovieHandler(req, res) {
        const newId = req.params.id
        try {
            const delData = await MovieModel.deleteMovie(newId)
            res.status(200).json(delData.value)
        } catch (error) {
            res.status(401).json(error)
        }
    }
}

module.exports = Movie