const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const userRoutes = require('./routes/userRoutes')

connectDB();

const app = express()

app.use(express.json())
    // app.use(express.urlencoded({ extended: false }))

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.status(200).json({ msg: "Says Hello" })
})

// routes
app.use('/api/users', userRoutes)
app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})