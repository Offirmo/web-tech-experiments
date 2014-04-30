
exports.index = function(req, res) {
	res.render('index', { title: 'Test', articles: articles, current_article: current_article, sections: sections })
};
