 // === Lokal nyckel för besökta städer i localStorage ===
        const VISITED_KEY = 'visitedCities';
        let countries = [];
        let cities = [];

        // === Hämta JSON-data (land.json, stad.json) ===
        async function loadData() {
            try {
                const [countriesRes, citiesRes] = await Promise.all([
                    fetch('land.json'),
                    fetch('stad.json')
                ]);
                countries = await countriesRes.json();
                cities = await citiesRes.json();
                populateCountries();
                showView('main-menu');
                document.getElementById('main-menu').style.display = 'block';
            } catch (error) {
                console.error('Fel vid laddning av JSON-data:', error);
            }
        }

        // === Hämta/spara besökta städer från/till localStorage ===
        function getVisited() {
            const stored = localStorage.getItem(VISITED_KEY);
            return stored ? JSON.parse(stored) : [];
        }
        function saveVisited(visited) {
            localStorage.setItem(VISITED_KEY, JSON.stringify(visited));
        }

        // === Visa vald vy (göm de andra) ===
        function showView(viewId) {
            document.querySelectorAll('.view').forEach(view => {
                view.classList.remove('active');
            });
            document.getElementById(viewId).classList.add('active');
            document.getElementById('main-menu').style.display = viewId === 'main-menu' ? 'block' : 'none';
        }

        // === Bygg listan med länder ===
        function populateCountries() {
            const ul = document.getElementById('countries-list');
            ul.innerHTML = '';
            countries.forEach(country => {
                const li = document.createElement('li');
                li.textContent = country.countryname;
                li.dataset.countryId = country.id;
                li.addEventListener('click', () => showCities(country.id, country.countryname));
                ul.appendChild(li);
            });
        }

        // === Visa städer för valt land ===
        function showCities(countryId, countryName) {
            document.getElementById('country-name').textContent = countryName;
            const ul = document.getElementById('cities-list');
            ul.innerHTML = '';
            const filteredCities = cities.filter(city => city.countryid === countryId);
            filteredCities.forEach(city => {
                const li = document.createElement('li');
                li.textContent = city.stadname;
                li.dataset.cityId = city.id;
                li.addEventListener('click', () => showCityInfo(city.id, countryId));
                ul.appendChild(li);
            });
            showView('cities-view');
        }

        // === Visa informationsvy för en stad ===
        function showCityInfo(cityId, countryId) {
            const city = cities.find(c => c.id === cityId);
            if (city) {
                document.getElementById('city-name').textContent = city.stadname;
                document.getElementById('city-population').textContent = city.population.toLocaleString('sv-SE');
                const visitedButton = document.getElementById('visited-button');
                visitedButton.onclick = () => markVisited(cityId);
                const backButton = document.getElementById('back-to-cities');
                backButton.onclick = () => {
                    const country = countries.find(c => c.id === countryId);
                    showCities(countryId, country.countryname);
                };
                showView('city-info-view');
            }
        }

        // === Markera en stad som besökt ===
        function markVisited(cityId) {
            let visited = getVisited();
            if (!visited.includes(cityId)) {
                visited.push(cityId);
                saveVisited(visited);
                alert('Stad markerad som besökt!');
            } else {
                alert('Du har redan markerat denna stad som besökt.');
            }
        }

        // === Visa sidan "Städer jag besökt" ===
        function showVisited() {
            const ul = document.getElementById('visited-list');
            ul.innerHTML = '';
            const visitedIds = getVisited();
            let totalPop = 0;
            visitedIds.forEach(id => {
                const city = cities.find(c => c.id === id);
                if (city) {
                    const li = document.createElement('li');
                    li.textContent = `${city.stadname} (Invånarantal: ${city.population.toLocaleString('sv-SE')})`;
                    ul.appendChild(li);
                    totalPop += city.population;
                }
            });
            document.getElementById('total-population').textContent = totalPop.toLocaleString('sv-SE');
            showView('visited-view');
        }

        // === Rensa historik-knappen ===
        document.getElementById('clear-history').addEventListener('click', () => {
            if (confirm('Är du säker på att du vill rensa din besökshistorik?')) {
                localStorage.removeItem(VISITED_KEY);
                showVisited();
            }
        });

        // === Tillbaka-knappar ===
        document.getElementById('back-to-menu-from-cities').addEventListener('click', () => {
            showView('main-menu');
            document.getElementById('main-menu').style.display = 'block';
        });

        document.getElementById('back-to-menu-from-visited').addEventListener('click', () => {
            showView('main-menu');
            document.getElementById('main-menu').style.display = 'block';
        });

        // === Länk till "Städer jag besökt" ===
        document.getElementById('visited-link').addEventListener('click', showVisited);

        // === Ladda data när sidan öppnas ===
        loadData();
