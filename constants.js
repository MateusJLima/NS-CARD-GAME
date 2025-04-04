const ELEMENTOS = {
    TRISTEZA: { nome: "Tristeza", cor: "#3498db", icone: "💧" },
    RAIVA: { nome: "Raiva", cor: "#e74c3c", icone: "🔥" },
    MEDO: { nome: "Medo", cor: "#9b59b6", icone: "⚡" },
    ALEGRIA: { nome: "Alegria", cor: "#f1c40f", icone: "🌪️" },
    NOJO: { nome: "Nojo", cor: "#2ecc71", icone: "🌍" },
    ITEM: { nome: "Item", cor: "#95a5a6", icone: "✨" }
};

const TIPOS_CARTA = ["ataque", "defesa", "suporte", "item", "energia"];
const MAX_ENERGIA = 6;
const MAX_MAO = 10;

function criarCartaEnergia(sentimento) {
    return {
        nome: `Energia ${ELEMENTOS[sentimento].nome}`, // Agora mostra "Energia Nojo", "Energia Alegria", etc.
        tipo: "energia",
        sentimento: sentimento.toLowerCase(),
        elemento: ELEMENTOS[sentimento],
        custo: null,
        efeito: null
    };
}

const cartaItemBolinhos = {
    nome: "Bolinhos de Chuva",
    tipo: "item",
    subtipo: "cura",
    efeito: {
        descricao: "Cura +5 de vida de um aliado",
        acao: (alvo) => {
            alvo.vidaAtual = Math.min(alvo.vidaAtual + 5, alvo.vidaMax);
        },
        custo: { qualquer: 2 }
    }
};
