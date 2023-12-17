import * as mocha from 'mocha'; 
import { RuleTester } from '@typescript-eslint/rule-tester';
import { rule } from './no-export';
import { BASE_TEST_CASES, EXTRA_TEST_CASES } from './test-cases';

RuleTester.afterAll = mocha.after;

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: '../../../tsconfig.json',
    tsconfigRootDir: __dirname,
  },
});

ruleTester.run('no-export', rule, {
  valid: [
    ...BASE_TEST_CASES['allExport'].valid,
    ...BASE_TEST_CASES['allExportWithAlias'].valid,
    ...BASE_TEST_CASES['namedExport'].valid,
    ...BASE_TEST_CASES['multipleNamedExportWithAlias'].valid,
    ...BASE_TEST_CASES['defaultExport'].valid,
    ...BASE_TEST_CASES['defaultExportWithAlias'].valid,
    ...EXTRA_TEST_CASES.valid
  ],
  invalid: [
    ...BASE_TEST_CASES['allExport'].invalid,
    ...BASE_TEST_CASES['allExportWithAlias'].invalid,
    ...BASE_TEST_CASES['namedExport'].invalid,
    ...BASE_TEST_CASES['multipleNamedExportWithAlias'].invalid,
    ...BASE_TEST_CASES['defaultExport'].invalid,
    ...BASE_TEST_CASES['defaultExportWithAlias'].invalid,
    ...EXTRA_TEST_CASES.invalid
  ],
});