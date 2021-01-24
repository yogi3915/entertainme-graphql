const db = require('../config/config-db')
const movie = db.collection("movies")
const { ObjectID } = require("mongodb")

class MovieModel {
    static findAllMovie() {
        return movie.find({}).toArray()
    }

    static findByIdMovie(idParams) {
        return movie.findOne({
            _id: ObjectID(idParams)
        })
    }

    static createMovie(data) {
        return movie.insertOne({
            data
        })
    }

    static updateMovie(idParams, data) {
        return movie.findOneAndUpdate({
            _id: ObjectID(idParams)
        }, {
            $set: { data }
        }, {
            returnOriginal: false
        })
    }

    static deleteMovie(idParams) {
        return movie.findOneAndDelete({
            _id: ObjectID(idParams)
        }, {
            returnOriginal: false
        })
    }

}

module.exports = MovieModel