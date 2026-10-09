/**
 * FORWINE - Modulo Confronto Bottiglie e Profilo Premium
 * Versione 3.0: Ottimizzata (SPA Routing & Sicurezza Anti-XSS)
 */

const statoConfronto = {
    bottiglie: [null, null, null],
    piattoSelezionato: null
};

// --- FUNZIONE DI SICUREZZA ANTI-XSS (NUOVA) ---
// Disinnesca qualsiasi codice HTML o JavaScript inserito dall'utente
function sanaInput(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, function(tag) {
        const charsToReplace = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        };
        return charsToReplace[tag] || tag;
    });
}

// ==========================================================================
// 1. NAVIGAZIONE SEZIONE CONFRONTA
// ==========================================================================

function vaiAConfronta() {
    if (typeof nascondiExtra === 'function') nascondiExtra();
    if (typeof chiudiAuth === 'function') chiudiAuth();

    const elementiDaNascondere = ['hero-trust', 'progress-container', 'wizard-container', 'risultati', 'sezione-profilo'];
    elementiDaNascondere.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    const sezione = document.getElementById('sezione-confronta');
    if (sezione) {
        sezione.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function chiudiConfronta() {
    if (typeof tornaAllaHome === 'function') {
        tornaAllaHome();
    } else {
        const sezione = document.getElementById('sezione-confronta');
        if (sezione) sezione.style.display = 'none';
    }
}


// ==========================================================================
// 2. GESTIONE INSERIMENTO VINI E PIATTO
// ==========================================================================

function confermaVinoManuale(idx) {
    const inputEl = document.getElementById(`testo-vino-${idx}`);
    // Usiamo subito la funzione di sanitizzazione per bloccare codice malevolo
    const nomeVino = sanaInput(inputEl.value.trim());

    if (!nomeVino) {
        alert("Inserisci il nome del vino prima di confermare!");
        return;
    }

    statoConfronto.bottiglie[idx] = { nome: nomeVino };

    document.getElementById(`input-wrap-${idx}`).style.display = 'none';
    const previewWrap = document.getElementById(`preview-wrap-${idx}`);
    previewWrap.style.display = 'flex';
    previewWrap.style.flexDirection = 'column';
    previewWrap.style.alignItems = 'center';
    previewWrap.style.justifyContent = 'center';
    
    // innerText è già sicuro di per sé, ma prevenire è meglio
    document.getElementById(`nome-vino-scelto-${idx}`).innerText = nomeVino;
    document.getElementById(`slot-${idx}`).classList.add('has-image');

    aggiornaStatoPulsanteConfronto();
}

function rimuoviVinoManuale(idx) {
    statoConfronto.bottiglie[idx] = null;

    document.getElementById(`testo-vino-${idx}`).value = '';
    document.getElementById(`preview-wrap-${idx}`).style.display = 'none';
    document.getElementById(`input-wrap-${idx}`).style.display = 'flex';
    document.getElementById(`slot-${idx}`).classList.remove('has-image');

    aggiornaStatoPulsanteConfronto();
}

function selezionaPiattoConfronto(nomePiatto, bottoneEl) {
    // Sanitizziamo anche le selezioni interne per massima sicurezza
    statoConfronto.piattoSelezionato = sanaInput(nomePiatto);

    const bottoni = document.querySelectorAll('.piatto-confronto-btn');
    bottoni.forEach(btn => btn.classList.remove('selezionato'));

    bottoneEl.classList.add('selezionato');
    aggiornaStatoPulsanteConfronto();
}

function aggiornaStatoPulsanteConfronto() {
    const numBottiglie = statoConfronto.bottiglie.filter(b => b !== null).length;
    const piattoOk = statoConfronto.piattoSelezionato !== null;
    const btn = document.getElementById('btn-confronta-vini');
    const hint = document.getElementById('confronta-status-hint');

    if (numBottiglie >= 2 && piattoOk) {
        btn.disabled = false;
        hint.innerText = `Pronto: ${numBottiglie} vini pronti per l'abbinamento con ${statoConfronto.piattoSelezionato}.`;
        hint.style.color = 'var(--bordeaux)';
    } else {
        btn.disabled = true;
        if (numBottiglie < 2 && !piattoOk) {
            hint.innerText = "Inserisci almeno 2 vini e seleziona il piatto per avviare il confronto.";
        } else if (numBottiglie < 2) {
            hint.innerText = `Hai inserito ${numBottiglie} vino. Ne serve almeno un altro per confrontare.`;
        } else if (!piattoOk) {
            hint.innerText = "Vini pronti. Ora indica cosa mangi stasera.";
        }
        hint.style.color = '#888888';
    }
}


// ==========================================================================
// 3. MOTORE LOGICO DEL CONFRONTO (Simulazione Offline)
// ==========================================================================

async function simulaAnalisiSommelier(bottigliePresenti, piatto) {
    await new Promise(resolve => setTimeout(resolve, 2500));

    const profiliPiatto = {
        'Carne rossa': {
            motivazioneVincente: "Ottima struttura e tannini vellutati, ideali per bilanciare la succulenza della carne rossa.",
            motivazioneAlternativa: "Struttura non sufficientemente robusta per reggere l'intensità di questo piatto.",
            scores: [
                { struttura: 92, freschezza: 65, tannino: 88, intensita: 90, compatibilita: 95 },
                { struttura: 60, freschezza: 80, tannino: 45, intensita: 70, compatibilita: 62 },
                { struttura: 75, freschezza: 70, tannino: 65, intensita: 78, compatibilita: 74 }
            ]
        },
        'Carne bianca': {
            motivazioneVincente: "Perfetto equilibrio tra morbidezza e freschezza, accompagna la carne senza sovrastarla.",
            motivazioneAlternativa: "Corpo troppo invadente o alcolicità sbilanciata rispetto alla delicatezza del piatto.",
            scores: [
                { struttura: 70, freschezza: 82, tannino: 40, intensita: 75, compatibilita: 92 },
                { struttura: 88, freschezza: 55, tannino: 85, intensita: 90, compatibilita: 55 },
                { struttura: 65, freschezza: 88, tannino: 20, intensita: 68, compatibilita: 70 }
            ]
        },
        'Pesce': {
            motivazioneVincente: "Vena minerale spiccata e freschezza tagliente che esaltano la salinità del mare.",
            motivazioneAlternativa: "Presenza strutturale che rischierebbe di creare un retrogusto metallico sgradevole.",
            scores: [
                { struttura: 55, freschezza: 95, tannino: 15, intensita: 78, compatibilita: 96 },
                { struttura: 85, freschezza: 50, tannino: 80, intensita: 88, compatibilita: 45 },
                { struttura: 68, freschezza: 75, tannino: 35, intensita: 72, compatibilita: 68 }
            ]
        },
        'Pizza / Pasta': {
            motivazioneVincente: "Acidità calibrata e dinamismo al sorso, ideali per sgrassare formaggi e amidi.",
            motivazioneAlternativa: "Eccessiva morbidezza o mancanza di freschezza per pulire il palato dai carboidrati.",
            scores: [
                { struttura: 72, freschezza: 85, tannino: 50, intensita: 80, compatibilita: 93 },
                { struttura: 90, freschezza: 55, tannino: 85, intensita: 92, compatibilita: 65 },
                { struttura: 50, freschezza: 92, tannino: 20, intensita: 65, compatibilita: 72 }
            ]
        },
        'Vegetariano': {
            motivazioneVincente: "Fragranza floreale e sentori vegetali che legano con naturalezza alle erbe e agli ortaggi.",
            motivazioneAlternativa: "Tannino ruvido che finirebbe per coprire le sfumature delicate del mondo vegetale.",
            scores: [
                { struttura: 60, freschezza: 88, tannino: 25, intensita: 75, compatibilita: 94 },
                { struttura: 85, freschezza: 65, tannino: 75, intensita: 85, compatibilita: 58 },
                { struttura: 68, freschezza: 80, tannino: 45, intensita: 70, compatibilita: 76 }
            ]
        },
        'Formaggi': {
            motivazioneVincente: "Avvolgenza e persistenza aromatica perfette per sostenere la ricchezza lipidica del formaggio.",
            motivazioneAlternativa: "Vino troppo sottile che verrebbe totalmente oscurato dalla potenza gustativa.",
            scores: [
                { struttura: 85, freschezza: 70, tannino: 72, intensita: 92, compatibilita: 95 },
                { struttura: 60, freschezza: 85, tannino: 25, intensita: 68, compatibilita: 65 },
                { struttura: 75, freschezza: 75, tannino: 55, intensita: 78, compatibilita: 78 }
            ]
        },
        'Dessert': {
            motivazioneVincente: "Morbidezza e dolcezza bilanciate che rispettano la regola aurea dell'abbinamento dolce-dolce.",
            motivazioneAlternativa: "La secchezza o l'astringenza creerebbero attrito e sensazione amara col dolce.",
            scores: [
                { struttura: 75, freschezza: 70, tannino: 10, intensita: 94, compatibilita: 98 },
                { struttura: 88, freschezza: 60, tannino: 85, intensita: 85, compatibilita: 35 },
                { struttura: 55, freschezza: 88, tannino: 15, intensita: 65, compatibilita: 50 }
            ]
        }
    };

    const config = profiliPiatto[piatto] || profiliPiatto['Carne rossa'];
    
    return bottigliePresenti.map((b, index) => {
        const isWin = (index === 0);
        const metrics = config.scores[index] || config.scores[1];

        return {
            id: index + 1,
            nome: b.nome,
            vincente: isWin,
            badgeTesto: isWin ? "Più adatta al tuo piatto" : "Alternativa",
            motivazione: isWin ? config.motivazioneVincente : config.motivazioneAlternativa,
            metriche: {
                struttura: metrics.struttura,
                freschezza: metrics.freschezza,
                tannino: metrics.tannino,
                intensita: metrics.intensita,
                compatibilita: metrics.compatibilita
            }
        };
    });
}


// ==========================================================================
// 4. ESECUZIONE FLUSSO E RENDERING CONFRONTO
// ==========================================================================

async function avviaAnalisiConfronto() {
    const bottigliePresenti = [];
    statoConfronto.bottiglie.forEach((b, idx) => {
        if (b !== null) {
            bottigliePresenti.push({ ...b, slotIndex: idx });
        }
    });

    if (bottigliePresenti.length < 2 || !statoConfronto.piattoSelezionato) return;

    const formWrap = document.getElementById('confronta-form-wrap');
    const loader = document.getElementById('confronta-loader');
    const risultatoWrap = document.getElementById('confronta-risultato');

    formWrap.style.display = 'none';
    risultatoWrap.style.display = 'none';
    loader.style.display = 'flex';

    const loaderSub = document.getElementById('loader-status-text');
    const messaggi = [
        "Ricerca dei vini nella cantina digitale...",
        "Valutazione del profilo organolettico...",
        `Confronto diretto con: ${statoConfronto.piattoSelezionato}...`
    ];
    
    let msgIdx = 0;
    const intervalMsg = setInterval(() => {
        msgIdx = (msgIdx + 1) % messaggi.length;
        if (loaderSub) loaderSub.innerText = messaggi[msgIdx];
    }, 700);

    const risultati = await simulaAnalisiSommelier(bottigliePresenti, statoConfronto.piattoSelezionato);
    
    clearInterval(intervalMsg);
    renderRisultatiConfronto(risultati);

    loader.style.display = 'none';
    risultatoWrap.style.display = 'block';
    risultatoWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderRisultatiConfronto(risultati) {
    const container = document.getElementById('confronto-cards-output');
    container.innerHTML = '';

    risultati.forEach(vino => {
        const isWin = vino.vincente;
        const card = document.createElement('div');
        card.className = `card-bottiglia-res ${isWin ? 'vincente' : ''}`;

        // Il vino.nome ora è 100% sicuro da stampare perché è passato da sanaInput()
        card.innerHTML = `
            ${isWin ? '<div class="vincente-ribbon">🥇 Miglior Scelta</div>' : ''}
            
            <div class="card-res-thumb-icon">
                <i class="fa-solid fa-wine-bottle"></i>
            </div>
            
            <div class="card-res-header">
                <h4 class="card-res-title">${vino.nome}</h4>
                <div class="card-res-status">${vino.badgeTesto}</div>
            </div>

            <p class="card-res-motivazione">"${vino.motivazione}"</p>

            <div class="metriche-list">
                <div class="metrica-item">
                    <div class="metrica-label-row">
                        <span>Struttura</span>
                        <span>${vino.metriche.struttura}%</span>
                    </div>
                    <div class="metrica-bar-track">
                        <div class="metrica-bar-fill" style="width: ${vino.metriche.struttura}%;"></div>
                    </div>
                </div>

                <div class="metrica-item">
                    <div class="metrica-label-row">
                        <span>Freschezza</span>
                        <span>${vino.metriche.freschezza}%</span>
                    </div>
                    <div class="metrica-bar-track">
                        <div class="metrica-bar-fill" style="width: ${vino.metriche.freschezza}%;"></div>
                    </div>
                </div>

                <div class="metrica-item">
                    <div class="metrica-label-row">
                        <span>Tannino</span>
                        <span>${vino.metriche.tannino}%</span>
                    </div>
                    <div class="metrica-bar-track">
                        <div class="metrica-bar-fill" style="width: ${vino.metriche.tannino}%;"></div>
                    </div>
                </div>

                <div class="metrica-item">
                    <div class="metrica-label-row">
                        <span>Intensità</span>
                        <span>${vino.metriche.intensita}%</span>
                    </div>
                    <div class="metrica-bar-track">
                        <div class="metrica-bar-fill" style="width: ${vino.metriche.intensita}%;"></div>
                    </div>
                </div>

                <div class="metrica-item" style="margin-top: 4px;">
                    <div class="metrica-label-row" style="color: ${isWin ? 'var(--bordeaux)' : '#555'};">
                        <span>Compatibilità Piatto</span>
                        <span>${vino.metriche.compatibilita}%</span>
                    </div>
                    <div class="metrica-bar-track" style="height: 8px;">
                        <div class="metrica-bar-fill" style="width: ${vino.metriche.compatibilita}%;"></div>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

function resetConfronto() {
    for (let i = 0; i < 3; i++) {
        rimuoviVinoManuale(i);
    }

    statoConfronto.piattoSelezionato = null;
    const bottoni = document.querySelectorAll('.piatto-confronto-btn');
    bottoni.forEach(btn => btn.classList.remove('selezionato'));

    document.getElementById('confronta-risultato').style.display = 'none';
    document.getElementById('confronta-loader').style.display = 'none';
    document.getElementById('confronta-form-wrap').style.display = 'block';

    aggiornaStatoPulsanteConfronto();
    vaiAConfronta();
}