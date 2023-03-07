const LoginHistory = require('../models/login.model')
const getPagination = require('../utils/getPagination')
const mongoose = require('mongoose')

const paginationHelper = require('../helpers/customPaginatedLabels')
const loginHistory = async (req, res) => {
    const { page, size } = req.query


    const myCustomLabels = {
        totalDocs: 'itemCount',
        docs: 'itemsList',
        limit: 'perPage',
        page: 'currentPage',
        nextPage: 'next',
        prevPage: 'prev',
        totalPages: 'pageCount',
        pagingCounter: 'slNo',
        meta: 'paginator',
    };




    const { limit, offset } = getPagination(page, size)
    LoginHistory.paginate({}, { limit, offset, customLabels: myCustomLabels, sort: { logindate: -1 } })
        .then((data) => {
            res.json(data)
        })

}
const loginsByUser = async (req, res) => {

    if (!id) return res.status(400).json({ message: 'User?' })

    return await LoginHistory.find({ userid: id })
}


const loginsTopFiveByUser = async (req, res) => {


    let { id, page, size } = req.query
    if (!id) return res.status(400).json({ message: 'User?' })

    page = page < 0 ? 0 : 1

    const pipeLine = [
        {
            $match: {
                userid: mongoose.Types.ObjectId(
                    "63f011af8c037899ba984a9d"
                ),
            },
        },
        {
            $sort:

            {
                logindate: -1,
            },
        },
        {
            $group:

            {
                _id: "$userid",
                count: {
                    $count: {},
                },
            },
        },
    ]

    const logins = await LoginHistory.aggregate([
        {
            $match: {
                userid: mongoose.Types.ObjectId(
                    "63f011af8c037899ba984a9d"
                ),
            },
        },
        {
            $sort:

            {
                logindate: -1,
            },
        },

    ])

    const q = { userid: id }
    const { limit, offset } = getPagination(page, size)
    LoginHistory.paginate(q, { limit, offset, customLabels: paginationHelper.labels, sort: { logindate: -1 } })
        .then((data) => {
            res.json(data)
        })


}


module.exports = {
    loginHistory,
    loginsTopFiveByUser,
    loginsByUser
}