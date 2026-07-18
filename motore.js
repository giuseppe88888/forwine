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

// --- MOTORE DI RICERCA ---
function mostraRisultati() {
    nascondiInterfaccia();
    
    const trad = { 'amici': 'cena_amici', 'appuntamento': 'appuntamento', 'famiglia': 'pranzo_domenica', 'relax': 'divano' };
    const occDB = trad[userOccasione] || userOccasione;

    const risultati = viniDatabase.filter(v => 
        v.piatti.includes(userPiatto) && 
        v.occasioni.includes(occDB) && 
        v.prezzo <= userBudget
    );

    stampaVini(risultati);
}

function cercaTestoLibero() {
    let inputEl = document.getElementById('ricerca-libera');
    if (!inputEl) return;
    
    let query = inputEl.value.toLowerCase().trim();
    if (query === '') {
        alert("Inserisci un vino, un sapore o una regione.");
        return;
    }

    nascondiInterfaccia();

    const risultati = viniDatabase.filter(v => 
        v.nome.toLowerCase().includes(query) || 
        (v.aroma && v.aroma.toLowerCase().includes(query)) ||
        (v.motivo && v.motivo.toLowerCase().includes(query))
    );

    stampaVini(risultati);
}

function nascondiInterfaccia() {
    let f1 = document.getElementById('fase-1');
    let f2 = document.getElementById('fase-2');
    let f3 = document.getElementById('fase-3');
    let hero = document.getElementById('hero-trust');
    
    if (f1) f1.style.display = 'none';
    if (f2) f2.style.display = 'none';
    if (f3) f3.style.display = 'none';
    if (hero) hero.style.display = 'none';
    
    document.getElementById('risultati').style.display = 'block';
}

// --- L'EFFETTO WOW: COSTRUZIONE VISIVA DELLE CARDS ---
function stampaVini(risultati) {
    const lista = document.getElementById('lista-vini');
    lista.innerHTML = ""; 
    
    if (risultati.length === 0) {
        lista.innerHTML = `
        <div style="text-align: center; padding: 40px; border: 1px dashed #d4af37; border-radius: 12px; background: rgba(30,30,30,0.8);">
            <i class="fa-solid fa-wine-glass-empty" style="font-size: 3rem; color: #d4af37; margin-bottom: 15px;"></i>
            <h3 style="color: #fff;">Nessuna etichetta trovata</h3>
            <p style="color: #aaa;">Il nostro sommelier non ha trovato l'abbinamento perfetto con questi parametri. Prova a modificare il budget o la portata.</p>
        </div>`;
        return;
    }

    risultati.slice(0, 5).forEach((v, index) => {
        // Calcolo simulato dell'algoritmo di affinità (Match 94-99%)
        let matchScore = 99 - index; 

        // Fix di Google Shopping richiesto prima
        let ricercaShopping = encodeURIComponent(v.nome + " vino bottiglia 75cl");
        let linkShopping = "https://www.google.com/search?tbm=shop&q=" + ricercaShopping;
        let testoWhatsapp = encodeURIComponent("🍷 Guarda cosa ho trovato su FORWINE: " + v.nome + " (Circa " + v.prezzo + "€). Penso sia perfetto!");
        let linkWhatsapp = "https://api.whatsapp.com/send?text=" + testoWhatsapp;

        lista.innerHTML += `
        <li style="background: linear-gradient(145deg, #1f1f1f, #151515); border-radius: 16px; padding: 0; margin-bottom: 25px; list-style: none; border: 1px solid #333; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.6); position: relative;">
            
            <!-- Badge Affinità -->
            <div style="position: absolute; top: 20px; right: 20px; background: #d4af37; color: #111; padding: 5px 12px; border-radius: 20px; font-weight: bold; font-size: 0.85rem; display: flex; align-items: center; gap: 5px;">
                <i class="fa-solid fa-star"></i> Match ${matchScore}%
            </div>

            <div style="padding: 30px;">
                <h3 style="font-family: 'Playfair Display', serif; color: #d4af37; margin: 0 0 5px 0; font-size: 1.8rem; padding-right: 90px;">${v.nome}</h3>
                <p style="color: #aaa; font-weight: 300; font-size: 1.1rem; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px;">Prezzo stimato: <span style="color:#fff; font-weight:bold;">${v.prezzo}€</span></p>
                
                <div style="background: rgba(0,0,0,0.3); border-left: 3px solid #d4af37; padding: 15px 20px; border-radius: 0 8px 8px 0; margin-bottom: 20px;">
                    <p style="color: #eee; line-height: 1.6; margin: 0; font-style: italic;">"${v.motivo || 'Un abbinamento eccezionale selezionato dai nostri esperti.'}"</p>
                </div>

                ${v.aroma ? `
                <div style="margin-bottom: 25px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                    <span style="color: #888; font-size: 0.9rem; text-transform: uppercase;">Note chiave:</span>
                    <span style="background: #2a2a2a; border: 1px solid #444; color: #ddd; padding: 4px 12px; border-radius: 15px; font-size: 0.85rem;">${v.aroma}</span>
                </div>` : ''}
                
                <div style="display: flex; gap: 12px; flex-wrap: wrap; border-top: 1px solid #333; padding-top: 20px;">
                    <a href="${linkShopping}" target="_blank" style="flex: 1; text-align: center; background: #fff; color: #111; padding: 14px 20px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 0.95rem; transition: background 0.2s;">
                        <i class="fa-solid fa-cart-shopping"></i> Acquista
                    </a>
                    <a href="${linkWhatsapp}" target="_blank" style="flex: 1; text-align: center; background: #25D366; color: #fff; padding: 14px 20px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 0.95rem; transition: background 0.2s;">
                        <i class="fa-brands fa-whatsapp"></i> Invia a un amico
                    </a>
                </div>
            </div>
        </li>
        `;
    });
}
