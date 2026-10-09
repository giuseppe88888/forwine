/**
 * FORWINE - Modulo Wine DNA
 * Gestione del test della personalità enologica
 */

const profiliDNA = {
    p1: { titolo: "L'Aristocratico del Calice", desc: "Ami l'autorità, il rigore e la grandezza classica.", vitigni: "Barolo, Brunello di Montalcino, Amarone." },
    p2: { titolo: "Il Vulcano Indomito", desc: "Hai un'energia tellurica e detesti le mezze misure.", vitigni: "Etna Rosso, Carricante, Aglianico." },
    p3: { titolo: "L'Edonista Solare", desc: "Cerchi il piacere immediato, avvolgente e sensuale.", vitigni: "Primitivo di Manduria, Amarone, Syrah." },
    p4: { titolo: "Il Perlage Infinito", desc: "Elegante, vivace e sempre pronto a celebrare la vita.", vitigni: "Champagne, Franciacorta, Trento DOC." },
    p5: { titolo: "L'Alchimista Ribelle", desc: "Detesti le convenzioni e i vini corretti a tavolino.", vitigni: "Orange Wine, Ribolla macerata, Vitovska." },
    p6: { titolo: "Il Minimalista Alpino", desc: "Ami la purezza essenziale e i venti d'alta quota.", vitigni: "Kerner, Sylvaner, Müller Thurgau." },
    p7: { titolo: "L'Esteta Romantico", desc: "Apprezzi le sfumature sottili e i profumi eterei.", vitigni: "Pinot Nero, Etna Rosso elegante." },
    p8: { titolo: "Il Conviviale Spensierato", desc: "Per te il vino è il lubrificante perfetto dell'amicizia.", vitigni: "Lambrusco, Valpolicella, Barbera." },
    p9: { titolo: "L'Intellettuale Notturno", desc: "Ami la complessità da meditazione, il cuoio, il pepe.", vitigni: "Syrah, Sagrantino, Carignano." },
    p10: { titolo: "Il Dandy Mediterraneo", desc: "Porti con te la luce del mare e l'eleganza estiva.", vitigni: "Vermentino, Cerasuolo, Cirò Rosato." },
    p11: { titolo: "Il Romantico Decadente", desc: "Apprezzi la dolcezza aristocratica e i fichi secchi.", vitigni: "Passito, Vin Santo, Sauternes." },
    p12: { titolo: "Il Custode delle Tradizioni", desc: "Per te il vino è legato alla terra d'origine.", vitigni: "Chianti Classico, Sangiovese, Verdicchio." },
    p13: { titolo: "Il Visionario d'Avanguardia", desc: "Sei attratto dalla verticalità e dalla longevità.", vitigni: "Riesling, Timorasso, Chenin Blanc." },
    p14: { titolo: "Lo Spirito Libero Ancestrale", desc: "Autentico, energico e naturale al 100%.", vitigni: "Pet-Nat, Prosecco col Fondo, rifermentati." },
    p15: { titolo: "Il Gourmet Cosmopolita", desc: "Ami i grandi tagli bordolesi e la cucina raffinata.", vitigni: "Bolgheri, Super Tuscan, Bordeaux." },
    p16: { titolo: "Il Mistico della Foresta", desc: "Ami le nebbie autunnali e il profumo di tartufo.", vitigni: "Nebbiolo, Valtellina Superiore, Carema." },
    p17: { titolo: "La Sirena Marina", desc: "Sei guidato dalla salinità pura e dalla scogliera.", vitigni: "Greco di Tufo, Fiano, Pigato." },
    p18: { titolo: "L'Avventuriero Esotico", desc: "Curioso, espressivo e mai banale. Ami i profumi forti.", vitigni: "Gewürztraminer, Zibibbo, Malvasia." },
    p19: { titolo: "Il Cavaliere d'Altri Tempi", desc: "Paziente, austero e fedele ai valori d'onore.", vitigni: "Taurasi, Aglianico, Cannonau." },
    p20: { titolo: "Il Pop Chic", desc: "Ami la freschezza immediata e i colori tenui.", vitigni: "Valdobbiadene, Rosé di Provenza." }
};

