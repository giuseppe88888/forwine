// IL SERBATOIO DATI: database.js
// Qui ci vanno SOLO i vini. Nessuna logica.

const viniDatabase = [
    // --- VINI PER CARNE BIANCA E VEGAN ---
    {
        nome: "Vermentino di Gallura DOCG (Sardegna)",
        piatti: ["pesce", "carne bianca", "vegan"],
        occasioni: ["amici", "relax"],
        prezzo: 16,
        valutazione: 4.6,
        motivo: "La sua spiccata sapidità e freschezza ripuliscono il palato senza sovrastare piatti delicati a base di pollo, tacchino o verdure grigliate.",
        aroma: "Macchia mediterranea, Agrumi, Fiori bianchi, Mandorla amara"
    },
    {
        nome: "Gewürztraminer Alto Adige DOC (Trentino)",
        piatti: ["carne bianca", "vegan", "pizza"],
        occasioni: ["appuntamento", "relax"],
        prezzo: 18,
        valutazione: 4.8,
        motivo: "Estremamente aromatico, è il re incontrastato per abbinamenti difficili come cibi speziati, verdure dal gusto deciso o carni bianche saporite.",
        aroma: "Litchi, Rosa, Chiodi di garofano, Frutta tropicale"
    },
    {
        nome: "Pinot Nero dell'Oltrepò Pavese DOC (Lombardia)",
        piatti: ["carne bianca", "pizza", "carne rossa"],
        occasioni: ["appuntamento", "famiglia"],
        prezzo: 22,
        valutazione: 4.7,
        motivo: "Un rosso elegante e dal tannino vellutato. Perfetto per chi vuole un rosso senza appesantire carni bianche o pizze gourmet.",
        aroma: "Piccoli frutti rossi, Sottobosco, Pepe nero, Leggera vaniglia"
    },

    // --- VINI PER PIZZA E AMICI ---
    {
        nome: "Lambrusco di Sorbara DOC (Emilia-Romagna)",
        piatti: ["pizza", "carne bianca", "vegan"],
        occasioni: ["amici", "famiglia"],
        prezzo: 12,
        valutazione: 4.5,
        motivo: "L'acidità vibrante e la bollicina sgrassante lo rendono l'abbinamento definitivo (e storicamente perfetto) per la pizza e i fritti.",
        aroma: "Viola, Fragolina di bosco, Ribes, Lievito"
    },
    {
        nome: "Franciacorta Satèn DOCG (Lombardia)",
        piatti: ["pizza", "pesce", "vegan"],
        occasioni: ["appuntamento", "amici"],
        prezzo: 28,
        valutazione: 4.9,
        motivo: "Il 'Satèn' (100% uve bianche) ha una bollicina setosa e meno aggressiva, ideale per accompagnare pizze bianche, formaggi e crudi.",
        aroma: "Crosta di pane, Burro fuso, Nocciola tostata, Fiori d'acacia"
    },

    // --- VINI IMPORTANTI E MEDITAZIONE ---
    {
        nome: "Amarone della Valpolicella DOCG (Veneto)",
        piatti: ["carne rossa"],
        occasioni: ["appuntamento", "relax"],
        prezzo: 45,
        valutazione: 4.9,
        motivo: "Un gigante dell'enologia. L'appassimento delle uve dona una struttura e una morbidezza inarrivabili, perfetto per arrosti o meditazione.",
        aroma: "Ciliegia sotto spirito, Cioccolato fondente, Tabacco, Cuoio"
    },
    {
        nome: "Barbaresco DOCG (Piemonte)",
        piatti: ["carne rossa", "vegan"], /* Ottimo con tartufo/funghi */
        occasioni: ["appuntamento", "famiglia"],
        prezzo: 38,
        valutazione: 4.8,
        motivo: "Il fratello elegante del Barolo. Tannino fitto ma setoso, perfetto per valorizzare piatti strutturati di carne o risotti ai funghi.",
        aroma: "Rosa passita, Tartufo, Liquirizia, Frutti di bosco"
    },
    {
        nome: "Fiano di Avellino DOCG (Campania)",
        piatti: ["pesce", "carne bianca", "vegan"],
        occasioni: ["amici", "relax"],
        prezzo: 15,
        valutazione: 4.6,
        motivo: "Un bianco del Sud con la stoffa di un rosso. Grande struttura e potenziale di invecchiamento, regge benissimo piatti elaborati.",
        aroma: "Miele, Nocciola, Pera, Sentori fumé"
    }
    // NOTA PER LO SVILUPPO: Aggiungeremo gli altri 190 vini a blocchi qui sotto!
];
