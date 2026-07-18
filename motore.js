let userPiatto = '';
let userOccasione = '';
let userBudget = 0;

// INIZIALIZZAZIONE PROGRESS BAR
document.addEventListener("DOMContentLoaded", () => {
    aggiornaProgressBar(1);
});

function aggiornaProgressBar(fase) {
    let percentuale = 0;
    if (fase === 1) percentuale = 33;
    if (fase === 2) percentuale = 66;
    if (fase === 3) percentuale = 100;
    document.getElementById('progress-bar').style.width = percentuale + '%';
}

function avanzaFase(faseAttuale, faseSuccessiva) {
    document.getElementById('fase-' + faseAttuale).style.display = 'none';
    document.getElementById('fase-' + faseSuccessiva).style.display = 'block';
    aggiornaProgressBar(faseSuccessiva);
}

function salva(tipo, valore, faseAttuale, faseSuccessiva, bottoneCliccato) {
    bottoneCliccato.classList.add('selezionato');

    if (tipo === 'piatto') userPiatto = valore;
    if (tipo === 'occasione') userOccasione = valore;
    
    setTimeout(() => {
        bottoneCliccato.classList.remove('selezionato');

        if (tipo === 'budget') {
            userBudget = parseInt(valore);
            avviaRicercaSimulata(); // Avvia il finto caricamento WOW
        } else if (faseAttuale && faseSuccessiva) {
            avanzaFase(faseAttuale, faseSuccessiva);
        }
    }, 400); 
}

// L'EFFETTO WOW: Finto ragionamento del Sommelier
function avviaRicercaSimulata() {
    document.getElementById('wizard-container').style.display = 'none';
    document.getElementById('progress-container').style.display = 'none';
    document.getElementById('loading-screen').style.display = 'block';

    const loadingText = document.getElementById('loading-text');
    
    setTimeout(() => { loadingText.innerText = "Valuto gli abbinamenti perfetti..."; }, 800);
    setTimeout(() => { loadingText.innerText = "Controllo i profili aromatici..."; }, 1600);
    setTimeout(() => { loadingText.innerText = "Ci siamo. Ho la bottiglia perfetta."; }, 2400);
    
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        mostraRisultati();
    }, 3000); // 3 secondi di "suspense"
}

function mostraRisultati() {
    document.getElementById('risultati').style.display = 'block';
    
    const trad = { 'amici': 'cena_amici', 'appuntamento': 'appuntamento', 'famiglia': 'pranzo_domenica', 'relax': 'divano' };
    const occDB = trad[userOccasione] || userOccasione;

    const risultati = viniDatabase.filter(v => 
        v.piatti.includes(userPiatto) && 
        v.occasioni.includes(occDB) && 
        v.prezzo <= userBudget
    );

    const lista = document.getElementById('lista-vini');
    lista.innerHTML = ""; 
    
    if (risultati.length === 0) {
        lista.innerHTML = `<div style="text-align: center; color: #fff;"><h3>Mmm, sfida difficile.</h3><p>Non ho trovato un vino sotto i ${userBudget}€ per questa precisa combinazione. Riprova con un budget più alto.</p></div>`;
        return;
    }

    // Prendiamo solo il MIGLIORE assoluto (o i primi 2) per mantenere il focus
    let bottigliaTop = risultati[0];
    
    // Generazione della PERSONALITÀ (Motivazione dinamica)
    let introPersonale = "";
    if (userOccasione === 'appuntamento') introPersonale = "Per un appuntamento serve eleganza, non arroganza.";
    if (userPiatto === 'carne_rossa') introPersonale = "La carne rossa chiama tannini importanti per pulire il palato.";
    
    let ricercaShopping = encodeURIComponent(bottigliaTop.nome + " vino bottiglia 75cl");
    
    // Il nuovo layout della CARD: Enorme, lussuoso, da vetrina
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
