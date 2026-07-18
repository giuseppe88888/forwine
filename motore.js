function mostraRisultatiMagici() {
    document.getElementById('wizard-container').style.display = 'none';
    document.getElementById('risultati').style.display = 'block';
    const lista = document.getElementById('lista-vini');
    lista.innerHTML = "";

    // FILTRO CRUDO: Cerca il valore esatto del bottone dentro l'array del database
    const consigli = viniDatabase.filter(vino => {
        // Controlla se i tag del vino contengono ESATTAMENTE la stringa dell'utente
        const matchPiatto = vino.piatti.includes(userPiatto);
        const matchOccasione = vino.occasioni.includes(userOccasione);
        const matchBudget = Number(vino.prezzo) <= userBudget;

        return matchPiatto && matchOccasione && matchBudget;
    });

    if (consigli.length === 0) {
        lista.innerHTML = `<li><h3>Nessun risultato</h3><p>Ho cercato esattamente: Piatto="${userPiatto}", Occasione="${userOccasione}". Se è vuoto, i nomi non coincidono.</p></li>`;
    } else {
        consigli.forEach(vino => {
            lista.innerHTML += `<li><h3>${vino.nome}</h3><p>${vino.prezzo}€</p></li>`;
        });
    }
}
