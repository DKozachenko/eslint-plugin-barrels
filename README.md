# eslint-plugin-barrels

Plugin with prohibition of import / export from [barrel](https://basarat.gitbook.io/typescript/main-1/barrel) files with specific relative path.

## Motivation

Twice in my life Webpack failed build of Angular application with unexpected error because of import from barrel file like this:

```js
import { smth } from '..';
```

If I changed import to particular path like this:

```js
import { smth } from './smth.ts';
```

It would work. 

> [!NOTE]  
> There were not circular dependencies in my files. Crash depended only on path.

Unfortunately, I didn't found some issues or questions on Stack Overflow with same problem, so you should take my word for it.

## Rules

💼 [Configurations](#configurations) enabled in.\
✅ Set in the `recommended` [configuration](#configurations).\
🌐 Set in the `all` [configuration](#configurations).\
🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).\
💡 Manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).

| Name                                           | Description                                                                                                                          |   💼   |  🔧   |  💡  |
| :--------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------  | :----: | ---- | ---- |
| [no-import](src/rules/no-import/README.md)     | Disallow **import** from [barrel](https://basarat.gitbook.io/typescript/main-1/barrel) files with specific relative path             | ✅ 🌐   |      |      |
| [no-export](src/rules/no-export/README.md)     | Disallow **export** from [barrel](https://basarat.gitbook.io/typescript/main-1/barrel) files with specific relative path             | 🌐     |       |      |

## Configurations

| Name                                                    | Description                                                                                                                          
| :------------------------------------------------------ | :------------------------------ | 
| [recommended](src/configs/recommended/README.md)        | Only `recommended` rules        |
| [all](src/configs/all/README.md)                        | All rules                       |

## Usage

1. Install plugin:

```bash
npm install eslint-plugin-barrels --save-dev
```

2. Update [eslint config](https://eslint.org/docs/latest/use/configure/configuration-files):

```json
{
  "plugins": ["barrels"],
  "rules": {
    "barrels/no-import": "error"
  }
}
```

or

```json
{
  "extends": [
    "plugin:barrels/recommended"
  ],
}
```

## Contributing

If you have any suggestions, ideas, or problems, feel free to create an issue or PR.