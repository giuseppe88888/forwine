/* FORWINE — Configurazione Klaro con blocco anche dopo revoca.
 * Google Analytics viene inizialmente disabilitato fail-closed.
 * Klaro lo riabilita soltanto quando il consenso è concesso.
 */
window['ga-disable-G-PFB19F8632'] = true;

window.klaroConfig = {
  elementID: 'klaro',
  lang: 'it',
  storageMethod: 'cookie',
  storageName: 'forwine-consent',
  cookieExpiresAfterDays: 30,
  default: false,
  mustConsent: false,
  acceptAll: true,
  hideDeclineAll: false,
  hideLearnMore: false,
  htmlTexts: false,

  translations: {
    it: {
      consentNotice: {
        title: 'Le tue preferenze sulla privacy',
        description: 'FORWINE usa Google Analytics per comprendere come viene utilizzato il sito. Puoi accettare, rifiutare o personalizzare le preferenze. Le statistiche facoltative restano disattivate fino alla tua scelta.',
        learnMore: 'Personalizza'
      },
      consentModal: {
        title: 'Preferenze sulla privacy',
        description: 'Scegli se consentire i servizi facoltativi descritti qui sotto. Puoi modificare la scelta in qualsiasi momento dal collegamento alle preferenze che sarà aggiunto al sito.'
      },
      purposes: {
        analytics: {
          title: 'Statistiche di utilizzo',
          description: 'Aiutano a comprendere come i visitatori utilizzano FORWINE.'
        }
      }
    }
  },

  services: [
    {
      name: 'google-analytics',
      title: 'Google Analytics',
      purposes: ['analytics'],
      cookies: [/^_ga$/, /^_ga_/, /^_gid$/, /^_gat/],
      default: false,
      required: false,
      optOut: false,
      onlyOnce: true,
      callback: function(consent, service) {
        if (service && service.name === 'google-analytics') {
          // Google documenta questa proprietà come interruttore per bloccare
          // l'invio di dati del tag Google anche se la libreria è già stata caricata.
          window['ga-disable-G-PFB19F8632'] = !consent;
        }
      },
      translations: {
        it: {
          title: 'Google Analytics',
          description: "Servizio di analisi delle visite e dell'utilizzo del sito. Si attiva soltanto se lo consenti."
        }
      }
    }
  ]
};
