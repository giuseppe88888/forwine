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
    },
   // --- BLOCCO 1: BIANCHI E BOLLICINE ---
    {
        nome: "Trento DOC Perlé (Trentino)",
        piatti: ["pesce", "pizza", "carne bianca"],
        occasioni: ["appuntamento", "amici", "festa"],
        prezzo: 35,
        valutazione: 4.8,
        motivo: "Uno spumante metodo classico di grande eleganza. La sua bollicina fine e persistente sgrassa perfettamente fritti, pizze ricche e antipasti di mare.",
        aroma: "Crosta di pane, Mela renetta, Mandorla tostata, Agrumi"
    },
    {
        nome: "Prosecco Superiore Valdobbiadene DOCG (Veneto)",
        piatti: ["pizza", "pesce", "vegan"],
        occasioni: ["amici", "famiglia", "aperitivo"],
        prezzo: 14,
        valutazione: 4.4,
        motivo: "Freschissimo, leggero e immediato. Il re dell'aperitivo italiano, perfetto per accompagnare una pizza in compagnia senza appesantire.",
        aroma: "Pera, Mela verde, Fiori bianchi, Pesca"
    },
    {
        nome: "Ribolla Gialla Friuli Colli Orientali DOC (Friuli)",
        piatti: ["pesce", "vegan", "carne bianca"],
        occasioni: ["amici", "relax"],
        prezzo: 18,
        valutazione: 4.6,
        motivo: "Un bianco teso e minerale. La sua spiccata freschezza esalta piatti vegetariani, verdure grigliate e crudi di mare.",
        aroma: "Limone, Fiori di campo, Sasso bagnato, Erbe aromatiche"
    },
    {
        nome: "Greco di Tufo DOCG (Campania)",
        piatti: ["pesce", "carne bianca", "vegan"],
        occasioni: ["famiglia", "amici"],
        prezzo: 16,
        valutazione: 4.5,
        motivo: "Un bianco del sud di grande struttura e sapidità. Regge benissimo anche carni bianche saporite o formaggi freschi.",
        aroma: "Albicocca, Mandorla, Zolfo, Gelsomino"
    },
    {
        nome: "Verdicchio dei Castelli di Jesi DOC (Marche)",
        piatti: ["pesce", "carne bianca", "pizza"],
        occasioni: ["famiglia", "quotidiano"],
        prezzo: 13,
        valutazione: 4.5,
        motivo: "Incredibilmente versatile. L'inconfondibile finale ammandorlato lo rende il compagno ideale per il pesce al forno o carni bianche delicate.",
        aroma: "Ginestra, Pesca bianca, Mandorla amara, Anice"
    },
    {
        nome: "Roero Arneis DOCG (Piemonte)",
        piatti: ["vegan", "pesce", "carne bianca"],
        occasioni: ["amici", "famiglia"],
        prezzo: 15,
        valutazione: 4.4,
        motivo: "Morbido, floreale e beverino. Un bianco elegante che si sposa meravigliosamente con antipasti, verdure e piatti leggeri.",
        aroma: "Camomilla, Pera, Fiori bianchi, Nocciola"
    },
    {
        nome: "Etna Bianco DOC (Sicilia)",
        piatti: ["pesce", "vegan", "carne bianca"],
        occasioni: ["appuntamento", "relax"],
        prezzo: 22,
        valutazione: 4.7,
        motivo: "Un vino 'vulcanico' che unisce eleganza e potenza. La marcata mineralità lo rende un fuoriclasse sui piatti di mare elaborati.",
        aroma: "Pietra focaia, Limone, Ginestra, Erbe aromatiche"
    },
    {
        nome: "Lugana DOC (Lombardia)",
        piatti: ["pesce", "vegan", "pizza"],
        occasioni: ["amici", "appuntamento"],
        prezzo: 14,
        valutazione: 4.5,
        motivo: "Morbido ma sapido, con un sorso avvolgente. Fantastico sui risotti di verdure o sui formaggi a pasta molle.",
        aroma: "Melone, Mandorla, Agrumi, Fiori bianchi"
    },
    {
        nome: "Alta Langa DOCG (Piemonte)",
        piatti: ["pesce", "pizza", "carne bianca"],
        occasioni: ["appuntamento", "relax"],
        prezzo: 26,
        valutazione: 4.8,
        motivo: "La grande risposta piemontese allo Champagne. Bolla cremosa e corpo strutturato, stupendo su carni bianche in salsa o crudité.",
        aroma: "Nocciola tostata, Burro, Crosta di pane, Agrumi canditi"
    },
    {
        nome: "Falanghina del Sannio DOC (Campania)",
        piatti: ["pesce", "vegan", "pizza"],
        occasioni: ["amici", "famiglia"],
        prezzo: 12,
        valutazione: 4.3,
        motivo: "Un bianco solare ed esplosivo. L'ottimo rapporto qualità/prezzo lo rende il re delle cene informali a base di pesce o pizza margherita.",
        aroma: "Ananas, Banana, Fiori gialli, Miele"
    },

    // --- BLOCCO 2: ROSSI LEGGERI E MEDI ---
    {
        nome: "Chianti Classico DOCG (Toscana)",
        piatti: ["carne rossa", "carne bianca", "pizza"],
        occasioni: ["famiglia", "amici", "tradizione"],
        prezzo: 18,
        valutazione: 4.6,
        motivo: "Il simbolo dell'Italia a tavola. Fresco e con un tannino vivace, "pulisce" la bocca dopo piatti sugosi o saporiti.",
        aroma: "Ciliegia marasca, Viola mammola, Terra bagnata, Pepe"
    },
    {
        nome: "Barbera d'Alba DOC (Piemonte)",
        piatti: ["carne rossa", "pizza", "carne bianca"],
        occasioni: ["famiglia", "amici"],
        prezzo: 15,
        valutazione: 4.5,
        motivo: "La sua spiccata acidità è un'arma segreta contro i cibi grassi. Perfetta con salumi, formaggi e piatti rustici.",
        aroma: "Prugna, Ciliegia croccante, Spezie leggere, Mora"
    },
    {
        nome: "Valpolicella Ripasso DOC (Veneto)",
        piatti: ["carne rossa", "carne bianca"],
        occasioni: ["appuntamento", "famiglia"],
        prezzo: 20,
        valutazione: 4.7,
        motivo: "Il 'Baby Amarone'. Morbido, rotondo e avvolgente, accompagna carni rosse e bianche arrostite donando un tocco di eleganza.",
        aroma: "Confettura di ciliegie, Cannella, Cioccolato, Pepe nero"
    },
    {
        nome: "Dolcetto d'Alba DOC (Piemonte)",
        piatti: ["pizza", "carne bianca", "vegan"],
        occasioni: ["quotidiano", "famiglia"],
        prezzo: 12,
        valutazione: 4.3,
        motivo: "Vino da pasto per eccellenza. Secco e dal finale ammandorlato, è uno dei pochi rossi che si abbina facilmente a piatti vegetariani.",
        aroma: "Ciliegia fresca, Mandorla, Fiori viola"
    },
    {
        nome: "Bardolino DOC (Veneto)",
        piatti: ["pizza", "carne bianca", "pesce"],
        occasioni: ["amici", "informale"],
        prezzo: 11,
        valutazione: 4.2,
        motivo: "Un rosso talmente leggero e speziato che, servito leggermente fresco, può accompagnare perfino il pesce al forno o tranci di tonno.",
        aroma: "Pepe bianco, Ciliegia, Lampone, Cannella"
    },
    {
        nome: "Schiava Alto Adige DOC (Trentino)",
        piatti: ["carne bianca", "vegan", "pizza"],
        occasioni: ["amici", "relax"],
        prezzo: 14,
        valutazione: 4.4,
        motivo: "Leggerissimo e profumato. Ideale per chi cerca un vino rosso che non impegni il palato, perfetto con lo speck o piatti leggeri.",
        aroma: "Zucchero filato, Fragola, Mandorla, Viola"
    },
    {
        nome: "Frappato Vittoria DOC (Sicilia)",
        piatti: ["pesce", "carne bianca", "pizza"],
        occasioni: ["amici", "appuntamento"],
        prezzo: 16,
        valutazione: 4.6,
        motivo: "Un fuoriclasse siciliano: un rosso floreale e fresco che si sposa meravigliosamente con zuppe di pesce saporite e carni bianche.",
        aroma: "Rosa, Fragolina, Spezie dolci, Pepe bianco"
    },
    {
        nome: "Lagrein Trentino DOC (Trentino)",
        piatti: ["carne rossa", "carne bianca"],
        occasioni: ["famiglia", "amici"],
        prezzo: 18,
        valutazione: 4.5,
        motivo: "Corposo ma vellutato, con note scure e profonde. Stupendo su carni saporite o taglieri di formaggi stagionati.",
        aroma: "Frutti neri, Cacao, Viola, Liquirizia"
    },
    {
        nome: "Montepulciano d'Abruzzo DOC (Abruzzo)",
        piatti: ["carne rossa", "pizza", "carne bianca"],
        occasioni: ["famiglia", "amici"],
        prezzo: 10,
        valutazione: 4.4,
        motivo: "Rapporto qualità-prezzo imbattibile. Morbido, succoso e accogliente, è il compagno ideale per cene conviviali e arrosticini.",
        aroma: "Amarena, Prugna, Tabacco leggero, Terra"
    },
    {
        nome: "Ruchè di Castagnole Monferrato DOCG (Piemonte)",
        piatti: ["carne bianca", "vegan"],
        occasioni: ["relax", "appuntamento"],
        prezzo: 19,
        valutazione: 4.7,
        motivo: "Un vino rosso aromatico e rarissimo. I suoi profumi esplosivi lo rendono magico su cibi speziati (perfino cucina asiatica) o formaggi erborinati.",
        aroma: "Rosa appassita, Pepe nero, Geranio, Spezie orientali"
    },

    // --- BLOCCO 3: ROSSI STRUTTURATI E IMPORTANTI ---
    {
        nome: "Brunello di Montalcino DOCG (Toscana)",
        piatti: ["carne rossa"],
        occasioni: ["appuntamento", "relax", "meditazione"],
        prezzo: 45,
        valutazione: 4.9,
        motivo: "Eleganza pura imbottigliata. Un Sangiovese in purezza invecchiato a lungo che richiede piatti all'altezza: cacciagione, fiorentina o... il camino acceso.",
        aroma: "Ciliegia matura, Tabacco, Cuoio, Sottobosco"
    },
    {
        nome: "Barolo DOCG (Piemonte)",
        piatti: ["carne rossa"],
        occasioni: ["appuntamento", "relax", "regalo"],
        prezzo: 50,
        valutazione: 4.9,
        motivo: "Il Re dei Vini. Tannino possente e profumi eterei che si sprigionano nel bicchiere: l'abbinamento definitivo per brasati o piatti al tartufo.",
        aroma: "Rosa, Tartufo, Catrame, Liquirizia, Ciliegia sotto spirito"
    },
    {
        nome: "Taurasi DOCG (Campania)",
        piatti: ["carne rossa"],
        occasioni: ["relax", "famiglia"],
        prezzo: 35,
        valutazione: 4.8,
        motivo: "Definito 'Il Barolo del Sud'. Un'esplosione di tannini morbidi e frutta scura, perfetto per arrosti importanti o formaggi molto stagionati.",
        aroma: "Mora, Cenere, Cacao amaro, Pepe nero"
    },
    {
        nome: "Aglianico del Vulture DOC (Basilicata)",
        piatti: ["carne rossa", "carne bianca"],
        occasioni: ["famiglia", "appuntamento"],
        prezzo: 20,
        valutazione: 4.6,
        motivo: "Vino di origine vulcanica. Potente e sapido, regala un'esperienza profonda a un prezzo spesso accessibile. Perfetto per la grigliata perfetta.",
        aroma: "Prugna nera, Cenere, Liquirizia, Spezie scure"
    },
    {
        nome: "Cannonau di Sardegna DOC (Sardegna)",
        piatti: ["carne rossa", "carne bianca"],
        occasioni: ["amici", "famiglia"],
        prezzo: 16,
        valutazione: 4.5,
        motivo: "Caldo, avvolgente e alcolico. Cattura il sole e il vento della Sardegna, ideale compagno di maialino arrosto o formaggi pecorini dal gusto forte.",
        aroma: "Mirto, Macchia mediterranea, Frutti rossi maturi, Pepe"
    },
    {
        nome: "Primitivo di Manduria DOC (Puglia)",
        piatti: ["carne rossa", "relax"],
        occasioni: ["amici", "appuntamento"],
        prezzo: 18,
        valutazione: 4.7,
        motivo: "Morbido, dolce e suadente al palato nonostante il grado alcolico. Piace a tutti per la sua esplosione di frutta. Ottimo a fine pasto o su carni grigliate.",
        aroma: "Confettura di more, Cioccolato, Vaniglia, Cannella"
    },
    {
        nome: "Nero d'Avola Sicilia DOC (Sicilia)",
        piatti: ["carne rossa", "pizza", "carne bianca"],
        occasioni: ["famiglia", "amici"],
        prezzo: 12,
        valutazione: 4.4,
        motivo: "Un concentrato di succulenza e calore. Strutturato ma scorrevole, capace di accompagnare dalle paste al forno alle grigliate miste.",
        aroma: "Ciliegia scura, Carruba, Spezie dolci, Macchia mediterranea"
    },
    {
        nome: "Sagrantino di Montefalco DOCG (Umbria)",
        piatti: ["carne rossa"],
        occasioni: ["relax", "meditazione"],
        prezzo: 38,
        valutazione: 4.8,
        motivo: "Il vino con più tannini al mondo. Un fuoriclasse assoluto che asciuga il palato in modo elegante, fatto per piatti estremamente ricchi e succulenti.",
        aroma: "Mora, Inchiostro, Tabacco da pipa, Pepe nero"
    },
    {
        nome: "Bolgheri Superiore DOC (Toscana)",
        piatti: ["carne rossa"],
        occasioni: ["appuntamento", "relax"],
        prezzo: 60,
        valutazione: 4.9,
        motivo: "Il taglio bordolese (Cabernet/Merlot) interpretato in Toscana. Eleganza internazionale, tannini di velluto e una persistenza infinita in bocca.",
        aroma: "Ribes nero, Peperone verde, Caffè, Vaniglia, Cedro"
    },
    {
        nome: "Vino Nobile di Montepulciano DOCG (Toscana)",
        piatti: ["carne rossa", "carne bianca"],
        occasioni: ["famiglia", "appuntamento"],
        prezzo: 22,
        valutazione: 4.6,
        motivo: "Spesso oscurato dal Chianti o dal Brunello, è in realtà un gioiello di eleganza e bevibilità. Straordinario sui primi piatti con ragù di carne.",
        aroma: "Amarena, Mammola, Terra bagnata, Chiodi di garofano"
    },
    // --- BLOCCO 4: I ROSATI (I Re della Versatilità) ---
    {
        nome: "Cerasuolo d'Abruzzo DOC (Abruzzo)",
        piatti: ["pizza", "carne bianca", "vegan", "pesce"],
        occasioni: ["amici", "famiglia", "relax"],
        prezzo: 14,
        valutazione: 4.5,
        motivo: "Ha il colore di un rosato ma l'anima di un rosso. Regge benissimo carni bianche, taglieri di salumi, pizze saporite e perfino brodi di pesce.",
        aroma: "Fragola, Ciliegia, Melograno, Mandorla"
    },
    {
        nome: "Valtènesi Chiaretto DOC (Lombardia)",
        piatti: ["pesce", "pizza", "vegan"],
        occasioni: ["appuntamento", "amici"],
        prezzo: 16,
        valutazione: 4.6,
        motivo: "Elegante e raffinato, dal colore rosa tenue. Fantastico per un aperitivo chic o abbinato a sushi, verdure grigliate e margherita.",
        aroma: "Rosa, Pompelmo rosa, Pesca bianca, Fiori di campo"
    },
    {
        nome: "Negroamaro Rosato Salento IGT (Puglia)",
        piatti: ["pizza", "pesce", "carne bianca"],
        occasioni: ["amici", "famiglia"],
        prezzo: 12,
        valutazione: 4.3,
        motivo: "Fresco, succoso e sapido. Un rosato del sud che porta allegria a tavola, perfetto su fritture di mare o focacce ripiene.",
        aroma: "Lampone, Mora, Macchia mediterranea, Sale"
    },
    {
        nome: "Etna Rosato DOC (Sicilia)",
        piatti: ["pesce", "vegan", "carne bianca"],
        occasioni: ["appuntamento", "relax"],
        prezzo: 22,
        valutazione: 4.7,
        motivo: "Minerale e teso, nasce ad alta quota sul vulcano. Pulisce il palato in modo straordinario, esaltando crudi di pesce o piatti vegetariani speziati.",
        aroma: "Cenere, Fragolina di bosco, Ribes, Erbe aromatiche"
    },

    // --- BLOCCO 5: BIANCHI AROMATICI E FRESCHI ---
    {
        nome: "Sauvignon Blanc Alto Adige DOC (Trentino-Alto Adige)",
        piatti: ["vegan", "pesce", "carne bianca"],
        occasioni: ["appuntamento", "amici"],
        prezzo: 19,
        valutazione: 4.8,
        motivo: "L'esplosione dei profumi. Le sue inconfondibili note verdi lo rendono il matrimonio perfetto per asparagi, piatti vegetariani e cucina asiatica.",
        aroma: "Foglia di pomodoro, Pompelmo, Salvia, Frutto della passione"
    },
    {
        nome: "Pecorino Offida DOCG (Marche)",
        piatti: ["pesce", "carne bianca", "pizza"],
        occasioni: ["famiglia", "amici"],
        prezzo: 15,
        valutazione: 4.5,
        motivo: "Un bianco con le spalle larghe, sapido e strutturato. Ottimo compagno per formaggi, carni bianche e fritti misti.",
        aroma: "Mela renetta, Anice, Ginestra, Erbe spontanee"
    },
    {
        nome: "Gavi DOCG (Piemonte)",
        piatti: ["pesce", "vegan", "pizza"],
        occasioni: ["appuntamento", "famiglia"],
        prezzo: 17,
        valutazione: 4.6,
        motivo: "Prodotto da uva Cortese, è un bianco tagliente ed elegantissimo. La sua finezza lo sposa perfettamente a ostriche e risotti delicati.",
        aroma: "Fiori bianchi, Limone, Mandorla fresca, Camomilla"
    },
    {
        nome: "Vermentino Colli di Luni DOC (Liguria)",
        piatti: ["pesce", "vegan"],
        occasioni: ["amici", "appuntamento"],
        prezzo: 18,
        valutazione: 4.7,
        motivo: "Sa di mare e di erbe liguri. La sua sapidità spiccata lo rende l'unico abbinamento davvero perfetto per il pesto alla genovese o il pesce al sale.",
        aroma: "Basilico, Timo, Pompelmo, Salsedine"
    },
    {
        nome: "Timorasso Derthona DOC (Piemonte)",
        piatti: ["carne bianca", "pesce", "vegan"],
        occasioni: ["relax", "amici"],
        prezzo: 25,
        valutazione: 4.8,
        motivo: "Il 'Barolo bianco'. Ha una struttura immensa e un potenziale di invecchiamento lunghissimo. Regge tranquillamente carni bianche tartufate.",
        aroma: "Idrocarburo, Miele di acacia, Pietra focaia, Pesca"
    },
    {
        nome: "Vernaccia di San Gimignano DOCG (Toscana)",
        piatti: ["pesce", "carne bianca", "vegan"],
        occasioni: ["famiglia", "relax"],
        prezzo: 14,
        valutazione: 4.4,
        motivo: "Il bianco storico della Toscana. Secco, asciutto e sapido, ha un finale amarognolo che sgrassa benissimo formaggi freschi e carni bianche.",
        aroma: "Mela verde, Mandorla amara, Silece, Fiori di campo"
    },
    {
        nome: "Grillo Sicilia DOC (Sicilia)",
        piatti: ["pesce", "pizza", "vegan"],
        occasioni: ["amici", "famiglia"],
        prezzo: 13,
        valutazione: 4.3,
        motivo: "Intenso, caldo e marino. È un bianco avvolgente che si abbina a meraviglia con paste con le sarde, tonno o semplici cene tra amici.",
        aroma: "Agrumi di Sicilia, Gelsomino, Fiori d'arancio, Timo"
    },
    {
        nome: "Trebbiano d'Abruzzo DOC (Abruzzo)",
        piatti: ["pesce", "carne bianca", "vegan"],
        occasioni: ["famiglia", "quotidiano"],
        prezzo: 11,
        valutazione: 4.2,
        motivo: "Fresco, pulito, delicato e senza fronzoli. Il classico vino da tavola bianco che non stanca mai, perfetto per paste leggere o piatti vegan.",
        aroma: "Fiori di campo, Mela, Pera, Limone"
    },
    {
        nome: "Müller-Thurgau Trentino DOC (Trentino)",
        piatti: ["vegan", "pesce"],
        occasioni: ["amici", "relax"],
        prezzo: 13,
        valutazione: 4.4,
        motivo: "Leggero, aromatico e super beverino. Nasce ad alta quota ed è la scelta ideale per accompagnare verdure, torte salate e antipasti delicati.",
        aroma: "Pesca bianca, Noce moscata, Salvia, Mela verde"
    },

    // --- BLOCCO 6: BOLLICINE E FRIZZANTI (Alternativi) ---
    {
        nome: "Lambrusco Grasparossa di Castelvetro DOC (Emilia-Romagna)",
        piatti: ["pizza", "carne bianca", "carne rossa"],
        occasioni: ["amici", "famiglia", "informale"],
        prezzo: 11,
        valutazione: 4.5,
        motivo: "A differenza del Sorbara, il Grasparossa è più scuro, tannico e corposo. Sgrassa perfettamente piatti unti, ragù ricchi e pizze ai salumi.",
        aroma: "Mora, Prugna nera, Viola, Sottobosco"
    },
    {
        nome: "Pignoletto Frizzante DOCG (Emilia-Romagna)",
        piatti: ["pizza", "pesce", "vegan"],
        occasioni: ["amici", "aperitivo"],
        prezzo: 12,
        valutazione: 4.3,
        motivo: "L'alternativa vivace al Prosecco. La sua bollicina spigliata e il finale piacevolmente amarognolo lo rendono perfetto con i fritti.",
        aroma: "Mela, Pera, Biancospino, Lievito"
    },
    {
        nome: "Franciacorta Pas Dosé DOCG (Lombardia)",
        piatti: ["pesce", "vegan"],
        occasioni: ["appuntamento", "relax"],
        prezzo: 32,
        valutazione: 4.8,
        motivo: "Senza zuccheri aggiunti. Estremamente secco, verticale e tagliente. Pulisce la bocca dopo fritti importanti, crudi e ostriche.",
        aroma: "Nocciola tostata, Crosta di pane, Agrumi scuri, Gesso"
    },
    {
        nome: "Oltrepò Pavese Metodo Classico Pinot Nero DOCG (Lombardia)",
        piatti: ["pizza", "carne bianca", "pesce"],
        occasioni: ["appuntamento", "famiglia"],
        prezzo: 24,
        valutazione: 4.7,
        motivo: "Struttura da vendere grazie al Pinot Nero. Regge l'urto anche con piatti di terra, funghi e pizze gourmet corpose.",
        aroma: "Ribes, Mandorla, Crosta di pane, Frutti rossi"
    },

    // --- BLOCCO 7: ROSSI QUOTIDIANI E DI TERRITORIO ---
    {
        nome: "Gutturnio Superiore DOC (Emilia-Romagna)",
        piatti: ["carne rossa", "pizza", "carne bianca"],
        occasioni: ["amici", "famiglia", "tradizione"],
        prezzo: 14,
        valutazione: 4.6,
        motivo: "L'orgoglio dei Colli Piacentini. Unione di Barbera e Croatina, unisce freschezza e struttura. Immancabile compagno di coppa piacentina e paste ripiene.",
        aroma: "Prugna, Frutti rossi maturi, Viola, Spezie dolci"
    },
    {
        nome: "Morellino di Scansano DOCG (Toscana)",
        piatti: ["carne rossa", "carne bianca"],
        occasioni: ["famiglia", "amici"],
        prezzo: 15,
        valutazione: 4.4,
        motivo: "Il Sangiovese che guarda il mare della Maremma. Risulta più morbido e fruttato del Chianti, perfetto per grigliate miste senza troppo impegno.",
        aroma: "Ciliegia matura, Macchia mediterranea, Pepe nero, Prugna"
    },
    {
        nome: "Lacrima di Morro d'Alba DOC (Marche)",
        piatti: ["carne bianca", "pizza"],
        occasioni: ["appuntamento", "amici"],
        prezzo: 16,
        valutazione: 4.5,
        motivo: "Un rosso unico al mondo, profumatissimo e floreale. Sorprende chiunque lo beva. Ottimo su carni bianche saporite o salumi speziati.",
        aroma: "Rosa rossa, Viola, Mora selvatica, Pepe rosa"
    },
    {
        nome: "Teroldego Rotaliano DOC (Trentino)",
        piatti: ["carne rossa", "carne bianca"],
        occasioni: ["relax", "famiglia"],
        prezzo: 17,
        valutazione: 4.6,
        motivo: "Scuro, profondo e succoso. Il principe del Trentino ha tannini morbidissimi e un gran corpo, ideale per polenta, funghi o formaggi d'alpeggio.",
        aroma: "Lampone, Ribes, Mandorla, Viola"
    },
    {
        nome: "Sangiovese di Romagna Superiore DOC (Emilia-Romagna)",
        piatti: ["carne rossa", "pizza"],
        occasioni: ["amici", "famiglia"],
        prezzo: 13,
        valutazione: 4.4,
        motivo: "Sincero e diretto, il vino conviviale per eccellenza. Tannino grintoso perfetto per sgrassare la piadina, la pizza o il ragù.",
        aroma: "Ciliegia, Viola, Terra umida, Chiodi di garofano"
    },
    {
        nome: "Cesanese del Piglio DOCG (Lazio)",
        piatti: ["carne rossa", "pizza"],
        occasioni: ["famiglia", "relax"],
        prezzo: 18,
        valutazione: 4.5,
        motivo: "Il rosso romano per eccellenza. Caldo, morbido e leggermente speziato, è il re incontrastato dell'abbinamento con abbacchio o bucatini all'amatriciana.",
        aroma: "Mora, Spezie scure, Sottobosco, Balsamico"
    },
    {
        nome: "Carignano del Sulcis DOC (Sardegna)",
        piatti: ["carne rossa", "carne bianca"],
        occasioni: ["relax", "appuntamento"],
        prezzo: 20,
        valutazione: 4.7,
        motivo: "Vite coltivata sulla sabbia. Regala un vino mediterraneo, sapido e ricco di frutto. Eccellente su carni arrosto e piatti saporiti.",
        aroma: "Mirto, Ciliegia sotto spirito, Cappero, Pepe"
    },
    {
        nome: "Cirò Rosso Classico Superiore DOC (Calabria)",
        piatti: ["carne rossa", "pizza"],
        occasioni: ["amici", "famiglia"],
        prezzo: 14,
        valutazione: 4.4,
        motivo: "Prodotto da uva Gaglioppo. Caldo e speziato, è capace di domare anche le note piccanti della 'nduja o piatti molto conditi.",
        aroma: "Frutta rossa cotta, Cuoio, Spezie dolci, Terra"
    },
    {
        nome: "Nero di Troia Castel del Monte DOC (Puglia)",
        piatti: ["carne rossa", "relax"],
        occasioni: ["famiglia", "appuntamento"],
        prezzo: 19,
        valutazione: 4.6,
        motivo: "Un rosso di grande eleganza ed equilibrio rispetto agli altri pugliesi. Tannino fitto e profumi delicati, perfetto per formaggi stagionati o arrosti.",
        aroma: "Viola, Mora, Cannella, Tabacco"
    },
    {
        nome: "Susumaniello Salento IGT (Puglia)",
        piatti: ["carne rossa", "pizza"],
        occasioni: ["amici", "relax"],
        prezzo: 17,
        valutazione: 4.5,
        motivo: "Un'uva che stava scomparendo, oggi riscoperta. Morbido, fruttatissimo e godereccio, si abbina benissimo a cene rilassate e grigliate.",
        aroma: "Prugna nera, Cacao, Ciliegia matura, Vaniglia"
    },
    {
        nome: "Valpolicella Classico DOC (Veneto)",
        piatti: ["carne bianca", "pizza", "vegan"],
        occasioni: ["famiglia", "quotidiano"],
        prezzo: 13,
        valutazione: 4.3,
        motivo: "Fresco, succoso e leggero. A differenza dei fratelli maggiori (Ripasso, Amarone), è un rosso agilissimo che si sposa perfino col pesce di lago o piatti vegani.",
        aroma: "Ciliegia fresca, Mandorla, Pepe bianco, Rosa"
    },
    // --- BLOCCO 8: CHICCHE REGIONALI E AUTOCTONI RARI ---
    {
        nome: "Ortrugo dei Colli Piacentini DOC (Emilia-Romagna)",
        piatti: ["pesce", "vegan", "pizza"],
        occasioni: ["amici", "aperitivo", "quotidiano"],
        prezzo: 10,
        valutazione: 4.4,
        motivo: "Una gemma locale vivace e scattante. La sua bollicina leggera e il retrogusto finemente amarognolo lo rendono il compagno perfetto per antipasti leggeri e torte salate.",
        aroma: "Mela verde, Fiori bianchi, Mandorla fresca, Menta"
    },
    {
        nome: "Malvasia di Candia Aromatica Piacentina DOC (Emilia-Romagna)",
        piatti: ["carne bianca", "vegan", "pizza"],
        occasioni: ["amici", "relax"],
        prezzo: 12,
        valutazione: 4.6,
        motivo: "Un’esplosione aromatica nel bicchiere. Un bianco (spesso frizzante) incredibilmente profumato che contrasta a meraviglia i cibi saporiti e speziati.",
        aroma: "Albicocca, Pesca gialla, Salvia, Fiori d'arancio"
    },
    {
        nome: "Pelaverga di Verduno DOC (Piemonte)",
        piatti: ["carne bianca", "pizza", "pesce"], /* Perfetto col pesce strutturato! */
        occasioni: ["appuntamento", "amici"],
        prezzo: 22,
        valutazione: 4.7,
        motivo: "Un rosso rarissimo e particolarissimo, famoso per le sue spiccate note di pepe. Va servito fresco ed è uno dei rari rossi perfetti col pesce o con pizze saporite.",
        aroma: "Pepe nero, Fragola, Geranio, Noce moscata"
    },
    {
        nome: "Tintilia del Molise DOC (Molise)",
        piatti: ["carne rossa", "carne bianca"],
        occasioni: ["famiglia", "relax"],
        prezzo: 20,
        valutazione: 4.6,
        motivo: "L'orgoglio del Molise. Un rosso speziato, caldo e balsamico che offre un'alternativa originale per grigliate e arrosti della domenica.",
        aroma: "Prugna secca, Pepe nero, Liquirizia, Sottobosco"
    },
    {
        nome: "Fumin Valle d'Aosta DOC (Valle d'Aosta)",
        piatti: ["carne rossa"],
        occasioni: ["relax", "appuntamento"],
        prezzo: 25,
        valutazione: 4.7,
        motivo: "Un rosso di montagna estremo, dal colore impenetrabile. Perfetto per scaldarsi durante una cena elegante a base di selvaggina o fonduta.",
        aroma: "Ginepro, Mora, Fumo di legna, Pepe nero"
    },
    {
        nome: "Prié Blanc Blanc de Morgex et de La Salle (Valle d'Aosta)",
        piatti: ["pesce", "vegan"],
        occasioni: ["appuntamento", "amici"],
        prezzo: 24,
        valutazione: 4.8,
        motivo: "Il vino bianco coltivato più in alto d'Europa. Minerale, teso, affilato come una lama: pulisce il palato in modo straordinario con crudi e ostriche.",
        aroma: "Ghiaccio, Erbe alpine, Mela verde, Limone"
    },
    {
        nome: "Torbato Alghero DOC (Sardegna)",
        piatti: ["pesce", "vegan", "pizza"],
        occasioni: ["famiglia", "relax"],
        prezzo: 16,
        valutazione: 4.5,
        motivo: "Un bianco sardo elegante e complesso, capace di richiamare le note del mare. Sposa magnificamente primi di mare, crostacei e pizze bianche.",
        aroma: "Macchia mediterranea, Camomilla, Salsedine, Pera"
    },
    {
        nome: "Ciliegolo Maremma Toscana DOC (Toscana)",
        piatti: ["pizza", "carne bianca", "vegan"],
        occasioni: ["amici", "famiglia"],
        prezzo: 14,
        valutazione: 4.3,
        motivo: "Fresco, succoso e scanzonato. Un rosso che profuma letteralmente di ciliegia, fantastico per accompagnare taglieri e cene informali.",
        aroma: "Ciliegia croccante, Lampone, Pepe bianco, Rosa"
    },

    // --- BLOCCO 9: GLI "ORANGE WINE" (I Bianchi Macerati) ---
    {
        nome: "Ribolla Gialla Macerata IGT (Friuli)",
        piatti: ["carne bianca", "pesce", "vegan", "pizza"],
        occasioni: ["relax", "appuntamento"],
        prezzo: 30,
        valutazione: 4.8,
        motivo: "Un bianco vinificato come un rosso. Tannico, strutturato, spiazzante. Perfetto per palati esperti e per accompagnare cibi asiatici o sapori molto forti.",
        aroma: "Albicocca disidratata, Tè nero, Zenzero, Resina"
    },
    {
        nome: "Vitovska Carso DOC (Friuli)",
        piatti: ["pesce", "vegan", "carne bianca"],
        occasioni: ["meditazione", "appuntamento"],
        prezzo: 28,
        valutazione: 4.7,
        motivo: "Vino di pietra e di mare. Macerazione leggera per un bianco scontroso ma affascinante. Richiede crudi di pesce, erbe aromatiche o formaggi ovini.",
        aroma: "Pietra focaia, Salvia, Mela cotogna, Sale"
    },
    {
        nome: "Trebbiano Spoletino DOC (Umbria)",
        piatti: ["carne bianca", "vegan", "pesce"],
        occasioni: ["famiglia", "relax"],
        prezzo: 18,
        valutazione: 4.6,
        motivo: "Un bianco dal grandissimo potenziale evolutivo. Ricco, sapido e vibrante, regge magnificamente preparazioni tartufate o carni bianche arrosto.",
        aroma: "Zafferano, Miele, Fiori di tiglio, Susina"
    },

    // --- BLOCCO 10: VINI DA MEDITAZIONE, DOLCI E FINE PASTO ---
    // NOTA: Non avendo ancora un bottone "Dolce" nella UI, l'IA li pesca tramite Ricerca Libera o se l'utente cerca "Relax" con opzione "Vegan/Formaggi".
    {
        nome: "Moscato d'Asti DOCG (Piemonte)",
        piatti: ["vegan", "pizza"], // Ottimo con le torte a fine pasto
        occasioni: ["relax", "famiglia", "amici"],
        prezzo: 12,
        valutazione: 4.6,
        motivo: "Il re dei vini dolci leggeri. Frizzante, a bassissima gradazione (5%), è l'unico vero accompagnamento per il panettone, i biscotti o la pasticceria secca.",
        aroma: "Pesca, Salvia, Fiori d'arancio, Miele"
    },
    {
        nome: "Passito di Pantelleria DOC (Sicilia)",
        piatti: ["vegan", "carne bianca"], // Abbinamento per contrasto con formaggi erborinati
        occasioni: ["relax", "appuntamento"],
        prezzo: 35,
        valutazione: 4.9,
        motivo: "Un nettare prezioso fatto di sole e vento di Sicilia. Perfetto da solo a fine pasto o abbinato a formaggi piccanti ed erborinati (come il Gorgonzola).",
        aroma: "Fichi secchi, Datteri, Miele di castagno, Albicocca disidratata"
    },
    {
        nome: "Vin Santo del Chianti Classico DOC (Toscana)",
        piatti: ["vegan"],
        occasioni: ["relax", "famiglia"],
        prezzo: 30,
        valutazione: 4.8,
        motivo: "Storico, ambrato, lunghissimo in bocca. Richiede a gran voce di essere accompagnato (e "pucciato") con i tradizionali Cantucci toscani alle mandorle.",
        aroma: "Noce, Fico secco, Caramello, Frutta candita"
    },
    {
        nome: "Brachetto d'Acqui DOCG (Piemonte)",
        piatti: ["vegan", "pizza"], 
        occasioni: ["appuntamento", "relax"],
        prezzo: 15,
        valutazione: 4.5,
        motivo: "Un rosso dolce, vivace e inebriante. È la risposta italiana perfetta per accompagnare i dolci a base di cioccolato, le fragole o i frutti di bosco rossi.",
        aroma: "Rosa rossa, Fragolina di bosco, Muschio, Lampone"
    },
    {
        nome: "Picolit Colli Orientali del Friuli DOCG (Friuli)",
        piatti: ["vegan", "relax"],
        occasioni: ["appuntamento", "meditazione"],
        prezzo: 45,
        valutazione: 4.9,
        motivo: "Considerato il 'Sauternes' italiano, prodotto in quantità minuscole a causa di un aborto floreale spontaneo. Un vino intellettuale, perfetto da meditazione.",
        aroma: "Fiori d'acacia, Albicocca, Miele millefiori, Mandorla tostata"
    },
    {
        nome: "Recioto della Valpolicella DOCG (Veneto)",
        piatti: ["vegan"],
        occasioni: ["relax", "famiglia"],
        prezzo: 35,
        valutazione: 4.7,
        motivo: "Il padre dolce dell'Amarone. Rosso, suadente, cremoso. Un capolavoro da abbinare alla cioccolata fondente o a grandi formaggi stagionati.",
        aroma: "Ciliegia nera, Cioccolato, Cannella, Prugna cotta"
    },

    // --- BLOCCO 11: I "FUORICLASSE" VERSATILI ---
    {
        nome: "Schioppettino di Prepotto DOC (Friuli)",
        piatti: ["carne rossa", "carne bianca", "pizza"],
        occasioni: ["appuntamento", "amici"],
        prezzo: 26,
        valutazione: 4.8,
        motivo: "Elegantissimo rosso friulano famoso per la sua fortissima nota di pepe nero. Fresco e verticale, è sublime su carni arrosto e piatti saporiti.",
        aroma: "Pepe nero pungente, Mora selvatica, Muschio, Lampone"
    },
    {
        nome: "Nascetta Langhe DOC (Piemonte)",
        piatti: ["pesce", "vegan", "carne bianca"],
        occasioni: ["relax", "appuntamento"],
        prezzo: 18,
        valutazione: 4.6,
        motivo: "Un bianco storico delle Langhe appena riscoperto. Strutturato, sapido e resinoso, invecchia benissimo e si sposa con pesci grassi e formaggi.",
        aroma: "Salvia, Rosmarino, Pompelmo, Miele"
    },
    {
        nome: "Monica di Sardegna DOC (Sardegna)",
        piatti: ["pizza", "carne bianca"],
        occasioni: ["amici", "quotidiano"],
        prezzo: 11,
        valutazione: 4.2,
        motivo: "Il rosso quotidiano della Sardegna. Soave, scorrevole e profumato di frutti rossi dolci, un toccasana per pranzi frugali o pizze leggere.",
        aroma: "Mora, Susina, Macchia mediterranea, Liquirizia"
    },
    {
        nome: "Pallagrello Nero Terre del Volturno IGT (Campania)",
        piatti: ["carne rossa", "carne bianca"],
        occasioni: ["famiglia", "relax"],
        prezzo: 22,
        valutazione: 4.5,
        motivo: "Era il vino preferito dei Re Borbonici. Struttura, eleganza e una setosità inaspettata. Eccellente compagno per carni elaborate e sughi intensi.",
        aroma: "Ciliegia nera, Pepe bianco, Vaniglia, Carruba"
    },
    {
        nome: "Casavecchia Terre del Volturno IGT (Campania)",
        piatti: ["carne rossa", "pizza"],
        occasioni: ["amici", "famiglia"],
        prezzo: 19,
        valutazione: 4.6,
        motivo: "Ottenuto da un ceppo sopravvissuto a un'epidemia. Rosso dal carattere rustico ma dal frutto prorompente, ideale per accompagnare maiale o selvaggina.",
        aroma: "Mora di rovo, Terra umida, Geranio, Inchiostro"
    },
    {
        nome: "Coda di Volpe Campania IGT (Campania)",
        piatti: ["pesce", "pizza", "vegan"],
        occasioni: ["amici", "famiglia"],
        prezzo: 13,
        valutazione: 4.3,
        motivo: "Prende il nome dalla forma del grappolo. Morbido, non troppo acido e dal frutto esotico, perfetto per cene marinare informali o pizze con verdure.",
        aroma: "Ananas, Pera coscia, Camomilla, Gesso"
    },
    {
        nome: "Erbaluce di Caluso DOCG (Piemonte)",
        piatti: ["pesce", "vegan", "carne bianca"],
        occasioni: ["appuntamento", "relax"],
        prezzo: 16,
        valutazione: 4.5,
        motivo: "Tagliente e sferzante. Un bianco piemontese che dona il meglio di sé con fritture di pesce, risotti mantecati e piatti d'acqua dolce.",
        aroma: "Limone, Fiori di campo, Sasso bagnato, Mandorla verde"
    },
    {
        nome: "Freisa Langhe DOC (Piemonte)",
        piatti: ["carne rossa", "pizza", "carne bianca"],
        occasioni: ["amici", "quotidiano"],
        prezzo: 14,
        valutazione: 4.4,
        motivo: "Spesso proposto in versione vivace. Un rosso rustico e scalpitante, colmo di piccoli frutti rossi. Sgrassa perfettamente salumi crudi e carni grasse.",
        aroma: "Fragola selvatica, Lampone, Rosa, Terra"
    },
    {
        nome: "Biancolella Ischia DOC (Campania)",
        piatti: ["pesce", "vegan"],
        occasioni: ["appuntamento", "amici"],
        prezzo: 17,
        valutazione: 4.6,
        motivo: "Il sole e il mare di Ischia in bottiglia. Minerale, freschissimo e sapido, esige a gran voce una pepata di cozze, un fritto misto o degli scampi crudi.",
        aroma: "Pesca bianca, Fiori d'arancio, Salvia, Salsedine"
    },
    {
        nome: "Bovale Sardegna DOC (Sardegna)",
        piatti: ["carne rossa", "carne bianca"],
        occasioni: ["relax", "famiglia"],
        prezzo: 24,
        valutazione: 4.7,
        motivo: "Un concentrato di frutta e potenza mediterranea. Caldo e avvolgente, perfetto per le grandi cotture alla brace o pecorini invecchiati.",
        aroma: "Amarena, Fumo, Macchia mediterranea, Mirto"
    },
    {
        nome: "Zibibbo Secco Sicilia DOC (Sicilia)",
        piatti: ["pesce", "vegan", "carne bianca"],
        occasioni: ["amici", "appuntamento"],
        prezzo: 15,
        valutazione: 4.5,
        motivo: "Tutto il profumo del Passito, ma in versione asciutta e sapida. Il compagno perfetto per la cucina asiatica, i crudi di mare o formaggi caprini.",
        aroma: "Zagara, Albicocca disidratata, Pesca gialla, Sale"
    },
    {
        nome: "Centesimino Ravenna IGT (Emilia-Romagna)",
        piatti: ["carne rossa", "pizza", "carne bianca"],
        occasioni: ["appuntamento", "relax"],
        prezzo: 18,
        valutazione: 4.6,
        motivo: "Un autoctono romagnolo esplosivo e floreale. Un rosso unico, ricco di spezie dolci, eccellente sui piatti al tartufo o sughi di carne.",
        aroma: "Rosa passita, Melograno, Cannella, Anice stellato"
    },
    {
        nome: "Franciacorta Rosé DOCG (Lombardia)",
        piatti: ["pizza", "pesce", "vegan", "carne bianca"],
        occasioni: ["appuntamento", "amici", "festa"],
        prezzo: 35,
        valutazione: 4.8,
        motivo: "La struttura del Pinot Nero e l'eleganza della bollicina metodo classico. È letteralmente il passpartout definitivo: sta bene con tutto, dai crudi alla pizza.",
        aroma: "Fragolina di bosco, Ribes, Crosta di pane, Pompelmo rosa"
    }
