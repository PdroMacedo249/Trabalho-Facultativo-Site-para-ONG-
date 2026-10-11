document.addEventListener('DOMContentLoaded', () => {

  // 1. Seleção dos elementos do DOM
  const container = document.getElementById('conteudo-principal');
  const links = document.querySelectorAll('nav a[data-pagina]');

  // Mapeamento de títulos da aba do navegador
  const titulosPaginas = {
    inicio: 'ONG Esperança Viva - Página Inicial',
    projeto: 'ONG Esperança Viva - Nossos Projetos',
    cadastro: 'ONG Esperança Viva - Cadastro'
  };

  // 2. Templates com o conteúdo visual de cada aba
  const templates = {
    inicio: `
      <div class="alerta" role="status" aria-live="polite">
          <strong>Informativo:</strong> Seja bem-vindo à plataforma da ONG Esperança Viva! Confira nossos projetos sociais e cadastre-se para ajudar nossa causa.
      </div>

      <section id="apresentacao">
          <h2>Sobre a Nossa Organização</h2>
          <img src="../imagens/logo.jpg" alt="Logotipo da ONG Esperança Viva com mãos entrelaçadas simbolizando união e apoio comunitário">
          <p>Somos uma instituição sem fins lucrativos dedicada a apoiar famílias em situação de vulnerabilidade social através de projetos educativos e comunitários.</p>
      </section>

      <section id="contato">
          <h2>Fale Conosco</h2>
          <address>
              <p><strong>E-mail:</strong> <a href="mailto:contato@esperancaviva.org">contato@esperancaviva.org</a></p>
              <p><strong>Telefone:</strong> <a href="tel:+5511987654321">(11) 98765-4321</a></p>
              <p><strong>Endereço:</strong> Rua da Solidariedade, 123 - Centro</p>
          </address>
      </section>
    `,

    projeto: `
      <h2>Nossos Projetos e Como Ajudar</h2>

      <section id="voluntariado">
          <h2>Trabalho Voluntário</h2>
          <div class="lista-projetos">
              <article class="card-projeto">
                  <h3>
                      Aulas de Reforço Escolar 
                      <span class="badge badge-alerta">Vagas Limitadas</span>
                  </h3>
                  <p>Buscamos voluntários para ensinar matemática e português para crianças do bairro aos sábados.</p>
              </article>

              <article class="card-projeto">
                  <h3>
                      Oficinas de Tecnologia 
                      <span class="badge badge-sucesso">Status: Ativo</span>
                  </h3>
                  <p>Aulas básicas de informática para jovens e adultos em busca do primeiro emprego.</p>
              </article>
          </div>
      </section>

      <section id="doacoes">
          <h2>
              Campanha de Doações 
              <span class="badge badge-sucesso">Aberto para Doações</span>
          </h2>
          <p>Sua ajuda financeira ou de suprimentos mantém nossas portas abertas. Veja como doar:</p>
          <ul>
              <li>Alimentos não perecíveis</li>
              <li>Materiais escolares (cadernos, lápis, canetas)</li>
              <li>Roupas e calçados em bom estado</li>
          </ul>
          <p><strong>Chave PIX para doação:</strong> pix@esperancaviva.org</p>
      </section>
    `,

    cadastro: `
      <h2>Formulário de Cadastro de Voluntário / Doador</h2>

      <div class="alerta">
          <strong>Atenção:</strong> Preencha todos os dados com atenção. Os campos são obrigatórios para entrarmos em contato.
      </div>

      <form action="#" method="POST">
          <fieldset>
              <legend>Dados Pessoais</legend>
              <label for="nome">Nome Completo:</label><br>
              <input type="text" id="nome" name="nome" required placeholder="Digite seu nome"><br><br>

              <label for="cpf">CPF:</label><br>
              <input type="text" id="cpf" name="cpf" required pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}" placeholder="000.000.000-00"><br><br>

              <label for="email">E-mail:</label><br>
              <input type="email" id="email" name="email" required placeholder="seuemail@exemplo.com"><br><br>

              <label for="telefone">Telefone / WhatsApp:</label><br>
              <input type="tel" id="telefone" name="telefone" required pattern="\\(\\d{2}\\) \\d{4,5}-\\d{4}" placeholder="(00) 00000-0000"><br><br>

              <label for="nascimento">Data de Nascimento:</label><br>
              <input type="date" id="nascimento" name="nascimento" required><br><br>
          </fieldset>
          <br>
          <fieldset>
              <legend>Endereço</legend>
              <label for="cep">CEP:</label><br>
              <input type="text" id="cep" name="cep" required pattern="\\d{5}-\\d{3}" placeholder="00000-000"><br><br>

              <label for="cidade">Cidade:</label><br>
              <input type="text" id="cidade" name="cidade" required><br><br>

              <label for="estado">Estado:</label><br>
              <input type="text" id="estado" name="estado" required maxlength="2" placeholder="UF"><br><br>
          </fieldset>
          <br>
          <fieldset>
              <legend>Preferências de Apoio</legend>
              <p>Como você gostaria de ajudar a nossa ONG?</p>
              <input type="checkbox" id="voluntario" name="apoio" value="voluntario">
              <label for="voluntario">Trabalho Voluntário</label><br>

              <input type="checkbox" id="doacao_financeira" name="apoio" value="financeiro">
              <label for="doacao_financeira">Doação Financeira</label><br>

              <input type="checkbox" id="doacao_suprimentos" name="apoio" value="suprimentos">
              <label for="doacao_suprimentos">Doação de Suprimentos / Materiais</label><br>
          </fieldset>
          <br>
          <button type="submit">Enviar Cadastro</button>
      </form>

      <div class="toast">
          Formulário pronto para envio!
      </div>
    `
  };

  // 3. Função para renderizar a página e atualizar o estado ativo no menu
  function navegarPara(pagina) {
    if (templates[pagina] && container) {
      // Injeta o HTML da página solicitada
      container.innerHTML = templates[pagina];

      // Salva a página atual no localStorage
      localStorage.setItem('ultima_pagina_ong', pagina);

      // Atualiza o título da aba
      if (titulosPaginas[pagina]) {
        document.title = titulosPaginas[pagina];
      }

      // Atualiza a classe de destaque nos links do menu
      links.forEach(link => {
        if (link.getAttribute('data-pagina') === pagina) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      // Se a página for cadastro, gerencia a submissão e a gravação de cadastros no localStorage
      if (pagina === 'cadastro') {
        const formulario = container.querySelector('form');
        if (formulario) {
          formulario.addEventListener('submit', (event) => {
            event.preventDefault();

            // Captura os dados do formulário em um objeto JavaScript
            const formData = new FormData(formulario);
            const dadosCadastro = {
              nome: formData.get('nome'),
              cpf: formData.get('cpf'),
              email: formData.get('email'),
              telefone: formData.get('telefone'),
              nascimento: formData.get('nascimento'),
              cep: formData.get('cep'),
              cidade: formData.get('cidade'),
              estado: formData.get('estado'),
              dataEnvio: new Date().toISOString()
            };

            // Recupera cadastros anteriores salvos ou inicializa um array vazio
            const cadastrosExistentes = JSON.parse(localStorage.getItem('cadastros_ong')) || [];

            // Adiciona o novo objeto ao array
            cadastrosExistentes.push(dadosCadastro);

            // Converte o array atualizado em String e grava no localStorage
            localStorage.setItem('cadastros_ong', JSON.stringify(cadastrosExistentes));

            alert('Cadastro enviado e salvo com sucesso!');
            formulario.reset();
          });
        }
      }

      window.scrollTo(0, 0);
    }
  }

  // 4. Mapeamento de cliques
  links.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const pagina = link.getAttribute('data-pagina');
      navegarPara(pagina);
    });
  });

  // 5. Inicialização: restaura a última página navegada ou carrega 'inicio'
  const paginaSalva = localStorage.getItem('ultima_pagina_ong') || 'inicio';
  navegarPara(paginaSalva);
});