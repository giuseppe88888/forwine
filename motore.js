function mostraRisultatiMagici() {
    console.group("DEBUG RICERCA");
    
    // 1. Verifiche base
    console.log("Valore Cliccato Piatto:", userPiatto);
    console.log("Valore Cliccato Occasione:", userOccasione);
    console.log("Budget Impostato:", userBudget);
    
    if (typeof viniDatabase === 'undefined') {
        console.error("ERRORE: viniDatabase non trovato!");
        return;
    }

    // 2. Filtraggio VERBOSO
    const consigli = viniDatabase.filter(vino => {
        // Normalizziamo i tag del vino in stringhe semplici per il confronto
        const piattiVino = vino.piatti.map(p => String(p).toLowerCase().trim());
        const occasioniVino = vino.occasioni.map(o => String(o).toLowerCase().trim());

        // Normalizziamo l'input dell'utente
        const inputPiatto = String(userPiatto).toLowerCase().trim();
        const inputOccasione = String(userOccasione).toLowerCase().trim();

        const matchPiatto = piattiVino.includes(inputPiatto);
        const matchOccasione = occasioniVino.includes(inputOccasione);
        const matchBudget = Number(vino.prezzo) <= userBudget;

        // Se trovi almeno un vino, loggalo
        if (matchPiatto && matchOccasione && matchBudget) {
            console.log("✅ MATCH TROVATO:", vino.nome);
        }

        return matchPiatto && matchOccasione && matchBudget;
    });

    console.log("Risultati totali trovati:", consigli.length);
    console.groupEnd();

    // 3. UI
    document.getElementById('wizard-container').style.display = 'none';
    document.getElementById('risultati').style.display = 'block';
    const lista = document.getElementById('lista-vini');
    lista.innerHTML = "";

    if (consigli.length === 0) {
        lista.innerHTML = "<li><h3>Nessun vino trovato.</h3><p>Controlla la console (F12) per vedere cosa stavo cercando.</p></li>";
    } else {
        consigli.slice(0, 6).forEach(vino => {
            lista.innerHTML += `<li><h3>${vino.nome}</h3><p>${vino.prezzo}€</p></li>`;
        });
    }
}s
