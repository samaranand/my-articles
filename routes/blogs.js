const express = require('express')
const Article = require('./../models/article')

const router = express.Router()


router.get('/:slug', async (req, res)=>{
    const article = await Article.findOne({slug: req.params.slug})
    if(article == null){
        res.redirect('https://samaranand.github.io/blogs/')
    }
    res.render('blogs/show', {article: article})
})



module.exports = router;