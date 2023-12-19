# eslint-plugin-barrels/no-export

💼 This rule is enabled in 🌐 [all](../../configs/all/README.md) config.

Disallow **export** from [barrel](https://basarat.gitbook.io/typescript/main-1/barrel) files with specific relative path.

> [!IMPORTANT]  
> The word **"specific"** is used here for a reason. This rule disallow export from file, that path consist of *"one or few moving up"*. For example, **'..'** or **'../../..'**. It means rule allows export from [barrel](https://basarat.gitbook.io/typescript/main-1/barrel) file with path, for instance, **'../some-directory-with-barrel'**, **'./components'** or even **'./components/index.js(ts)'**.

## Options

This rule supports the following options:

* `onlySameLevel`: boolean, which disallow exports from **'..'** path only. For example, **'../../..'** will be allowed with **onlySameLevel: "true"**.

## Rule Details

Valid:

```js
export * from './some.component.ts';
```

```js
/* eslint barrels/no-export: ["error", { onlySameLevel: true }] */
export { name } from '../../..';
```

```js
/* eslint barrels/no-export: ["error", { onlySameLevel: false }] */
export { default } from './some.component.ts';
```

```js
export { default as name } from './some.component.ts';
```

```js
export * from '.';
```

```js
export * from './..';
```

```js
export * from '../index.js(ts)';
```

Invalid:

```js
export * from '..';
```

```js
/* eslint barrels/no-export: ["error", { onlySameLevel: true }] */
export { name } from '..';
```

```js
/* eslint barrels/no-export: ["error", { onlySameLevel: false }] */
export { default } from '..';
```

```js
export { default as name } from '..';
```

More test cases you can find in [test-cases.ts](../no-export/test-cases.ts)