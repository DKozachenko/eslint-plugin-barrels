import * as mocha from 'mocha'; 
import { RuleTester } from '@typescript-eslint/rule-tester';
import { rule } from './no-import';
import { BASE_TEST_CASES, EXTRA_TEST_CASES } from './test-cases';

RuleTester.afterAll = mocha.after;

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: '../../../tsconfig.json',
    tsconfigRootDir: __dirname,
  },
});

ruleTester.run('no-import', rule, {
  valid: [
    ...BASE_TEST_CASES['defaultImport'].valid,
    ...BASE_TEST_CASES['defaultImportWithAlias'].valid,
    ...BASE_TEST_CASES['namedImport'].valid,
    ...BASE_TEST_CASES['multipleNamedImport'].valid,
    ...BASE_TEST_CASES['multipleNamedImportWithAlias'].valid,
    ...BASE_TEST_CASES['namedImportWithAlias'].valid,
    ...BASE_TEST_CASES['namespaceImport'].valid,
    ...BASE_TEST_CASES['combinedDefaultNamedImports'].valid,
    ...BASE_TEST_CASES['combinedDefaultNamespaceImports'].valid,
    ...BASE_TEST_CASES['sideEffectImport'].valid,
    ...EXTRA_TEST_CASES.valid
  ],
  invalid: [
    ...BASE_TEST_CASES['defaultImport'].invalid,
    ...BASE_TEST_CASES['defaultImportWithAlias'].invalid,
    ...BASE_TEST_CASES['namedImport'].invalid,
    ...BASE_TEST_CASES['multipleNamedImport'].invalid,
    ...BASE_TEST_CASES['multipleNamedImportWithAlias'].invalid,
    ...BASE_TEST_CASES['namedImportWithAlias'].invalid,
    ...BASE_TEST_CASES['namespaceImport'].invalid,
    ...BASE_TEST_CASES['combinedDefaultNamedImports'].invalid,
    ...BASE_TEST_CASES['combinedDefaultNamespaceImports'].invalid,
    ...BASE_TEST_CASES['sideEffectImport'].invalid,
    ...EXTRA_TEST_CASES.invalid
  ],
});