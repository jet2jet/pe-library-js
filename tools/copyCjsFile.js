import * as fs from 'fs';

const ROOT_URL = new URL('..', import.meta.url);

fs.writeFileSync(
	new URL('./cjs.cjs', ROOT_URL),
	fs.readFileSync(new URL('./src/_cjs/cjs.cjs', ROOT_URL), 'utf8'),
	'utf8'
);
fs.writeFileSync(
	new URL('./cjs.d.ts', ROOT_URL),
	fs.readFileSync(new URL('./src/_cjs/cjs.d.ts', ROOT_URL), 'utf8'),
	'utf8'
);
