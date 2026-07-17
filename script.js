// =======================================================
// LA LOGICA DELL'APP: WIZARD, TRADUTTORE, PARACADUTE E STAMPA
// =======================================================

// 1. VARIABILI DI MEMORIA
let userPiatto = '';
let userOccasione = '';
let userBudget = 0;

// 2. GESTIONE CLIC SULLE CARD (Salva la scelta e avanza)
document.querySelectorAll('.choice-card').forEach(card => {
    card.addEventListener('click', function() {
        const tipo = this.getAttribute('data-type');
        const valore = this.getAttribute('data-value');

        if (tipo === 'piatto') userPiatto = valore;
        if (tipo === 'occasione') userOccasione = valore;
        if (tipo === 'budget') {
            userBudget = parseInt(valore);
            mostraRisultatiMagici(); // L'ultimo clic fa partire la ricerca
        }
    });
});

// 3. NAVIGAZIONE WIZARD (Avanti e Indietro)
function avanzaFase(faseAttuale, faseSuccessiva) {
    document.getElementById(`fase-${faseAttuale}`).style.display = 'none';
    document.getElementById(`fase-${faseSuccessiva}`).style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
}

function tornaFase(faseAttuale, fasePrecedente) {
    if (faseAttuale === 4) { // Dalla pagina risultati torna alla home
        document.getElementById('risultati').style.display = 'none';
        document.getElementById('wizard-container').style.display = 'block';
        document.getElementById('fase-1').style.display = 'block';
        document.getElementById('ricerca-libera').value = ''; 
    } else {
        document.getElementById(`fase-${faseAttuale}`).style.display = 'none';
        document.getElementById(`fase-${fasePrecedente}`).style.display = 'block';
    }
}

// 4. RICERCA LIBERA PER GLI ESPERTI
function cercaTestoLibero() {
    const testo = document.getElementById('ricerca-libera').value.toLowerCase();
    if (testo.trim() === '') return;

    document.getElementById('wizard-container').style.display = 'none';
    document.getElementById('risultati').style.display = 'block';
    const lista = document.getElementById('lista-vini');
    
    lista.innerHTML = `
        <div id="loader" style="text-align: center; padding: 50px 0;">
            <div class="spinner"></div>
            <p style="color: #d4af37; margin-top: 20px;">Ricerco in cantina...</p>
        </div>`;

    setTimeout(() => {
        const consigli = viniDatabase.filter(vino => 
            vino.nome.toLowerCase().includes(testo) || 
            vino.aroma.toLowerCase().includes(testo)
        );
        stampaVini(consigli, lista, `<h3 style="color: #d4af37; margin-bottom: 20px;">Risultati per: "${testo}"</h3>`);
    }, 800);
}

// 5. IL MOTORE MAGICO CON TRADUTTORE
function mostraRisultatiMagici() {
    document.getElementById('wizard-container').style.display = 'none';
    const sezioneRisultati = document.getElementById('risultati');
    sezioneRisultati.style.display = 'block';
    
    const lista = document.getElementById('lista-vini');
    
    lista.innerHTML = `
        <div id="loader" style="text-align: center; padding: 50px 0;">
            <div class="spinner"></div>
            <p style="color: #d4af37; margin-top: 20px; font-weight: bold; font-size: 1.2rem;">
                Il Sommelier sta selezionando l'abbinamento...
            </p>
        </div>
    `;

    // IL TRADUTTORE: Associa i bottoni alle vecchie parole del database
    const dizionarioPiatti = {
        'carne_rossa': ['carne', 'carne rossa', 'grigliata', 'bistecca', 'arrosto', 'selvaggina', 'ragù'],
        'carne_bianca': ['carne bianca', 'pollo', 'tacchino', 'coniglio', 'maiale'],
        'pesce': ['pesce', 'frutti di mare', 'crostacei', 'sushi', 'salmone', 'crudo'],
        'pizza': ['pizza', 'panini', 'focacce', 'hamburger', 'street food', 'piadina'],
        'vegan': ['verdure', 'vegetariano', 'vegan', 'insalate', 'zuppe', 'formaggi']
    };

    const dizionarioOccasioni = {
        'appuntamento': ['appuntamento', 'romantico', 'elegante', 'regalo', 'anniversario'],
        'amici': ['amici', 'festa', 'aperitivo', 'informale', 'grigliata', 'party'],
        'famiglia': ['famiglia', 'pranzo', 'domenica', 'quotidiano', 'tradizione', 'cena'],
        'relax': ['relax', 'meditazione', 'dopo cena', 'divano', 'lettura']
    };

    // Controllo a prova di bomba per le parole
    const controllaMatch = (vinoTags, paroleValide) => {
        if (!vinoTags) return false;
        if (Array.isArray(vinoTags)) {
            return vinoTags.some(tag => paroleValide.includes(tag.toLowerCase().trim()));
        } else if (typeof vinoTags === 'string') {
            const vinoStr = vinoTags.toLowerCase();
            return paroleValide.some(parola => vinoStr.includes(parola));
        }
        return false;
    };

    setTimeout(() => {
        const parolePiatto = dizionarioPiatti[userPiatto] || [userPiatto];
        const paroleOccasione = dizionarioOccasioni[userOccasione] || [userOccasione];

        let consigli = viniDatabase.filter(vino => {
            const matchPiatto = controllaMatch(vino.piatti, parolePiatto);
            const matchOccasione = controllaMatch(vino.occasioni, paroleOccasione);
            const matchBudget = vino.prezzo <= userBudget;
            return matchPiatto && matchOccasione && matchBudget;
        });

        let messaggioExtra = '';

        // IL PARACADUTE: Se non trova nulla con il budget, prova senza
        if (consigli.length === 0) {
            consigli = viniDatabase.filter(vino => {
                return controllaMatch(vino.piatti, parolePiatto) && controllaMatch(vino.occasioni, paroleOccasione);
            });
            
            if (consigli.length > 0) {
                messaggioExtra = `
                <div style="background: rgba(255, 152, 0, 0.1); border-left: 4px solid #ff9800; padding: 15px; margin-bottom: 25px;">
                    <p style="color: #ffb74d; margin: 0; font-size: 0.95rem;">
                        ⚠️ <strong>Attenzione:</strong> Non abbiamo trovato bottiglie perfette sotto i ${userBudget}€ per questo abbinamento specifico. 
                        Tuttavia, ecco le migliori scelte ignorando il limite di prezzo!
                    </p>
                </div>`;
            }
        }

        stampaVini(consigli, lista, messaggioExtra);
    }, 1500);
}