const domandeDNA = [
    {
        titolo: "1. Qual è il tuo rito perfetto per staccare dal mondo a fine giornata?",
        opzioni: [
            { testo: "Poltrona in pelle, silenzio e una conversazione intima o un buon libro", profili: ["p1", "p3", "p9", "p11", "p19"] },
            { testo: "Calice ghiacciato al tramonto con gli amici e musica in sottofondo", profili: ["p4", "p8", "p10", "p14", "p20"] },
            { testo: "Cucina gourmet, una ricetta curata nei dettagli e luci soffuse", profili: ["p6", "p7", "p12", "p13", "p16"] },
            { testo: "Un locale fuori rotta o sapori insoliti da una bottega artigianale", profili: ["p2", "p5", "p15", "p17", "p18"] }
        ]
    },
    {
        titolo: "2. A tavola, quale elemento fa scattare l'eccellenza per te?",
        opzioni: [
            { testo: "Sapidità pura, crudi di mare e freschezza salina e tagliente", profili: ["p2", "p6", "p10", "p13", "p17"] },
            { testo: "Cotture lente al forno, brasati saporiti, consistenze avvolgenti", profili: ["p1", "p3", "p9", "p15", "p19"] },
            { testo: "Equilibrio maniacale, erbe aromatiche e profumi complessi", profili: ["p4", "p7", "p12", "p16", "p18"] },
            { testo: "Sapori rustici veraci, pane caldo, formaggi a latte crudo", profili: ["p5", "p8", "p11", "p14", "p20"] }
        ]
    },
    {
        titolo: "3. Come definiresti la tua filosofia estetica e personale?",
        opzioni: [
            { testo: "Sartoriale e autorevole: il valore autentico del tempo e della tradizione", profili: ["p1", "p4", "p7", "p12", "p15"] },
            { testo: "Spontanea e anticonformista: la bellezza sta nell'imperfezione naturale", profili: ["p2", "p5", "p8", "p14", "p18"] },
            { testo: "Passionale e magnetica: cerco intensità ed emozioni forti che lasciano il segno", profili: ["p3", "p9", "p11", "p17", "p19"] },
            { testo: "Essenziale e minimale: pochi dettagli, ma di pulizia e precisione assoluta", profili: ["p6", "p10", "p13", "p16", "p20"] }
        ]
    },
    {
        titolo: "4. Se potessi partire adesso per il fine settimana ideale:",
        opzioni: [
            { testo: "Rifugio in alta quota tra le rocce dolomitiche e aria frizzante", profili: ["p6", "p7", "p13", "p14", "p16"] },
            { testo: "Tenuta nobiliare tra le colline toscane o castello tra le vigne storiche", profili: ["p1", "p3", "p9", "p12", "p15"] },
            { testo: "Scogliera selvaggia sul mare aperto, vento e profumo di macchia", profili: ["p2", "p8", "p10", "p17", "p20"] },
            { testo: "Viaggio sensoriale alla scoperta di bottaie sotterranee e tradizioni segrete", profili: ["p4", "p5", "p11", "p18", "p19"] }
        ]
    },
    {
        titolo: "5. Cosa ti conquista durante una cena in compagnia?",
        opzioni: [
            { testo: "Conversazioni profonde e confidenziali che durano fino a notte inoltrata", profili: ["p1", "p7", "p9", "p11", "p16"] },
            { testo: "Risate spontanee, calici che tintinnano e convivialità senza pose", profili: ["p4", "p8", "p14", "p18", "p20"] },
            { testo: "Il dibattito appassionato su idee originali e scoperte insolite", profili: ["p2", "p5", "p10", "p13", "p17"] },
            { testo: "Il piacere sereno del calore umano, dell'accoglienza e del buon cibo", profili: ["p3", "p6", "p12", "p15", "p19"] }
        ]
    },
    {
        titolo: "6. La colonna sonora che meglio riflette il tuo temperamento:",
        opzioni: [
            { testo: "Grande musica orchestrale o jazz classico potente ed espressivo", profili: ["p1", "p3", "p4", "p15", "p19"] },
            { testo: "Folk acustico intimo, pianoforte minimale o musica indie ricercata", profili: ["p6", "p7", "p12", "p14", "p16"] },
            { testo: "Bossa nova, ritmi caldi mediterranei o note soul vintage", profili: ["p8", "p10", "p11", "p17", "p20"] },
            { testo: "Rock graffiante, ritmi d'avanguardia o sonorità ipnotiche", profili: ["p2", "p5", "p9", "p13", "p18"] }
        ]
    },
    {
        titolo: "7. Cosa ti infastidisce di più quando assaggi un calice di vino?",
        opzioni: [
            { testo: "L'omologazione piatta e i prodotti senz'anima creati per il supermercato", profili: ["p2", "p5", "p13", "p16", "p18"] },
            { testo: "La pesantezza stucchevole che stanca il palato dopo un solo bicchiere", profili: ["p4", "p6", "p7", "p10", "p14"] },
            { testo: "La magrezza inconsistente o l'assenza di calore e profondità", profili: ["p1", "p3", "p9", "p15", "p19"] },
            { testo: "I formalismi snob e chi tratta il vino come un esame anziché un piacere", profili: ["p8", "p11", "p12", "p17", "p20"] }
        ]
    }
];

