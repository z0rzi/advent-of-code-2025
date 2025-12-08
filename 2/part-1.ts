#!/usr/bin/env bun

import fs from 'fs';

function isSillyInput(input: string) {
    const len = input.length;
    if (len%2) {
        // odd amount of chars, so it's not silly
        return false;
    }

    for (let i=0; i < len/2 ; i++) {
        if (input[i] !== input[i + len/2]) {
            return false;
        }
    }
    return true;
}

const input = fs.readFileSync('./product-ids.txt', 'utf8');
const ranges = input.split(',').map(rawRange => rawRange.split('-').map(Number));

let sumOfSillyIds = 0;
for (const range of ranges) {
    const [start, end] = range;
    for (let i=start; i <= end; i++) {
        if (isSillyInput(i.toString())) {
            sumOfSillyIds += i;
        }
    }
}

console.log('Sum of silly ids:', sumOfSillyIds);
