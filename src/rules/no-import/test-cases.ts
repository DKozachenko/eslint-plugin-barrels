import { InvalidTestCase, ValidTestCase } from '@typescript-eslint/rule-tester';
import { Options, barrelPath, barrelSameLevelPath, someComponentPath } from '../models';
import { MessageIds } from './no-import';

type TestCaseKey = 'defaultImport' | 
  'defaultImportWithAlias' |
  'defaultImportWithAlias' |
  'namedImport' |
  'multipleNamedImport' |
  'multipleNamedImportWithAlias' | 
  'namedImportWithAlias' | 
  'namespaceImport' |
  'combinedDefaultNamedImports' | 
  'combinedDefaultNamespaceImports' |
  'sideEffectImport';

type TestCases = {
  [key in TestCaseKey]: {
    valid: ValidTestCase<Options>[],
    invalid: InvalidTestCase<MessageIds, Options>[]
  }
}

export const TEST_CASES: TestCases = {
  defaultImport: {
    valid: [
      {
        name: `defaultImport from barrel file (with option "onlySameLevel": "true"): '${barrelPath}'`,
        code: `import defaultExport from '${barrelPath}';`,
        options: [
          { onlySameLevel: true }
        ],
      },
      {
        name: `defaultImport from not barrel file (without options): '${someComponentPath}'`,
        code: `import defaultExport from '${someComponentPath}';`,
      },
      {
        name: `defaultImport from not barrel file (with option "onlySameLevel": "false"): '${someComponentPath}'`,
        code: `import defaultExport from '${someComponentPath}';`,
        options: [
          { onlySameLevel: false }
        ],
      },
      {
        name: `defaultImport from not barrel file (with option "onlySameLevel": "true"): '${someComponentPath}'`,
        code: `import defaultExport from '${someComponentPath}';`,
        options: [
          { onlySameLevel: true }
        ],
      },
    ],
    invalid: [
      {
        name: `defaultImport from barrel file same level (without options): '${barrelSameLevelPath}'`,
        code: `import defaultExport from '${barrelSameLevelPath}';`,
        errors: [
          { messageId: 'defaultImport' }
        ]
      },
      {
        name: `defaultImport from barrel file same level (with option "onlySameLevel": "false"): '${barrelSameLevelPath}'`,
        code: `import defaultExport from '${barrelSameLevelPath}';`,
        options: [
          { onlySameLevel: false }
        ],
        errors: [
          { messageId: 'defaultImport' }
        ]
      },
      {
        name: `defaultImport from barrel file same level (with option "onlySameLevel": "true"): '${barrelSameLevelPath}'`,
        code: `import defaultExport from '${barrelSameLevelPath}';`,
        options: [
          { onlySameLevel: true }
        ],
        errors: [
          { messageId: 'defaultImport' }
        ]
      },
      {
        name: `defaultImport from barrel file (without options): '${barrelPath}'`,
        code: `import defaultExport from '${barrelPath}';`,
        errors: [
          { messageId: 'defaultImport' }
        ]
      },
      {
        name: `defaultImport from barrel file (with option "onlySameLevel": "false"): '${barrelPath}'`,
        code: `import defaultExport from '${barrelPath}';`,
        options: [
          { onlySameLevel: false }
        ],
        errors: [
          { messageId: 'defaultImport' }
        ]
      },
    ]
  },
  defaultImportWithAlias: {
    valid: [
      {
        name: `defaultImportWithAlias from barrel file (with option "onlySameLevel": "true"): '${barrelPath}'`,
        code: `import { default as alias } from '${barrelPath}';`,
        options: [
          { onlySameLevel: true }
        ],
      },
      {
        name: `defaultImportWithAlias from not barrel file (without options): '${someComponentPath}'`,
        code: `import { default as alias } from '${someComponentPath}';`,
      },
      {
        name: `defaultImportWithAlias from not barrel file (with option "onlySameLevel": "false"): '${someComponentPath}'`,
        code: `import { default as alias } from '${someComponentPath}';`,
        options: [
          { onlySameLevel: false }
        ],
      },
      {
        name: `defaultImportWithAlias from not barrel file (with option "onlySameLevel": "true"): '${someComponentPath}'`,
        code: `import { default as alias } from '${someComponentPath}';`,
        options: [
          { onlySameLevel: true }
        ],
      },
    ],
    invalid: [
      {
        name: `defaultImportWithAlias from barrel file same level (without options): '${barrelSameLevelPath}'`,
        code: `import { default as alias } from '${barrelSameLevelPath}';`,
        errors: [
          { messageId: 'namedImport' }
        ]
      },
      {
        name: `defaultImportWithAlias from barrel file same level (with option "onlySameLevel": "false"): '${barrelSameLevelPath}'`,
        code: `import { default as alias } from '${barrelSameLevelPath}';`,
        options: [
          { onlySameLevel: false }
        ],
        errors: [
          { messageId: 'namedImport' }
        ]
      },
      {
        name: `defaultImportWithAlias from barrel file same level (with option "onlySameLevel": "true"): '${barrelSameLevelPath}'`,
        code: `import { default as alias } from '${barrelSameLevelPath}';`,
        options: [
          { onlySameLevel: true }
        ],
        errors: [
          { messageId: 'namedImport' }
        ]
      },
      {
        name: `defaultImportWithAlias from barrel file (without options): '${barrelPath}'`,
        code: `import { default as alias } from '${barrelPath}';`,
        errors: [
          { messageId: 'namedImport' }
        ]
      },
      {
        name: `defaultImportWithAlias from barrel file (with option "onlySameLevel": "false"): '${barrelPath}'`,
        code: `import { default as alias } from '${barrelPath}';`,
        options: [
          { onlySameLevel: false }
        ],
        errors: [
          { messageId: 'namedImport' }
        ]
      },
    ]
  },
  namedImport: {
    valid: [
      {
        name: `namedImport from barrel file (with option "onlySameLevel": "true"): '${barrelPath}'`,
        code: `import { export1 } from '${barrelPath}';`,
        options: [
          { onlySameLevel: true }
        ],
      },
      {
        name: `namedImport from not barrel file (without options): '${someComponentPath}'`,
        code: `import { export1 } from '${someComponentPath}';`,
      },
      {
        name: `namedImport from not barrel file (with option "onlySameLevel": "false"): '${someComponentPath}'`,
        code: `import { export1 } from '${someComponentPath}';`,
        options: [
          { onlySameLevel: false }
        ],
      },
      {
        name: `namedImport from not barrel file (with option "onlySameLevel": "true"): '${someComponentPath}'`,
        code: `import { export1 } from '${someComponentPath}';`,
        options: [
          { onlySameLevel: true }
        ],
      },
    ],
    invalid: [
      {
        name: `namedImport from barrel file same level (without options): '${barrelSameLevelPath}'`,
        code: `import { export1 } from '${barrelSameLevelPath}';`,
        errors: [
          { messageId: 'namedImport' }
        ]
      },
      {
        name: `namedImport from barrel file same level (with option "onlySameLevel": "false"): '${barrelSameLevelPath}'`,
        code: `import { export1 } from '${barrelSameLevelPath}';`,
        options: [
          { onlySameLevel: false }
        ],
        errors: [
          { messageId: 'namedImport' }
        ]
      },
      {
        name: `namedImport from barrel file same level (with option "onlySameLevel": "true"): '${barrelSameLevelPath}'`,
        code: `import { export1 } from '${barrelSameLevelPath}';`,
        options: [
          { onlySameLevel: true }
        ],
        errors: [
          { messageId: 'namedImport' }
        ]
      },
      {
        name: `namedImport from barrel file (without options): '${barrelPath}'`,
        code: `import { export1 } from '${barrelPath}';`,
        errors: [
          { messageId: 'namedImport' }
        ]
      },
      {
        name: `namedImport from barrel file (with option "onlySameLevel": "false"): '${barrelPath}'`,
        code: `import { export1 } from '${barrelPath}';`,
        options: [
          { onlySameLevel: false }
        ],
        errors: [
          { messageId: 'namedImport' }
        ]
      },
    ]
  },
  multipleNamedImport: {
    valid: [
      {
        name: `multipleNamedImport from barrel file (with option "onlySameLevel": "true"): '${barrelPath}'`,
        code: `import { export1, export2 } from '${barrelPath}';`,
        options: [
          { onlySameLevel: true }
        ],
      },
      {
        name: `multipleNamedImport from not barrel file (without options): '${someComponentPath}'`,
        code: `import { export1, export2 } from '${someComponentPath}';`,
      },
      {
        name: `multipleNamedImport from not barrel file (with option "onlySameLevel": "false"): '${someComponentPath}'`,
        code: `import { export1, export2 } from '${someComponentPath}';`,
        options: [
          { onlySameLevel: false }
        ],
      },
      {
        name: `multipleNamedImport from not barrel file (with option "onlySameLevel": "true"): '${someComponentPath}'`,
        code: `import { export1, export2 } from '${someComponentPath}';`,
        options: [
          { onlySameLevel: true }
        ],
      },
    ],
    invalid: [
      {
        name: `multipleNamedImport from barrel file same level (without options): '${barrelSameLevelPath}'`,
        code: `import { export1, export2 } from '${barrelSameLevelPath}';`,
        errors: [
          { messageId: 'namedImport' }
        ]
      },
      {
        name: `multipleNamedImport from barrel file same level (with option "onlySameLevel": "false"): '${barrelSameLevelPath}'`,
        code: `import { export1, export2 } from '${barrelSameLevelPath}';`,
        options: [
          { onlySameLevel: false }
        ],
        errors: [
          { messageId: 'namedImport' }
        ]
      },
      {
        name: `multipleNamedImport from barrel file same level (with option "onlySameLevel": "true"): '${barrelSameLevelPath}'`,
        code: `import { export1, export2 } from '${barrelSameLevelPath}';`,
        options: [
          { onlySameLevel: true }
        ],
        errors: [
          { messageId: 'namedImport' }
        ]
      },
      {
        name: `multipleNamedImport from barrel file (without options): '${barrelPath}'`,
        code: `import { export1, export2 } from '${barrelPath}';`,
        errors: [
          { messageId: 'namedImport' }
        ]
      },
      {
        name: `multipleNamedImport from barrel file (with option "onlySameLevel": "false"): '${barrelPath}'`,
        code: `import { export1, export2 } from '${barrelPath}';`,
        options: [
          { onlySameLevel: false }
        ],
        errors: [
          { messageId: 'namedImport' }
        ]
      },
    ]
  },
  multipleNamedImportWithAlias: {
    valid: [
      {
        name: `multipleNamedImportWithAlias from barrel file (with option "onlySameLevel": "true"): '${barrelPath}'`,
        code: `import { export1, export2 as alias2 } from '${barrelPath}';`,
        options: [
          { onlySameLevel: true }
        ],
      },
      {
        name: `multipleNamedImportWithAlias from not barrel file (without options): '${someComponentPath}'`,
        code: `import { export1, export2 as alias2 } from '${someComponentPath}';`,
      },
      {
        name: `multipleNamedImportWithAlias from not barrel file (with option "onlySameLevel": "false"): '${someComponentPath}'`,
        code: `import { export1, export2 as alias2 } from '${someComponentPath}';`,
        options: [
          { onlySameLevel: false }
        ],
      },
      {
        name: `multipleNamedImportWithAlias from not barrel file (with option "onlySameLevel": "true"): '${someComponentPath}'`,
        code: `import { export1, export2 as alias2 } from '${someComponentPath}';`,
        options: [
          { onlySameLevel: true }
        ],
      },
    ],
    invalid: [
      {
        name: `multipleNamedImportWithAlias from barrel file same level (without options): '${barrelSameLevelPath}'`,
        code: `import { export1, export2 as alias2 } from '${barrelSameLevelPath}';`,
        errors: [
          { messageId: 'namedImport' }
        ]
      },
      {
        name: `multipleNamedImportWithAlias from barrel file same level (with option "onlySameLevel": "false"): '${barrelSameLevelPath}'`,
        code: `import { export1, export2 as alias2 } from '${barrelSameLevelPath}';`,
        options: [
          { onlySameLevel: false }
        ],
        errors: [
          { messageId: 'namedImport' }
        ]
      },
      {
        name: `multipleNamedImportWithAlias from barrel file same level (with option "onlySameLevel": "true"): '${barrelSameLevelPath}'`,
        code: `import { export1, export2 as alias2 } from '${barrelSameLevelPath}';`,
        options: [
          { onlySameLevel: true }
        ],
        errors: [
          { messageId: 'namedImport' }
        ]
      },
      {
        name: `multipleNamedImportWithAlias from barrel file (without options): '${barrelPath}'`,
        code: `import { export1, export2 as alias2 } from '${barrelPath}';`,
        errors: [
          { messageId: 'namedImport' }
        ]
      },
      {
        name: `multipleNamedImportWithAlias from barrel file (with option "onlySameLevel": "false"): '${barrelPath}'`,
        code: `import { export1, export2 as alias2 } from '${barrelPath}';`,
        options: [
          { onlySameLevel: false }
        ],
        errors: [
          { messageId: 'namedImport' }
        ]
      },
    ]
  },
  namedImportWithAlias: {
    valid: [
      {
        name: `namedImportWithAlias from barrel file (with option "onlySameLevel": "true"): '${barrelPath}'`,
        code: `import { export1 as alias1 } from '${barrelPath}';`,
        options: [
          { onlySameLevel: true }
        ],
      },
      {
        name: `namedImportWithAlias from not barrel file (without options): '${someComponentPath}'`,
        code: `import { export1 as alias1 } from '${someComponentPath}';`,
      },
      {
        name: `namedImportWithAlias from not barrel file (with option "onlySameLevel": "false"): '${someComponentPath}'`,
        code: `import { export1 as alias1 } from '${someComponentPath}';`,
        options: [
          { onlySameLevel: false }
        ],
      },
      {
        name: `namedImportWithAlias from not barrel file (with option "onlySameLevel": "true"): '${someComponentPath}'`,
        code: `import { export1 as alias1 } from '${someComponentPath}';`,
        options: [
          { onlySameLevel: true }
        ],
      },
    ],
    invalid: [
      {
        name: `namedImportWithAlias from barrel file same level (without options): '${barrelSameLevelPath}'`,
        code: `import { export1 as alias1 } from '${barrelSameLevelPath}';`,
        errors: [
          { messageId: 'namedImport' }
        ]
      },
      {
        name: `namedImportWithAlias from barrel file same level (with option "onlySameLevel": "false"): '${barrelSameLevelPath}'`,
        code: `import { export1 as alias1 } from '${barrelSameLevelPath}';`,
        options: [
          { onlySameLevel: false }
        ],
        errors: [
          { messageId: 'namedImport' }
        ]
      },
      {
        name: `namedImportWithAlias from barrel file same level (with option "onlySameLevel": "true"): '${barrelSameLevelPath}'`,
        code: `import { export1 as alias1 } from '${barrelSameLevelPath}';`,
        options: [
          { onlySameLevel: true }
        ],
        errors: [
          { messageId: 'namedImport' }
        ]
      },
      {
        name: `namedImportWithAlias from barrel file (without options): '${barrelPath}'`,
        code: `import { export1 as alias1 } from '${barrelPath}';`,
        errors: [
          { messageId: 'namedImport' }
        ]
      },
      {
        name: `namedImportWithAlias from barrel file (with option "onlySameLevel": "false"): '${barrelPath}'`,
        code: `import { export1 as alias1 } from '${barrelPath}';`,
        options: [
          { onlySameLevel: false }
        ],
        errors: [
          { messageId: 'namedImport' }
        ]
      },
    ]
  },
  namespaceImport: {
    valid: [
      {
        name: `namespaceImport from barrel file (with option "onlySameLevel": "true"): '${barrelPath}'`,
        code: `import * as name from '${barrelPath}';`,
        options: [
          { onlySameLevel: true }
        ],
      },
      {
        name: `namespaceImport from not barrel file (without options): '${someComponentPath}'`,
        code: `import * as name from '${someComponentPath}';`,
      },
      {
        name: `namespaceImport from not barrel file (with option "onlySameLevel": "false"): '${someComponentPath}'`,
        code: `import * as name from '${someComponentPath}';`,
        options: [
          { onlySameLevel: false }
        ],
      },
      {
        name: `namespaceImport from not barrel file (with option "onlySameLevel": "true"): '${someComponentPath}'`,
        code: `import * as name from '${someComponentPath}';`,
        options: [
          { onlySameLevel: true }
        ],
      },
    ],
    invalid: [
      {
        name: `namespaceImport from barrel file same level (without options): '${barrelSameLevelPath}'`,
        code: `import * as name from '${barrelSameLevelPath}';`,
        errors: [
          { messageId: 'namespaceImport' }
        ]
      },
      {
        name: `namespaceImport from barrel file same level (with option "onlySameLevel": "false"): '${barrelSameLevelPath}'`,
        code: `import * as name from '${barrelSameLevelPath}';`,
        options: [
          { onlySameLevel: false }
        ],
        errors: [
          { messageId: 'namespaceImport' }
        ]
      },
      {
        name: `namespaceImport from barrel file same level (with option "onlySameLevel": "true"): '${barrelSameLevelPath}'`,
        code: `import * as name from '${barrelSameLevelPath}';`,
        options: [
          { onlySameLevel: true }
        ],
        errors: [
          { messageId: 'namespaceImport' }
        ]
      },
      {
        name: `namespaceImport from barrel file (without options): '${barrelPath}'`,
        code: `import * as name from '${barrelPath}';`,
        errors: [
          { messageId: 'namespaceImport' }
        ]
      },
      {
        name: `namespaceImport from barrel file (with option "onlySameLevel": "false"): '${barrelPath}'`,
        code: `import * as name from '${barrelPath}';`,
        options: [
          { onlySameLevel: false }
        ],
        errors: [
          { messageId: 'namespaceImport' }
        ]
      },
    ]
  },
  combinedDefaultNamedImports: {
    valid: [
      {
        name: `combinedDefaultNamedImports from barrel file (with option "onlySameLevel": "true"): '${barrelPath}'`,
        code: `import defaultExport, { export1 } from '${barrelPath}';`,
        options: [
          { onlySameLevel: true }
        ],
      },
      {
        name: `combinedDefaultNamedImports from not barrel file (without options): '${someComponentPath}'`,
        code: `import defaultExport, { export1 } from '${someComponentPath}';`,
      },
      {
        name: `combinedDefaultNamedImports from not barrel file (with option "onlySameLevel": "false"): '${someComponentPath}'`,
        code: `import defaultExport, { export1 } from '${someComponentPath}';`,
        options: [
          { onlySameLevel: false }
        ],
      },
      {
        name: `combinedDefaultNamedImports from not barrel file (with option "onlySameLevel": "true"): '${someComponentPath}'`,
        code: `import defaultExport, { export1 } from '${someComponentPath}';`,
        options: [
          { onlySameLevel: true }
        ],
      },
    ],
    invalid: [
      {
        name: `combinedDefaultNamedImports from barrel file same level (without options): '${barrelSameLevelPath}'`,
        code: `import defaultExport, { export1 } from '${barrelSameLevelPath}';`,
        errors: [
          { messageId: 'defaultImport' }
        ]
      },
      {
        name: `combinedDefaultNamedImports from barrel file same level (with option "onlySameLevel": "false"): '${barrelSameLevelPath}'`,
        code: `import defaultExport, { export1 } from '${barrelSameLevelPath}';`,
        options: [
          { onlySameLevel: false }
        ],
        errors: [
          { messageId: 'defaultImport' }
        ]
      },
      {
        name: `combinedDefaultNamedImports from barrel file same level (with option "onlySameLevel": "true"): '${barrelSameLevelPath}'`,
        code: `import defaultExport, { export1 } from '${barrelSameLevelPath}';`,
        options: [
          { onlySameLevel: true }
        ],
        errors: [
          { messageId: 'defaultImport' }
        ]
      },
      {
        name: `combinedDefaultNamedImports from barrel file (without options): '${barrelPath}'`,
        code: `import defaultExport, { export1 } from '${barrelPath}';`,
        errors: [
          { messageId: 'defaultImport' }
        ]
      },
      {
        name: `combinedDefaultNamedImports from barrel file (with option "onlySameLevel": "false"): '${barrelPath}'`,
        code: `import defaultExport, { export1 } from '${barrelPath}';`,
        options: [
          { onlySameLevel: false }
        ],
        errors: [
          { messageId: 'defaultImport' }
        ]
      },
    ]
  },
  combinedDefaultNamespaceImports: {
    valid: [
      {
        name: `combinedDefaultNamespaceImports from barrel file (with option "onlySameLevel": "true"): '${barrelPath}'`,
        code: `import defaultExport, * as name from '${barrelPath}';`,
        options: [
          { onlySameLevel: true }
        ],
      },
      {
        name: `combinedDefaultNamespaceImports from not barrel file (without options): '${someComponentPath}'`,
        code: `import defaultExport, * as name from '${someComponentPath}';`,
      },
      {
        name: `combinedDefaultNamespaceImports from not barrel file (with option "onlySameLevel": "false"): '${someComponentPath}'`,
        code: `import defaultExport, * as name from '${someComponentPath}';`,
        options: [
          { onlySameLevel: false }
        ],
      },
      {
        name: `combinedDefaultNamespaceImports from not barrel file (with option "onlySameLevel": "true"): '${someComponentPath}'`,
        code: `import defaultExport, * as name from '${someComponentPath}';`,
        options: [
          { onlySameLevel: true }
        ],
      },
    ],
    invalid: [
      {
        name: `combinedDefaultNamespaceImports from barrel file same level (without options): '${barrelSameLevelPath}'`,
        code: `import defaultExport, * as name from '${barrelSameLevelPath}';`,
        errors: [
          { messageId: 'defaultImport' }
        ]
      },
      {
        name: `combinedDefaultNamespaceImports from barrel file same level (with option "onlySameLevel": "false"): '${barrelSameLevelPath}'`,
        code: `import defaultExport, * as name from '${barrelSameLevelPath}';`,
        options: [
          { onlySameLevel: false }
        ],
        errors: [
          { messageId: 'defaultImport' }
        ]
      },
      {
        name: `combinedDefaultNamespaceImports from barrel file same level (with option "onlySameLevel": "true"): '${barrelSameLevelPath}'`,
        code: `import defaultExport, * as name from '${barrelSameLevelPath}';`,
        options: [
          { onlySameLevel: true }
        ],
        errors: [
          { messageId: 'defaultImport' }
        ]
      },
      {
        name: `combinedDefaultNamespaceImports from barrel file (without options): '${barrelPath}'`,
        code: `import defaultExport, * as name from '${barrelPath}';`,
        errors: [
          { messageId: 'defaultImport' }
        ]
      },
      {
        name: `combinedDefaultNamespaceImports from barrel file (with option "onlySameLevel": "false"): '${barrelPath}'`,
        code: `import defaultExport, * as name from '${barrelPath}';`,
        options: [
          { onlySameLevel: false }
        ],
        errors: [
          { messageId: 'defaultImport' }
        ]
      },
    ]
  },
  sideEffectImport: {
    valid: [
      {
        name: `sideEffectImport from barrel file (with option "onlySameLevel": "true"): '${barrelPath}'`,
        code: `import '${barrelPath}';`,
        options: [
          { onlySameLevel: true }
        ],
      },
      {
        name: `sideEffectImport from not barrel file (without options): '${someComponentPath}'`,
        code: `import '${someComponentPath}';`,
      },
      {
        name: `sideEffectImport from not barrel file (with option "onlySameLevel": "false"): '${someComponentPath}'`,
        code: `import '${someComponentPath}';`,
        options: [
          { onlySameLevel: false }
        ],
      },
      {
        name: `sideEffectImport from not barrel file (with option "onlySameLevel": "true"): '${someComponentPath}'`,
        code: `import '${someComponentPath}';`,
        options: [
          { onlySameLevel: true }
        ],
      },
    ],
    invalid: [
      {
        name: `sideEffectImport from barrel file same level (without options): '${barrelSameLevelPath}'`,
        code: `import '${barrelSameLevelPath}';`,
        errors: [
          { messageId: 'sideEffectImport' }
        ]
      },
      {
        name: `sideEffectImport from barrel file same level (with option "onlySameLevel": "false"): '${barrelSameLevelPath}'`,
        code: `import '${barrelSameLevelPath}';`,
        options: [
          { onlySameLevel: false }
        ],
        errors: [
          { messageId: 'sideEffectImport' }
        ]
      },
      {
        name: `sideEffectImport from barrel file same level (with option "onlySameLevel": "true"): '${barrelSameLevelPath}'`,
        code: `import '${barrelSameLevelPath}';`,
        options: [
          { onlySameLevel: true }
        ],
        errors: [
          { messageId: 'sideEffectImport' }
        ]
      },
      {
        name: `sideEffectImport from barrel file (without options): '${barrelPath}'`,
        code: `import '${barrelPath}';`,
        errors: [
          { messageId: 'sideEffectImport' }
        ]
      },
      {
        name: `sideEffectImport from barrel file (with option "onlySameLevel": "false"): '${barrelPath}'`,
        code: `import '${barrelPath}';`,
        options: [
          { onlySameLevel: false }
        ],
        errors: [
          { messageId: 'sideEffectImport' }
        ]
      },
    ]
  }
}