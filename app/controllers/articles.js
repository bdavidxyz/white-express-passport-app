var mongoose = require('mongoose')
  , Index = mongoose.model('Article')


exports.list = function(req, res){
  var perPage = 5
    , page = req.param('page') > 0 ? req.param('page') : 0

  Index
    .find({})
    .populate('user', 'name')
    .sort({'createdAt': -1}) // sort by date
    .limit(perPage)
    .skip(perPage * page)
    .exec(function(err, articles) {
      if (err) return res.render('500')
      Index.count().exec(function (err, count) {
        res.render('articles/list', {
            title: 'List of Indexes'
          , articles: articles
          , page: page
          , pages: count / perPage
        })
      })
    })
}
