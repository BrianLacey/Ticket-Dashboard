You can skip steps 1 and 2 if already completed for React app (client-side) installation.

1. Install Node.js
This app was built on NodeJS version 24.14.0, though I imagine the current Long Term Support (LTS) version 24.18.0 (as of this writing) should not cause any issues. NodeJS can be installed [here](https://nodejs.org/en/download) at nodejs.org, its official webpage.

    Run `node --version` and `npm --version` to confirm both are installed.


2. Install Git  
The version used in this app is 2.42.0 but the current version (2.55.0 as of this writing) should be fine as well. Git's official downlaod page is [here](https://git-scm.com/install).
Default setings during istallation are fine.


3. Clone and enter the server folder
(Skip the cloning step if you've already isntalled the React app portion)
Inside your IDE of choice (this weas built with VSCode), run the command:

    `git clone https://github.com/BrianLacey/Ticket-Dashboard.git`

    in your terminal to clone the entire repo onto your system, followed by:

    `cd Ticket-Dashboard/server`

    to access code in the Front End of the app.


4. Install dependencies  
Run the command:

    `npm install`

    This pulls in React, MUI, Tailwind, TypeScript, ESLint, etc. Everything listed in package.json.


5. Create a .env file  
Inside the the client folder create a new file titled .env. Within this, enter the following local environment variables:

    `PORT=3001`  
    `DATABASE=mongodb://localhost:27017`  
    `ORIGIN=http://localhost:5173`

   This will ensure the Back End properly connects to your local database and allow communication with the Front End when it makes requests.


6. Install MongoDB  
Download and install the MongoDB Community Server from the official site [here](https://www.mongodb.com/try/download/search-in-community).
NOTE: During the istallation process, be sure to install MongoDB as a service for convenience.
Verify it's working by typing the following command into your terminal:

    `mongosh`

   If you see `test>`, it was successful.


8. Run the dev server  
Use the command:

    `npm run dev`
   
    This will start the app. If everything is installed correctly there should be notes in the terminal that mention listening on the port listed in .env and successful connection to the database.
