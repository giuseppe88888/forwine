// MOTORE VINO - VERSIONE INTELLIGENTE E ROBUSTA
let userPiatto = '';
let userOccasione = '';
let userBudget = 0;

// GESTIONE CLIC E MEMORIZZAZIONE SCELTE
document.querySelectorAll('.choice-card').forEach(card => {
    card.addEventListener('click', function() {
        const tipo = this.getAttribute('data-type');
        const valore = this.getAttribute('data-value');
        if (tipo === 'piatto') userPiatto = valore;
        if (tipo === 'occasione') userOccasione = valore;
        if (tipo === 'budget') userBudget = parseInt(valore);
    });
});

// NAVIGAZIONE
function avanzaFase(faseAttuale, faseSuccessiva) {
    document.getElementById('fase-' + faseAttuale).style.display = 'none';
    document.getElementById('fase-' + faseSuccessiva).style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function tornaFase(faseAttuale, fasePrecedente) {
    document.getElementById('fase-' + faseAttuale).style.display = 'none';
    document.getElementById('fase-' + fasePrecedente).style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// MOTORE DI RICERCA INTELLIGENTE
function mostraRisultatiMagici() {
    document.getElementById('wizard-container').style.display = 'none';
    document.getElementById('risultati').style.display = 'block';
    const lista = document.getElementById('lista-vini');
    lista.innerHTML = "<li>Caricamento in corso...</li>";

    // Dizionario di TRADUZIONE: mappa i bottoni (chiavi) ai tag esatti del database
    const mappaPiatti = {
        'carne_rossa': ['carne_rossa'],
        'carne_bianca': ['carne_bianca'],
        'pesce': ['pesce'],
        'pizza': ['pizza'],
        'vegan': ['formaggi', 'etnico', 'verdure'],
        'dessert': ['dolce', 'dessert']
    };

    const mappaOccasioni = {
        'appuntamento': ['appuntamento', 'regalo', 'romantico'],
        'amici': ['cena_amici', 'aperitivo', 'festa'],
        'famiglia': ['pranzo_domenica', 'cena_amici', 'pranzo'],
        'relax': ['relax', 'divano', 'aperitivo']
    };

    // Ottieni i tag da cercare
    const tagPiattiCercati = mappaPiatti[userPiatto] || [userPiatto];
    const tagOccasioniCercate = mappaOccasioni[userOccasione] || [userOccasione];

    // Funzione helper per pulire le stringhe (tutto minuscolo, senza spazi)
    const normalize = (str) => String(str).toLowerCase().trim();

    const consigli = viniDatabase.filter(vino => {
        // Normalizza i dati del database (gestisce sia array che stringhe)
        const dbPiatti = (Array.isArray(vino.piatti) ? vino.piatti : String(vino.piatti).split(',')).map(normalize);
        const dbOccasioni = (Array.isArray(vino.occasioni) ? vino.occasioni : String(vino.occasioni).split(',')).map(normalize);
        
        // Verifica corrispondenza
        const matchPiatto = tagPiattiCercati.some(t => dbPiatti.includes(normalize(t)));
        const matchOccasione = tagOccasioniCercate.some(t => dbOccasioni.includes(normalize(t)));
        const matchBudget = Number(vino.prezzo) <= userBudget;

        return matchPiatto && matchOccasione && matchBudget;
    });

    lista.innerHTML = "";
    if (consigli.length === 0) {
        lista.innerHTML = "<li><h3>Nessun vino trovato</h3><p>Prova ad alzare il budget o cambiare abbinamento!</p></li>";
    } else {
        consigli.slice(0, 6).forEach(vino => {
            lista.innerHTML += `
                <li style="margin-bottom: 20px; border-bottom: 1px solid #333; padding-bottom: 10px;">
                    <h3 style="color:#d4af37;">${vino.nome}</h3>
                    <p><strong>Prezzo:</strong> ${vino.prezzo}€</p>
                    <p><em>${vino.motivo}</em></p>
                    <a href="https://www.google.it/search?tbm=shop&q=vino+${encodeURIComponent(vino.nome)}" target="_blank" style="color:#d4af37;">🛒 Cerca online</a>
                </li>`;
        });
    }
}
