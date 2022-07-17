# Laravel mix listen extension

A laravel mix extension that allow us to listen to Mix internal events. The one used by the dispatcher. Like `configReady`, `configReadyForUser`, `loading-plugins`, ...

```js
mix.listen(('configReadyForUser', (config, circularStringify) => {
  fs.writeFileSync('webpackConfig.output.js', circularStringify(config));
});
```

## Links

**npmjs:** https://www.npmjs.com/package/laravel-mix-listen<br>
**laravel mix extension:** [coming soon]

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

You can check all the events through the `laravel-mix` code source.<br>
Tip: `CTRL + F > .listen(`. u'll find them.

### Events

Note: this section may get outdated.

You can always refer to laravel-mix code source or any of the extensions that u are using. And u are interested in one of the events.

---

## | event | description |

| `'internal:gather-dependencies'` | get executed at the start of the process of gathering the dependencies. Which will trigger the process of reading the dependencies of the components and gathering them. |
| `'init'` | Execute after mix is ready after is set and dependencies installed. It allow all components that listened to it to boot() and applyBabelConfig and to register to the events that would come next in the config generation process |
| `'loading-entries'` | that would trigger the entries creation process. And all components with webpackEntry() will have there function to run and manage the entry |
| `'loading-rules'` | event that trigger the rules generation process. Both default and the components one (webpackEntry())|
|`'loading-plugins'`| event that trigger plugins config generation and both default and components one (webpackPlugins())|
| `'configReady'` | config ready after running all components and processes. And allow plugins (components) to override the config through webpackConfig() |
| `'configReadyForUser'` | Allowing the user to override the config. Through .override() `Overide` component. Last event to run part of the main config generation process |
| `'build'` | run when webpack finish running the build process|

All config are run for config generation except for `'build'` that run at the end of the build process which come after the config generation process.

### Other extensions

If the other extensions use the Dispatcher. And trigger events in any ways. You'll be able to listen to them as well.<br>

> Condition: they used the Dispatcher in there implementation.
