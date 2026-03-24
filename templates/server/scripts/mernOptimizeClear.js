const path = require('path');

const { runOptimizeClear } = require(path.resolve(__dirname, '../../scripts/mernOptimizeClear'));

runOptimizeClear(process.argv[2]);
