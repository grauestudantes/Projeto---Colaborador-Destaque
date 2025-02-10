const btnLogin = document.querySelector('button#btnLogin');

btnLogin.addEventListener('click', function() {

    const nome = document.querySelector('input#txtNome').value;
    const senha = document.querySelector('input#passWord').value;

    const nomeVazio = (nome.trim === "");
    const senhaVazia = (nome.trim === "");

    if (nomeVazio || senhaVazia) {
        alert('Preencha as informações corretamente!')
    }
});