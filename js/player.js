class Jogador {
    constructor(nome) {
        this.nome = nome;
        this.deck = [];
        this.mao = [];
        this.slots = {
            ataque: null,
            defesa: null,
            suporte: null
        };
        this.energia = {
            alegria: 0,
            tristeza: 0,
            raiva: 0,
            medo: 0,
            nojo: 0
        };
        this.pontosRealidade = 0;
        this.vida = 30;
    }

    get maoDisponivel() {
        return this.mao.filter(carta => 
            !Object.values(this.slots).includes(carta)
        );
    }

    puxarCarta() {
        if (this.deck.length > 0 && this.maoDisponivel.length < MAX_MAO) {
            const carta = this.deck.pop();
            this.mao.push(carta);
            return carta;
        }
        return null;
    }

    moverParaSlot(carta, tipoSlot) {
        if (this.slots[tipoSlot] === null) {
            this.slots[tipoSlot] = carta;
            return true;
        }
        return false;
    }

    removerCartaSlot(tipoSlot) {
        this.slots[tipoSlot] = null;
    }
  }
