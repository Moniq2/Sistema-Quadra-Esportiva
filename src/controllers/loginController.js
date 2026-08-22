const loginService = require("../services/loginService");

async function fazerLogin(req, res) {

    try {

        const { email, senha } = req.body;

        const jogador = await loginService.fazerLogin(
            email,
            senha
        );

        return res.status(200).json({
            mensagem: "Login realizado com sucesso.",
            usuario: jogador
        });

    } catch (error) {

        return res.status(401).json({
            erro: error.message || "Email ou senha inválidos."
        });

    }
}

module.exports = {
    fazerLogin
};