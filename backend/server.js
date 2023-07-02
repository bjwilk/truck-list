const express = require('express')
const cors = require('cors')
const truckRouter = require('./routes/truckRoutes')
const connectDB = require('./mongoConnection')
const uploadRouter = require('./routes/uploadRouter');
const userRoute = require('./routes/users')
const PORT = 3001
const app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/truck', truckRouter)
app.use('/imageUpload', uploadRouter);
app.use('/users', userRoute);

app.get('/', (req, res) => {
res.send('hello trucks')
})

app.listen(process.env.PORT || PORT, async () => {
    await connectDB();
    console.log(`server is running at ${PORT}`)
  })