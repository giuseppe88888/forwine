console.log("🚀 MOTORE AVVIATO E CORRETTO AL 100%");

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
    
    if(wiz) wiz.style.display = 'none';
    if(prog) prog.style.display = 'none';
    if(load) load.style.display = 'block';

    const loadingText = document.getElementById('loading-text');
    
    setTimeout(() => { if(loadingText) loadingText.innerText = "Valuto gli abbinamenti perfetti..."; }, 800);
    setTimeout(() => { if(loadingText) loadingText.innerText = "Controllo i profili aromatici..."; }, 1600);
    setTimeout(() => { if(loadingText) loadingText.innerText = "Ci siamo. Ho la bottiglia perfetta."; }, 2400);
    
    setTimeout(() => {
        if(load) load.style.display = 'none';
        mostraRisultati();
    }, 3000); 
}

function mostraRisultati() {
    let res = document.getElementById('risultati');
    let wiz = document.getElementById('wizard-container');
    let hero = document.getElementById('hero-trust');
    let prog = document.getElementById('progress-container');
    
    if(res) res.style.display = 'block';
    if(wiz) wiz.style.display = 'none';
    if(hero) hero.style.display = 'none';
    if(prog) prog.style.display = 'none';
    
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

    const lista = document.getElementById('lista-vini');
    if(!lista) return;
    lista.innerHTML = ""; 
    
    if (risultati.length === 0) {
        lista.innerHTML = `<div style="text-align: center; color: #fff;"><h3>Mmm, sfida difficile.</h3><p>Non ho trovato un vino sotto i ${userBudget}€ per questa combinazione. Riprova con un budget o parametri diversi.</p></div>`;
        return;
    }

    let bottigliaTop = risultati[0];
    
    let introPersonale = "";
    if (occasioniCercate.includes('appuntamento')) introPersonale = "Per un appuntamento serve eleganza, non arroganza.";
    if (piattiCercati.includes('carne_rossa')) introPersonale = "La carne rossa chiama tannini importanti per pulire il palato.";
    if (occasioniCercate.includes('regalo')) introPersonale = "Un regalo importante richiede una bottiglia indimenticabile e prestigiosa.";
    if (piattiCercati.includes('dolce')) introPersonale = "I dolci richiedono un calice che sappia bilanciare gli zuccheri senza appesantire.";
    
    let ricercaShopping = encodeURIComponent(bottigliaTop.nome + " vino bottiglia 75cl");
    
    lista.innerHTML = `
    <li style="background: linear-gradient(145deg, #1f1f1f, #111); border-radius: 20px; padding: 40px 25px; list-style: none; border: 1px solid var(--bordeaux); box-shadow: 0 15px 40px rgba(0,0,0,0.8); position: relative; text-align: center;">
        <p style="color: var(--gold); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px;">La Scelta del Sommelier</p>
        <h3 style="font-family: 'Playfair Display', serif; color: #fff; margin: 0 0 10px 0; font-size: 2.5rem;">${bottigliaTop.nome}</h3>
        <p style="color: #aaa; font-size: 1.2rem; margin-bottom: 25px;">Prezzo stimato: <strong style="color: var(--gold);">${bottigliaTop.prezzo}€</strong></p>
        <div style="background: var(--bordeaux-dark); border-radius: 12px; padding: 25px; text-align: left; margin-bottom: 30px; position: relative;">
            <i class="fa-solid fa-quote-left" style="position: absolute; top: 15px; left: 15px; font-size: 3rem; color: rgba(255,255,255,0.05);"></i>
            <h4 style="color: var(--gold); margin-bottom: 10px; font-size: 1.1rem; position: relative; z-index: 1;">Perché proprio questo?</h4>
            <p style="color: #eee; line-height: 1.7; font-size: 1.1rem; position: relative; z-index: 1;">
                ${introPersonale} Tra tutte le opzioni, ho scelto questo ${bottigliaTop.nome.split(' ')[0]} perché ${bottigliaTop.motivo ? bottigliaTop.motivo.toLowerCase() : "bilancia perfettamente i sapori del tuo piatto"}. 
                Avvertirai note di <strong>${bottigliaTop.aroma || "frutta rossa e spezie"}</strong>.
            </p>
        </div>
        <a href="https://www.google.com/search?tbm=shop&q=${ricercaShopping}" target="_blank" style="display: inline-block; width: 100%; background: var(--gold); color: #000; padding: 18px 20px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 1px; transition: transform 0.2s;">
            <i class="fa-solid fa-bag-shopping"></i> Cerca e Acquista
        </a>
    </li>
    `;
}

// LA RICERCA LIBERA REINSERITA!
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

    const risultati = viniDatabase.filter(v => 
        v.nome.toLowerCase().includes(query) || 
        (v.aroma && v.aroma.toLowerCase().includes(query)) ||
        (v.motivo && v.motivo.toLowerCase().includes(query))
    );

    const lista = document.getElementById('lista-vini');
    if(!lista) return;
    lista.innerHTML = ""; 

    if (risultati.length === 0) {
        lista.innerHTML = `<div style="text-align: center; color: #fff;"><h3>Nessun vino trovato. 😕</h3><p>Prova a cercare qualcos'altro.</p></div>`;
        return;
    }

    risultati.slice(0, 5).forEach((v) => {
        let ricercaShopping = encodeURIComponent(v.nome + " vino bottiglia 75cl");

        lista.innerHTML += `
        <li style="background: linear-gradient(145deg, #1f1f1f, #111); border-radius: 20px; padding: 40px 25px; list-style: none; border: 1px solid var(--bordeaux); margin-bottom: 25px; box-shadow: 0 15px 40px rgba(0,0,0,0.8); position: relative; text-align: center;">
            <h3 style="font-family: 'Playfair Display', serif; color: #fff; margin: 0 0 10px 0; font-size: 2.5rem;">${v.nome}</h3>
            <p style="color: #aaa; font-size: 1.2rem; margin-bottom: 25px;">Prezzo stimato: <strong style="color: var(--gold);">${v.prezzo}€</strong></p>
            <div style="background: var(--bordeaux-dark); border-radius: 12px; padding: 25px; text-align: left; margin-bottom: 30px; position: relative;">
                <i class="fa-solid fa-quote-left" style="position: absolute; top: 15px; left: 15px; font-size: 3rem; color: rgba(255,255,255,0.05);"></i>
                <p style="color: #eee; line-height: 1.7; font-size: 1.1rem; position: relative; z-index: 1;">
                    ${v.motivo || 'Un abbinamento eccezionale.'}
                    <br><br>Note di: <strong>${v.aroma || "frutta e spezie"}</strong>.
                </p>
            </div>
            <a href="https://www.google.com/search?tbm=shop&q=${ricercaShopping}" target="_blank" style="display: inline-block; width: 100%; background: var(--gold); color: #000; padding: 18px 20px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 1px; transition: transform 0.2s;">
                <i class="fa-solid fa-bag-shopping"></i> Cerca e Acquista
            </a>
        </li>
        `;
    });
}

function ricomincia() {
    location.reload();
}