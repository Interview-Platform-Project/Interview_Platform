/** @type {import("stylelint").Config} */
const stylelintConfig = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-pretty-order'],
  rules: {
    'selector-class-pattern': null,
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
      },
    ],
    'no-descending-specificity': null,
    'order/order': ['declarations', 'at-rules'],
    'block-no-empty': true,
    'no-duplicate-selectors': true,
    'color-named': 'never',
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['first-nested', 'blockless-after-same-name-blockless'],
        ignore: ['after-comment'],
      },
    ],
    'scss/no-global-function-names': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local'],
      },
    ],
  },
};

export default stylelintConfig;
