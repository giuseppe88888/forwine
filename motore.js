console.log("🚀 MOTORE AVVIATO: Wizard a 5 risultati, Ricerca libera illimitata!");

let userPiatto = '';
let userOccasione = '';
let userBudget = 0;

document.addEventListener("DOMContentLoaded", () => {
    aggiornaProgressBar(1);
});

function aggiornaProgressBar(fase) {
    let percentuale = 0;
    if (fase === 1) percentuale = 33;
    if (fase === 2) percentuale = 66;
    if (fase === 3) percentuale = 100;
    let bar = document.getElementById('progress-bar');
    if(bar) bar.style.width = percentuale + '%';
}

function avanzaFase(faseAttuale, faseSuccessiva) {
    let divAttuale = document.getElementById('fase-' + faseAttuale);
    let divSuccessivo = document.getElementById('fase-' + faseSuccessiva);
    if (divAttuale) divAttuale.style.display = 'none';
    if (divSuccessivo) divSuccessivo.style.display = 'block';
    aggiornaProgressBar(faseSuccessiva);
}

function salva(tipo, valore, faseAttuale, faseSuccessiva, bottoneCliccato) {
    if(bottoneCliccato) bottoneCliccato.classList.add('selezionato');

    if (tipo === 'piatto') userPiatto = valore;
    if (tipo === 'occasione') userOccasione = valore;
    
    setTimeout(() => {
        if(bottoneCliccato) bottoneCliccato.classList.remove('selezionato');

        if (tipo === 'budget') {
            userBudget = parseInt(valore);
            avviaRicercaSimulata(); 
        } else if (faseAttuale && faseSuccessiva) {
            avanzaFase(faseAttuale, faseSuccessiva);
        }
    }, 400); 
}

function avviaRicercaSimulata() {
    let wiz = document.getElementById('wizard-container');
    let prog = document.getElementById('progress-container');
    let load = document.getElementById('loading-screen');
    let hero = document.getElementById('hero-trust');
    
    if(wiz) wiz.style.display = 'none';
    if(prog) prog.style.display = 'none';
    if(hero) hero.style.display = 'none';
    if(load) load.style.display = 'block';

    const loadingText = document.getElementById('loading-text');
    setTimeout(() => { if(loadingText) loadingText.innerText = "Valuto gli abbinamenti perfetti..."; }, 800);
    setTimeout(() => { if(loadingText) loadingText.innerText = "Controllo i profili aromatici..."; }, 1600);
    setTimeout(() => { if(loadingText) loadingText.innerText = "Ci siamo. Ho le bottiglie perfette."; }, 2400);
    
    setTimeout(() => {
        if(load) load.style.display = 'none';
        mostraRisultati();
    }, 3000); 
}

function mostraRisultati() {
    document.getElementById('risultati').style.display = 'block';
    
    if (typeof viniDatabase === 'undefined') {
        alert("🚨 ERRORE: Il database dei vini non è caricato. Controlla che non manchi una virgola nel file database.js!");
        return;
    }

    const mappaPiatti = {
        'carne_rossa': ['carne_rossa'],
        'carne_bianca': ['carne_bianca'],
        'pesce': ['pesce'],
        'primi_pizza': ['primi', 'pizza'],
        'etnico_veg': ['etnico', 'vegan', 'veg'],
        'dessert_formaggi': ['dolce', 'dessert', 'formaggi']
    };

    const mappaOccasioni = {
        'appuntamento': ['appuntamento'],
        'amici_festa': ['cena_amici', 'festa'],
        'famiglia_grigliata': ['pranzo_domenica', 'grigliata'],
        'relax': ['divano'],
        'aperitivo': ['aperitivo'],
        'regalo': ['regalo']
    };

    const piattiCercati = mappaPiatti[userPiatto] || [userPiatto];
    const occasioniCercate = mappaOccasioni[userOccasione] || [userOccasione];

    const risultati = viniDatabase.filter(v => {
        const matchPiatto = v.piatti && v.piatti.some(p => piattiCercati.includes(p));
        const matchOccasione = v.occasioni && v.occasioni.some(o => occasioniCercate.includes(o));
        return matchPiatto && matchOccasione && v.prezzo <= userBudget;
    });

    // 🔴 WIZARD: Manteniamo il limite a 5
    generaCards(risultati, true, 5);
}

