const telefone = document.getElementById("telefone");
const pais = document.getElementById("pais");
const campoSenha = document.getElementById("senha");
const entrar = document.getElementById("entrar");
const erro = document.getElementById("erro");

entrar.addEventListener("click", async function () {
    const numero = telefone.value.trim();
    const senha = campoSenha.value.trim();

    erro.textContent = "";

    if (numero === "") {
        erro.textContent = "Digite seu número de telefone.";
        telefone.focus();
        return;
    }

    const numeroLimpo = numero.replace(/\D/g, "");

    if (numeroLimpo.length < 10) {
        erro.textContent = "Digite um número de telefone válido.";
        telefone.focus();
        return;
    }

    if (senha === "") {
        erro.textContent = "Digite sua senha.";
        campoSenha.focus();
        return;
    }

    // Junta o código do país com o número digitado.
    const telefoneCompleto = pais.value + numeroLimpo;

    entrar.textContent = "Entrando...";
    entrar.disabled = true;

    try {
        const resposta = await fetch("http://localhost:3000/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                telefone: telefoneCompleto,
                senha: senha
            })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            erro.textContent = dados.mensagem || "Não foi possível entrar.";
            return;
        }

        alert(dados.mensagem);
        
    } catch (e) {
        console.error(e);
        erro.textContent =
            "Não foi possível conectar à API. Verifique se o servidor está ligado.";
    } finally {
        entrar.textContent = "Continuar";
        entrar.disabled = false;
    }
});
