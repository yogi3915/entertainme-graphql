const db = require("../config/config_db")
const tvSeries = db.collection("tvSeries")
const { ObjectID } = require("mongodb")

class TvSeriesModel {
    static findAllTvSeries() {
        return tvSeries.find({}).toArray()
    }

    static findByIdTvSeries(idParams) {
        return tvSeries.findOne({
            _id: ObjectID(idParams)
        })
    }

    static createTvSeries(data) {
        return tvSeries.insertOne({
            data
        })
    }

    static updateTvSeries(idParams, data) {
        return tvSeries.findOneAndUpdate({
            _id: ObjectID(idParams)
        }, {
            $set: { data }
        }, {
            returnOriginal: false
        })
    }

    static deleteTvSeries(idParams) {
        return tvSeries.findOneAndDelete({
            _id: ObjectID(idParams)
        }, {
            returnOriginal: false
        })
    }

}

module.exports = TvSeriesModel