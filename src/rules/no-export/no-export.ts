import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';
import { RuleContext, RuleModule } from '@typescript-eslint/utils/ts-eslint';
import { Options } from '../../models';
import { isFromBarrel, isFromBarrelSameLevel } from '../../utils';

export type MessageIds = 'allExport' | 'namedExport';

const createRule = ESLintUtils.RuleCreator((name: string) => name);

const checkAllExport = (
  node: TSESTree.ExportAllDeclaration, 
  checker: (path: string) => boolean, 
  context: Readonly<RuleContext<MessageIds, Options>>
) => {
  const sourceValue: string = node.source.value;

  if (checker(sourceValue)) {
    context.report({
      messageId: 'allExport',
      node: node,
    });
  }
}

const checkNamedExport = (
  node: TSESTree.ExportNamedDeclaration, 
  checker: (path: string) => boolean, 
  context: Readonly<RuleContext<MessageIds, Options>>
) => {
  if (!node.source) {
    return;
  }
  const sourceValue: string = node.source.value;

  if (checker(sourceValue)) {
    context.report({
      messageId: 'namedExport',
      node: node,
    });
  }
}

export const rule: RuleModule<MessageIds, Options> = createRule<Options, MessageIds>({
  name: 'no-export',
  meta: {
    docs: {
      description: "Disallow export from barrel file",
    },
    type: 'problem',
    fixable: 'code',
    messages: {
      allExport: 'All export from barrel file',
      namedExport: 'Named export from barrel file',
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
      ExportAllDeclaration(node: TSESTree.ExportAllDeclaration) {
        checkAllExport(node, checker, context);
      },
      ExportNamedDeclaration(node: TSESTree.ExportNamedDeclaration) {
        checkNamedExport(node, checker, context);
      },
    };
  },
});