let stepCorrenteDNA = 0;
let punteggiDNA = {};

function azzeraPunteggiDNA() {
    for (let i = 1; i <= 20; i++) {
        punteggiDNA['p' + i] = 0;
    }
}

function apriWineDNA() {
    stepCorrenteDNA = 0;
    azzeraPunteggiDNA();
    
    const quizContent = document.getElementById('quiz-dna-content');
    const resultContainer = document.getElementById('dna-result-container');
    const loadingContainer = document.getElementById('dna-loading-container');
    
    quizContent.classList.remove('dna-fade-out');
    quizContent.style.display = 'block';
    resultContainer.style.display = 'none';
    loadingContainer.style.display = 'none';
    
    mostraDomandaDNA();
    document.getElementById('modal-dna').style.display = 'flex';
}

function chiudiWineDNA() {
    document.getElementById('modal-dna').style.display = 'none';
}

function mostraDomandaDNA() {
    const q = domandeDNA[stepCorrenteDNA];
    let percentuale = Math.round(((stepCorrenteDNA + 1) / 7) * 100);
    
    let html = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <span style="font-size: 0.8rem; color: #888; text-transform: uppercase; letter-spacing: 1.5px; font-weight: bold;">Domanda ${stepCorrenteDNA + 1} di 7</span>
            <span style="font-size: 0.8rem; color: var(--gold); font-weight: bold;">${percentuale}%</span>
        </div>
        <div style="width: 100%; height: 4px; background: #EAEAEA; border-radius: 4px; margin-bottom: 25px; overflow: hidden;">
            <div style="width: ${percentuale}%; height: 100%; background: var(--bordeaux); transition: width 0.3s ease;"></div>
        </div>
        <h3 style="font-family: 'Playfair Display', serif; color: var(--text-dark); margin-bottom: 25px; font-size: 1.35rem; line-height: 1.4;">${q.titolo}</h3>
        <div style="display: flex; flex-direction: column; gap: 12px;">
    `;
    
    q.opzioni.forEach((opt, idx) => {
        html += `
            <button class="choice-card" style="text-align: left; align-items: flex-start; padding: 16px 20px; font-size: 0.95rem; border-radius: 12px; width: 100%;" onclick="rispondiDNA(${idx})">
                ${opt.testo}
            </button>
        `;
    });
    
    html += `</div>`;
    document.getElementById('dna-question-container').innerHTML = html;
}

function rispondiDNA(indiceOpzione) {
    const profiliCoinvolti = domandeDNA[stepCorrenteDNA].opzioni[indiceOpzione].profili;
    profiliCoinvolti.forEach(p => { 
        punteggiDNA[p] = (punteggiDNA[p] || 0) + 1; 
    });
    
    stepCorrenteDNA++;
    const quizContent = document.getElementById('quiz-dna-content');
    quizContent.classList.add('dna-fade-out');
    
    setTimeout(() => {
        if (stepCorrenteDNA < domandeDNA.length) {
            mostraDomandaDNA();
            quizContent.classList.remove('dna-fade-out');
        } else {
            mostraCaricamentoDNA();
        }
    }, 400);
}

function mostraCaricamentoDNA() {
    const quizContent = document.getElementById('quiz-dna-content');
    const loadingContainer = document.getElementById('dna-loading-container');
    quizContent.style.display = 'none';
    loadingContainer.classList.add('dna-fade-out');
    loadingContainer.style.display = 'block';
    
    setTimeout(() => { loadingContainer.classList.remove('dna-fade-out'); }, 50);
    setTimeout(() => {
        loadingContainer.classList.add('dna-fade-out');
        setTimeout(() => { calcolaRisultatoDNA(); }, 400);
    }, 2500);
}

function calcolaRisultatoDNA() {
    let vincitore = 'p1';
    let maxPunti = -1;
    for (let p in punteggiDNA) {
        if (punteggiDNA[p] > maxPunti) { maxPunti = punteggiDNA[p]; vincitore = p; }
    }
    
    const res = profiliDNA[vincitore];
    document.getElementById('dna-profile-title').innerText = res.titolo;
    document.getElementById('dna-profile-desc').innerText = res.desc;
    document.getElementById('dna-profile-grapes').innerText = res.vitigni;
    
    const loadingContainer = document.getElementById('dna-loading-container');
    const resultContainer = document.getElementById('dna-result-container');
    loadingContainer.style.display = 'none';
    
    resultContainer.classList.add('dna-fade-out');
    resultContainer.style.display = 'block';
    setTimeout(() => { resultContainer.classList.remove('dna-fade-out'); }, 50);
}