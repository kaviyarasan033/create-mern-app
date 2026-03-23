const target = process.argv[2];

const steps = [
  '1. Configure MongoDB in server/.env',
  '2. Move schema definitions into server/models',
  '3. Move request logic into server/controllers',
  '4. Register each endpoint inside server/routes',
  '5. Protect private routes with authMiddleware',
  '6. Point the React client at /api with client/.env',
  '7. Seed demo data with npm run seed:demo if you want a starter login',
  '8. Review docs with npm run mern:docs'
];

console.log('MERN migration checklist');
if (target) {
  console.log(`Target file: ${target}`);
  console.log(`Suggested location: server/controllers/${target}`);
}
steps.forEach((step) => console.log(step));
console.log('Helpful commands: npm run mern:start | npm run mern:docs');
