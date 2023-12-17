import { AST_NODE_TYPES, ESLintUtils, TSESTree } from '@typescript-eslint/utils';
import { RuleContext } from '@typescript-eslint/utils/ts-eslint';
import { Options } from '../models';
import { isFromBarrel, isFromBarrelSameLevel } from '../../utils';

export type MessageIds = 'defaultImport' | 'namedImport' | 'namespaceImport' | 'sideEffectImport';
export const createRule = ESLintUtils.RuleCreator((name: string) => name);

const checkDefaultImport = (
  node: TSESTree.ImportDeclaration, 
  checker: (path: string) => boolean, 
  context: Readonly<RuleContext<MessageIds, Options>>
) => {
  const sourceValue: string = node.source.value;

  if (checker(sourceValue)) {
    context.report({
      messageId: 'defaultImport',
      node: node,
    });
  }
}

const checkNamespaceImport = (
  node: TSESTree.ImportDeclaration, 
  checker: (path: string) => boolean, 
  context: Readonly<RuleContext<MessageIds, Options>>
) => {
  const sourceValue: string = node.source.value;

  if (checker(sourceValue)) {
    context.report({
      messageId: 'namespaceImport',
      node: node,
    });
  }
}

const checkNamedImport = (
  node: TSESTree.ImportDeclaration, 
  checker: (path: string) => boolean, 
  context: Readonly<RuleContext<MessageIds, Options>>
) => {
  const sourceValue: string = node.source.value;

  if (checker(sourceValue)) {
    context.report({
      messageId: 'namedImport',
      node: node,
    });
  }
}

const checkSideEffectImport = (
  node: TSESTree.ImportDeclaration, 
  checker: (path: string) => boolean, 
  context: Readonly<RuleContext<MessageIds, Options>>
) => {
  const sourceValue: string = node.source.value;

  if (checker(sourceValue)) {
    context.report({
      messageId: 'sideEffectImport',
      node: node,
    });
  }
}

export const rule = createRule<Options, MessageIds>({
  name: 'no-import',
  meta: {
    docs: {
      description: "Disallow imports from barrel file at the same level",
      recommended: 'recommended',
    },
    type: 'problem',
    fixable: 'code',
    messages: {
      defaultImport: 'Default import from barrel file',
      namedImport: 'Named import from barrel file',
      namespaceImport: 'Default import from barrel file',
      sideEffectImport: 'Side effect import from barrel file',
    },
    schema: [
      {
        type: 'object',
        properties: {
          onlySameLevel: {
            type: 'boolean',
            enum: [true, false],
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{
    onlySameLevel: false
  }],
  create(context: Readonly<RuleContext<MessageIds, Options>>, options: Readonly<Options>) {
    const checker: (path: string) => boolean = options[0].onlySameLevel 
      ? isFromBarrelSameLevel
      : isFromBarrel;

    return {
      ImportDeclaration(node: TSESTree.ImportDeclaration) {
        const specifiers: TSESTree.ImportClause[] = node.specifiers;
        
        if (!specifiers.length) {
          checkSideEffectImport(node, checker, context);
          return;
        }

        for (const specifier of specifiers) {
          switch (specifier.type) {
            case AST_NODE_TYPES.ImportDefaultSpecifier:
              checkDefaultImport(node, checker, context);
              return;
            case AST_NODE_TYPES.ImportNamespaceSpecifier:
              checkNamespaceImport(node, checker, context);
              return;
            case AST_NODE_TYPES.ImportSpecifier:
              checkNamedImport(node, checker, context);
              return;
          }
        }
      },
    };
  },
});

