const UserModel = require('../model/usermodel')
const MovieModel = require('../model/moviemodel')
const ReviewModel = require('../model/reviewmodel')
const AddUser = async (req, res) => {
    try {
        const { username, email } = req.body
        const adduser = new UserModel({
            username, email
        })
        const saveuser = await adduser.save()
        if (saveuser) {
            return res.status(200).json({
                message: "user details has been added",
                user: saveuser
            })
        }

    } catch (error) {
        console.log(error);
    }
}
// --------------------AllUser----------------//
const AllUser = async (req, res) => {
    try {
        const alluser = await UserModel.find()
        if (alluser) {
            return res.status(200).json({
                message: "all user get sucessfully",
                userdata: alluser
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "all user data not found ",
            error: error.message
        })
    }
}
// -------------------AddMovie---------------
const AddMovie = async (req, res) => {
    try {
        const { user_id, moviename } = req.body
        const addmovie = new MovieModel({
            user_id, moviename
        })
        const savemovie = await addmovie.save()
        if (savemovie) {
            return res.status(200).json({
                message: "movie data is added",
                moviedata: savemovie
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "movie data not added ",
            error: error.message
        })
    }
}
//------------------------------------------- AllMovie----------------------------////
const AllMovie = async (req, res) => {
    try {
        const Moviedata = await MovieModel.find()
        if (Moviedata) {
            return res.status(200).json({
                message: "all movie data get done",
                allmovie: Moviedata
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "all movie data not found ",
            error: error.message
        })
    }
}
// ----------------LookUpMovie------------//
const LookUpMovie = async (req, res) => {
    try {
        const loolupdata = await MovieModel.aggregate([
            { $project: { "__v": 0 } },

            {
                $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user details"
                }
            }
        ])
        if (loolupdata) {
            return res.status(200).json({
                message: 'lookm up data get done',
                lookup: loolupdata
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "user and movie data not found ",
            error: error.message
        })
    }
}
// --------------------AddReview----------------//
const AddReview = async (req, res) => {
    try {
        const { user_id, movie_id, review } = req.body
        const addreview = new ReviewModel({
            user_id, movie_id, review
        })
        const savereview = await addreview.save()
        if (savereview) {
            return res.status(200).json({
                message: "review is added",
                review: savereview
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "review not added",
            error: error.message
        })
    }
}
// -----------------------ReviewLookup---------------//
const ReviewLookup = async (req, res) => {
    try {
        const allreview = await ReviewModel.aggregate([
            { $project: { __v: 0 } },
            { $sort: { _id: -1 } },
            {
                $lookup: {
                    from: "movies",
                    localField: "movie_id",
                    foreignField: "_id",
                    as: 'Movie details',
                    pipeline: [
                        {
                            $lookup: {
                                from: "users",
                                localField: "user_id",
                                foreignField: "_id",
                                as: 'user details'
                            }
                        }
                    ],
                    as: "Movie and user details"
                }
            }
        ])
        if (allreview) {
            return res.status(200).json({
                message: "all review look up data get",
                review_data: allreview
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "can't get review lookup data",
            error: error.message
        })
    }
}
module.exports = {
    AddUser,
    AllUser,
    AddMovie,
    AllMovie,
    LookUpMovie,
    AddReview,
    ReviewLookup

}