
const linksNavegacao = [
  ['Início', 'index.html', 'home'],
  ['Serviços', 'servicos.html', 'servicos'],
  ['Sobre', 'sobre.html', 'sobre']
];

const areaHeader = document.querySelector('#site-header');

if (areaHeader) {
  areaHeader.innerHTML = `
    <div class="announcement">
      <span>10% de desconto na primeira visita</span>
    </div>
    <header class="site-header">
      <div class="nav-wrap">
        <a href="index.html" class="brand">
          <span class="brand-name">Amanda Beauty<small>Salão de Beleza</small></span>
        </a>
        <nav class="nav-links" id="main-nav">
          ${linksNavegacao.map(([nome, url, chave]) => `
            <a href="${url}" class="${paginaAtual === chave ? 'active' : ''}">${nome}</a>
          `).join('')}
          <a href="agenda.html" class="${paginaAtual === 'agenda' ? 'active' : ''}">Agendamento</a>
        </nav>
        <div class="nav-actions">
          <a href="#login" class="nav-login" data-open-login>Entrar</a>
          <a href="agenda.html" class="nav-book">Agendar</a>
        </div>
        <button class="menu-toggle">Menu</button>
      </div>
    </header>
  `;
}

const areaFooter = document.querySelector('#site-footer');

if (areaFooter) {
  areaFooter.innerHTML = `
    <footer class="site-footer">
      <div class="footer-main">
        <div class="footer-brand">
          <a href="index.html" class="brand">
            <span class="brand-name">Amanda Beauty<small>Salão de Beleza</small></span>
          </a>
          <p>Cabelo, maquiagem e estética.</p>
        </div>
        <div class="footer-col">
          <h4>Páginas</h4>
          <a href="servicos.html">Serviços</a>
          <a href="sobre.html">Sobre</a>
          <a href="agenda.html">Agendamento</a>
        </div>
        <div class="footer-col">
          <h4>Contato</h4>
          <p>(11) 3456-7890</p>
          <p>contato@amandabeauty.com.br</p>
          <a href="https://instagram.com" target="_blank">Instagram</a>
        </div>
        <div class="footer-col">
          <h4>Endereço</h4>
          <p>Rua das Flores, 128</p>
          <p>São Paulo - SP</p>
          <p>Segunda a Sábado, 09h às 19h</p>
        </div>
      </div>
      <div class="footer-bottom">
        <span>2026 Amanda Beauty</span>
        <span>Todos os direitos reservados</span>
      </div>
    </footer>
  `;
}

const modalLogin = document.createElement('div');
modalLogin.className = 'login-modal';
modalLogin.id = 'login-modal';

modalLogin.innerHTML = `
  <button class="modal-backdrop" data-close-login></button>
  <section class="login-dialog">
    <button class="modal-close" data-close-login>X</button>
    <div class="modal-cover">
      <img src="assets/makeup-artista.jpeg" alt="Maquiagem">
      <div class="modal-cover-copy">
        <b>Área do Cliente</b>
      </div>
    </div>
    <div class="modal-content">
      <h2 id="login-title">Entrar</h2>
      <p class="modal-intro">Acesse sua conta para acompanhar seus agendamentos.</p>
      
      <form class="auth-form" id="login-form">
        <label for="login-email">E-mail</label>
        <input id="login-email" type="email" placeholder="Seu e-mail" required>
        
        <label for="login-password">Senha</label>
        <div class="password-wrap">
          <input id="login-password" type="password" placeholder="Sua senha" required minlength="6">
          <button type="button" class="password-toggle">Ver</button>
        </div>
        
        <div class="auth-options">
          <a href="#" class="forgot-link" data-demo-link>Esqueci minha senha</a>
        </div>
        
        <button class="button button-dark form-submit" type="submit">Entrar</button>
        <div class="form-feedback"></div>
      </form>

      <p class="auth-switch">Não tem conta? <a href="cadastro.html">Cadastre-se</a></p>
    </div>
  </section>
`;

document.body.append(modalLogin);

let ultimoFoco = null;

function abrirJanelaLogin() {
  ultimoFoco = document.activeElement;
  modalLogin.classList.add('is-open');
  document.body.classList.add('modal-open');
  setTimeout(() => document.querySelector('#login-email')?.focus(), 40);
}

function fecharJanelaLogin() {
  modalLogin.classList.remove('is-open');
  document.body.classList.remove('modal-open');
  ultimoFoco?.focus?.();
}

document.querySelectorAll('[data-open-login]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    abrirJanelaLogin();
  });
});

modalLogin.querySelectorAll('[data-close-login]').forEach(botao => {
  botao.addEventListener('click', fecharJanelaLogin);
});

document.addEventListener('keydown', (e) => {
  if (!modalLogin.classList.contains('is-open')) return;
  if (e.key === 'Escape') fecharJanelaLogin();
});

if (location.hash === '#login') {
  abrirJanelaLogin();
}

const botaoMenuMobile = document.querySelector('.menu-toggle');

