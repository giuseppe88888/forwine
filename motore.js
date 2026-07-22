console.log("🚀 MOTORE AVVIATO: Cantina e Preferiti attivi!");

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
    // Effetto Fade-in grezzo
    if (divSuccessivo) divSuccessivo.style.animation = "fadeIn 0.5s ease-in-out";
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
        alert("🚨 ERRORE: Il database dei vini non è caricato!"); return;
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

    generaCards(risultati, true, 5); // 5 risultati per il Wizard
}

function cercaTestoLibero() {
    let inputEl = document.getElementById('ricerca-libera');
    if (!inputEl) return;
    let query = inputEl.value.toLowerCase().trim();
    if (query === '') { alert("Inserisci un vino, un sapore o una regione."); return; }

    nascondiTuttoTranneRisultati();

    if (typeof viniDatabase === 'undefined') return;

    const risultati = viniDatabase.filter(v => 
        v.nome.toLowerCase().includes(query) || 
        (v.aroma && v.aroma.toLowerCase().includes(query)) ||
        (v.motivo && v.motivo.toLowerCase().includes(query))
    );

    generaCards(risultati, false, 0); // 0 = Nessun limite
}

// 🍷 LA NUOVA FUNZIONE CANTINA
function mostraCantina() {
    nascondiTuttoTranneRisultati();
    let preferiti = JSON.parse(localStorage.getItem('forwine_preferiti')) || [];
    
    const lista = document.getElementById('lista-vini');
    lista.innerHTML = "";

    if (preferiti.length === 0) {
        lista.innerHTML = `
        <div style="text-align: center; color: #fff; padding: 40px; border: 1px dashed #d4af37; border-radius: 12px; background: rgba(30,30,30,0.8);">
            <i class="fa-regular fa-heart" style="font-size: 3rem; color: #d4af37; margin-bottom: 15px;"></i>
            <h3 style="margin-bottom:10px;">La tua cantina è vuota</h3>
            <p style="color: #aaa; margin-bottom: 20px;">Non hai ancora salvato nessuna bottiglia. Esplora il catalogo e clicca sul cuore per salvare i tuoi vini preferiti.</p>
        </div>`;
        return;
    }

    const risultatiCantina = viniDatabase.filter(v => preferiti.includes(v.nome));
    generaCards(risultatiCantina, false, 0); // Nessun limite nella cantina
}

// 🍷 IL SALVATAGGIO DEI PREFERITI
function togglePreferito(nomeVino, elementoCuore) {
    let preferiti = JSON.parse(localStorage.getItem('forwine_preferiti')) || [];
    let index = preferiti.indexOf(nomeVino);
    
    if (index === -1) {
        preferiti.push(nomeVino);
        elementoCuore.style.color = '#ff4757'; // Rosso pieno
        elementoCuore.innerHTML = '<i class="fa-solid fa-heart"></i>';
    } else {
        preferiti.splice(index, 1);
        elementoCuore.style.color = '#aaa'; // Grigio vuoto
        elementoCuore.innerHTML = '<i class="fa-regular fa-heart"></i>';
    }
    localStorage.setItem('forwine_preferiti', JSON.stringify(preferiti));
}

function nascondiTuttoTranneRisultati() {
    ['wizard-container', 'hero-trust', 'progress-container'].forEach(id => {
        let el = document.getElementById(id);
        if(el) el.style.display = 'none';
    });
    document.getElementById('risultati').style.display = 'block';
}

function generaCards(risultati, usaIntroPersonale, limite) {
    const lista = document.getElementById('lista-vini');
    if(!lista) return;
    lista.innerHTML = ""; 

    if (risultati.length === 0) {
        // IL JOLLY PER LE SCELTE ESTREME
        let vinoJolly = viniDatabase.find(v => v.nome.includes("Franciacorta DOCG")) || viniDatabase[0];
        let linkShopping = "https://www.google.com/search?tbm=shop&q=" + encodeURIComponent(vinoJolly.nome + " vino bottiglia 75cl");

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
            <a href="${linkShopping}" target="_blank" style="display: inline-block; width: 100%; background: var(--gold); color: #000; padding: 16px 20px; text-decoration: none; border-radius: 10px; font-weight: bold; text-transform: uppercase;">
                <i class="fa-solid fa-cart-shopping"></i> Scopri l'alternativa
            </a>
        </li>`;
        return;
    }

    let viniDaMostrare = limite > 0 ? risultati.slice(0, limite) : risultati;
    let preferitiSalvati = JSON.parse(localStorage.getItem('forwine_preferiti')) || [];

    viniDaMostrare.forEach((v, index) => {
        let matchScore = Math.max(85, 99 - (index * 2)); 
        let ricercaShopping = encodeURIComponent(v.nome + " vino bottiglia 75cl");
        let linkShopping = "https://www.google.com/search?tbm=shop&q=" + ricercaShopping;
        let urlSito = window.location.href.split('#')[0];
        let testoWhatsapp = encodeURIComponent("🍷 Guarda cosa mi ha consigliato il Sommelier di FORWINE!\n\n🍾 *" + v.nome + "* (Circa " + v.prezzo + "€).\n\n🛒 Guardalo qui: " + linkShopping + "\n\n✨ Fai il test anche tu: " + urlSito);
        let linkWhatsapp = "https://api.whatsapp.com/send?text=" + testoWhatsapp;

        let intro = "";
        if (usaIntroPersonale && index === 0) {
            intro = "Eccellente scelta. ";
            if (userOccasione === 'appuntamento') intro = "Per un appuntamento serve eleganza, non arroganza. ";
            if (userPiatto === 'carne_rossa') intro = "La carne rossa chiama tannini importanti per pulire il palato. ";
            if (userOccasione === 'regalo') intro = "Un regalo importante richiede una bottiglia indimenticabile e prestigiosa. ";
            if (userPiatto === 'dessert_formaggi') intro = "I dolci e formaggi richiedono un calice che sappia bilanciare i sapori. ";
        }

        // STATO DEL CUORE (Preferiti)
        let nomeSicuro = v.nome.replace(/'/g, "\\'"); // Salva l'apostrofo senza rompere il codice
        let isPreferito = preferitiSalvati.includes(v.nome);
        let coloreCuore = isPreferito ? '#ff4757' : '#aaa';
        let iconaCuore = isPreferito ? 'fa-solid fa-heart' : 'fa-regular fa-heart';

        let immagineHtml = v.immagine ? `<img src="${v.immagine}" alt="${v.nome}" style="max-height: 250px; width: auto; margin: 15px auto 25px auto; display: block; border-radius: 8px; filter: drop-shadow(0 15px 25px rgba(0,0,0,0.8));">` : '';

        lista.innerHTML += `
        <li style="background: linear-gradient(145deg, #1f1f1f, #111); border-radius: 20px; padding: 40px 25px; list-style: none; border: 1px solid var(--bordeaux); margin-bottom: 30px; box-shadow: 0 15px 40px rgba(0,0,0,0.8); position: relative; text-align: center;">
            
            <!-- TASTO PREFERITI (CUORE) -->
            <div onclick="togglePreferito('${nomeSicuro}', this)" style="position: absolute; top: 20px; left: 20px; font-size: 1.8rem; color: ${coloreCuore}; cursor: pointer; z-index: 10; transition: transform 0.2s;">
                <i class="${iconaCuore}"></i>
            </div>

            <!-- BADGE MATCH -->
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
                    ${intro}${v.motivo} 
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