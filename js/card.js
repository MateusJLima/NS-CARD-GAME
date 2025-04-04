class Carta {
    constructor(nome, tipo, sentimento, stats) {
        this.nome = nome;
        this.tipo = tipo;
        this.sentimento = sentimento || null;
        this.elemento = sentimento ? ELEMENTOS[sentimento.toUpperCase()] : ELEMENTOS.SUPORTE;
        this.ataque = stats.ataque || 0;
        this.defesa = stats.defesa || 0;
        this.vidaMax = stats.vida || 0;
        this.vidaAtual = stats.vida || 0;
        this.habilidades = {
            basica: stats.habilidadeBasica,
            especial: stats.habilidadeEspecial || null
        };
        this.draggable = true;
    }
}

// Cartas
const cartaKaue = new Carta(
    "Kauê",
    "ataque",
    "tristeza",
    {
        ataque: 8,
        defesa: 3,
        vida: 10,
        habilidadeBasica: {
            nome: "Chute Bolha",
            custo: {},
            efeito: (alvo) => alvo.vidaAtual -= 8,
            descricao: "Causa 8 de dano"
        },
        habilidadeEspecial: {
            nome: "Campo de Bolhas",
            custo: { tristeza: 2 },
            efeito: (alvo) => alvo.vidaAtual -= 11,
            descricao: "Causa 11 de dano"
        }
    }
);

const cartaMoisés = new Carta(
    "Moisés",
    "defesa",
    "raiva",
    {
        ataque: 6,
        defesa: 9,
        vida: 10,
        habilidadeBasica: {
            nome: "Bloqueio Cálido",
            custo: {},
            efeito: (alvo) => alvo.defesa += 9,
            descricao: "+9 de defesa"
        },
        habilidadeEspecial: {
            nome: "Barreira Chamuscada",
            custo: { raiva: 3 },
            efeito: (alvo) => {
                alvo.defesa += 14;
                alvo.vidaAtual -= 6;
            },
            descricao: "+14 defesa e 6 de dano"
        }
    }
);

const carta21 = new Carta(
    "21, a Conselheira",
    "suporte",
    null,
    {
        ataque: 3,
        defesa: 7,
        vida: 8,
        habilidadeBasica: {
            nome: "Conselho Sábio",
            custo: {},
            efeito: () => console.log("Reduz custo de energias"),
            descricao: "-1 energia para habilidades"
        },
        habilidadeEspecial: {
            nome: "Intervenção Divina",
            custo: { qualquer: 3 },
            efeito: () => console.log("Cancela habilidade oponente"),
            descricao: "Bloqueia habilidade especial"
        }
    }
);
