// =======================================================
// LA LOGICA DELL'APP CON SCANNER ERRORI (TRY-CATCH)
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

// RICERCA LIBERA SICURA
function cercaTestoLibero() {
    const testo = document.getElementById('ricerca-libera').value.toLowerCase();
    if (testo.trim() === '') return;

    document.getElementById('wizard-container').style.display = 'none';
    document.getElementById('risultati').style.display = 'block';
    const lista = document.getElementById('lista-vini');
    lista.innerHTML = `<div id="loader" style="text-align: center; padding: 50px 0;"><div class="spinner"></div><p style="color: #d4af37; margin-top: 20px;">Ricerco in cantina...</p></div>`;

    setTimeout(() => {
        try {
            // Controllo se il database è rotto alla radice
            if (typeof viniDatabase === 'undefined') throw new Error("Il file database.js contiene un errore di sintassi fatale (es. parentesi o virgola mancante tra i vini).");
            if (!Array.isArray(viniDatabase)) throw new Error("Il database non è formattato come una Lista (Array).");

            const consigli = viniDatabase.filter(vino => {
                if (!vino) return false;
                const nomeSafe = vino.nome ? String(vino.nome).toLowerCase() : "";
                const aromaSafe = vino.aroma ? String(vino.aroma).toLowerCase() : "";
                return nomeSafe.includes(testo) || aromaSafe.includes(testo);
            });
            stampaVini(consigli, lista, `<h3 style="color: #d4af37; margin-bottom: 20px;">Risultati per: "${testo}"</h3>`);
        } catch (error) {
            stampaErrore(lista, error.message);
        }
    }, 800);
}

// MOTORE MAGICO CON SCATOLA NERA
function mostraRisultatiMagici() {
    document.getElementById('wizard-container').style.display = 'none';
    const sezioneRisultati = document.getElementById('risultati');
    sezioneRisultati.style.display = 'block';
    const lista = document.getElementById('lista-vini');
    
    lista.innerHTML = `<div id="loader" style="text-align: center; padding: 50px 0;"><div class="spinner"></div><p style="color: #d4af37; margin-top: 20px;">Il Sommelier sta selezionando l'abbinamento...</p></div>`;

    setTimeout(() => {
        try {
            // Controllo Database
            if (typeof viniDatabase === 'undefined') throw new Error("Il file database.js ha un errore di sintassi critico nei tuoi 500 vini (virgola mancante, parentesi rotta). Il browser rifiuta di leggerlo.");
            if (!Array.isArray(viniDatabase)) throw new Error("Il database dei vini è corrotto.");

            const dizionarioPiatti = {
                'carne_rossa': ['carne', 'carne rossa', 'grigliata', 'bistecca', 'arrosto', 'selvaggina', 'ragù'],
                'carne_bianca': ['carne bianca', 'pollo', 'tacchino', 'coniglio', 'maiale'],
                'pesce': ['pesce', 'frutti di mare', 'crostacei', 'sushi', 'salmone', 'crudo'],
                'pizza': ['pizza', 'panini', 'focacce', 'hamburger', 'street food', 'piadina'],
                'vegan': ['verdure', 'vegetariano', 'vegan', 'insalate', 'zuppe', 'formaggi'],
                'dessert': ['dolce', 'dessert', 'pasticceria', 'cioccolato', 'formaggi stagionati', 'torta']
            };

            const dizionarioOccasioni = {
                'appuntamento': ['appuntamento', 'romantico', 'elegante', 'regalo', 'anniversario'],
                'amici': ['amici', 'festa', 'aperitivo', 'informale', 'grigliata', 'party'],
                'famiglia': ['famiglia', 'pranzo', 'domenica', 'quotidiano', 'tradizione', 'cena'],
                'relax': ['relax', 'meditazione', 'dopo cena', 'divano', 'lettura']
            };

            const controllaMatch = (vinoTags, paroleValide) => {
                if (!vinoTags) return false;
                if (Array.isArray(vinoTags)) {
                    return vinoTags.some(tag => {
                        if (!tag) return false;
                        return paroleValide.includes(String(tag).toLowerCase().trim());
                    });
                } else if (typeof vinoTags === 'string') {
                    return paroleValide.some(parola => String(vinoTags).toLowerCase().includes(parola));
                }
                return false;
            };

            const parolePiatto = dizionarioPiatti[userPiatto] || [userPiatto];
            const paroleOccasione = dizionarioOccasioni[userOccasione] || [userOccasione];
            const budgetSicuro = userBudget > 0 ? userBudget : 1000;

            let consigli = viniDatabase.filter((vino, index) => {
                if (!vino) return false;
                try {
                    const matchPiatto = controllaMatch(vino.piatti, parolePiatto);
                    const matchOccasione = controllaMatch(vino.occasioni, paroleOccasione);
                    const prezzoVino = Number(vino.prezzo) || 0;
                    return matchPiatto && matchOccasione && (prezzoVino <= budgetSicuro);
                } catch(err) {
                    // Ignora silenziosamente il singolo vino rotto senza far crashare tutto
                    return false; 
                }
            });

            let messaggioExtra = '';
            if (consigli.length === 0) {
                consigli = viniDatabase.filter(vino => {
                    if(!vino) return false;
                    return controllaMatch(vino.piatti, parolePiatto) && controllaMatch(vino.occasioni, paroleOccasione);
                });
                if (consigli.length > 0) {
                    messaggioExtra = `<div style="background: rgba(255, 152, 0, 0.1); border-left: 4px solid #ff9800; padding: 15px; margin-bottom: 25px;"><p style="color: #ffb74d; margin: 0; font-size: 0.95rem;">⚠️ <strong>Attenzione:</strong> Non abbiamo trovato bottiglie perfette sotto i ${budgetSicuro}€ per questo abbinamento. Ecco le migliori scelte ignorando il limite di prezzo!</p></div>`;
                }
            }
            stampaVini(consigli, lista, messaggioExtra);

        } catch (error) {
            stampaErrore(lista, error.message);
        }
    }, 1000);
}

