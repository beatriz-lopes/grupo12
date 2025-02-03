window.onload = exibirDados;

document.getElementById('btn-cadastrar').addEventListener('click', function () {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    
    if(nome && email) {
        salvarDados(nome, email);
    } else {
        alert('Preencha todos os campos!');      
    }
});

document.getElementById('btn-limpar').addEventListener('click', function () {
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
});

function salvarDados(nome, email) {
    const dataEnvio = new Date().toLocaleString();

    const usuario = {
        nome: nome,
        email: email,
        data: dataEnvio
    };

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    usuarios.push(usuario);

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    exibirDados();


}

function exibirDados(){
    const lista = document.getElementById('lista-usuarios');

    lista.innerHTML = '';

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    usuarios.forEach(function (usuario) {
        const itemLista = document.createElement('li');
        itemLista.textContent = `Data: ${usuario.data} | Nome: ${usuario.nome} | E-mail: ${usuario.email}`;
        lista.appendChild(itemLista);
    });

}