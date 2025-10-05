1. Meny som visar länder

Huvudmenyn visar alla länder som hämtas från land.json med populateCountries(). Länderna visas som klickbara listor. När man klickar på ett land visas städerna.
Den fungerar som huvudmeny, och man kan alltid gå tillbaka. Data laddas snabbt med async/await. Fel visas bara i konsolen, vilket räcker för en enkel sida.

2. Visa städer när man klickar på ett land

När man klickar på ett land körs showCities(). Den visar städer som hör till det landet. Det ser ut som en app där man byter vy utan att ladda om sidan.
Det fungerar bra och snabbt eftersom datan är liten. “Tillbaka”-knappen leder till menyn igen.

3. Stadsvy med information

När man klickar på en stad visas stadens namn, invånarantal och en knapp “Markera som besökt”.
Det är enkelt men fungerar bra. Invånarantalet visas med rätt siffror. Man kan lätt gå tillbaka till listan över städer.

4. Spara besökta städer

Knappen “Markera som besökt” sparar stadens ID i localStorage. Om staden redan är sparad visas ett meddelande.
Informationen finns kvar även när man stänger sidan. Bara stadens ID sparas, inget personligt.

5. Länk till “Städer jag besökt”

I menyn finns en länk “Städer jag besökt”. När man klickar där visas alla städer man markerat som besökta.
Länken är alltid synlig och gör det lätt att hitta sin lista.

6. Sida med besökta städer

Här visas alla städer man besökt och den totala befolkningen. Siffrorna visas snyggt och uppdateras direkt när man markerar eller rensar.
Om listan är tom visas inget.

7. Rensa historik

Knappen “Rensa historik” frågar först om man är säker. Sedan tas alla sparade städer bort.
Det är enkelt och användarvänligt, och sidan uppdateras direkt utan att laddas om.