/* Jackpot ticker - randomly displays 3 recent jackpot wins, rotates every 3 seconds */
(function () {
    "use strict";

    var jackpotEvents = [
        { game: 'PG Soft - Medusa', user: 't***3', amount: '128.4M', time: '3p' },
        { game: 'PG Soft - Lucky Neko', user: 'm***8', amount: '98.7M', time: '31p' },
        { game: 'PG Soft - Gem Saviour', user: 'p***1', amount: '67.8M', time: '1g' },
        { game: 'PG Soft - Wild Bandito', user: 'e***5', amount: '76.5M', time: '2g' },
        { game: 'PG Soft - Legend of Hou Yi', user: 'u***4', amount: '234.8M', time: '3g' },
        { game: "PG Soft - Captain's Bounty", user: 'p***6', amount: '178.3M', time: '4g' },
        { game: 'JILI - Fortune Gems', user: 'h***9', amount: '76.2M', time: '7p' },
        { game: 'JILI - Crazy Golden Bank', user: 'd***7', amount: '456.7M', time: '23p' },
        { game: 'JILI - Super Ace', user: 'w***3', amount: '267.8M', time: '1g32' },
        { game: 'JILI - Bonus Hunter', user: 'o***2', amount: '567.4M', time: '3g50' },
        { game: 'JILI - Golden Empire', user: 'g***9', amount: '287.6M', time: '6g' },
        { game: 'CQ9 - Jump High', user: 'n***5', amount: '234.5M', time: '12p' },
        { game: 'CQ9 - Dragon', user: 'k***4', amount: '156.4M', time: '42p' },
        { game: 'CQ9 - Spade Fishing', user: 'q***2', amount: '187.5M', time: '1g15' },
        { game: 'CQ9 - Zeus', user: 'i***7', amount: '87.6M', time: '3g25' },
        { game: 'CQ9 - Rave Jump', user: 'j***4', amount: '129.8M', time: '7g' },
        { game: 'Pragmatic - Sweet Bonanza', user: 's***6', amount: '345.6M', time: '50p' },
        { game: 'Pragmatic - Gates of Olympus', user: 'y***1', amount: '145.6M', time: '2g45' },
        { game: 'Pragmatic - The Dog House', user: 'h***2', amount: '398.7M', time: '6g30' },
        { game: 'Pragmatic - Aztec Gems', user: 'x***8', amount: '234.5M', time: '9g' },
        { game: 'Habanero - Koi Gate', user: 'v***2', amount: '89.1M', time: '18p' },
        { game: 'Habanero - 5 Lucky Lions', user: 'r***9', amount: '398.2M', time: '2g20' },
        { game: 'Habanero - Hot Hot Fruit', user: 'f***1', amount: '176.5M', time: '5g45' },
        { game: 'Microgaming - Mega Moolah', user: 'a***8', amount: '289.7M', time: '4g30' },
        { game: 'Microgaming - Thunderstruck II', user: 'k***7', amount: '456.9M', time: '7g15' },
        { game: 'Microgaming - Immortal Romance', user: 'c***1', amount: '876.4M', time: '10g' },
        { game: "Play'n GO - Book of Dead", user: 'l***3', amount: '67.5M', time: '8g' },
        { game: "Play'n GO - Reactoonz", user: 'z***6', amount: '543.2M', time: '8g40' },
        { game: "Red Tiger - Dragon's Luck", user: 's***3', amount: '98.4M', time: '5g' },
        { game: "Red Tiger - Pirates' Plenty", user: 'd***5', amount: '654.3M', time: '5g20' },
        { game: 'Spadegaming - Great Lion', user: 'q***1', amount: '147.2M', time: '13p' },
        { game: 'Spadegaming - Safari', user: 'w***4', amount: '312.6M', time: '37p' },
        { game: 'Yggdrasil - Vikings Go Berzerk', user: 'e***7', amount: '423.1M', time: '2g15' },
        { game: 'Yggdrasil - Valley of the Gods', user: 'r***2', amount: '189.4M', time: '4g20' },
        { game: 'Thunderkick - Flame Busters', user: 't***5', amount: '234.7M', time: '5g30' },
        { game: 'Thunderkick - Esqueleto Explosivo', user: 'y***8', amount: '98.3M', time: '7g45' },
        { game: 'Relax - Money Train 2', user: 'u***9', amount: '567.8M', time: '1g45' },
        { game: 'Relax - Temple Tumble', user: 'i***3', amount: '278.5M', time: '3g15' }
    ];

    function createTickerItem(e) {
        return '<div class="ticker-item">' +
            '<span class="ticker-time">' + e.time + '</span>' +
            '<span class="ticker-game">' + e.game + '</span>' +
            '<span class="ticker-user">' + e.user + '</span>' +
            '<span class="ticker-amount">' + e.amount + '</span>' +
            '</div>';
    }

    function getRandomEvents() {
        return jackpotEvents.slice().sort(function () { return Math.random() - 0.5; }).slice(0, 3);
    }

    function renderTicker() {
        var tickerEl = document.getElementById('tickerContent');
        if (tickerEl) {
            tickerEl.innerHTML = getRandomEvents().map(createTickerItem).join('');
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            renderTicker();
            setInterval(renderTicker, 3000);
        });
    } else {
        renderTicker();
        setInterval(renderTicker, 3000);
    }
})();
