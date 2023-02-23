import { writeFileSync } from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { version } = require('../package.json');

writeFileSync(process.argv[2], `export default '${version}';\n`, 'utf8');
