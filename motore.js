// VARIABILI GLOBALI (Fondamentali)
let userPiatto = '';
let userOccasione = '';
let userBudget = 0;

// EVENT LISTENER PER I BOTTONI
document.querySelectorAll('.choice-card').forEach(card => {
    card.addEventListener('click', function() {
        const tipo = this.getAttribute('data-type');
        const valore = this.getAttribute('data-value');
        if (tipo === 'piatto') userPiatto = valore;
        if (tipo === 'occasione') userOccasione = valore;
        if (tipo === 'budget') userBudget = parseInt(valore);
        console.log("Scelta salvata:", tipo, valore);
    });
});

// NAVIGAZIONE
function avanzaFase(faseAttuale, faseSuccessiva) {
    document.getElementById('fase-' + faseAttuale).style.display = 'none';
    document.getElementById('fase-' + faseSuccessiva).style.display = 'block';
}

function tornaFase(faseAttuale, fasePrecedente) {
    document.getElementById('fase-' + faseAttuale).style.display = 'none';
    document.getElementById('fase-' + fasePrecedente).style.display = 'block';
}

// MOTORE DI RICERCA
function mostraRisultatiMagici() {
    document.getElementById('wizard-container').style.display = 'none';
    document.getElementById('risultati').style.display = 'block';
    const lista = document.getElementById('lista-vini');
    lista.innerHTML = "<li>Cercando...</li>";

    const traduttore = {
        piatto: {
            'carne_rossa': ['carne_rossa'],
            'carne_bianca': ['carne_bianca'],
            'pesce': ['pesce'],
            'pizza': ['pizza'],
            'vegan': ['formaggi', 'etnico', 'verdure'],
            'dessert': ['dolce', 'dessert']
        },
        occasione: {
            'amici': ['cena_amici', 'aperitivo', 'festa'],
            'appuntamento': ['appuntamento', 'romantico', 'regalo'],
            'famiglia': ['pranzo_domenica', 'cena_amici', 'pranzo'],
            'relax': ['relax', 'divano', 'aperitivo']
        }
    };

    const tagPiatti = userPiatto ? (traduttore.piatto[userPiatto] || [userPiatto]) : null;
    const tagOccasioni = userOccasione ? (traduttore.occasione[userOccasione] || [userOccasione]) : null;

    const consigli = viniDatabase.filter(vino => {
        const matchPiatto = tagPiatti ? tagPiatti.some(t => vino.piatti.includes(t)) : true;
        const matchOccasione = tagOccasioni ? tagOccasioni.some(t => vino.occasioni.includes(t)) : true;
        const matchBudget = userBudget > 0 ? Number(vino.prezzo) <= userBudget : true;
        return matchPiatto && matchOccasione && matchBudget;
    });

    lista.innerHTML = "";
    if (consigli.length === 0) {
        lista.innerHTML = "<li><h3>Nessun vino trovato</h3><p>Prova a cambiare i parametri.</p></li>";
    } else {
        consigli.slice(0, 6).forEach(vino => {
            lista.innerHTML += `<li><h3>${vino.nome}</h3><p>${vino.prezzo}€</p></li>`;
        });
    }
}
