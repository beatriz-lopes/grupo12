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

document.addEventListener('DOMContentLoaded', function () {
    function formatarData() {
        const data = new Date();
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês começa do 0
        const ano = data.getFullYear();
        const horas = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');
        const segundos = String(data.getSeconds()).padStart(2, '0');
        return `${dia}/${mes}/${ano}, ${horas}:${minutos}:${segundos}`;
    }

    function adicionarUsuario(nome, email) {
        const listaUsuarios = document.getElementById('lista-usuarios');
        const li = document.createElement('li');
        const dataFormatada = formatarData(); 
        li.innerHTML = `
            <span>Data: ${dataFormatada} | Nome: ${nome} | E-mail: ${email}</span>
            <button class="btn-excluir">Excluir</button>
        `;

        const btnExcluir = li.querySelector('.btn-excluir');
        btnExcluir.addEventListener('click', function () {
            if (confirm(`Tem certeza que deseja excluir o usuário ${nome} (${email})?`)) {
                listaUsuarios.removeChild(li);
            }
        });

        listaUsuarios.appendChild(li);
    }

    const formCadastro = document.querySelector('form');
    formCadastro.addEventListener('submit', function (event) {
        event.preventDefault();
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        adicionarUsuario(nome, email);
        formCadastro.reset();
    });

    const btnExcluirTodos = document.getElementById('btn-excluir-todos');
    btnExcluirTodos.addEventListener('click', function () {
        const listaUsuarios = document.getElementById('lista-usuarios');
        if (listaUsuarios.children.length > 0) {
            if (confirm('Tem certeza que deseja excluir todos os usuários?')) {
                listaUsuarios.innerHTML = '';
            }
        } else {
            alert('Não há usuários para excluir.');
        }
    });
});
