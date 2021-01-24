const { gql } = require('apollo-server');
const axios = require('axios');
const Redis = require("ioredis");
const redis = new Redis();

const typeDefs = gql`
    type Movie {
        _id: String
        data: Data
    }

    type Data {
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
    }

    extend type Query{
        movies: [Movie]
        movie(_id: ID): Movie
    }

    input movieInput {
            title: String!,
            overview: String!,
            poster_path: String!,
            popularity: Float!,
            tags: [String!]
    }

    extend type Mutation{
        addMovie(movie: movieInput) : Movie

        deleteMovie(_id: String): Movie

        putUpdateMovie(_id: String, movie:movieInput) : Movie

        patchUpdateMovie(
            _id:String
            title: String
            overview: String
            poster_path: String
            popularity: Float
            tags: [String]
        ) : Movie
    }
`;

const resolvers = {
    Query: {
        movies: () => {
            return axios({
                url: `http://localhost:3002/movies`,
                method: "GET"
            })
            .then(({ data }) => {
                console.log(data, "masuk ke data");
                return data
            })
            .catch(error => {
                console.log(error);
            })
        },
        // movies: async () => {
        
        //     try {
        //         const movie = await redis.get("dataMovie")
        //         if (movie) {
        //             console.log(movie, "dari redis")
        //             return JSON.parse(movie)
        //         } else {
        //             const response = await axios({
        //                 url: "http://localhost:3002/movies",
        //                 method: "GET"
        //             })
        //             // const setRedis = await redis.set("dataMovie", JSON.stringify(response.data), "EX", 60)
        //             console.log(response.data,"dari graph ql<<<<<")
        //             return response.data
        //         }
        //     } catch (error) {
        //         console.log(error);
        //     }
        // },
        movie: (parent, args, context, info) => {
            const { _id } = args
            return axios({
                url: `http://localhost:3002/movies/${_id}`,
                method: "GET"
            })
            .then(({data}) => {
                return data
            })
            .catch(err => {
                console.log(err);
            })
        }
    },
    Mutation: {
        addMovie: async (parent, args, context, info) => {

            try {
                const { title, overview, poster_path, popularity, tags } = args.movie
    
                const response = await axios({
                    url: `http://localhost:3002/movies`,
                    method: "POST",
                    data: {
                        title, overview, poster_path, popularity, tags
                    }
                })
                const setRedis = await redis.del("dataMovie")
                return response.data
            } catch (error) {
                console.log(error);
            }
        },

        deleteMovie: async (parent, args, context, info) => {

            try {
                const { _id } = args
                const response = await axios({
                    url: `http://localhost:3002/movies/${_id}`,
                    method: "DELETE",
                })
                const setRedis = await redis.del("dataMovie")
                return response.data
            } catch (error) {
                console.log(error)
            }
        },

        putUpdateMovie: async (parent, args, context, info) => {

            try {
                const { _id } = args
                const { title, overview, poster_path, popularity, tags } = args.movie
                const response = await axios({
                    url: `http://localhost:3002/movies/${_id}`,
                    method: "PUT",
                    data: {
                        title, overview, poster_path, popularity, tags
                    }
                })
                const setRedis = await redis.del("dataMovie")
                return response.data
            } catch (error) {
                console.log(error.response);
            }
        },

        patchUpdateMovie: async (parent, args, context, info) => {

            try {
                const { title, overview, poster_path, popularity, tags, _id } = args
                const response = await axios({
                    url: `http://localhost:3002/movies/${_id}`,
                    method: "PATCH",
                    data: {
                        title, overview, poster_path, popularity, tags
                    }
                })
                const setRedis = await redis.del("dataMovie")
                return response.data
            } catch (error) {
                console.log(error)                
            }
        }
        
    }
}

module.exports = {
    typeDefs, resolvers
}