const sections = {
  overview: [
    'Backend structure: controllers, models, routes, middleware, config, scripts.',
    'Docs endpoint: GET /api/meta',
    'Frontend docs page: /docs'
  ],
  scripts: [
    'npm run dev - start the backend in watch mode',
    'npm run cache:clear - clear backend/frontend runtime caches from the project root',
    'npm run config:clear - clear generated config cache folders',
    'npm run optimize:clear - clear all generated caches for frontend and backend',
    'npm run seed:demo - seed the default demo login',
    'npm run mern:migrate -- ProjectController.js - print migration help for a target file',
    'npm run mern:start - print backend startup steps',
    'npm run mern:docs - print backend command docs'
  ],
  generators: [
    'node ../mern make:controller Project',
    'node ../mern make:model Project',
    'node ../mern make:middleware auditTrail',
    'node ../mern make:route projects',
    'node ../mern make:config cache',
    'node ../mern make:resource project',
    'node ../mern make:module project',
    'node ../mern cache:clear',
    'node ../mern config:clear',
    'node ../mern optimize:clear'
  ]
};

console.log('MERN backend docs');
Object.entries(sections).forEach(([section, lines]) => {
  console.log(`\n${section.toUpperCase()}`);
  lines.forEach((line) => console.log(`- ${line}`));
});
