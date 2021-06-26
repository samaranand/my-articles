const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const Article = require('./models/article')
const articlesRouter = require('./routes/articles')

const app = express()
const connectionURL = process.env.MONGODB_URL
const port = process.env.PORT
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

app.use('/articles', articlesRouter)


app.get('/', async (req, res)=>{
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/index', {articles: articles})
})






app.listen(port, ()=>{
    console.log("Server running at " + port);
})