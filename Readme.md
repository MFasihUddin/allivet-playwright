Clone the project
Install dependencies: npm install
Create a folder named "secrets" in the project root.
Inside secrets, create a file named .env with the following content:

EMAIL=
PASSWORD=
BASE_URL= site base URL
STORE_USERNAME=your_store_username
STORE_PASSWORD=your_store_password
CC_NUMBER=
CC_EXP_MONTH=
CC_EXP_YEAR=
CC_CVV=

and then run test using npx playwright test