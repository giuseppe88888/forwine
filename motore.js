console.log("🚀 IL MOTORE È ACCESO E COLLEGATO!");

// Variabili per ricordare le scelte dell'utente
let userPiatto = '';
let userOccasione = '';
let userBudget = 0;

// Funzione "tappabuchi" per non far arrabbiare il tasto Cerca in alto
function cercaTestoLibero() {
    alert("La ricerca libera sarà attiva nel prossimo aggiornamento!");
}

// Navigazione tra le schermate
function avanzaFase(faseAttuale, faseSuccessiva) {
    document.getElementById('fase-' + faseAttuale).style.display = 'none';
    document.getElementById('fase-' + faseSuccessiva).style.display = 'block';
}

function tornaFase(faseAttuale, fasePrecedente) {
    document.getElementById('fase-' + faseAttuale).style.display = 'none';
    document.getElementById('fase-' + fasePrecedente).style.display = 'block';
}

// Questa è la famosa funzione che ieri il browser non trovava
function salva(tipo, valore, faseAttuale, faseSuccessiva) {
    console.log("Hai cliccato e salvato: " + tipo + " = " + valore); // Ti conferma in console che il click va
    
    if (tipo === 'piatto') userPiatto = valore;
    if (tipo === 'occasione') userOccasione = valore;
    if (tipo === 'budget') {
        userBudget = parseInt(valore);
        mostraRisultati(); // Se siamo al budget, fa partire la ricerca
    }
    
    // Cambia pagina se richiesto
    if (faseAttuale && faseSuccessiva) {
        avanzaFase(faseAttuale, faseSuccessiva);
    }
}

// Il cuore della ricerca
function mostraRisultati() {
    console.log("Sto cercando i vini per: Piatto=" + userPiatto + ", Occasione=" + userOccasione + ", Budget=" + userBudget);
    
    document.getElementById('wizard-container').style.display = 'none';
    document.getElementById('risultati').style.display = 'block';
    
    // Mappatura per far combaciare i bottoni con il database
    const trad = {
        'amici': 'cena_amici',
        'appuntamento': 'appuntamento',
        'famiglia': 'pranzo_domenica',
        'relax': 'divano'
    };
    const occDB = trad[userOccasione] || userOccasione;

    // Filtra i vini
    const risultati = viniDatabase.filter(v => 
        v.piatti.includes(userPiatto) && 
        v.occasioni.includes(occDB) && 
        v.prezzo <= userBudget
    );

    console.log("Vini trovati: " + risultati.length);

    // Stampa a schermo
    const lista = document.getElementById('lista-vini');
    lista.innerHTML = risultati.length > 0 ? "" : "<li>Nessun vino trovato. Riprova con parametri diversi.</li>";
    
    risultati.slice(0, 5).forEach(v => {
        lista.innerHTML += `<li><h3>${v.nome}</h3><p>${v.prezzo}€</p></li>`;
    });
}
