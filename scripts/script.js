window.onload = exibirDados;

document.getElementById('btn-cadastrar').addEventListener('click', function (event) {
    event.preventDefault(); // Impede o envio do formulário

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    if (nome && email) {
        salvarDados(nome, email);
    } else {
        alert('Preencha todos os campos!');
    }
});

document.getElementById('btn-limpar').addEventListener('click', function () {
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
});

document.getElementById('btn-excluir-todos').addEventListener('click', function () {
    localStorage.removeItem('usuarios');
    exibirDados(); // Atualiza a lista visualmente
});

document.getElementById('input-pesquisa').addEventListener('input', function () {
    const termo = this.value.toLowerCase();
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuariosFiltrados = usuarios.filter(usuario => 
        usuario.nome.toLowerCase().includes(termo) || 
        usuario.email.toLowerCase().includes(termo)
    );

    exibirDadosFiltrados(usuariosFiltrados);
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

function exibirDados() {
    const lista = document.getElementById('lista-usuarios');
    lista.innerHTML = '';

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    usuarios.forEach(function (usuario, index) {
        const itemLista = document.createElement('li');
        itemLista.textContent = `Data: ${usuario.data} | Nome: ${usuario.nome} | E-mail: ${usuario.email}`;

        // Botão de exclusão
        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.classList.add('btn-excluir');
        btnExcluir.addEventListener('click', function () {
            excluirUsuario(index);
        });

        itemLista.appendChild(btnExcluir);
        lista.appendChild(itemLista);
    });
}

function exibirDadosFiltrados(usuarios) {
    const lista = document.getElementById('lista-usuarios');
    lista.innerHTML = '';

    usuarios.forEach(function (usuario, index) {
        const itemLista = document.createElement('li');
        itemLista.textContent = `Data: ${usuario.data} | Nome: ${usuario.nome} | E-mail: ${usuario.email}`;

        // Botão de exclusão
        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.classList.add('btn-excluir');
        btnExcluir.addEventListener('click', function () {
            excluirUsuario(index);
        });

        itemLista.appendChild(btnExcluir);
        lista.appendChild(itemLista);
    });
}

function excluirUsuario(index) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.splice(index, 1); // Remove o usuário do array
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    exibirDados(); // Atualiza a lista visualmente
}