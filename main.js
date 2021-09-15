
document.addEventListener('DOMContentLoaded', () => {
  let btnComplemento = document.getElementById('btnComplemento');
  btnComplemento.addEventListener('click', adicionarComplemento);

  //Assim que a aplicação carregar, o display do input será igual a "none", ou seja, "invisível"
  document.getElementById('complemento').style.display = 'none';
  document.getElementById('lblComplemento').style.display = 'none';
});

function adicionarComplemento() {
  let complemento = document.getElementById('complemento');
  const titleComplemento = document.getElementById('lblComplemento');

  complemento.style.display == 'block' ? complemento.style.display = 'none' : complemento.style.display = 'block';
  titleComplemento.style.display == 'block' ? titleComplemento.style.display = 'none' : titleComplemento.style.display = 'block';
}

function validacao() {
  let alerta = "";
  let inputs = document.querySelectorAll('.obrigatorios');
  for (var input of inputs.values()) {
    if (input.value == "") {
      if (input.required == 'block' || input.style.display == '') {
        alerta = alerta + input.name + ";\n";
      };
    };
  };

  if (alerta !== "") {
    let alertPagina = "Preencha os campos a seguir antes de cadastrar: \n";

    alertPagina = alertPagina + alerta;
    return alertPagina
  }

  return alerta;
}

// ====== Array dos dados ======
const dados = [];

const formulario = document.forms.dados;
formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  let mensagem = validacao();
  if (mensagem !== "") {
    alert(mensagem);
    mensagem = "";
    return false;
  }

  // ====== Buscando a data atual ======
  let gerarData = new Date();
  let data = (gerarData.getDate() + '/' + gerarData.getMonth() + '/' + gerarData.getFullYear());

  // ====== Objeto com dados de um usuário em específico ======
  const dadosUsuario = {
    nome: formulario.Nome.value,
    email: formulario.Email.value,
    telefone: formulario.Telefone.value,
    estadoCivil: formulario.EstadoCivil.value,
    escolaridade: formulario.Escolaridade.value,
    cep: formulario.CEP.value,
    rua: formulario.Rua.value,
    numeroCasa: formulario.NumeroDaCasa.value,
    complemento: formulario.Complemento.value,
    bairro: formulario.Bairro.value,
    cidade: formulario.Cidade.value,
    estado: formulario.Estado.value,
    data
  }

  // ====== Evita o recarregamento da página ======

  // ====== Inserindo os dados daquele usuário no Array ======
  dados.push(dadosUsuario);

  // ====== Chamamos a função que cria a tabela de Consulta ======
  atualizarTabela();
  // ====== Chamamos a função que mostra a quantidade de usuários ======
  numeroUsuarios();
  // ====== Chamamos a função que limpa os dados preenchidos ======
  limparCampos();
})

// ====== Conteúdo da tabela: ======
const bodyTable = document.querySelector('tbody');

// ====== Função que cria a tabela de consulta com base nos dados adicionados ======
function atualizarTabela() {
  // ====== Limpando seu conteúdo para não duplicar os dados ======
  bodyTable.innerHTML = '';

  for (dadosUsuario of dados) {
    // ====== Tabela em si ======
    bodyTable.innerHTML += `
    <tr>
      <td>${dadosUsuario.nome}</td>
      <td>${dadosUsuario.email}</td>
      <td>${dadosUsuario.telefone}</td>
      <td>${dadosUsuario.estadoCivil}</td>
      <td>${dadosUsuario.escolaridade}</td>
      <td>${dadosUsuario.cep}</td>
      <td>${dadosUsuario.rua}</td>
      <td>${dadosUsuario.numeroCasa}</td>
      <td>${dadosUsuario.complemento}</td>
      <td>${dadosUsuario.bairro}</td>
      <td>${dadosUsuario.cidade}</td>
      <td>${dadosUsuario.estado}</td>
      <td>${dadosUsuario.data}</td>
      <td>
        <div>
          <img src="imagens/delete.png" alt="delete" id="imgDelete" width="40" onclick="excluirUsuario(${dados.indexOf(dadosUsuario)})">
        </div>
      </td>
    </tr>
    `;
  }
}

// ====== Função que exclui os dados do usuário de uma posição em específicio ======
function excluirUsuario(posicao) {
  dados.splice(posicao, 1);
  atualizarTabela();
  numeroUsuarios();
}

// ====== Função que mostra a quantidade de usuários cadastrados ======
function numeroUsuarios() {
  const qtdUser = document.getElementById('qtdUsuarios');
  let qtdAtual = dados.length;

  qtdUser.innerHTML = '';
  qtdUser.innerHTML += qtdAtual;
}

// ====== Inputs que aceitam só números: ======
document.querySelector('.numeros')
  .addEventListener('input', function (e) {
    if (isNaN(parseInt(e.data))) {
      const valorDoCampo = e.target.value;
      const valor = valorDoCampo.substr(0, valorDoCampo.length - 1);
      e.target.value = valor;
    }
  })

function limparCampos() {
  const inputs = document.querySelectorAll('input');
  for (let input of inputs.values()) {
    input.value = '';
  }
  const selects = document.querySelectorAll('select');
  for (let select of selects.values()) {
    select.value = '';
  }
}