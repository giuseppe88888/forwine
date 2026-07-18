function mostraRisultatiMagici() {
    // 1. Controllo elementi DOM
    const container = document.getElementById('wizard-container');
    const risultati = document.getElementById('risultati');
    const lista = document.getElementById('lista-vini');

    if (!container || !risultati || !lista) {
        console.error("Errore: Elementi HTML non trovati!");
        return;
    }

    // 2. Controllo variabili
    if (typeof userPiatto === 'undefined' || typeof viniDatabase === 'undefined') {
        console.error("Errore: Database o variabili di ricerca non caricate.");
        return;
    }

    container.style.display = 'none';
    risultati.style.display = 'block';
    lista.innerHTML = "<li>Cercando...</li>";

    // 3. Filtraggio sicuro
    const consigli = viniDatabase.filter(vino => {
        // Verifica che le proprietà esistano prima di usarle
        const piatti = Array.isArray(vino.piatti) ? vino.piatti : [];
        const occasioni = Array.isArray(vino.occasioni) ? vino.occasioni : [];

        const dbPiatti = piatti.map(s => s.toString().toLowerCase().trim());
        const dbOccasioni = occasioni.map(s => s.toString().toLowerCase().trim());
        
        return dbPiatti.includes(userPiatto.toLowerCase()) && 
               dbOccasioni.includes(userOccasione.toLowerCase());
    });

    lista.innerHTML = "";
    if (consigli.length === 0) {
        lista.innerHTML = "<li><h3>Nessun vino trovato</h3></li>";
    } else {
        consigli.slice(0, 6).forEach(vino => {
            lista.innerHTML += `<li><h3>${vino.nome}</h3><p>${vino.prezzo || 0}€</p></li>`;
        });
    }
}
