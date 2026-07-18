function mostraRisultatiMagici() {
    const container = document.getElementById('wizard-container');
    const risultati = document.getElementById('risultati');
    const lista = document.getElementById('lista-vini');

    container.style.display = 'none';
    risultati.style.display = 'block';
    lista.innerHTML = "<li>Cercando...</li>";

    const traduttore = {
        piatto: {
            'carne_rossa': ['carne_rossa'],
            'carne_bianca': ['carne_bianca'],
            'pesce': ['pesce'],
            'pizza': ['pizza'],
            'vegan': ['formaggi', 'etnico', 'verdure'],
            'dessert': ['dolce', 'dessert']
        },
        occasione: {
            'amici': ['cena_amici', 'aperitivo', 'festa'],
            'appuntamento': ['appuntamento', 'romantico', 'regalo'],
            'famiglia': ['pranzo_domenica', 'cena_amici', 'pranzo'],
            'relax': ['relax', 'divano', 'aperitivo']
        }
    };

    const tagPiatti = userPiatto ? (traduttore.piatto[userPiatto] || [userPiatto]) : null;
    const tagOccasioni = userOccasione ? (traduttore.occasione[userOccasione] || [userOccasione]) : null;

    const consigli = viniDatabase.filter(vino => {
        // Se non hai selezionato un filtro, il match è "automaticamente vero"
        const matchPiatto = tagPiatti ? tagPiatti.some(t => vino.piatti.includes(t)) : true;
        const matchOccasione = tagOccasioni ? tagOccasioni.some(t => vino.occasioni.includes(t)) : true;
        const matchBudget = userBudget > 0 ? Number(vino.prezzo) <= userBudget : true;

        return matchPiatto && matchOccasione && matchBudget;
    });

    lista.innerHTML = "";
    if (consigli.length === 0) {
        lista.innerHTML = "<li><h3>Nessun vino trovato</h3><p>Prova a cambiare i parametri.</p></li>";
    } else {
        consigli.slice(0, 6).forEach(vino => {
            lista.innerHTML += `<li><h3>${vino.nome}</h3><p>${vino.prezzo}€</p></li>`;
        });
    }
}
