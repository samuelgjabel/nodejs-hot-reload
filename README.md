# Node.js hot reload

Fast node.js hot-reload library. 🚀🚀

- library is little wrapper around [parcel](https://en.parceljs.org/) library for enabling hot-reload for `nodejs` projects.

### Install

`npm i nodejs-hot-reload`
or
`yarn add nodejs-hot-reload`

### Use

1. add this `script` to package.json

- for `.js`

```json
  "scripts": {
    "watch":"npx nodejs-hot-reload entry=./src/app.js outDir=./build"
    },
```

- or for `.ts`

```json
  "scripts": {
    "watch":"npx nodejs-hot-reload entry=./src/app.ts outDir=./build"
    },
```

2. run script `npm run watch` or `yarn watch`

3. That's it. 🤗

- You can use it as global module as well. But I recommend to use it locally.
  `npm i -g nodejs-hot-reload`.

### Available flags

| Name              | Use                 | Description                                                                                | default        |
| ----------------- | ------------------- | ------------------------------------------------------------------------------------------ | -------------- |
| entry             | `entry=./index.js`  | Entry file                                                                                 | ./scr/index.js |
| inspect           | `inspect`           | enable inspect. [More here.](https://nodejs.org/de/docs/guides/debugging-getting-started/) | false          |
| outDir            | `outDir=./build`    | output directory for build                                                                 | ./build        |
| outDir            | `outDir=./build`    | output directory for build                                                                 | ./build        |
| cacheDir          | `cacheDir=./cache`  | cache direactory                                                                           | /cache         |
| minify            | `minify`            | if minify                                                                                  | false          |
| bundleNodeModules | `bundleNodeModules` | if bundle node_modules                                                                     | false          |
| scopeHoist        | `scopeHoist`        | Turn on experimental scope hoisting/tree shaking flag, for smaller production bundles.     | false          |

- works with typescript / javascript as well

* note this library dont include typchecking for `typescript`. Your IDE do it for you.

* Be aware of using relative `paths`.. as this library bundles output to 1 file.
