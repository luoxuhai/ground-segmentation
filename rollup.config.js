import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy';
import serve from 'rollup-plugin-serve';

import pkg from './package.json';

function banner() {
  return {
    renderChunk(code) {
      return `/**
 * ground-segmentation - v${pkg.version}
 *
 * Copyright (c) ${new Date().getFullYear()} ground-segmentation Authors
 * SPDX-License-Identifier: MIT
 */

${code}`;
    },
  };
}

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'esm',
      },
      {
        file: 'dist/ground-segmentation.js',
        format: 'iife',
        name: 'GroundSegmentation',
      },
    ],
    plugins: [
      banner(),
      typescript({
        useTsconfigDeclarationDir: true,
      }),
      copy({
        targets: [
          {
            src: 'libs/patchwork/build/patchworkpp.wasm',
            dest: 'dist',
          },
        ],
      }),
      process.env.ENV === 'development' &&
        serve({
          contentBase: './',
          port: 4321,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }),
    ],
  },
];
