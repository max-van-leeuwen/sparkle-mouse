// checks that everything in types/index.d.ts exists in the actual implementation



import Implementation from '../src/index.js';
import type Declared from 'sparkle-mouse';



// names declared in the types but missing from src/index.js (should be never)
type MissingMembers = Exclude<keyof Declared, keyof Implementation>;
type MissingStatics = Exclude<keyof typeof Declared, keyof typeof Implementation | 'prototype'>;

const noMissingMembers: [MissingMembers] extends [never] ? true : MissingMembers = true;
const noMissingStatics: [MissingStatics] extends [never] ? true : MissingStatics = true;



export { noMissingMembers, noMissingStatics };
