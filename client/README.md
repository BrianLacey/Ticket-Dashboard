1. Install Node.js
This app was built on NodeJS version 24.14.0, though I imagine the current Long Term Support (LTS) version 24.18.0 (as of this writing) should not cause any issues. NodeJS can be installed [here](https://nodejs.org/en/download) at nodejs.org, its official webpage.

    Run `node --version` and `npm --version` to confirm both are installed.


2. Install Git  
The version used in this app is 2.42.0 but the current version (2.55.0 as of this writing) should be fine as well. Git's official downlaod page is [here](https://git-scm.com/install).
Default setings during istallation are fine.


3. Clone and enter the client folder  
Inside your IDE of choice (this weas built with VSCode), run the command:

    `git clone https://github.com/BrianLacey/Ticket-Dashboard.git`

    in your terminal to clone the entire repo onto your system, followed by:

    `cd Ticket-Dashboard/client`

    to access code in the Front End of the app.


4. Install dependencies  
Run the command:

    `npm install`

    This pulls in React, MUI, Tailwind, TypeScript, ESLint, etc. Everything listed in package.json.


5. Create a .env file  
Inside the the client folder create a new file titled .env. Within this, enter the following local environment variables:

    `VITE_BASE_URL=http://localhost:3001`

   This will ensure the Front End will find the correct API to communicate with.


7. Run the dev server  
Use the command:

    `npm run dev`
   
    This will start the app. If everything is installed correctly there should be a clickable localhost URL which will take you to the UI.