function cercaTestoLibero() {
    let inputEl = document.getElementById('ricerca-libera');
    if (!inputEl) return;
    
    let query = inputEl.value.toLowerCase().trim();
    if (query === '') {
        alert("Inserisci un vino, un sapore o una regione.");
        return;
    }

    let wiz = document.getElementById('wizard-container');
    let hero = document.getElementById('hero-trust');
    let prog = document.getElementById('progress-container');
    let res = document.getElementById('risultati');
    
    if(wiz) wiz.style.display = 'none';
    if(hero) hero.style.display = 'none';
    if(prog) prog.style.display = 'none';
    if(res) res.style.display = 'block';

    if (typeof viniDatabase === 'undefined') {
        alert("🚨 ERRORE: Il database dei vini non è caricato. Controlla che non manchi una virgola nel file database.js!");
        return;
    }

    const risultati = viniDatabase.filter(v => 
        v.nome.toLowerCase().includes(query) || 
        (v.aroma && v.aroma.toLowerCase().includes(query)) ||
        (v.motivo && v.motivo.toLowerCase().includes(query))
    );

    // 🟢 RICERCA LIBERA: Nessun limite (0 = Tutti i risultati)
    generaCards(risultati, false, 0);
}

function generaCards(risultati, usaIntroPersonale, limite) {
    const lista = document.getElementById('lista-vini');
    if(!lista) return;
    lista.innerHTML = ""; 

    if (risultati.length === 0) {
        // L'UTENTE HA CHIESTO TROPPO? SFODERIAMO IL JOLLY.
        // Peschiamo un Franciacorta o uno Champagne come passe-partout di lusso
        let vinoJolly = viniDatabase.find(v => v.nome.includes("Franciacorta DOCG")) || viniDatabase[0];
        
        let ricercaShopping = encodeURIComponent(vinoJolly.nome + " vino bottiglia 75cl");
        let linkShopping = "https://www.google.com/search?tbm=shop&q=" + ricercaShopping;

        lista.innerHTML = `
        <li style="background: linear-gradient(145deg, #1f1f1f, #111); border-radius: 20px; padding: 40px 25px; list-style: none; border: 1px solid var(--gold); margin-bottom: 30px; box-shadow: 0 15px 40px rgba(0,0,0,0.8); position: relative; text-align: center;">
            <div style="position: absolute; top: -15px; right: 20px; background: #fff; color: #111; padding: 8px 15px; border-radius: 20px; font-weight: bold; font-size: 0.9rem;">
                <i class="fa-solid fa-life-ring"></i> L'Alternativa Jolly
            </div>
            <i class="fa-solid fa-wine-glass-empty" style="font-size: 3rem; color: #555; margin-bottom: 15px;"></i>
            <h3 style="font-family: 'Playfair Display', serif; color: #fff; margin: 0 0 10px 0; font-size: 1.8rem;">Richiesta Estrema!</h3>
            <p style="color: #aaa; font-size: 1.1rem; margin-bottom: 25px; line-height: 1.5;">Non ho trovato un abbinamento perfetto sotto questo budget per questi parametri esatti. Ma non ti lascio a bicchiere vuoto.</p>
            
            <div style="background: var(--bordeaux-dark); border-radius: 12px; padding: 25px; text-align: left; margin-bottom: 30px;">
                <h4 style="color: var(--gold); margin-bottom: 10px; font-size: 1.1rem;">La Proposta Universale:</h4>
                <h3 style="color: #fff; font-size: 1.5rem; margin-bottom: 10px;">${vinoJolly.nome}</h3>
                <p style="color: #eee; line-height: 1.6; font-size: 1rem;">Quando le regole si fanno troppo strette, una grande bollicina salva sempre la serata. ${vinoJolly.motivo}</p>
            </div>
            
            <a href="${linkShopping}" target="_blank" style="display: inline-block; width: 100%; background: var(--gold); color: #000; padding: 16px 20px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 1rem; text-transform: uppercase;">
                <i class="fa-solid fa-cart-shopping"></i> Salva la serata
            </a>
        </li>`;
        return;
    }

    // Applica il limite solo se "limite" è maggiore di 0
    let viniDaMostrare = limite > 0 ? risultati.slice(0, limite) : risultati;

    viniDaMostrare.forEach((v, index) => {
        // Calcolo Affinità: non scende mai sotto l'85% per le liste lunghe
        let matchScore = Math.max(85, 99 - (index * 2)); 
        
       let ricercaShopping = encodeURIComponent(v.nome + " vino bottiglia 75cl");
        let linkShopping = "https://www.google.com/search?tbm=shop&q=" + ricercaShopping;
        
        // Creiamo il messaggio WhatsApp definitivo con i link
        let urlSito = window.location.href.split('#')[0]; // Prende il link esatto della tua app
        let messaggioWA = "🍷 Guarda cosa mi ha consigliato il Sommelier di FORWINE!\n\n🍾 *" + v.nome + "* (Circa " + v.prezzo + "€).\n\n🛒 Guardalo qui: " + linkShopping + "\n\n✨ Fai il test anche tu: " + urlSito;
        
        let testoWhatsapp = encodeURIComponent(messaggioWA);
        let linkWhatsapp = "https://api.whatsapp.com/send?text=" + testoWhatsapp;
        let intro = "";
        if (usaIntroPersonale && index === 0) {
            intro = "Eccellente scelta. ";
            if (userOccasione === 'appuntamento') intro = "Per un appuntamento serve eleganza, non arroganza. ";
            if (userPiatto === 'carne_rossa') intro = "La carne rossa chiama tannini importanti per pulire il palato. ";
            if (userOccasione === 'regalo') intro = "Un regalo importante richiede una bottiglia indimenticabile e prestigiosa. ";
            if (userPiatto === 'dessert_formaggi') intro = "I dolci e i formaggi richiedono un calice speciale che sappia bilanciare i sapori. ";
        }

        let immagineHtml = v.immagine ? `<img src="${v.immagine}" alt="${v.nome}" style="max-height: 250px; width: auto; margin: 15px auto 25px auto; display: block; border-radius: 8px; filter: drop-shadow(0 15px 25px rgba(0,0,0,0.8));">` : '';

        lista.innerHTML += `
        <li style="background: linear-gradient(145deg, #1f1f1f, #111); border-radius: 20px; padding: 40px 25px; list-style: none; border: 1px solid var(--bordeaux); margin-bottom: 30px; box-shadow: 0 15px 40px rgba(0,0,0,0.8); position: relative; text-align: center;">
            <div style="position: absolute; top: -15px; right: 20px; background: var(--gold); color: #111; padding: 8px 15px; border-radius: 20px; font-weight: bold; font-size: 0.9rem; box-shadow: 0 5px 15px rgba(212, 175, 55, 0.4);">
                <i class="fa-solid fa-star"></i> Match ${matchScore}%
            </div>
            <p style="color: var(--gold); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; margin-top: 15px;">La Scelta del Sommelier</p>
            
            ${immagineHtml}
            
            <h3 style="font-family: 'Playfair Display', serif; color: #fff; margin: 0 0 10px 0; font-size: 2.2rem;">${v.nome}</h3>
            <p style="color: #aaa; font-size: 1.2rem; margin-bottom: 25px;">Prezzo stimato: <strong style="color: var(--gold);">${v.prezzo}€</strong></p>
            <div style="background: var(--bordeaux-dark); border-radius: 12px; padding: 25px; text-align: left; margin-bottom: 30px; position: relative;">
                <i class="fa-solid fa-quote-left" style="position: absolute; top: 15px; left: 15px; font-size: 3rem; color: rgba(255,255,255,0.05);"></i>
                <h4 style="color: var(--gold); margin-bottom: 10px; font-size: 1.1rem; position: relative; z-index: 1;">Perché questo vino?</h4>
                <p style="color: #eee; line-height: 1.7; font-size: 1.1rem; position: relative; z-index: 1;">
                    ${intro}${v.motivo || 'Un abbinamento eccezionale selezionato dai nostri esperti.'} 
                    <br><br><span style="color:#aaa; font-size: 0.95rem;">👃 Note di degustazione: <strong>${v.aroma || "frutta e spezie"}</strong>.</span>
                </p>
            </div>
            <div style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center;">
                <a href="${linkShopping}" target="_blank" style="flex: 1; min-width: 200px; background: var(--gold); color: #000; padding: 16px 20px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 1rem; text-transform: uppercase; letter-spacing: 1px; transition: 0.3s;">
                    <i class="fa-solid fa-cart-shopping"></i> Cerca e Acquista
                </a>
                <a href="${linkWhatsapp}" target="_blank" style="flex: 1; min-width: 200px; background: #25D366; color: #fff; padding: 16px 20px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 1rem; text-transform: uppercase; letter-spacing: 1px; transition: 0.3s;">
                    <i class="fa-brands fa-whatsapp" style="font-size: 1.2rem;"></i> Condividi
                </a>
            </div>
        </li>
        `;
    });
}

function ricomincia() {
    location.reload();
}