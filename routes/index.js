"use strict";

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { lang: req.locale });
};