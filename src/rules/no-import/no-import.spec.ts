import * as mocha from 'mocha'; 
import { RuleTester } from '@typescript-eslint/rule-tester';
import { rule } from './no-import';
import { TEST_CASES } from './test-cases';

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
    ...TEST_CASES['defaultImport'].valid,
    ...TEST_CASES['defaultImportWithAlias'].valid,
    ...TEST_CASES['namedImport'].valid,
    ...TEST_CASES['multipleNamedImport'].valid,
    ...TEST_CASES['multipleNamedImportWithAlias'].valid,
    ...TEST_CASES['namedImportWithAlias'].valid,
    ...TEST_CASES['namespaceImport'].valid,
    ...TEST_CASES['combinedDefaultNamedImports'].valid,
    ...TEST_CASES['combinedDefaultNamespaceImports'].valid,
    ...TEST_CASES['sideEffectImport'].valid,
  ],
  invalid: [
    ...TEST_CASES['defaultImport'].invalid,
    ...TEST_CASES['defaultImportWithAlias'].invalid,
    ...TEST_CASES['namedImport'].invalid,
    ...TEST_CASES['multipleNamedImport'].invalid,
    ...TEST_CASES['multipleNamedImportWithAlias'].invalid,
    ...TEST_CASES['namedImportWithAlias'].invalid,
    ...TEST_CASES['namespaceImport'].invalid,
    ...TEST_CASES['combinedDefaultNamedImports'].invalid,
    ...TEST_CASES['combinedDefaultNamespaceImports'].invalid,
    ...TEST_CASES['sideEffectImport'].invalid,
  ],
});