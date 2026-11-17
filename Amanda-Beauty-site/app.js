
const paginaAtual = document.body.dataset.page;

const linksNavegacao = [
  ['Início', 'index.html', 'home'],
  ['Serviços', 'servicos.html', 'servicos'],
  ['Nosso espaço', 'sobre.html', 'sobre']
];

const areaHeader = document.querySelector('#site-header');

if (areaHeader) {
  areaHeader.innerHTML = `
    <div class="announcement">
      <span>Seu momento de beleza começa aqui</span>
      <b>✳</b>
      <span>10% OFF na primeira visita</span>
    </div>
    <header class="site-header">
      <div class="nav-wrap">
        <a href="index.html" class="brand" aria-label="Amanda Beauty, início">
          <span class="brand-mark">✳</span>
          <span class="brand-name">Amanda Beauty<small>beauty studio</small></span>
        </a>
        <nav class="nav-links" id="main-nav" aria-label="Navegação principal">
          ${linksNavegacao.map(([nome, url, chave]) => `
            <a href="${url}" class="${paginaAtual === chave ? 'active' : ''}">${nome}</a>
          `).join('')}
          <a href="agenda.html" class="${paginaAtual === 'agenda' ? 'active' : ''}">Agendamento</a>
        </nav>
        <div class="nav-actions">
          <a href="#login" class="nav-login" data-open-login>Entrar <span>↗</span></a>
          <a href="agenda.html" class="nav-book">Agendar <span>↗</span></a>
        </div>
        <button class="menu-toggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="main-nav">☰</button>
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
            <span class="brand-mark">✳</span>
            <span class="brand-name">Amanda Beauty<small>beauty studio</small></span>
          </a>
          <p>Beleza com intenção, cuidado em cada detalhe e um lugar para você respirar.</p>
        </div>
        <div class="footer-col">
          <h4>Explore</h4>
          <a href="servicos.html">Nossos serviços</a>
          <a href="sobre.html">O Ateliê</a>
          <a href="agenda.html">Agendar horário</a>
        </div>
        <div class="footer-col">
          <h4>Fale com a gente</h4>
          <p>(11) 3456-7890</p>
          <p>oi@amandabeauty.com.br</p>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram ↗</a>
        </div>
        <div class="footer-col">
          <h4>Estamos por aqui</h4>
          <p>Rua das Flores, 128</p>
          <p>São Paulo · SP</p>
          <p>Seg — Sáb · 09h às 19h</p>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 Amanda Beauty · Feito com carinho</span>
        <span>Instagram&nbsp;&nbsp; · &nbsp;&nbsp;Privacidade</span>
      </div>
    </footer>
  `;
}

const modalLogin = document.createElement('div');
modalLogin.className = 'login-modal';
modalLogin.id = 'login-modal';
modalLogin.setAttribute('aria-hidden', 'true');

modalLogin.innerHTML = `
  <button class="modal-backdrop" data-close-login aria-label="Fechar login"></button>
  <section class="login-dialog" role="dialog" aria-modal="true" aria-labelledby="login-title">
    <button class="modal-close" data-close-login aria-label="Fechar">×</button>
    <div class="modal-cover">
      <img src="assets/makeup-artista.jpeg" alt="Cliente recebendo maquiagem profissional">
      <div class="modal-cover-copy">
        <span>SEU RITUAL COMEÇA AQUI</span>
        <b>Beleza que<br>combina com você.</b>
      </div>
      <div class="cover-badge">✳ cuidado de dentro pra fora</div>
    </div>
    <div class="modal-content">
      <span class="eyebrow">OLÁ, QUE BOM TER VOCÊ</span>
      <h2 id="login-title">Que bom<br><em>que voltou.</em></h2>
      <p class="modal-intro">Entre para deixar seus próximos momentos pertinho.</p>
      
      <form class="auth-form" id="login-form">
        <label for="login-email">E-mail</label>
        <input id="login-email" type="email" autocomplete="email" placeholder="voce@email.com" required>
        
        <label for="login-password">Senha</label>
        <div class="password-wrap">
          <input id="login-password" type="password" autocomplete="current-password" placeholder="Sua senha" required minlength="6">
          <button type="button" class="password-toggle" aria-label="Mostrar senha">◉</button>
        </div>
        
        <div class="auth-options">
          <label class="check-label">
            <input type="checkbox" name="remember"> <span>Manter conectado</span>
          </label>
          <a href="#" class="forgot-link" data-demo-link>Esqueci minha senha</a>
        </div>
        
        <button class="button button-dark form-submit" type="submit">Entrar na minha conta <span>↗</span></button>
        <div class="form-feedback" role="status" aria-live="polite"></div>
      </form>

      <p class="auth-switch">É sua primeira vez? <a href="cadastro.html">Criar cadastro</a></p>
      <p class="demo-note">Demonstração visual · sem autenticação conectada</p>
    </div>
  </section>
`;

document.body.append(modalLogin);

let ultimoFoco = null;

