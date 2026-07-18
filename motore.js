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
    
    // Filtro
    const consigli = viniDatabase.filter(vino => {
        const matchPiatto = vino.piatti.includes(userPiatto);
        const matchOccasione = vino.occasioni.includes(userOccasione);
        const matchBudget = Number(vino.prezzo) <= userBudget;
        return matchPiatto && matchOccasione && matchBudget;
    });

    lista.innerHTML = "";
    if (consigli.length === 0) {
        lista.innerHTML = "<li><h3>Nessun vino trovato</h3><p>Prova altre combinazioni!</p></li>";
    } else {
        consigli.slice(0, 4).forEach(vino => {
            lista.innerHTML += `<li><h3>${vino.nome}</h3><p>Prezzo: ${vino.prezzo}€</p><p>${vino.motivo}</p></li>`;
        });
    }
}