// -----------------------------------------------------
// FUNZIONI DI STAMPA E GRAFICA ERRORI
// -----------------------------------------------------
function stampaErrore(listaHTML, messaggio) {
    listaHTML.innerHTML = `
        <div style="background: #2a0808; border: 2px solid #ff4444; padding: 20px; border-radius: 12px; text-align: center;">
            <h3 style="color: #ff4444; font-size: 1.5rem; margin-top:0;">🚨 Crash del Motore 🚨</h3>
            <p style="color: #fff; font-size: 1.1rem; line-height:1.5;">Il JavaScript ha rilevato un errore grave nei dati e si è bloccato.</p>
            <p style="color: #ffaaaa; background: #111; padding: 10px; border-radius: 6px; font-family: monospace; text-align: left;">Dettaglio Errore:<br>${messaggio}</p>
        </div>
    `;
}

function stampaVini(consigli, listaHTML, messaggioExtra) {
    listaHTML.innerHTML = messaggioExtra;

    if (consigli.length === 0) {
        listaHTML.innerHTML += '<li><h3 style="color: #fff">Nessun vino trovato.</h3><p style="color: #aaa;">Abbinamento molto estremo, prova a usare il tasto indietro e cambiare parametri!</p></li>';
        return;
    }

    consigli.slice(0, 3).forEach((vino, index) => {
        const li = document.createElement('li');
        li.style.animationDelay = `${index * 0.2}s`;
        
        const nomeSafe = vino.nome ? String(vino.nome) : "Vino della Casa";
        const nomePerRicerca = "vino " + nomeSafe.replace(/ \([^)]*\)/g, '');
        
        const aromiTesto = vino.aroma ? String(vino.aroma) : "Nessun aroma specificato";
        const aromiBadges = aromiTesto.split(',').map(aroma => `<span class="aroma-badge">${aroma.trim()}</span>`).join('');
        
        const prezzoSafe = vino.prezzo ? `~${vino.prezzo}€` : "Prezzo su richiesta";
        const valutazioneSafe = vino.valutazione ? vino.valutazione : "4.5";
        const motivoSafe = vino.motivo ? String(vino.motivo) : "Selezione speciale del nostro sommelier digitale.";

        let temperatura = "10°C - 12°C";
        let nomeLower = nomeSafe.toLowerCase();
        if (nomeLower.includes('rosso') || nomeLower.includes('chianti') || nomeLower.includes('barolo') || nomeLower.includes('amarone')) temperatura = "16°C - 18°C";
        if (nomeLower.includes('prosecco') || nomeLower.includes('spumante') || nomeLower.includes('champagne')) temperatura = "6°C - 8°C";
        if (nomeLower.includes('bianco') || nomeLower.includes('chardonnay')) temperatura = "8°C - 10°C";

        li.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; margin-bottom: 10px;">
                <h3 style="margin: 0;">${nomeSafe}</h3>
                <span class="prezzo-badge">${prezzoSafe}</span>
            </div>
            
            <div class="rating" style="margin-bottom: 15px;">⭐ ${valutazioneSafe} / 5 &nbsp; | &nbsp; 🌡️ <strong>Servire a:</strong> ${temperatura}</div>
            
            <p class="vino-descrizione" style="margin-bottom: 15px;"><strong>Perché sceglierlo:</strong> ${motivoSafe}</p>
            
            <div style="margin-bottom: 20px;">
                <strong style="color: #fff; display: block; margin-bottom: 8px;">Profilo Aromatico:</strong>
                ${aromiBadges}
            </div>
            
            <a href="https://www.google.it/search?tbm=shop&q=${encodeURIComponent(nomePerRicerca)}" target="_blank" class="btn-acquista">🛒 Trovalo Online</a>
        `;
        listaHTML.appendChild(li);
    });
}