function abrirJanelaLogin() {
  ultimoFoco = document.activeElement;
  modalLogin.classList.add('is-open');
  modalLogin.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  setTimeout(() => document.querySelector('#login-email')?.focus(), 40);
}

function fecharJanelaLogin() {
  modalLogin.classList.remove('is-open');
  modalLogin.setAttribute('aria-hidden', 'true');
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
  
  if (e.key === 'Escape') {
    fecharJanelaLogin();
  }
  
  if (e.key === 'Tab') {
    const elementosDesteModal = [...modalLogin.querySelectorAll('a[href], button:not([disabled]), input:not([disabled])')]
      .filter(el => el.offsetParent !== null);
      
    if (elementosDesteModal.length === 0) return;
    
    const primeiroItem = elementosDesteModal[0];
    const ultimoItem = elementosDesteModal[elementosDesteModal.length - 1];
    
    if (e.shiftKey && document.activeElement === primeiroItem) {
      e.preventDefault();
      ultimoItem.focus();
    } else if (!e.shiftKey && document.activeElement === ultimoItem) {
      e.preventDefault();
      primeiroItem.focus();
    }
  }
});

if (location.hash === '#login') {
  abrirJanelaLogin();
}

const botaoMenuMobile = document.querySelector('.menu-toggle');

botaoMenuMobile?.addEventListener('click', () => {
  const menuLinks = document.querySelector('.nav-links');
  const menuEstaAberto = menuLinks.classList.toggle('is-open');
  
  botaoMenuMobile.setAttribute('aria-expanded', String(menuEstaAberto));
  botaoMenuMobile.textContent = menuEstaAberto ? '×' : '☰';
});

const listaSlides = [...document.querySelectorAll('.carousel-slide')];

if (listaSlides.length > 0) {
  const trilhaSlides = document.querySelector('.carousel-track');
  const botoesBolinhas = [...document.querySelectorAll('.dot')];
  const marcadorIndice = document.querySelector('.carousel-index');
  
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
    
    if (marcadorIndice) {
      marcadorIndice.innerHTML = `0${slideAtual + 1} <span>/</span> 0${listaSlides.length}`;
    }
  }

  function iniciarRotacaoAutomatica() {
    clearInterval(temporizadorSlide);
    temporizadorSlide = setInterval(() => {
      mudarParaSlide(slideAtual + 1);
    }, 5200);
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

  const blocoCarrossel = document.querySelector('.carousel');
  
  blocoCarrossel?.addEventListener('mouseenter', () => {
    clearInterval(temporizadorSlide);
  });
  
  blocoCarrossel?.addEventListener('mouseleave', () => {
    iniciarRotacaoAutomatica();
  });

  iniciarRotacaoAutomatica();
}

const temObservador = 'IntersectionObserver' in window;

const geradorObserver = temObservador ? new IntersectionObserver((observacoes, observadorInstancia) => {
  observacoes.forEach(observacao => {
    if (observacao.isIntersecting) {
      observacao.target.classList.add('is-visible');
      observadorInstancia.unobserve(observacao.target);
    }
  });
}, { threshold: 0.12 }) : null;

document.querySelectorAll('.reveal').forEach(elemento => {
  if (geradorObserver) {
    geradorObserver.observe(elemento);
  } else {
    elemento.classList.add('is-visible');
  }
});

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
  
  const mensagem = `Pedido recebido para ${dadosFormulario.get('service')} em ${dataFormatada}, às ${dadosFormulario.get('time')}. Esta demonstração não envia a reserva automática.`;
  
  mostrarMensagemFeedback(formAtual, mensagem);
});

document.querySelector('#login-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const formAtual = e.currentTarget;
  
  if (!formAtual.reportValidity()) return;
  mostrarMensagemFeedback(formAtual, 'Dados validados com sucesso.');
});

document.querySelector('#register-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const formAtual = e.currentTarget;
  
  if (!formAtual.reportValidity()) return;
  
  const dados = new FormData(formAtual);
  const nomeUsuario = dados.get('name');
  
  try {
    localStorage.setItem('amanda-beauty-demo-profile', JSON.stringify({ 
      name: nomeUsuario, 
      email: dados.get('email') 
    }));
  } catch (erro) {
   
  }
  
  mostrarMensagemFeedback(formAtual, `Que bom ter você, ${nomeUsuario}! Seus dados foram salvos neste navegador.`);
});

document.querySelectorAll('.password-toggle').forEach(botaoOlho => {
  botaoOlho.addEventListener('click', () => {
    const inputSenha = botaoOlho.parentElement.querySelector('input');
    const estaOculta = inputSenha.type === 'password';
    
    inputSenha.type = estaOculta ? 'text' : 'password';
    botaoOlho.setAttribute('aria-label', estaOculta ? 'Ocultar senha' : 'Mostrar senha');
  });
});

document.querySelector('[data-demo-link]')?.addEventListener('click', (e) => {
  e.preventDefault();
  const formLogin = document.querySelector('#login-form');
  mostrarMensagemFeedback(formLogin, 'Para redefinir a senha, conecte um sistema de autenticação real.');
});