// 6. FUNZIONE PER DISEGNARE LE BOTTIGLIE
function stampaVini(consigli, listaHTML, messaggioExtra) {
    listaHTML.innerHTML = messaggioExtra;

    if (consigli.length === 0) {
        listaHTML.innerHTML += '<li><h3 style="color: #fff">Nessun vino trovato.</h3><p style="color: #aaa;">Abbinamento molto estremo, prova a cambiare parametri o usare la ricerca libera!</p></li>';
        return;
    }

    consigli.slice(0, 3).forEach((vino, index) => {
        const li = document.createElement('li');
        li.style.animationDelay = `${index * 0.2}s`;
        
        const nomePerRicerca = "vino " + vino.nome.replace(/ \([^)]*\)/g, '');
        // Sicurezza per gli aromi
        const aromiTesto = vino.aroma ? vino.aroma : "Non specificato";
        const aromiBadges = aromiTesto.split(',').map(aroma => `<span class="aroma-badge">${aroma.trim()}</span>`).join('');
        
        let temperatura = "10°C - 12°C";
        let nomeLower = vino.nome.toLowerCase();
        if (nomeLower.includes('rosso') || nomeLower.includes('chianti') || nomeLower.includes('barolo')) temperatura = "16°C - 18°C";
        if (nomeLower.includes('prosecco') || nomeLower.includes('spumante') || nomeLower.includes('champagne')) temperatura = "6°C - 8°C";
        if (nomeLower.includes('bianco') || nomeLower.includes('chardonnay')) temperatura = "8°C - 10°C";

        li.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; margin-bottom: 10px;">
                <h3 style="margin: 0;">${vino.nome}</h3>
                <span class="prezzo-badge">~${vino.prezzo}€</span>
            </div>
            
            <div class="rating" style="margin-bottom: 15px;">⭐ ${vino.valutazione} / 5 &nbsp; | &nbsp; 🌡️ <strong>Servire a:</strong> ${temperatura}</div>
            
            <p class="vino-descrizione" style="margin-bottom: 15px;"><strong>Perché sceglierlo:</strong> ${vino.motivo}</p>
            
            <div style="margin-bottom: 20px;">
                <strong style="color: #fff; display: block; margin-bottom: 8px;">Profilo Aromatico:</strong>
                ${aromiBadges}
            </div>
            
            <a href="https://www.google.it/search?tbm=shop&q=${encodeURIComponent(nomePerRicerca)}" target="_blank" class="btn-acquista">🛒 Trovalo Online</a>
            <a href="https://wa.me/?text=${encodeURIComponent('🍷 Ehi! FORWINE mi ha consigliato questo vino per la nostra cena: ' + vino.nome + '. Che ne dici?')}" target="_blank" class="btn-whatsapp">📲 Invia su WhatsApp</a>
        `;
        listaHTML.appendChild(li);
    });
}