botaoMenuMobile?.addEventListener('click', () => {
  const menuLinks = document.querySelector('.nav-links');
  const menuEstaAberto = menuLinks.classList.toggle('is-open');
  botaoMenuMobile.textContent = menuEstaAberto ? 'Fechar' : 'Menu';
});

const listaSlides = [...document.querySelectorAll('.carousel-slide')];

if (listaSlides.length > 0) {
  const trilhaSlides = document.querySelector('.carousel-track');
  const botoesBolinhas = [...document.querySelectorAll('.dot')];
  
  let slideAtual = 0;
  let temporizadorSlide;

  function mudarParaSlide(numero) {
    slideAtual = (numero + listaSlides.length) % listaSlides.length;
    trilhaSlides.style.transform = `translateX(-${slideAtual * 100}%)`;
    
    listaSlides.forEach((slide, indice) => {
      slide.classList.toggle('is-active', indice === slideAtual);
    });
    
    botoesBolinhas.forEach((bolinha, indice) => {
      bolinha.classList.toggle('is-active', indice === slideAtual);
    });
  }

  function iniciarRotacaoAutomatica() {
    clearInterval(temporizadorSlide);
    temporizadorSlide = setInterval(() => {
      mudarParaSlide(slideAtual + 1);
    }, 5000);
  }

  document.querySelector('.carousel-prev')?.addEventListener('click', () => {
    mudarParaSlide(slideAtual - 1);
    iniciarRotacaoAutomatica();
  });

  document.querySelector('.carousel-next')?.addEventListener('click', () => {
    mudarParaSlide(slideAtual + 1);
    iniciarRotacaoAutomatica();
  });

  botoesBolinhas.forEach((bolinha) => {
    bolinha.addEventListener('click', () => {
      const alvo = Number(bolinha.dataset.slide);
      mudarParaSlide(alvo);
      iniciarRotacaoAutomatica();
    });
  });

  iniciarRotacaoAutomatica();
}

document.querySelectorAll('.filter-button').forEach(botaoFiltro => {
  botaoFiltro.addEventListener('click', () => {
    const categoriaEscolhida = botaoFiltro.dataset.filter;
    
    document.querySelectorAll('.filter-button').forEach(botao => {
      botao.classList.toggle('is-active', botao === botaoFiltro);
    });
    
    document.querySelectorAll('.catalog-card').forEach(cartao => {
      const deveOcultar = categoriaEscolhida !== 'todos' && cartao.dataset.category !== categoriaEscolhida;
      cartao.classList.toggle('is-hidden', deveOcultar);
    });
  });
});

const campoData = document.querySelector('#booking-date');

if (campoData) {
  const dataHoje = new Date();
  const ano = dataHoje.getFullYear();
  const mes = String(dataHoje.getMonth() + 1).padStart(2, '0');
  const dia = String(dataHoje.getDate()).padStart(2, '0');
  
  campoData.min = `${ano}-${mes}-${dia}`;
}

function mostrarMensagemFeedback(formulario, textoAviso) {
  const caixaFeedback = formulario.querySelector('.form-feedback');
  
  if (caixaFeedback) {
    caixaFeedback.textContent = textoAviso;
    caixaFeedback.classList.add('is-visible');
  }
}

document.querySelector('#booking-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formAtual = e.currentTarget;
  if (!formAtual.reportValidity()) return;
  
  const dadosFormulario = new FormData(formAtual);
  const dataFormatada = new Date(`${dadosFormulario.get('date')}T12:00:00`).toLocaleDateString('pt-BR');
  
  const mensagem = `Agendamento solicitado para ${dadosFormulario.get('service')} no dia ${dataFormatada} às ${dadosFormulario.get('time')}.`;
  
  mostrarMensagemFeedback(formAtual, mensagem);
});

document.querySelector('#login-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const formAtual = e.currentTarget;
  
  if (!formAtual.reportValidity()) return;
  mostrarMensagemFeedback(formAtual, 'Login realizado com sucesso.');
});

document.querySelector('#register-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const formAtual = e.currentTarget;
  
  if (!formAtual.reportValidity()) return;
  
  const dados = new FormData(formAtual);
  const nomeUsuario = dados.get('name');
  
  try {
    localStorage.setItem('amanda-beauty-perfil', JSON.stringify({ 
      name: nomeUsuario, 
      email: dados.get('email') 
    }));
  } catch (erro) {
    console.log(erro);
  }
  
  mostrarMensagemFeedback(formAtual, `Cadastro realizado com sucesso, ${nomeUsuario}.`);
});

document.querySelectorAll('.password-toggle').forEach(botaoOlho => {
  botaoOlho.addEventListener('click', () => {
    const inputSenha = botaoOlho.parentElement.querySelector('input');
    const estaOculta = inputSenha.type === 'password';
    
    inputSenha.type = estaOculta ? 'text' : 'password';
    botaoOlho.textContent = estaOculta ? 'Ocultar' : 'Ver';
  });
});

document.querySelector('[data-demo-link]')?.addEventListener('click', (e) => {
  e.preventDefault();
  const formLogin = document.querySelector('#login-form');
  mostrarMensagemFeedback(formLogin, 'Entre em contato com o suporte para recuperar sua senha.');
});