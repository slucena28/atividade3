const api = "http://localhost:3000/clientes";

const form = document.getElementById("formCliente");
const lista = document.getElementById("listaClientes");

// LISTAR CLIENTES
async function listarClientes() {
  const resposta = await fetch(api);
  const clientes = await resposta.json();

  lista.innerHTML = "";

  clientes.forEach(cliente => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${cliente.nome} - ${cliente.email}
      <button onclick="excluirCliente(${cliente.id})">Excluir</button>
    `;

    lista.appendChild(li);
  });
}

// CADASTRAR CLIENTE
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;

  await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nome, email })
  });

  form.reset();
  listarClientes();
});

// EXCLUIR CLIENTE
async function excluirCliente(id) {
  await fetch(`${api}/${id}`, {
    method: "DELETE"
  });

  listarClientes();
}

// INICIALIZA
listarClientes();
