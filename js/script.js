const btnLogin = document.querySelector('#btnLogin');

btnLogin.addEventListener('click', function() {

    const nome = document.querySelector('#txtNome').value;
    const senha = document.querySelector('#passWord').value;

    const nomeVazio = (nome.trim() === '');
    const senhaVazia = (senha.trim() === '');

    const nomePadrao = (/^[a-zA-ZÀ-ÿ\s']{3,}$/)
    const senhaPadrao = /^[a-zA-Z0-9#$]{3,}$/
    const nomeValido = nomePadrao.test(nome)
    const senhaValida = senhaPadrao.test(senha)


    if (nomeVazio || senhaVazia) {
        alert('Preencha as informações corretamente!')
        return;
    }

    if (!(nomeValido)) {
        alert('Nome invalido!')
        return;
    } else if (!(senhaValida)) {
        alert('Senha invalida!')
        return;
    }
});