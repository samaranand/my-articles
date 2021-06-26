const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const Article = require('./models/article')
const articlesRouter = require('./routes/articles')
const blogsRouter = require('./routes/blogs')

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
app.use(cors())


app.use('/articles', articlesRouter)
app.use('/blogs', blogsRouter)

app.get('/', (req, res)=>{
    res.send(`Thank u for coming here. You can use 'https://samaranand-blogs.herokuapp.com/api' this for ur own UI`)
})

app.get('/admin', async (req, res)=>{
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/index', {articles: articles})
})


app.get('/api', async (req, res)=>{
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    const tmp_articles = []
    await articles.forEach(e => {
        tmp_articles.push({
            createdAt: e.createdAt,
            title: e.title,
            slug: e.slug,
            description: e.description,
            data: e.sanitizedHtml
        })
    })
    try{
        res.status(200).send(tmp_articles)
    } catch(e){
        res.status(400).send(e)
    }
})



app.listen(port, ()=>{
    console.log("Server running at " + port);
})