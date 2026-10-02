// =========================
// PRODUTOS
// =========================

const produtos = [
  {
    id: 1,
    nome: "Espresso",
    categoria: "Café",
    descricao: "Café espresso intenso e aromático.",
    preco: 6.00,
    
  },

  {
    id: 2,
    nome: "Cappuccino",
    categoria: "Café",
    descricao: "Espresso cremoso com leite vaporizado.",
    preco: 10.00,
  },

  {
    id: 3,
    nome: "Latte",
    categoria: "Café",
    descricao: "Café espresso suave com bastante leite.",
    preco: 11.00,
  },

  {
    id: 4,
    nome: "Iced Latte",
    categoria: "Gelado",
    descricao: "Latte gelado, refrescante e cremoso.",
    preco: 12.00,
     icone: "🧋"
  },

  {
    id: 5,
    nome: "Iced Mocha",
    categoria: "Gelado",
    descricao: "Café gelado com chocolate e leite.",
    preco: 14.00,
  },

  {
    id: 6,
    nome: "Cookie",
    categoria: "Doce",
    descricao: "Cookie crocante por fora e macio por dentro.",
    preco: 7.00,
  },

  {
    id: 7,
    nome: "Bolo de Morango",
    categoria: "Doce",
    descricao: "Fatia de bolo de morango fofinho.",
    preco: 9.00,
    icone: "🍰"
  },

  {
    id: 8,
    nome: "Croissant",
    categoria: "Salgado",
    descricao: "Croissant amanteigado e crocante.",
    preco: 8.00,
  },

  {
    id: 9,
    nome: "Pão de Queijo",
    categoria: "Salgado",
    descricao: "Pão de queijo quentinho e macio.",
    preco: 6.00,
    icone: "🍞"
  }
];


// =========================
// CARRINHO
// =========================

const carrinho = [];


// =========================
// ELEMENTOS
// =========================

const app = document.querySelector("#app");

const botoesMenu =
  document.querySelectorAll("nav button");


// =========================
// NAVEGAÇÃO
// =========================

function marcarMenuAtivo(rota) {

  botoesMenu.forEach(botao => {

    botao.classList.toggle(
      "ativo",
      botao.dataset.rota === rota
    );

  });
}


function irPara(rota) {

  marcarMenuAtivo(rota);

  if (rota === "inicio") {
    mostrarInicio();
  }

  if (rota === "cardapio") {
    mostrarCardapio();
  }

  if (rota === "carrinho") {
    mostrarCarrinho();
  }

  if (rota === "adicionar") {
    mostrarAdicionarProduto();
  }

  if (rota === "sobre") {
    mostrarSobre();
  }
}


// =========================
// INÍCIO
// =========================

function mostrarInicio() {

  app.innerHTML = `

    <section class="hero">

      <h1>☀️ Sunflower Coffee</h1>

      <p>
        Um cantinho especial para apreciar bons cafés,
        doces e momentos tranquilos.
      </p>

      <div class="acoes">

        <button
          class="botao"
          id="btnCardapio">

          Ver cardápio

        </button>

        <button
          class="botao secundario"
          id="btnCarrinho">

          Ver carrinho

        </button>

      </div>

    </section>


    <h2>☕ Nossos produtos</h2>

    <p>
      Confira alguns dos favoritos da Sunflower Coffee.
    </p>


    <div class="produtos">

      ${produtos.slice(0, 4).map(produto => `

        <div class="produto">

          <div class="icone">
            ${obterIcone(produto.categoria)}
          </div>

          <span class="categoria">
            ${produto.categoria}
          </span>

          <h3>
            ${produto.nome}
          </h3>

          <p class="descricao">
            ${produto.descricao}
          </p>

          <div class="preco">
            R$ ${formatarPreco(produto.preco)}
          </div>

        </div>

      `).join("")}

    </div>


    <div class="contador">

      Produtos disponíveis:
      <strong>${produtos.length}</strong>

    </div>

  `;


  document.querySelector("#btnCardapio")
    .addEventListener(
      "click",
      () => irPara("cardapio")
    );


  document.querySelector("#btnCarrinho")
    .addEventListener(
      "click",
      () => irPara("carrinho")
    );
}


// =========================
// CARDÁPIO
// =========================

function mostrarCardapio() {

  app.innerHTML = `

    <h1>☕ Cardápio</h1>

    <p>
      Escolha seu café, doce ou salgado favorito.
    </p>

    <div class="produtos">

      ${produtos.map(produto => `

        <div class="produto">

          <div class="icone">
            ${obterIcone(produto.categoria)}
          </div>

          <span class="categoria">
            ${produto.categoria}
          </span>

          <h3>
            ${produto.nome}
          </h3>

          <p class="descricao">
            ${produto.descricao}
          </p>

          <div class="preco">
            R$ ${formatarPreco(produto.preco)}
          </div>

          <button
            class="botao adicionar-carrinho"
            data-id="${produto.id}">

            🛒 Adicionar ao carrinho

          </button>

        </div>

      `).join("")}

    </div>

  `;


  document
    .querySelectorAll(".adicionar-carrinho")
    .forEach(botao => {

      botao.addEventListener(
        "click",
        function() {

          const id =
            Number(this.dataset.id);

          adicionarAoCarrinho(id);

        }
      );

    });
}


// =========================
// ADICIONAR AO CARRINHO
// =========================

