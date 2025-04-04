class Jogo {
    constructor() {
        this.jogadores = [
            new Jogador("Jogador"),
            new Jogador("Oponente")
        ];
        this.turno = 0;
        this.fase = "inicio";
    }

    selecionarCarta(jogadorIdx, cartaIdx, tipoSlot) {
        const jogador = this.jogadores[jogadorIdx];
        
        // Verifica se o índice é válido
        if (cartaIdx < 0 || cartaIdx >= jogador.mao.length) {
            return { success: false, message: "Carta inválida!" };
        }

        const carta = jogador.mao[cartaIdx];

        if (["item", "energia"].includes(carta.tipo)) {
            return { success: false, message: "Essa carta não luta!" };
        }

        if (jogador.moverParaSlot(carta, tipoSlot)) {
            return { success: true };
        }
        return { success: false, message: "Slot já ocupado!" };
    }

    iniciarTurno() {
        this.turno++;
        this.fase = "selecao";
        this.jogadores.forEach(jogador => {
            if (jogador.maoDisponivel.length < MAX_MAO) {
                jogador.puxarCarta();
            }
        });
    }
              }
