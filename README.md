# WTWR Frontend

WTWR (What to Wear?) is a responsive full-stack application that recommends clothing based on current weather conditions and lets authenticated users manage a personal wardrobe.

## Project links

- **Live application:** [Open WTWR](https://whattowear.ldtp.com)
- **Frontend repository:** [wtwr-frontend](https://github.com/tito1718/wtwr-frontend)
- **Backend repository:** [wtwr-backend](https://github.com/tito1718/wtwr-backend)
- **Backend API:** [WTWR API](https://api.tito-wtwr.crabdance.com)

## Features

- Current weather based on the visitor’s location
- Weather-based clothing recommendations
- Fahrenheit and Celsius temperature switching
- Secure registration and sign-in
- Persistent authenticated sessions
- Protected profile route
- Personal wardrobe management
- Add and delete owned clothing items
- Like and unlike clothing items
- Profile name and avatar editing
- Client-side form validation
- Loading and server-error states
- Responsive desktop, tablet, and mobile layouts
- Keyboard and overlay modal closing

## Technologies

- React
- React Router
- JavaScript
- Vite
- Vitest
- CSS
- Context API
- REST APIs
- OpenWeather API
- ESLint

## Application routes

| Route | Access | Description |
| --- | --- | --- |
| `/` | Public | Displays current weather and matching clothing |
| `/profile` | Authenticated | Displays the user’s wardrobe and profile controls |

## Local development

### 1. Clone the repository

~~~bash
git clone https://github.com/tito1718/wtwr-frontend.git
cd wtwr-frontend
~~~

### 2. Install dependencies

~~~bash
npm ci
~~~

### 3. Configure the environment

Create an `.env.local` file:

~~~env
VITE_MAIN_API_URL=http://localhost:3001
~~~

The OpenWeather key is stored only by the backend. It is never bundled into the frontend.

### 4. Start development

~~~bash
npm run dev
~~~

## Available scripts

~~~bash
npm run dev
npm run lint
npm test
npm run build
npm run preview
~~~

## Testing

The frontend includes automated Vitest coverage for:

- Hot, warm, cold, and freezing temperature classification
- Fahrenheit-to-Celsius conversion
- Weather-condition normalization

## Full-stack architecture

The React frontend requests application data from the WTWR REST API. The backend handles authentication, wardrobe persistence, authorization, and communication with OpenWeather so external API credentials remain server-side.

The production frontend and backend are served through Nginx over HTTPS on Google Cloud.

## Author

**Cesar “Tito” Chirino**

- [GitHub](https://github.com/tito1718)
- [LinkedIn](https://www.linkedin.com/in/cesar-tito-chirino/)
