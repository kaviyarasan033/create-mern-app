const steps = [
  '0. From the project root, run npm run setup once to install server and client dependencies.',
  '1. Copy server/.env.example to server/.env and client/.env.example to client/.env if needed.',
  '2. Set MongoDB env values for the core MERN flow, then add optional MySQL and Firebase keys only if you use those integrations.',
  '3. Run npm run setup:check to verify MongoDB, MySQL, and Firebase readiness.',
  '4. Start the API with npm run dev or run the full stack with npm run mern:start from the project root.',
  '5. Open the frontend and verify /api/meta plus auth routes.'
];

console.log('MERN backend start guide');
steps.forEach((step) => console.log(step));
