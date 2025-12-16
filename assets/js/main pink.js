/*
	Paradigm Shift by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
//coloque seu dataLayer aqui abaixo


//inicializa dataLayer se não existir
window.dataLayer = window.dataLayer || [];
//evento de page_view
document.addEventListener("DOMContentLoaded", () => {
  dataLayer.push({
    event: "page_view",
    page_location: window.location.href,
    page_path: "/martech/gato",
    page_title: document.title
  });
});

//eventos gato e cachorro
 document.addEventListener("DOMContentLoaded", function () {

    const botaoCachorro = document.getElementById("botao-cachorro");
    const botaoGato = document.getElementById("botao-gato");

    if (botaoCachorro) {
      botaoCachorro.addEventListener("click", function () {
        dataLayer.push({
          event: "button_click",
          element_id: "cachorro",
          element_name: "cachorro"
        });
      });
    }

    if (botaoGato) {
      botaoGato.addEventListener("click", function () {
        dataLayer.push({
          event: "button_click",
          element_id: "gato",
          element_name: "gato"
        });
      });
    }

  });

  //evento de visibilidade do elemento
document.addEventListener("DOMContentLoaded", function () {
      const elemento = document.querySelector("#imagem-visivel");
      if (!elemento) {
        console.log("Elemento não encontrado");
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          console.log("Intersection entry:", entry);
          if (entry.isIntersecting) {
            console.log("Elemento visível! Disparando dataLayer...");
            dataLayer.push({
              event: "element_visible",
              element_id: "gato-feliz",
              element_name: "Gatinho feliz"
            });
        // observer.disconnect();
          }
        });
      }, {
        threshold: 0.8 // 30% visível
      });

      observer.observe(elemento);
    });

//evento de clique nos botões ctas
document.addEventListener("DOMContentLoaded", () => {
  const botao = document.querySelector("#veja-mais");

  if (!botao) return;

  botao.addEventListener("click", function () {
    console.log("Clique no botão #veja-mais");

    dataLayer.push({
      event: "button_click",
      element_id: "veja-mais",
      element_name: "Learn More"
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const botao = document.querySelector("#comece-agora");

  if (!botao) return;

  botao.addEventListener("click", function () {
    console.log("Clique no botão #comece-agora");

    dataLayer.push({
      event: "button_click",
      element_id: "comece-agora",
      element_name: "Get Started"
    });
  });
});


//evento de clique nas redes sociais do footer
document.addEventListener("DOMContentLoaded", function () {
  // Seleciona todos os links de redes sociais no footer
  const socialLinks = document.querySelectorAll("ul.icons a");

  if (!socialLinks.length) {
    console.log("[SOCIAL] Nenhum link de rede social encontrado.");
    return;
  }

  socialLinks.forEach(function (link) {
    link.addEventListener("click", function () {
     
      const labelEl = link.querySelector(".label");
      const socialNetwork = labelEl ? labelEl.textContent.trim() : null;

      const href = link.getAttribute("href");

      console.log("[SOCIAL] Clique em rede social:", socialNetwork, href);

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "social_click",
        social_network: socialNetwork,   
        social_href: href,              
      });
    });
  });
});

//evento de abertura do modal ao clicar no botão enviar
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const botaoEnviar = document.querySelector('input[type="submit"]');
  const modal = document.querySelector("#modal-formulario");
  const fechar = document.querySelector("#fechar-modal");

  if (!form || !botaoEnviar || !modal) return;

  botaoEnviar.addEventListener("click", function (event) {
    event.preventDefault(); // impede o envio imediato

    // Se quiser taguear aqui:

	const assuntoSelecionado =
          document.getElementById("assunto")?.value || "nao_informado";

    dataLayer.push({
          event: "form_submit",
          form_name: "contato_martech",
          form_subject: assuntoSelecionado,
          page_path: window.location.pathname
        });

    modal.style.display = "flex"; // mostra modal
  });

  fechar.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Fecha ao clicar fora da caixa
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector("#modal-formulario");

  function trackModalView(modalId) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "modal_view",
      modal_id: modalId,
      modal_name: "Formulario Enviado"
    });

    console.log("[MODAL] Exibição → modal_view:", modalId);
  }

  // Função que abre o modal
  function abrirModal() {
    modal.style.display = "flex";
    trackModalView("modal-formulario");
  }

  // Exemplo: abrir ao clicar no botão do formulário
  const botaoEnviar = document.querySelector('input[type="submit"]');
  if (botaoEnviar) {
    botaoEnviar.addEventListener("click", function (event) {
      event.preventDefault();
      abrirModal();
    });
  }
});

//coloque seu dataLayer aqui acima

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			default:   ['1681px',   null       ],
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Hack: Enable IE workarounds.
		if (browser.name == 'ie')
			$body.addClass('is-ie');

	// Mobile?
		if (browser.mobile)
			$body.addClass('is-mobile');

	// Scrolly.
		$('.scrolly')
			.scrolly({
				offset: 100
			});

	// Polyfill: Object fit.
		if (!browser.canUse('object-fit')) {

			$('.image[data-position]').each(function() {

				var $this = $(this),
					$img = $this.children('img');

				// Apply img as background.
					$this
						.css('background-image', 'url("' + $img.attr('src') + '")')
						.css('background-position', $this.data('position'))
						.css('background-size', 'cover')
						.css('background-repeat', 'no-repeat');

				// Hide img.
					$img
						.css('opacity', '0');

			});

			$('.gallery > a').each(function() {

				var $this = $(this),
					$img = $this.children('img');

				// Apply img as background.
					$this
						.css('background-image', 'url("' + $img.attr('src') + '")')
						.css('background-position', 'center')
						.css('background-size', 'cover')
						.css('background-repeat', 'no-repeat');

				// Hide img.
					$img
						.css('opacity', '0');

			});

		}

	// Gallery.
		$('.gallery')
			.on('click', 'a', function(event) {

				var $a = $(this),
					$gallery = $a.parents('.gallery'),
					$modal = $gallery.children('.modal'),
					$modalImg = $modal.find('img'),
					href = $a.attr('href');

				// Not an image? Bail.
					if (!href.match(/\.(jpg|gif|png|mp4)$/))
						return;

				// Prevent default.
					event.preventDefault();
					event.stopPropagation();

				// Locked? Bail.
					if ($modal[0]._locked)
						return;

				// Lock.
					$modal[0]._locked = true;

				// Set src.
					$modalImg.attr('src', href);

				// Set visible.
					$modal.addClass('visible');

				// Focus.
					$modal.focus();

				// Delay.
					setTimeout(function() {

						// Unlock.
							$modal[0]._locked = false;

					}, 600);

			})
			.on('click', '.modal', function(event) {

				var $modal = $(this),
					$modalImg = $modal.find('img');

				// Locked? Bail.
					if ($modal[0]._locked)
						return;

				// Already hidden? Bail.
					if (!$modal.hasClass('visible'))
						return;

				// Stop propagation.
					event.stopPropagation();

				// Lock.
					$modal[0]._locked = true;

				// Clear visible, loaded.
					$modal
						.removeClass('loaded')

				// Delay.
					setTimeout(function() {

						$modal
							.removeClass('visible')

						setTimeout(function() {

							// Clear src.
								$modalImg.attr('src', '');

							// Unlock.
								$modal[0]._locked = false;

							// Focus.
								$body.focus();

						}, 475);

					}, 125);

			})
			.on('keypress', '.modal', function(event) {

				var $modal = $(this);

				// Escape? Hide modal.
					if (event.keyCode == 27)
						$modal.trigger('click');

			})
			.on('mouseup mousedown mousemove', '.modal', function(event) {

				// Stop propagation.
					event.stopPropagation();

			})
			.prepend('<div class="modal" tabIndex="-1"><div class="inner"><img src="" /></div></div>')
				.find('img')
					.on('load', function(event) {

						var $modalImg = $(this),
							$modal = $modalImg.parents('.modal');

						setTimeout(function() {

							// No longer visible? Bail.
								if (!$modal.hasClass('visible'))
									return;

							// Set loaded.
								$modal.addClass('loaded');

						}, 275);

					});

})(jQuery);