document.addEventListener("DOMContentLoaded", () => {
    const jogo = new Jogo();
    const btnFinalizarTurno = document.getElementById("end-turn-btn");
    const maoJogador = document.getElementById("player-hand");
    const slotsJogador = document.querySelectorAll('#player-field .slot');
    const messageBox = document.getElementById("message-box");

    // Inicialização do deck
    jogo.jogadores[0].deck.push(cartaKaue, cartaMoisés, carta21, cartaItemBolinhos);
    for (let i = 0; i < 5; i++) jogo.jogadores[0].puxarCarta();

    function criarElementoCarta(index, isSlot) {
        const carta = jogo.jogadores[0].mao[index];
        const cardEl = document.createElement('div');
        cardEl.className = 'card';
        cardEl.dataset.index = index;
        cardEl.dataset.tipo = carta.tipo;
        
        if (carta.tipo === "energia") {
            cardEl.style.background = carta.elemento.cor;
            cardEl.innerHTML = `<h3>${carta.nome}</h3><p>${carta.elemento.icone}</p>`;
        } else {
            const buttonsHTML = isSlot && carta.tipo !== "item" ? `
                <div class="card-buttons">
                    <button class="btn-habilidade" data-tipo="basica">${carta.habilidades.basica.nome}</button>
                    ${carta.habilidades.especial ? `
                    <button class="btn-habilidade" data-tipo="especial">${carta.habilidades.especial.nome}</button>` : ''}
                </div>` : '';
            
            cardEl.innerHTML = `
                <h3>${carta.nome}</h3>
                <p>${carta.tipo.toUpperCase()}</p>
                ${carta.vidaAtual !== undefined ? `<p>VIDA: ${carta.vidaAtual}/${carta.vidaMax}</p>` : ''}
                ${buttonsHTML}
            `;
        }
        
        if (!isSlot) {
            cardEl.addEventListener('click', () => selecionarCarta(index));
        }
        return cardEl;
    }

    function selecionarCarta(index) {
        // Encontra o primeiro slot vazio
        const slotDisponivel = Array.from(slotsJogador).find(slot => 
            !jogo.jogadores[0].slots[slot.dataset.type]
        );

        if (!slotDisponivel) {
            messageBox.textContent = "Todos os slots estão ocupados!";
            setTimeout(() => messageBox.textContent = "", 2000);
            return;
        }

        const tipoSlot = slotDisponivel.dataset.type;
        const resultado = jogo.selecionarCarta(0, index, tipoSlot);

        if (resultado.success) {
            slotDisponivel.innerHTML = '';
            slotDisponivel.appendChild(criarElementoCarta(index, true));
            renderizarMao();
        } else {
            messageBox.textContent = resultado.message;
            setTimeout(() => messageBox.textContent = "", 2000);
        }
    }

    function renderizarMao() {
        maoJogador.innerHTML = '';
        jogo.jogadores[0].maoDisponivel.forEach((carta, index) => {
            const originalIndex = jogo.jogadores[0].mao.indexOf(carta);
            maoJogador.appendChild(criarElementoCarta(originalIndex, false));
        });
    }

    btnFinalizarTurno.addEventListener('click', () => {
        // Adiciona energia
        const sentimentos = Object.keys(ELEMENTOS).filter(k => k !== "ITEM");
        const sentimentoAleatorio = sentimentos[Math.floor(Math.random() * sentimentos.length)];
        jogo.jogadores[0].mao.push(criarCartaEnergia(sentimentoAleatorio));
        
        // Finaliza turno
        jogo.iniciarTurno();
        renderizarMao();
    });

    renderizarMao();
    jogo.iniciarTurno();
});
