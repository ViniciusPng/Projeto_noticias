module.exports.formulario_inclusao_noticia = function(application, req, res){
    res.render("admin/form_add_noticia.ejs", {validacao: {}, noticia : {}});
}

module.exports.noticias_salvar = function(application, req , res){
    var noticia = req.body;

        req.assert('titulo','Título é obrigatorio').notEmpty();
        req.assert('resume','Resumo é obrigatorio').notEmpty();
        req.assert('resume','Resumo deve conter entre 10 e 100 caracteres').len(10, 100);
        req.assert('autor','Autor é obrigatorio').notEmpty();
        req.assert('data_noticia','Data é obrigatorio').notEmpty().isDate({format: 'YYYY-MM-DD'});
        req.assert('noticia','Noticia é obrigatorio').notEmpty();

        var erros = req.validationErrors();

        if(erros){
            res.render("admin/form_add_noticia", {validacao : erros, noticia : noticia});
            return;
        }

        var connection = application.config.dbConnection();
        var noticiasModel = new application.app.models.NoticiasDAO(connection);

        noticiasModel.salvarNoticia(noticia, function (error, result){
            res.redirect('/noticias');
        });
}