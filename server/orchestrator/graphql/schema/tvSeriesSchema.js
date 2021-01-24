const { gql } = require('apollo-server');
const axios = require('axios');

const typeDefs = gql`
    type tvSerie {
        _id: String
        data: DataTvSerie
    }

    type DataTvSerie {
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
    }

    extend type Query{
        tvSeries: [tvSerie]
        tvSerie(_id:String): tvSerie
    }

    # extend type Mutation{
    #     addMovie(
    #         title: String
    #         overview: String
    #         poster_path: String
    #         popularity: Float
    #         tags: [String]
    #     ) : Movie

    #     deleteMovie(_id:String): Movie

    #     putUpdateMovie(
    #         _id:String
    #         title: String
    #         overview: String
    #         poster_path: String
    #         popularity: Float
    #         tags: [String]
    #     ) : Movie

    #     patchUpdateMovie(
    #         _id:String
    #         title: String
    #         overview: String
    #         poster_path: String
    #         popularity: Float
    #         tags: [String]
    #     ) : Movie
    # }
`;

const resolvers = {
    Query: {
        tvSeries: () => {
            return axios({
                url: "http://localhost:3001/tv-series",
                method: "GET"
            })
            .then(({data}) => {
                console.log(data);
                return data
            })
            .catch(err => {
                console.log(err);
            })
        },
        tvSerie: (parent, args, context, info) => {
            const { _id } = args
            return axios({
                url: `http://localhost:3001/tv-series/${_id}`,
                method: "GET"
            })
            .then(({data}) => {
                return data
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
    // Mutation: {
    //     addMovie: (parent, args, context, info) => {
    //         const { title, overview, poster_path, popularity, tags } = args
    //         return axios({
    //             url: `http://localhost:3002/movies`,
    //             method: "POST",
    //             data: {
    //                 title, overview, poster_path, popularity, tags
    //             }
    //         })
    //         .then(({data}) => {
    //             return data
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    //     },

    //     deleteMovie: (parent, args, context, info) => {
    //         const { _id } = args
    //         return axios({
    //             url: `http://localhost:3002/movies/${_id}`,
    //             method: "DELETE",
    //         })
    //         .then(({data}) => {
    //             return data
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    //     },

    //     putUpdateMovie: (parent, args, context, info) => {
    //         const { title, overview, poster_path, popularity, tags, _id } = args
    //         return axios({
    //             url: `http://localhost:3002/movies/${_id}`,
    //             method: "PUT",
    //             data: {
    //                 title, overview, poster_path, popularity, tags
    //             }
    //         })
    //         .then(({data}) => {
    //             return data
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    //     },

    //     patchUpdateMovie: (parent, args, context, info) => {
    //         const { title, overview, poster_path, popularity, tags, _id } = args
    //         return axios({
    //             url: `http://localhost:3002/movies/${_id}`,
    //             method: "PATCH",
    //             data: {
    //                 title, overview, poster_path, popularity, tags
    //             }
    //         })
    //         .then(({data}) => {
    //             return data
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    //     }
    // }
}

module.exports = {
    typeDefs, resolvers
}