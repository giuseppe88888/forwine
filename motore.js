// MOTORE VINO DEFINITIVO - VERSIONE 2026
function mostraRisultatiMagici() {
    const container = document.getElementById('wizard-container');
    const risultati = document.getElementById('risultati');
    const lista = document.getElementById('lista-vini');

    if (!container || !risultati || !lista) return;

    container.style.display = 'none';
    risultati.style.display = 'block';
    lista.innerHTML = "<li>Cercando il vino perfetto...</li>";

    // DIZIONARIO DI TRADUZIONE
    // Collega la scelta dell'utente (chiave) ai tag esatti del database (valori)
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
            'relax': ['divano', 'aperitivo']
        }
    };

    // Recupera i tag di ricerca
    const tagPiattiDaCercare = traduttore.piatto[userPiatto] || [userPiatto];
    const tagOccasioniDaCercare = traduttore.occasione[userOccasione] || [userOccasione];

    // FILTRO
    const consigli = viniDatabase.filter(vino => {
        // Normalizzazione dei dati del database
        const dbPiatti = vino.piatti.map(s => s.toString().toLowerCase().trim());
        const dbOccasioni = vino.occasioni.map(s => s.toString().toLowerCase().trim());
        
        // Verifica corrispondenza: basta che un tag dell'utente sia presente nei tag del vino
        const matchPiatto = tagPiattiDaCercare.some(t => dbPiatti.includes(t.toLowerCase()));
        const matchOccasione = tagOccasioniDaCercare.some(t => dbOccasioni.includes(t.toLowerCase()));
        const matchBudget = Number(vino.prezzo) <= userBudget;

        return matchPiatto && matchOccasione && matchBudget;
    });

    // RISULTATI
    lista.innerHTML = "";
    if (consigli.length === 0) {
        lista.innerHTML = "<li><h3>Nessun vino trovato</h3><p>Prova ad alzare il budget o cambiare abbinamento.</p></li>";
    } else {
        consigli.slice(0, 6).forEach(vino => {
            lista.innerHTML += `
                <li style="margin-bottom: 20px; border-bottom: 1px solid #333; padding-bottom: 10px;">
                    <h3 style="color:#d4af37;">${vino.nome}</h3>
                    <p><strong>Prezzo:</strong> ${vino.prezzo}€</p>
                    <p><em>${vino.motivo}</em></p>
                </li>`;
        });
    }
}
