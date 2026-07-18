// VARIABILI GLOBALI
let userPiatto = '';
let userOccasione = '';
let userBudget = 0;

// FUNZIONI DI NAVIGAZIONE
function avanzaFase(faseAttuale, faseSuccessiva) {
    document.getElementById('fase-' + faseAttuale).style.display = 'none';
    document.getElementById('fase-' + faseSuccessiva).style.display = 'block';
}

function tornaFase(faseAttuale, fasePrecedente) {
    document.getElementById('fase-' + faseAttuale).style.display = 'none';
    document.getElementById('fase-' + fasePrecedente).style.display = 'block';
}

// SALVATAGGIO SCELTE E AVVIO RICERCA
document.querySelectorAll('.choice-card').forEach(card => {
    card.addEventListener('click', function() {
        const tipo = this.getAttribute('data-type');
        const valore = this.getAttribute('data-value');
        
        if (tipo === 'piatto') userPiatto = valore;
        if (tipo === 'occasione') userOccasione = valore;
        if (tipo === 'budget') {
            userBudget = parseInt(valore);
            // APPENA CLICCHI IL BUDGET, PARTE LA RICERCA!
            mostraRisultatiMagici();
        }
        console.log("Scelta salvata:", tipo, valore);
    });
});

// MOTORE DI RICERCA
function mostraRisultatiMagici() {
    console.log("--- AVVIO RICERCA ---");
    document.getElementById('wizard-container').style.display = 'none';
    document.getElementById('risultati').style.display = 'block';
    
    const lista = document.getElementById('lista-vini');
    lista.innerHTML = "<li>Cercando...</li>";

    const traduttore = {
        'amici': ['cena_amici', 'aperitivo', 'festa'],
        'appuntamento': ['appuntamento', 'romantico', 'regalo'],
        'famiglia': ['pranzo_domenica', 'cena_amici', 'pranzo'],
        'relax': ['relax', 'divano', 'aperitivo']
    };

    const targetOccasioni = traduttore[userOccasione] || [userOccasione];

    const consigli = viniDatabase.filter(vino => {
        // Logica semplificata e robusta
        const matchPiatto = vino.piatti.includes(userPiatto);
        const matchOccasione = targetOccasioni.some(t => vino.occasioni.includes(t));
        const matchBudget = Number(vino.prezzo) <= userBudget;
        
        return matchPiatto && matchOccasione && matchBudget;
    });

    lista.innerHTML = "";
    if (consigli.length === 0) {
        lista.innerHTML = `<li><h3>Nessun vino trovato</h3><p>Piatto: ${userPiatto}, Occasione: ${userOccasione}, Budget: ${userBudget}</p></li>`;
    } else {
        consigli.slice(0, 6).forEach(vino => {
            lista.innerHTML += `<li><h3>${vino.nome}</h3><p>${vino.prezzo}€</p></li>`;
        });
    }
}

// Dummy funzione per evitare l'errore del bottone "Cerca" in alto
function cercaTestoLibero() { alert("Funzione ricerca manuale ancora in costruzione"); }
