let userPiatto = '';
let userOccasione = '';
let userBudget = 0;

function salva(tipo, valore, faseAttuale, faseSuccessiva) {
    if (tipo === 'piatto') userPiatto = valore;
    if (tipo === 'occasione') userOccasione = valore;
    if (tipo === 'budget') {
        userBudget = parseInt(valore);
        mostraRisultati();
    } else {
        document.getElementById('fase-' + faseAttuale).style.display = 'none';
        document.getElementById('fase-' + faseSuccessiva).style.display = 'block';
    }
}

function mostraRisultati() {
    document.getElementById('wizard-container').style.display = 'none';
    document.getElementById('risultati').style.display = 'block';
    
    // Dizionario per far combaciare bottone e database
    const trad = {
        'amici': 'cena_amici',
        'appuntamento': 'appuntamento',
        'famiglia': 'pranzo_domenica',
        'relax': 'divano'
    };
    const occDB = trad[userOccasione] || userOccasione;

    const risultati = viniDatabase.filter(v => 
        v.piatti.includes(userPiatto) && 
        v.occasioni.includes(occDB) && 
        v.prezzo <= userBudget
    );

    const lista = document.getElementById('lista-vini');
    lista.innerHTML = risultati.length > 0 ? "" : "<li>Nessun vino trovato.</li>";
    
    risultati.slice(0, 5).forEach(v => {
        lista.innerHTML += `<li><h3>${v.nome}</h3><p>${v.prezzo}€ - ${v.motivo}</p></li>`;
    });
}
