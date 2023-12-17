import { InvalidTestCase, ValidTestCase } from '@typescript-eslint/rule-tester';
import { Options, barrelPath, barrelSameLevelPath, someComponentPath } from '../models';
import { MessageIds } from './no-export';

const TEST_CASE_KEYS = [
  'allExport',
  'allExportWithAlias',
  'namedExport',
  'multipleNamedExportWithAlias',
  'defaultExport',
  'defaultExportWithAlias',
] as const;

type TestCaseKey = typeof TEST_CASE_KEYS[number];
type TestCaseVariants = {
  valid: ValidTestCase<Options>[],
  invalid: InvalidTestCase<MessageIds, Options>[]
};

type TestCases = {
  [key in TestCaseKey]: TestCaseVariants
}

const codeMap: Map<TestCaseKey, string> = new Map<TestCaseKey, string>([
  ['allExport', 'export * from'],
  ['allExportWithAlias', 'export * as name from'],
  ['namedExport', 'export { name } from'],
  ['multipleNamedExportWithAlias', 'export { import1 as name1, import2 as name2 } from'],
  ['defaultExport', 'export { default } from'],
  ['defaultExportWithAlias', 'export { default as name } from'],
]);

const errorMessageIdsMap: Map<TestCaseKey, MessageIds> = new Map<TestCaseKey, MessageIds>([
  ['allExport', 'allExport'],
  ['allExportWithAlias', 'allExport'],
  ['namedExport', 'namedExport'],
  ['multipleNamedExportWithAlias', 'namedExport'],
  ['defaultExport', 'namedExport'],
  ['defaultExportWithAlias', 'namedExport'],
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
      name: `Extra namespace export (without options): '${code}'`,
      code
    },
    {
      name: `Extra namespace export (with option "onlySameLevel": "false"): '${code}'`,
      code,
      options: [
        { onlySameLevel: false }
      ]
    },
    {
      name: `Extra namespace export (with option "onlySameLevel": "true"): '${code}'`,
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
    ...generateExtraValidTestCases(`export * from '.';`),
    ...generateExtraValidTestCases(`export * from './..';`),
    ...generateExtraValidTestCases(`export * from './../..';`),
  ],
  invalid: []
}
//export * from "..";
//export * from "../../..";
//export * from "./some.component.ts";
//
//export * as name from "..";
//export * as name from "../../..";
//export * as name from "./some.component.ts";
//
//export { name } from "..";
//export { name } from "../../..";
//export { name } from "./some.component.ts";
//
//export { import1 as name1, import2 as name2 } from "..";
//export { import1 as name1, import2 as name2 } from "../../..";
//export { import1 as name1, import2 as name2 } from "./some.component.ts";
//
//export { default } from "..";
//export { default } from "../../..";
//export { default } from "./some.component.ts";
//
//export { default as name } from "..";
//export { default as name } from "../../..";
//export { default as name } from "./some.component.ts";
//
//export * from ".";
//export * from "./..";
//export * from "./../..";
