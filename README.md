# Introduktion
Ett React projekt som använder sig av notion som sin databas och notion API'et för att hantera databasen.
Projektet går ut på att användare ska kunna tidsrapportera till projekt som finns i databasen.

### Viktigt
Projektet är byggt med:
Frontend - React.js.
Backend - Node.js, specifikt en express.js server

# Installation
Kräver att du har Node.js installerat på ditt system.
När du laddat hem frontend och backend projetket till ditt system, så behöver du köra commandot `npm install` i både backend och frontend mappen för att installera de dependencies som användes i vardera projekt.
När du har installerat dependencies så kör du kommandot `npm start` i frontend projektet och `npm run dev` i backend projektet.

# Struktur av källkoden
Som databas används Notion och Notions API för att kommunicera med databasen.
React används för frontend för att skapa användargrännsnittet.
Express används för backend för att skapa en server i form av ett restful API som är ett middleware mellan våran frontend react app och Notions API.

**Backend:**
I app.js så initialiseras alla dependencies för våran backend och vi sätter även upp `routes`.
Sedan har vi delat upp olika routes i filstrukturen `api > routes > ...` här har vi 3 olika routes beroende på vilken typ av API query vi vill göra `databases`, `login`, `pages`.

**Frontend:**
I index.js definerar vi BrowserRouter från `react-router-dom`.
I App.js så initialiseras alla dependencies för våran frontend och vi sätter även upp `routes` via `react-router-dom`.
Vi använder useSignal och Cookie.js för att spara användardata för den aktuella användaren efter login.
Vi tillåter oAuth login för användare med ett Notion konto.
Vi tillåter även s.k 'vanlig' login med en emailadress och ett lösenord.
Vi använder bootstrap och custom CSS för att skapa en neumorphic design.




# Färdiga användare för att testa appen
| Email           | Lösenord |
| --------------- | -------- |
| user@email.com  | 123      |
| admin@email.com | 123      |




# Länk till backend
[backend](https://github.com/TobiasSkog/NET23-Grupp-Projekt-2-Backend)


# Scrum board
[Länk till scrum board](https://app.asana.com/0/1206658293714394/1206657895637907)

Överblick Scrum board:
![image](https://github.com/TobiasSkog/NET23-Grupp-Projekt-2-Backend/assets/11568812/d2dae484-1071-4405-8d2f-f7a00b986372)

Task exempel:
![image](https://github.com/TobiasSkog/NET23-Grupp-Projekt-2-Frontend/assets/11568812/bfd95ea6-a6de-46bf-8f13-68f5158ae20b)
