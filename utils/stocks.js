const YahooFinance = require('yahoo-finance2').default;

const yahooFinance = new YahooFinance();

// async function main() {
//     try {
//         const quote = await yahooFinance.quote('AAPL');
//         const results = await yahooFinance.search('Apple');
//         const history = await yahooFinance.historical('AAPL', {
//             period1: '2024-01-01',
//             period2: '2024-12-31'
//         });
//         const chart = await yahooFinance.chart('AAPL', { range: '1mo', interval: '1d' });
//         // const history = await yahooFinance.historical('AAPL', {
//         //     period1: '2024-01-01',
//         //     period2: '2024-12-31'
//         // });

//         // console.log('Price:', quote.regularMarketPrice);
//         // console.log('Search results:', results);
//         console.log('Chart data:', chart);
//         // console.log('History points:', history.length);
//     } catch (err) {
//         console.error('Error fetching stock data:', err);
//     }
// }

// main();
