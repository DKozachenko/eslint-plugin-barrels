import { RuleModule } from '@typescript-eslint/utils/ts-eslint';
import { Options } from './models';
import * as allRules from './rules';
import * as allConfigs from './configs';

const rules: { [key: string]: RuleModule<string, Options> } = {
  'no-import': allRules.noImportRule,
  'no-export': allRules.noExportRule,
};

const configs: { [key: string]: object } = {
  'all': allConfigs.allConfig,
  'recommended': allConfigs.recommendedConfig,
};


export {
  rules,
  configs
}