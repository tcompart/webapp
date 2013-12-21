exports.edit = function(req, res) {
var new_article = req.params.article;
res.render('wiki/edit', {
title: 'Editing Wiki',
wiki: wiki_entry
})
}