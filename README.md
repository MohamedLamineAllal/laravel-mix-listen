# Laravel mix listen extension

npmjs: https://www.npmjs.com/package/laravel-mix-listen<br>
laravel mix extension: [coming soon]

A laravel mix extension that allow us to listen to Mix internal events. The one used by the dispatcher. Like `configReady`, `configReadyForUser`, `loading-plugins`, ...

```js
mix.listen(('configReadyForUser', (config, circularStringify) => {
  fs.writeFileSync('webpackConfig.output.js', circularStringify(config));
});
```

## Installation:

I suggest using pnpm

pnpm

```
pnpm add laravel-mix-listen -D
```

npm

```
npm install laravel-mix-listen -D
```

yarn

```
yarn add laravel-mix-listen -D
```

## Usage Example:

```js
const mix = require('laravel-mix');
const fs = require('fs');

require('laravel-mix-listen');

const public_dir = 'public';

mix
  .setPublicPath(`${public_dir}`)
  .js(`${public_dir}/src/app.js`, `${public_dir}/dist`)
  .vue()
  .version([`${public_dir}/src/index.js`])
  .extract(['vue'], `dist/v.js`)
  .listen(('configReadyForUser', (config, circularStringify) => {
    fs.writeFileSync('webpackConfig.output.js', circularStringify(config));
  });
```

You can see that it allow us to listen to the events. It follow the same signature as `Mix.listen()`. Except that in this extension we are appending an extra argument at the end. Which expose the `circularStringify()` function that the `Dump` component use.

```js
mix.listen(('configReadyForUser', (config, circularStringify) => {
  fs.writeFileSync('webpackConfig.output.js', circularStringify(config));
});
```

Take a event and callback as a params. With signature:

```ts
(event: string, callback: Handler) => void

type Hanlder = (...args: any[], circularStringify: (obj: Record<string, any>) => string) => void
// not typescript definition but it show that  circularStringify come at the end
```

Every events have its specific args.

You can check all the events through the `laravel-mix` code source. Tip: `CTRL + F > .listen(`. u'll find them.

### Events

Note: this section may get outdated.

You can always refer to laravel-mix code source or any of the extensions that u are using. And u are interested in one of the events.

... to be added ...

### Other extensions

If the other extensions use the Dispatcher. And trigger events in any ways. You'll be able to listen to them as well.<br>

> Condition: they used the Dispatcher in there implementation.
