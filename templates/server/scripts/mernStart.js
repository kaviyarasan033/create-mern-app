const steps = [
  '0. From the project root, run npm run mern:start to launch frontend and backend together.',
  '1. Copy server/.env.example to server/.env if needed.',
  '2. Set DB_MONGO_URL, DB_MONGO_DATABASE, DB_MONGO_USERNAME, DB_MONGO_PASSWORD, JWT_SECRET, and client URL values.',
  '3. Run npm install if dependencies are not installed.',
  '4. Start the API with npm run dev.',
  '5. Open the frontend and verify /api/meta plus auth routes.'
];

console.log('MERN backend start guide');
steps.forEach((step) => console.log(step));
