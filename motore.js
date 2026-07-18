console.log("🚀 MOTORE AVVIATO: Architettura pulita e UX reattiva.");

let userPiatto = '';
let userOccasione = '';
let userBudget = 0;

// --- NAVIGAZIONE ---
function avanzaFase(faseAttuale, faseSuccessiva) {
    let divAttuale = document.getElementById('fase-' + faseAttuale);
    let divSuccessivo = document.getElementById('fase-' + faseSuccessiva);
    if (divAttuale) divAttuale.style.display = 'none';
    if (divSuccessivo) divSuccessivo.style.display = 'block';
}

function tornaFase(faseAttuale, fasePrecedente) {
    let divAttuale = document.getElementById('fase-' + faseAttuale);
    let divPrecedente = document.getElementById('fase-' + fasePrecedente);
    if (divAttuale) divAttuale.style.display = 'none';
    if (divPrecedente) divPrecedente.style.display = 'block';
}

function ricomincia() {
    location.reload();
}

// --- SALVATAGGIO CON FEEDBACK VISIVO (UX) ---
function salva(tipo, valore, faseAttuale, faseSuccessiva, bottoneCliccato) {
    // 1. Accendi il bottone per dare feedback visivo all'utente
    if (bottoneCliccato) {
        bottoneCliccato.classList.add('selezionato');
    }

    // 2. Salva il dato in memoria
    if (tipo === 'piatto') userPiatto = valore;
    if (tipo === 'occasione') userOccasione = valore;
    
    // 3. Ritardo di 400ms per permettere all'utente di godersi l'animazione del click
    setTimeout(() => {
        // Spegni il bottone in background così se l'utente torna indietro lo trova resettato
        if (bottoneCliccato) bottoneCliccato.classList.remove('selezionato');

        if (tipo === 'budget') {
            userBudget = parseInt(valore);
            mostraRisultati(); 
        } else if (faseAttuale && faseSuccessiva) {
            avanzaFase(faseAttuale, faseSuccessiva);
        }
    }, 400); 
}

function mostraRisultati() {
    document.getElementById('risultati').style.display = 'block';
    
    // 1. IL TRADUTTORE: Mappa i bottoni della UI con i "vecchi" e "nuovi" tag del database
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

    // Prende la lista di tag da cercare (es. se clicchi Amici/Festa, lui cerca 'cena_amici' O 'festa')
    const piattiCercati = mappaPiatti[userPiatto] || [userPiatto];
    const occasioniCercate = mappaOccasioni[userOccasione] || [userOccasione];

    // 2. IL FILTRAGGIO DINAMICO
    const risultati = viniDatabase.filter(v => {
        // true se il vino ha ALMENO UNO dei tag richiesti per i piatti
        const matchPiatto = v.piatti.some(p => piattiCercati.includes(p));
        // true se il vino ha ALMENO UNO dei tag richiesti per le occasioni
        const matchOccasione = v.occasioni.some(o => occasioniCercate.includes(o));

        return matchPiatto && matchOccasione && v.prezzo <= userBudget;
    });

    const lista = document.getElementById('lista-vini');
    lista.innerHTML = ""; 
    
    if (risultati.length === 0) {
        lista.innerHTML = `<div style="text-align: center; color: #fff;"><h3>Mmm, sfida difficile.</h3><p>Non ho trovato un vino sotto i ${userBudget}€ per questa precisa combinazione. Riprova con un budget più alto.</p></div>`;
        return;
    }

    // 3. LA CARD CINEMATOGRAFICA DEL VINO TOP
    let bottigliaTop = risultati[0];
    
    // Aggiungo frasi personalizzate anche per i vecchi criteri (es. Regalo e Dolci)
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
