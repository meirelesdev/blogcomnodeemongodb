exports.isLogged = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.flash('error', 'Ops! Voce não tem permissão para acessar esta pagina.')
        res.redirect('/users/login')
        return
    }

    next()
}

exports.changePassword = (req, res) => {

    if ( req.body.password != req.body['password-confirm'] ) {
        req.flash('error', 'Senhas estão diferentes');
        res.redirect('/profile')
    }
        // Procurar o usuario e trocar a senha dele

    req.user.setPassword(req.body.password, async ()=>{
        
        await req.user.save()

        req.flash('success', 'Senha alterada com sucesso!')
        res.redirect('/')
    })

    //

}