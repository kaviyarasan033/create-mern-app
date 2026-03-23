const sections = {
  overview: [
    'Backend structure: controllers, models, routes, middleware, config, scripts.',
    'Docs endpoint: GET /api/meta',
    'Frontend docs page: /docs'
  ],
  scripts: [
    'npm run dev - start the backend in watch mode',
    'npm run seed:demo - seed the default demo login',
    'npm run mern:migrate -- ProjectController.js - print migration help for a target file',
    'npm run mern:start - print backend startup steps',
    'npm run mern:docs - print backend command docs'
  ],
  generators: [
    'node ../proapp make:controller Project',
    'node ../proapp make:model Project',
    'node ../proapp make:middleware auditTrail',
    'node ../proapp make:route projects',
    'node ../proapp make:config cache',
    'node ../proapp make:resource project'
  ]
};

console.log('MERN backend docs');
Object.entries(sections).forEach(([section, lines]) => {
  console.log(`\n${section.toUpperCase()}`);
  lines.forEach((line) => console.log(`- ${line}`));
});
