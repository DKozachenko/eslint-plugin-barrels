import { InvalidTestCase, ValidTestCase } from '@typescript-eslint/rule-tester';
import { Options, barrelPath, barrelSameLevelPath, someComponentPath } from '../../models';
import { MessageIds } from './no-import';

const TEST_CASE_KEYS = [
  'defaultImport',  
  'defaultImportWithAlias',
  'namedImport',
  'namedImportWithAlias',
  'multipleNamedImport', 
  'multipleNamedImportWithAlias',
  'namespaceImport',
  'combinedDefaultNamedImports',
  'combinedDefaultNamespaceImports',
  'sideEffectImport'
] as const;

type TestCaseKey = typeof TEST_CASE_KEYS[number];
type TestCaseVariants = {
  valid: ValidTestCase<Options>[],
  invalid: InvalidTestCase<MessageIds, Options>[]
};

type TestCases = {
  [key in TestCaseKey]: TestCaseVariants
}

// A majority of import declarations examples for tests is taken from
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
const codeMap: Map<TestCaseKey, string> = new Map<TestCaseKey, string>([
  ['defaultImport', 'import defaultExport from'],
  ['defaultImportWithAlias', 'import { default as alias } from'],
  ['namedImport', 'import { export1 } from'],
  ['namedImportWithAlias', 'import { export1 as alias1 } from'],
  ['multipleNamedImport', 'import { export1, export2 } from'],
  ['multipleNamedImportWithAlias', 'import { export1, export2 as alias2 } from'],
  ['namespaceImport', 'import * as name from'],
  ['combinedDefaultNamedImports', 'import defaultExport, { export1 } from'],
  ['combinedDefaultNamespaceImports', 'import defaultExport, * as name from'],
  ['sideEffectImport', 'import'],
]);

const errorMessageIdsMap: Map<TestCaseKey, MessageIds> = new Map<TestCaseKey, MessageIds>([
  ['defaultImport', 'defaultImport'],
  ['defaultImportWithAlias', 'namedImport'],
  ['namedImport', 'namedImport'],
  ['namedImportWithAlias', 'namedImport'],
  ['multipleNamedImport', 'namedImport'],
  ['multipleNamedImportWithAlias', 'namedImport'],
  ['namespaceImport', 'namespaceImport'],
  ['combinedDefaultNamedImports', 'defaultImport'],
  ['combinedDefaultNamespaceImports', 'defaultImport'],
  ['sideEffectImport', 'sideEffectImport'],
]);

const generateTestCases: (key: TestCaseKey) => TestCaseVariants = (key: TestCaseKey) => {
  const codeBegining: string = <string>codeMap.get(key);
  const errorMessageId: MessageIds = <MessageIds>errorMessageIdsMap.get(key);

  const result: TestCaseVariants = {
    valid: [
      {
        name: `${key} from barrel file (with option "onlySameLevel": "true"): '${codeBegining} '${barrelPath}';'`,
        code: `${codeBegining} '${barrelPath}';`,
        options: [
          { onlySameLevel: true }
        ],
      },
      {
        name: `${key} from not barrel file (without options): '${codeBegining} '${someComponentPath}';'`,
        code: `${codeBegining} '${someComponentPath}';`,
      },
      {
        name: `${key} from not barrel file (with option "onlySameLevel": "false"): '${codeBegining} '${someComponentPath}';'`,
        code: `${codeBegining} '${someComponentPath}';`,
        options: [
          { onlySameLevel: false }
        ],
      },
      {
        name: `${key} from not barrel file (with option "onlySameLevel": "true"): '${codeBegining} '${someComponentPath}';'`,
        code: `${codeBegining} '${someComponentPath}';`,
        options: [
          { onlySameLevel: true }
        ],
      }
    ],
    invalid: [
      {
        name: `${key} from barrel file same level (without options): '${codeBegining} '${barrelSameLevelPath}';'`,
        code: `${codeBegining} '${barrelSameLevelPath}';`,
        errors: [
          { messageId: errorMessageId }
        ]
      },
      {
        name: `${key} from barrel file same level (with option "onlySameLevel": "false"): '${codeBegining} '${barrelSameLevelPath}';'`,
        code: `${codeBegining} '${barrelSameLevelPath}';`,
        options: [
          { onlySameLevel: false }
        ],
        errors: [
          { messageId: errorMessageId }
        ]
      },
      {
        name: `${key} from barrel file same level (with option "onlySameLevel": "true"): '${codeBegining} '${barrelSameLevelPath}';'`,
        code: `${codeBegining} '${barrelSameLevelPath}';`,
        options: [
          { onlySameLevel: true }
        ],
        errors: [
          { messageId: errorMessageId }
        ]
      },
      {
        name: `${key} from barrel file (without options): '${codeBegining} '${barrelPath}';'`,
        code: `${codeBegining} '${barrelPath}';`,
        errors: [
          { messageId: errorMessageId }
        ]
      },
      {
        name: `${key} from barrel file (with option "onlySameLevel": "false"): '${codeBegining} '${barrelPath}';'`,
        code: `${codeBegining} '${barrelPath}';`,
        options: [
          { onlySameLevel: false }
        ],
        errors: [
          { messageId: errorMessageId }
        ]
      },
    ]
  }

  return result;
}

const generateExtraValidTestCases: (code: string) => ValidTestCase<Options>[] = (code: string) => {
  return [
    {
      name: `Extra namespace import (without options): '${code}'`,
      code
    },
    {
      name: `Extra namespace import (with option "onlySameLevel": "false"): '${code}'`,
      code,
      options: [
        { onlySameLevel: false }
      ]
    },
    {
      name: `Extra namespace import (with option "onlySameLevel": "true"): '${code}'`,
      code,
      options: [
        { onlySameLevel: true }
      ]
    },
  ];
}

export const BASE_TEST_CASES: TestCases = <TestCases>TEST_CASE_KEYS.reduce((acc: Partial<TestCases>, current: TestCaseKey) => {
  acc[current] = generateTestCases(current);
  return acc;
}, {});

export const EXTRA_TEST_CASES: TestCaseVariants = {
  valid: [
    ...generateExtraValidTestCases(`import * as name from '.';`),
    ...generateExtraValidTestCases(`import * as name from './..';`),
    ...generateExtraValidTestCases(`import * as name from './../..';`),
  ],
  invalid: []
}