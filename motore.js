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

    // DIZIONARIO: Mappa ciò che clicchi ai tag reali del database
    const dizionario = {
        'carne_rossa': ['carne_rossa'],
        'carne_bianca': ['carne_bianca'],
        'pesce': ['pesce'],
        'pizza': ['pizza', 'primi'],
        'vegan': ['formaggi', 'etnico', 'verdure'],
        'dessert': ['dolce', 'dessert'],
        'amici': ['cena_amici', 'aperitivo', 'festa'],
        'appuntamento': ['appuntamento', 'romantico', 'regalo'],
        'famiglia': ['pranzo_domenica', 'cena_amici', 'pranzo'],
        'relax': ['relax', 'divano', 'aperitivo']
    };

    const targetPiatti = dizionario[userPiatto] || [userPiatto];
    const targetOccasioni = dizionario[userOccasione] || [userOccasione];

    container.style.display = 'none';
    risultati.style.display = 'block';
    lista.innerHTML = "<li>Cercando...</li>";

    // 3. Filtraggio sicuro
    const consigli = viniDatabase.filter(vino => {
        const piatti = Array.isArray(vino.piatti) ? vino.piatti : [];
        const occasioni = Array.isArray(vino.occasioni) ? vino.occasioni : [];

        const dbPiatti = piatti.map(s => s.toString().toLowerCase().trim());
        const dbOccasioni = occasioni.map(s => s.toString().toLowerCase().trim());
        
        // Usiamo .some() perché dobbiamo vedere se almeno uno dei tag target esiste nel DB
        const matchPiatto = targetPiatti.some(t => dbPiatti.includes(t.toLowerCase()));
        const matchOccasione = targetOccasioni.some(t => dbOccasioni.includes(t.toLowerCase()));
        const matchBudget = Number(vino.prezzo) <= userBudget;

        return matchPiatto && matchOccasione && matchBudget;
    });

    lista.innerHTML = "";
    if (consigli.length === 0) {
        lista.innerHTML = "<li><h3>Nessun vino trovato</h3><p>Prova ad alzare il budget o cambiare combinazione.</p></li>";
    } else {
        consigli.slice(0, 6).forEach(vino => {
            lista.innerHTML += `<li><h3>${vino.nome}</h3><p>${vino.prezzo || 0}€</p></li>`;
        });
    }
}
