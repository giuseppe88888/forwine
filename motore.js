// =======================================================
// MOTORE VINO - VERSIONE OTTIMIZZATA
// =======================================================

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
    document.getElementById(`fase-${faseAttuale}`).style.display = 'none';
    document.getElementById(`fase-${faseSuccessiva}`).style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
}

function tornaFase(faseAttuale, fasePrecedente) {
    if (faseAttuale === 4) { 
        document.getElementById('risultati').style.display = 'none';
        document.getElementById('wizard-container').style.display = 'block';
        document.getElementById('fase-1').style.display = 'block';
        document.getElementById('ricerca-libera').value = ''; 
    } else {
        document.getElementById(`fase-${faseAttuale}`).style.display = 'none';
        document.getElementById(`fase-${fasePrecedente}`).style.display = 'block';
    }
}

// MOTORE DI RICERCA
function mostraRisultatiMagici() {
    document.getElementById('wizard-container').style.display = 'none';
    const sezioneRisultati = document.getElementById('risultati');
    sezioneRisultati.style.display = 'block';
    const lista = document.getElementById('lista-vini');
    
    lista.innerHTML = `<div style="text-align: center; padding: 50px 0;"><div class="spinner"></div><p style="color: #d4af37; margin-top: 20px;">Il Sommelier sta selezionando...</p></div>`;

    setTimeout(() => {
        try {
            // Dizionari espansi per includere i tag esatti del database
            const dizionarioPiatti = {
                'carne_rossa': ['carne', 'carne_rossa', 'grigliata', 'bistecca', 'arrosto', 'selvaggina', 'ragù'],
                'carne_bianca': ['carne bianca', 'carne_bianca', 'pollo', 'tacchino', 'coniglio', 'maiale'],
                'pesce': ['pesce', 'frutti di mare', 'crostacei', 'sushi', 'salmone', 'crudo'],
                'pizza': ['pizza', 'panini', 'focacce', 'hamburger', 'street food', 'piadina'],
                'vegan': ['verdure', 'vegetariano', 'vegan', 'insalate', 'zuppe', 'formaggi'],
                'dessert': ['dolce', 'dessert', 'pasticceria', 'cioccolato', 'formaggi stagionati', 'torta']
            };

            const dizionarioOccasioni = {
                'appuntamento': ['appuntamento', 'romantico', 'elegante', 'regalo', 'anniversario'],
                'amici': ['amici', 'festa', 'aperitivo', 'informale', 'grigliata', 'party', 'cena_amici'],
                'famiglia': ['famiglia', 'pranzo', 'domenica', 'quotidiano', 'tradizione', 'cena', 'pranzo_domenica'],
                'relax': ['relax', 'meditazione', 'dopo cena', 'divano', 'lettura']
            };

            const parolePiatto = dizionarioPiatti[userPiatto] || [userPiatto];
            const paroleOccasione = dizionarioOccasioni[userOccasione] || [userOccasione];
            const budgetSicuro = userBudget > 0 ? userBudget : 1000;

            const consigli = viniDatabase.filter(vino => {
                const matchPiatto = vino.piatti.some(p => parolePiatto.includes(p.toLowerCase()));
                const matchOccasione = vino.occasioni.some(o => paroleOccasione.includes(o.toLowerCase()));
                const prezzoVino = Number(vino.prezzo) || 0;
                return matchPiatto && matchOccasione && (prezzoVino <= budgetSicuro);
            });

            stampaVini(consigli, lista, `<h3>Risultati (${consigli.length})</h3>`);
        } catch (error) {
            lista.innerHTML = `<p style="color:red;">Errore: ${error.message}</p>`;
        }
    }, 500);
}

function stampaVini(consigli, listaHTML, titolo) {
    listaHTML.innerHTML = titolo;
    if (consigli.length === 0) {
        listaHTML.innerHTML += '<li><h3>Nessun vino trovato.</h3><p>Prova a cambiare i parametri!</p></li>';
        return;
    }
    consigli.forEach(vino => {
        const li = document.createElement('li');
        li.innerHTML = `
            <h3>${vino.nome}</h3>
            <p><strong>Prezzo:</strong> ~${vino.prezzo}€</p>
            <p><strong>Perché sceglierlo:</strong> ${vino.motivo}</p>
            <a href="https://www.google.it/search?tbm=shop&q=vino+${encodeURIComponent(vino.nome)}" target="_blank" class="btn-acquista">🛒 Trovalo Online</a>
        `;
        listaHTML.appendChild(li);
    });
}
