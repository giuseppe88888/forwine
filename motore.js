console.log("🚀 IL MOTORE È ACCESO E COLLEGATO!");

let userPiatto = '';
let userOccasione = '';
let userBudget = 0;

// --- 1. NAVIGAZIONE ---
function avanzaFase(faseAttuale, faseSuccessiva) {
    let divAttuale = document.getElementById('fase-' + faseAttuale);
    let divSuccessivo = document.getElementById('fase-' + faseSuccessiva);
    if (divAttuale) divAttuale.style.display = 'none';
    if (divSuccessivo) divSuccessivo.style.display = 'block';
}

function tornaFase(faseAttuale, fasePrecedente) {
    if (faseAttuale === 4) {
        location.reload(); 
        return;
    }
    let divAttuale = document.getElementById('fase-' + faseAttuale);
    let divPrecedente = document.getElementById('fase-' + fasePrecedente);
    if (divAttuale) divAttuale.style.display = 'none';
    if (divPrecedente) divPrecedente.style.display = 'block';
}

function ricomincia() {
    location.reload();
}

// --- 2. SALVATAGGIO WIZARD ---
function salva(tipo, valore, faseAttuale, faseSuccessiva) {
    if (tipo === 'piatto') userPiatto = valore;
    if (tipo === 'occasione') userOccasione = valore;
    if (tipo === 'budget') {
        userBudget = parseInt(valore);
        mostraRisultati(); 
    }
    
    if (faseAttuale && faseSuccessiva) {
        avanzaFase(faseAttuale, faseSuccessiva);
    }
}

// --- 3. MOTORE DI RICERCA DEL WIZARD ---
function mostraRisultati() {
    // Nascondiamo SOLAMENTE le singole fasi e il testo iniziale, non tutto il contenitore!
    let f1 = document.getElementById('fase-1');
    let f2 = document.getElementById('fase-2');
    let f3 = document.getElementById('fase-3');
    let hero = document.getElementById('hero-trust');
    
    if (f1) f1.style.display = 'none';
    if (f2) f2.style.display = 'none';
    if (f3) f3.style.display = 'none';
    if (hero) hero.style.display = 'none';
    
    document.getElementById('risultati').style.display = 'block';
    
    const trad = { 'amici': 'cena_amici', 'appuntamento': 'appuntamento', 'famiglia': 'pranzo_domenica', 'relax': 'divano' };
    const occDB = trad[userOccasione] || userOccasione;

    const risultati = viniDatabase.filter(v => 
        v.piatti.includes(userPiatto) && 
        v.occasioni.includes(occDB) && 
        v.prezzo <= userBudget
    );

    stampaVini(risultati);
}

// --- 4. MOTORE DI RICERCA LIBERA (Barra in alto) ---
function cercaTestoLibero() {
    let inputEl = document.getElementById('ricerca-libera');
    if (!inputEl) return;
    
    let query = inputEl.value.toLowerCase().trim();
    if (query === '') {
        alert("Scrivi il nome di un vino, un sapore (es. fruttato) o un abbinamento!");
        return;
    }

    // Anche qui, spegniamo solo i pezzi singoli
    let f1 = document.getElementById('fase-1');
    let f2 = document.getElementById('fase-2');
    let f3 = document.getElementById('fase-3');
    let hero = document.getElementById('hero-trust');
    
    if (f1) f1.style.display = 'none';
    if (f2) f2.style.display = 'none';
    if (f3) f3.style.display = 'none';
    if (hero) hero.style.display = 'none';
    
    document.getElementById('risultati').style.display = 'block';

    const risultati = viniDatabase.filter(v => 
        v.nome.toLowerCase().includes(query) || 
        (v.aroma && v.aroma.toLowerCase().includes(query)) ||
        (v.motivo && v.motivo.toLowerCase().includes(query))
    );

    stampaVini(risultati);
}

// --- 5. COSTRUZIONE VISIVA DELLE CARDS ---
function stampaVini(risultati) {
    const lista = document.getElementById('lista-vini');
    lista.innerHTML = ""; 
    
    if (risultati.length === 0) {
        lista.innerHTML = "<li style='list-style: none; text-align:center;'><h3>Nessun vino trovato. 😕</h3><p>Prova ad alzare il budget o a cambiare parametri.</p></li>";
        return;
    }

    risultati.slice(0, 5).forEach(v => {
        let ricercaShopping = encodeURIComponent(v.nome + " vino");
        let linkShopping = "https://www.google.com/search?tbm=shop&q=" + ricercaShopping;
        
        let testoWhatsapp = encodeURIComponent("🍷 Guarda questo vino che ho trovato su FORWINE: " + v.nome + " (Circa " + v.prezzo + "€). Perfetto per noi!");
        let linkWhatsapp = "https://api.whatsapp.com/send?text=" + testoWhatsapp;

        lista.innerHTML += `
        <li style="background: #1a1a1a; border-radius: 12px; padding: 25px; margin-bottom: 20px; list-style: none; border: 1px solid #d4af37; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
            <h3 style="color: #d4af37; margin-top: 0; font-size: 1.6rem;">${v.nome}</h3>
            
            <div style="color: #ddd; line-height: 1.6; margin-bottom: 15px;">
                <p style="font-size: 1.2rem; margin-bottom: 10px;">💰 <strong>Prezzo medio:</strong> ${v.prezzo}€</p>
                ${v.motivo ? `<p>🎯 <strong>Il parere del Sommelier:</strong> ${v.motivo}</p>` : ''}
                ${v.aroma ? `<p>👃 <strong>Note di degustazione:</strong> ${v.aroma}</p>` : ''}
            </div>
            
            <div style="margin-top: 20px; display: flex; gap: 10px; flex-wrap: wrap;">
                <a href="${linkShopping}" target="_blank" style="background: #fff; color: #111; padding: 12px 20px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 0.95rem; transition: 0.3s;">
                    <i class="fa-solid fa-cart-shopping"></i> Trova e Compra
                </a>
                <a href="${linkWhatsapp}" target="_blank" style="background: #25D366; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 0.95rem; transition: 0.3s;">
                    <i class="fa-brands fa-whatsapp"></i> Condividi
                </a>
            </div>
        </li>
        `;
    });
}
