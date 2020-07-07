// since this will be executed by node then we are going to use "require"

const express = require('express')

const router = express.Router()

// instantiate our Express App | This came from MAx
// what we are doing here is just we are mapping the
// request, response provided by the Nuxt to the Express JS
// so that we can use the exact same syntax we are doing with Express
// And so that our "req, res.json" will work correctly
const app = express()
router.use((req, res, next) => {
    Object.setPrototypeOf(req, app.request)
    Object.setPrototypeOf(res, app.response)
    req.res = res
    res.req = req
    next()
})
// End -Express instantiation and Mapping



router.post('/track-data', (req, res) => {
     console.log('Stored Data!', req.body.data)
     res.status(200).json({message: 'Success!'})
})


module.exports = {
    path: '/api',  // so this will be the Root Route of our Express
                  // if we wanted to reach the track-data then "/api/track-data"
    handler: router,
}