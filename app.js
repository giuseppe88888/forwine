console.log("IL MOTORE È PARTITO!");
// =======================================================
// MOTORE VINO - CON TRADUTTORE DEFINITIVO
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
    } else {
        document.getElementById(`fase-${faseAttuale}`).style.display = 'none';
        document.getElementById(`fase-${fasePrecedente}`).style.display = 'block';
    }
}

// MOTORE MAGICO 
function mostraRisultatiMagici() {
    document.getElementById('wizard-container').style.display = 'none';
    const sezioneRisultati = document.getElementById('risultati');
    sezioneRisultati.style.display = 'block';
    const lista = document.getElementById('lista-vini');
    
    lista.innerHTML = `<div style="text-align: center; padding: 40px;"><p style="color:#d4af37; font-size:1.2rem;">Ricerca nella cantina...</p></div>`;

    setTimeout(() => {
        if (typeof viniDatabase === 'undefined') {
            lista.innerHTML = "<li style='color:red;'>Errore: Il database.js non è collegato bene.</li>";
            return;
        }

        // IL TRADUTTORE: Mappa i bottoni HTML ai tag esatti del tuo database.js
        const dizionarioPiatti = {
            'carne_rossa': ['carne_rossa'],
            'carne_bianca': ['carne_bianca'],
            'pesce': ['pesce'],
            'pizza': ['pizza', 'primi'], 
            'vegan': ['formaggi', 'etnico'], 
            'dessert': ['dolce']
        };

        const dizionarioOccasioni = {
            'appuntamento': ['appuntamento', 'regalo'],
            'amici': ['cena_amici', 'festa', 'grigliata', 'aperitivo'],
            'famiglia': ['pranzo_domenica', 'cena_amici'],
            'relax': ['divano', 'aperitivo']
        };

        const tagPiattiCercati = dizionarioPiatti[userPiatto] || [userPiatto];
        const tagOccasioniCercate = dizionarioOccasioni[userOccasione] || [userOccasione];
        const budgetSicuro = userBudget > 0 ? userBudget : 1000;

        // FILTRO DEI VINI
        const consigli = viniDatabase.filter(vino => {
            const matchPiatto = vino.piatti.some(tag => tagPiattiCercati.includes(tag));
            const matchOccasione = vino.occasioni.some(tag => tagOccasioniCercate.includes(tag));
            const matchBudget = Number(vino.prezzo) <= budgetSicuro;

            return matchPiatto && matchOccasione && matchBudget;
        });

        // STAMPA A SCHERMO
        lista.innerHTML = "";
        
        if (consigli.length === 0) {
            lista.innerHTML = `<li><h3 style="color:#fff;">Nessun vino trovato</h3><p style="color:#aaa;">Abbinamento molto difficile o fuori budget. Torna indietro e alza il budget o cambia piatto!</p></li>`;
        } else {
            // Mostra al massimo 4 vini per non creare una lista infinita
            consigli.slice(0, 4).forEach(vino => {
                lista.innerHTML += `
                    <li>
                        <h3 style="color:#d4af37; margin:0 0 10px 0;">${vino.nome}</h3>
                        <span style="background:#800020; color:#fff; padding:5px 12px; border-radius:20px; font-weight:bold;">~${vino.prezzo}€</span>
                        <p style="color:#ddd; margin-top:15px;"><strong>Perché:</strong> ${vino.motivo}</p>
                        <p style="color:#888; font-size:0.95rem; margin-top:10px;"><strong>Aroma:</strong> ${vino.aroma}</p>
                        <a href="https://www.google.it/search?tbm=shop&q=${encodeURIComponent('vino ' + vino.nome)}" target="_blank" class="btn-acquista">🛒 Trovalo Online</a>
                    </li>
                `;
            });
        }
    }, 800);
}
