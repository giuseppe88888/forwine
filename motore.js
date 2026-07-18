function mostraRisultati() {
    // 1. Forza la visualizzazione
    document.getElementById('wizard-container').style.display = 'none';
    document.getElementById('risultati').style.display = 'block';
    const lista = document.getElementById('lista-vini');
    
    // 2. MESSAGGIO FORZATO (Se vedi questo, il JS sta funzionando!)
    lista.innerHTML = "<li>TEST: Il motore sta girando...</li>";

    // 3. Controllo sicurezza database
    if (typeof viniDatabase === 'undefined') {
        lista.innerHTML = "<li>ERRORE: Non trovo il database (viniDatabase)!</li>";
        return;
    }

    // ... resto della logica ...
}
