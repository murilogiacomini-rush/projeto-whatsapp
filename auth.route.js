const { Router } = require("express");
const connection = require("../db/connection");

const router = Router();

router.post("/auth", async (req, res) => {
    const { telefone, senha } = req.body;

    if (!telefone || !senha) {
        return res.status(400).json({
            mensagem: "Informe o telefone e a senha."
        });
    }

    try {
        const [usuarios] = await connection.execute(
            "SELECT * FROM usuarios WHERE telefone = ? AND senha = ?",
            [telefone, senha]
        );

        if (usuarios.length === 0) {
            return res.status(401).json({
                mensagem: "Telefone ou senha incorretos."
            });
        }

        return res.status(200).json({
            mensagem: "Autenticado com sucesso!"
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro interno ao realizar login."
        });
    }
});

module.exports = router;
