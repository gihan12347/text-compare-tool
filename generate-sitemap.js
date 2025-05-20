const SitemapGenerator = require('sitemap-generator');

// Create generator
const generator = SitemapGenerator('https://onlinetextcomparetool.netlify.app/', {
  stripQuerystring: false,
  filepath: './public/sitemap.xml',
});

// Start generation
generator.start();
