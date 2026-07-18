// MOTORE VINO DEFINITIVO
let userPiatto = '';
let userOccasione = '';
let userBudget = 0;

document.querySelectorAll('.choice-card').forEach(card => {
    card.addEventListener('click', function() {
        const tipo = this.getAttribute('data-type');
        const valore = this.getAttribute('data-value');
        if (tipo === 'piatto') userPiatto = valore;
        if (tipo === 'occasione') userOccasione = valore;
        if (tipo === 'budget') userBudget = parseInt(valore);
    });
});

function avanzaFase(faseAttuale, faseSuccessiva) {
    document.getElementById('fase-' + faseAttuale).style.display = 'none';
    document.getElementById('fase-' + faseSuccessiva).style.display = 'block';
}

function tornaFase(faseAttuale, fasePrecedente) {
    document.getElementById('fase-' + faseAttuale).style.display = 'none';
    document.getElementById('fase-' + fasePrecedente).style.display = 'block';
}

function mostraRisultatiMagici() {
    document.getElementById('wizard-container').style.display = 'none';
    document.getElementById('risultati').style.display = 'block';
    const lista = document.getElementById('lista-vini');
    lista.innerHTML = "<li>Caricamento in corso...</li>";

    // Dizionario di TRADUZIONE: mappa i bottoni (chiavi) ai tag del database (valori)
    const mappaPiatti = {
        'carne_rossa': ['carne_rossa'],
        'carne_bianca': ['carne_bianca'],
        'pesce': ['pesce'],
        'pizza': ['pizza', 'primi'],
        'vegan': ['formaggi', 'etnico'],
        'dessert': ['dolce']
    };

    const mappaOccasioni = {
        'appuntamento': ['appuntamento', 'regalo'],
        'amici': ['cena_amici', 'aperitivo', 'festa'],
        'famiglia': ['pranzo_domenica', 'cena_amici'],
        'relax': ['divano', 'aperitivo']
    };

    const tagPiattiCercati = mappaPiatti[userPiatto] || [userPiatto];
    const tagOccasioniCercate = mappaOccasioni[userOccasione] || [userOccasione];

    // Filtro
    const consigli = viniDatabase.filter(vino => {
        const matchPiatto = vino.piatti.some(p => tagPiattiCercati.includes(p));
        const matchOccasione = vino.occasioni.some(o => tagOccasioniCercate.includes(o));
        const matchBudget = Number(vino.prezzo) <= userBudget;
        return matchPiatto && matchOccasione && matchBudget;
    });

    lista.innerHTML = "";
    if (consigli.length === 0) {
        lista.innerHTML = "<li><h3>Nessun vino trovato</h3><p>Prova ad alzare il budget o cambiare abbinamento!</p></li>";
    } else {
        // Mostra i primi 6 risultati
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
