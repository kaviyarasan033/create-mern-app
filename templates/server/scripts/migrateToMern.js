const steps = [
  '1. Configure MongoDB in server/.env',
  '2. Move schema definitions into server/models',
  '3. Move request logic into server/controllers',
  '4. Register each endpoint inside server/routes',
  '5. Protect private routes with authMiddleware',
  '6. Point the React client at /api with client/.env',
  '7. Seed demo data with npm run seed:demo if you want a starter login'
];

console.log('MERN migration checklist');
steps.forEach((step) => console.log(step));
