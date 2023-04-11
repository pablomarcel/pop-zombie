const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const { readFile } = require('fs/promises');

const hostname = 'https://www.pop-zombie.com';

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

    // Add example routes with postId and userId
    // Replace these with real data fetched from your database or API
    const postIds = [
        '6427835f33acaf9040eacf22',
        '64278ce5cf82b31f96c8922f',
        '64283844b1334539a01a691d',
        '6429290940e281f53e86ff8e',
        '642bc2f8402f3abc9a84999c',
        '642cbed6402f3abc9a849a37',
        '642cc6ac402f3abc9a849a43',
        '642cc6d4402f3abc9a849a46',
        '642cc70a402f3abc9a849a49',
        '642cc732402f3abc9a849a4c',
        '642cc783402f3abc9a849a4f',
        '642cc7ab402f3abc9a849a52',
        '642cc7d9402f3abc9a849a55',
        '642cc803402f3abc9a849a58',
        '642cc82a402f3abc9a849a5b',
        '642cc852402f3abc9a849a5e',
        '642cc879402f3abc9a849a61',
        '642cc926402f3abc9a849a64',
        '642cc99f402f3abc9a849a67',
        '642cc9d8402f3abc9a849a6a',
        '642cca08402f3abc9a849a6d',
        '642cca32402f3abc9a849a70',
        '642cca74402f3abc9a849a73',
        '642ccab9402f3abc9a849a76',
        '642ccb08402f3abc9a849a79',
        '642ccb2f402f3abc9a849a7c',
        '642ccb87402f3abc9a849a82',
        '642ccbe4402f3abc9a849a85',
        '642ccc0f402f3abc9a849a88',
        '642ccc4d402f3abc9a849a8b',
        '642ccc90402f3abc9a849a8e',
        '642cccba402f3abc9a849a91',
        '642ccd09402f3abc9a849a94',
        '642ccd31402f3abc9a849a97',
        '642ccd5e402f3abc9a849a9a',
        '642ccd94402f3abc9a849a9d',
        '642ccdd1402f3abc9a849aa0',
        '642ccdfc402f3abc9a849aa3',
        '642cce28402f3abc9a849aa6',
        '642cce73402f3abc9a849aa9',
        '642cceb8402f3abc9a849aac',
        '642ccee8402f3abc9a849aaf',
        '642ccf16402f3abc9a849ab2',
        '642ccf53402f3abc9a849ab5',
        '642ccf8d402f3abc9a849ab8',
        '642ccfcb402f3abc9a849abb',
        '642ccff3402f3abc9a849abe',
        '642cd01d402f3abc9a849ac1',
        '642cd048402f3abc9a849ac4',
        '642cd073402f3abc9a849ac7',
        '642cd09a402f3abc9a849aca',
        '642cd0d7402f3abc9a849acd',
        '642cd101402f3abc9a849ad0',
        '642cd12d402f3abc9a849ad3',
        '642cd152402f3abc9a849ad6',
        '642cd179402f3abc9a849ad9',
        '642cd1b5402f3abc9a849adc',
        '6430f57e112e651bcecaaf50',
        '643100553f0162e50f3be79c',
        '643102c63f0162e50f3be7b6',
        '643184e53f0162e50f3be7ef',
        '6431874d3f0162e50f3be7fe'
    ];
    const userIds = ['6427824833acaf9040eacf15', '64278ca0cf82b31f96c89223'];

    postIds.forEach((postId) => {
        sitemapStream.write({ url: `/postDetail/${postId}`, changefreq: 'daily', priority: 0.8 });
    });

    userIds.forEach((userId) => {
        sitemapStream.write({ url: `/profile/${userId}`, changefreq: 'daily', priority: 0.8 });
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
