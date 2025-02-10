window.onload = exibirDados;

document.getElementById('btn-cadastrar').addEventListener('click', function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();

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
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    if (usuarios.length === 0) {
        alert('Não há usuários para excluir.');
    } else if (confirm('Tem certeza que deseja excluir todos os usuários?')) {
        localStorage.removeItem('usuarios');
        exibirDados();
    }
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
    const usuario = { nome, email, data: dataEnvio };

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
    
    if (confirm(`Tem certeza que deseja excluir o usuário ${usuarios[index].nome} (${usuarios[index].email})?`)) {
        usuarios.splice(index, 1);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        exibirDados();
    }
}
