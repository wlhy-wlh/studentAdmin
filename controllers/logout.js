exports.logout = function(req,res){
    delete req.session['s_id'];
    res.redirect('/login');
}