function adicionarAoCarrinho(id) {

  const produto = produtos.find(
    produto => produto.id === id
  );


  if (produto) {

    carrinho.push(produto);

    alert(
      `${produto.nome} foi adicionado ao carrinho!`
    );

  }
}


// =========================
// CARRINHO
// =========================

function mostrarCarrinho() {

  app.innerHTML = `

    <h1>🛒 Carrinho</h1>

    <div id="conteudoCarrinho"></div>

  `;

  renderizarCarrinho();
}


function renderizarCarrinho() {

  const conteudo =
    document.querySelector("#conteudoCarrinho");


  if (carrinho.length === 0) {

    conteudo.innerHTML = `

      <div class="vazio">

        Seu carrinho está vazio.

      </div>

    `;

    return;
  }


  let total = 0;


  conteudo.innerHTML = `

    ${carrinho.map((produto, indice) => {

      total += produto.preco;


      return `

        <div class="carrinho-item">

          <div>

            <strong>
              ${produto.nome}
            </strong>

            <br>

            R$ ${formatarPreco(produto.preco)}

          </div>


          <button
            class="excluir remover-carrinho"
            data-indice="${indice}">

            Remover

          </button>

        </div>

      `;

    }).join("")}


    <div class="total">

      Total:
      R$ ${formatarPreco(total)}

    </div>

  `;


  document
    .querySelectorAll(".remover-carrinho")
    .forEach(botao => {

      botao.addEventListener(
        "click",
        function() {

          const indice =
            Number(this.dataset.indice);

          carrinho.splice(indice, 1);

          renderizarCarrinho();

        }
      );

    });
}


// =========================
// ADICIONAR PRODUTO
// =========================

function mostrarAdicionarProduto() {

  app.innerHTML = `

    <h1>➕ Adicionar Produto</h1>

    <p>
      Cadastre um novo produto no cardápio.
    </p>


    <form id="formProduto">

      <div class="campo">

        <label for="nome">
          Nome
        </label>

        <input
          id="nome"
          type="text"
          placeholder="Ex: Café Americano"
          required
        />

      </div>


      <div class="campo">

        <label for="categoria">
          Categoria
        </label>

        <select id="categoria" required>

          <option value="">
            Selecione uma categoria
          </option>

          <option value="Café">
            Café
          </option>

          <option value="Gelado">
            Gelado
          </option>

          <option value="Doce">
            Doce
          </option>

          <option value="Salgado">
            Salgado
          </option>

        </select>

      </div>


      <div class="campo">

        <label for="descricao">
          Descrição
        </label>

        <textarea
          id="descricao"
          placeholder="Descreva o produto"
          required>
        </textarea>

      </div>


      <div class="campo">

        <label for="preco">
          Preço
        </label>

        <input
          id="preco"
          type="number"
          step="0.01"
          min="0"
          placeholder="Ex: 12.50"
          required
        />

      </div>


      <button
        class="botao"
        type="submit">

        Salvar produto

      </button>


      <div id="mensagem"></div>

    </form>

  `;


  document
    .querySelector("#formProduto")
    .addEventListener(
      "submit",
      function(evento) {

        evento.preventDefault();


        const nome =
          document.querySelector("#nome")
            .value.trim();


        const categoria =
          document.querySelector("#categoria")
            .value;


        const descricao =
          document.querySelector("#descricao")
            .value.trim();


        const preco =
          Number(
            document.querySelector("#preco").value
          );


        const novoProduto = {

          id: produtos.length + 1,

          nome,

          categoria,

          descricao,

          preco

        };


        produtos.push(novoProduto);


        document.querySelector("#mensagem")
          .innerHTML = `

            <div class="mensagem">

              Produto cadastrado com sucesso!

            </div>

          `;


        evento.target.reset();

      }
    );
}


// =========================
// SOBRE
// =========================

function mostrarSobre() {

  app.innerHTML = `

    <h1>ℹ️ Sobre a Sunflower Coffee</h1>

    <p>
      A Sunflower Coffee nasceu com a ideia de transformar
      as manhãs em momentos mais leves, tranquilos e produtivos.
    </p>

    <p>
      Inspirada na energia e na luz do girassol, nossa cafeteria
      foi pensada como um espaço onde você pode começar o dia
      com um bom café, descansar entre uma tarefa e outra ou
      encontrar um ambiente agradável para trabalhar e estudar.
    </p>

    <p>
      Seja para colocar o trabalho em dia, estudar, ler um livro
      ou simplesmente fazer uma pausa, a Sunflower Coffee busca
      oferecer um espaço acolhedor para aproveitar o seu tempo
      no seu próprio ritmo.
    </p>

    <p>
      ☀️ <strong>Sunflower Coffee:</strong>
      um pouco de energia para começar, um espaço tranquilo
      para continuar.
    </p>

  `;
}
    



// =========================
// ÍCONES
// =========================

function obterIcone(categoria) {

  if (categoria === "Café") {
    return "☕";
  }

  if (categoria === "Gelado") {
    return "🧊";
  }

  if (categoria === "Doce") {
    return "🍪";
  }

  if (categoria === "Salgado") {
    return "🥐";


  }

  return "☀️";
}


// =========================
// FORMATAR PREÇO
// =========================

function formatarPreco(preco) {

  return preco
    .toFixed(2)
    .replace(".", ",");
}


// =========================
// MENU
// =========================

botoesMenu.forEach(botao => {

  botao.addEventListener(
    "click",
    () => {

      irPara(botao.dataset.rota);

    }
  );

});


// =========================
// INICIAR A APLICAÇÃO
// =========================

mostrarInicio();