const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const { readFile } = require('fs/promises');

const hostname = 'https://pop-zombie.herokuapp.com';

async function getRoutePaths() {
    const routesFile = await readFile('./src/routes.js', 'utf8');
    const routePaths = routesFile
        .split('\n')
        .filter((line) => line.includes('path:'))
        .map((line) => {
            const path = line.split(':')[1].trim().slice(1, -2);
            return { path };
        });
    return routePaths;
}

(async function generateSitemap() {
    const routePaths = await getRoutePaths();
    const sitemapStream = new SitemapStream({ hostname });

    routePaths.forEach((route) => {
        if (!route.path.includes(':')) {
            // Exclude routes with dynamic parameters
            sitemapStream.write({ url: route.path, changefreq: 'daily', priority: 0.8 });
        }
    });

    sitemapStream.end();

    streamToPromise(sitemapStream)
        .then((sitemap) => {
            createWriteStream('./public/sitemap.xml').write(sitemap);
            console.log('Sitemap.xml has been generated!');
        })
        .catch((error) => {
            console.error('Error generating sitemap.xml:', error);
        });
})();
