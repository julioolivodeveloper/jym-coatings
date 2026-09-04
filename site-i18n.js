(function () {
  const STORAGE_KEY = 'jymLang';
  let currentLang = localStorage.getItem(STORAGE_KEY) || 'en';

  // English FAQ answers for chat widget
  const FAQ_EN = [
    { keywords: ['service', 'services', 'offer', 'work', 'job'],
      answer: 'We offer: Concrete Designs (new & existing), Spray Deck, Stamp Overlay, Epoxy Flooring, Power Wash, Fence Stain and Wood Deck Stain. 100% free estimates.' },
    { keywords: ['area', 'areas', 'city', 'where', 'houston', 'sugar land', 'katy', 'pearland', 'pasadena', 'woodlands', 'serve'],
      answer: 'We work in Houston TX and the entire metro area: Sugar Land, Katy, Pearland, Pasadena, The Woodlands, Missouri City, Friendswood, Stafford, Cypress and surroundings.' },
    { keywords: ['estimate', 'quote', 'price', 'cost', 'how much', 'free'],
      answer: 'Estimates are 100% free and no commitment. Call us at (832) 768-5803 or message us on WhatsApp with photos of your project and we will respond quickly.' },
    { keywords: ['epoxy', 'garage', 'floor', 'flooring'],
      answer: 'Yes, Epoxy Flooring is one of our most popular services. Ideal for garages, workshops and commercial spaces. Resistant, easy to clean and great looking.' },
    { keywords: ['spray deck', 'pool', 'swimming'],
      answer: 'Spray Deck is perfect for pools and patios. Non-slip, resistant to heat and humidity. Very popular in Houston TX.' },
    { keywords: ['stamp', 'overlay', 'stone', 'cobblestone', 'pattern'],
      answer: 'Stamp Overlay mimics stone, brick, cobblestone or wood. Ideal for driveways, patios and gathering areas. Fully customizable.' },
    { keywords: ['power wash', 'pressure', 'clean', 'wash'],
      answer: 'Yes, we do professional Power Wash for driveways, patios, fences and exterior surfaces. Also used as preparation before any coating.' },
    { keywords: ['fence', 'wood', 'stain', 'deck', 'tint'],
      answer: 'We do Fence Stain and Wood Deck Stain. We protect and beautify wood fences and decks against sun, rain and heavy use in Texas.' },
    { keywords: ['phone', 'call', 'number', 'contact', 'jose', 'whatsapp'],
      answer: 'You can call or WhatsApp us at (832) 768-5803. You talk directly with Jose Maldonado, owner of J&M Coatings.' },
    { keywords: ['hello', 'hi', 'hey'],
      answer: 'Hello! I am the J&M Coatings assistant. I can help you with services, estimates, areas and contact info.' },
    { keywords: ['thank', 'thanks'],
      answer: 'You\'re welcome! For direct attention call (832) 768-5803 or WhatsApp us.' },
  ];

  function getEnAnswer(input) {
    const low = input.toLowerCase().trim();
    for (const item of FAQ_EN) {
      if (item.keywords.some(k => low.includes(k))) return item.answer;
    }
    return 'For that question it\'s best to speak directly with Jose. Call (832) 768-5803 or WhatsApp us with the details.';
  }

  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);

    // Swap all [data-en] elements
    document.querySelectorAll('[data-en]').forEach(el => {
      if (!el._jymEs) el._jymEs = el.innerHTML;
      el.innerHTML = lang === 'en' ? el.dataset.en : el._jymEs;
    });

    // Swap chat input placeholder
    const input = document.getElementById('chatInput');
    if (input) {
      if (lang === 'en' && input.dataset.placeholderEn) input.placeholder = input.dataset.placeholderEn;
      if (lang === 'es' && input.dataset.placeholderEs) input.placeholder = input.dataset.placeholderEs;
    }

    // Swap typewriter phrases
    const tw = document.querySelector('[data-typewriter]');
    if (tw) {
      if (!tw._jymPhrasesEs) tw._jymPhrasesEs = tw.dataset.phrases;
      if (tw.dataset.phrasesEn) {
        tw.dataset.phrases = lang === 'en' ? tw.dataset.phrasesEn : tw._jymPhrasesEs;
      }
    }

    // Update toggle buttons text
    document.querySelectorAll('.lang-toggle').forEach(btn => {
      btn.textContent = lang === 'en' ? 'Español' : 'English';
    });

    // Expose to chat for FAQ routing
    window.jymCurrentLang = lang;
  }

  function init() {
    // Cache original Spanish for all translatable elements
    document.querySelectorAll('[data-en]').forEach(el => {
      el._jymEs = el.innerHTML;
    });

    // Cache typewriter phrases
    const tw = document.querySelector('[data-typewriter]');
    if (tw) tw._jymPhrasesEs = tw.dataset.phrases;

    // Apply stored language
    if (currentLang === 'en') applyLang('en');
    else {
      document.querySelectorAll('.lang-toggle').forEach(btn => {
        btn.textContent = 'English';
      });
    }

    window.jymCurrentLang = currentLang;
  }

  window.toggleLang = function () {
    applyLang(currentLang === 'es' ? 'en' : 'es');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
