const asciidoc = require('asciidoctor')();
const Prism = require('prismjs');
const loadLanguages = require('prismjs/components/');
loadLanguages.silent = true;

class CodeblockConverter {
  constructor() {
    this.baseConverter = asciidoc.Html5Converter.$new();
  }

  convert(node, transform) {
    if (node.getNodeName() === 'listing' && node.getStyle() === 'source') {
      const language = node.attributes.$$smap.language;
      loadLanguages([language]);
      const highlighted = Prism.highlight(node.getContent(), Prism.languages[language], language);
      return (
        `<div class="listingblock"><div class="title">${node.getTitle()}</div><div class="content"><pre class="highlight language-${language}"><code class="language-${language}">` +
        highlighted
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>') +
        `</code></pre></div></div>`
      );
    }

    return this.baseConverter.convert(node, transform);
  }
}

module.exports = CodeblockConverter;
