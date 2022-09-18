module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-recess-order", "stylelint-config-prettier"],
  defaultSeverity: "warning",
  plugins: ["stylelint-order"],
  overrides: [
    {
      files: ["**/*.vue"],
      customSyntax: "postcss-html"
    }
  ],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["plugin"]
      }
    ],
    "rule-empty-line-before": [
      "always",
      {
        except: ["after-single-line-comment", "first-nested"]
      }
    ],
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["deep"]
      }
    ],
    "color-function-notation": null,
    "font-family-no-missing-generic-family-keyword": null,
    "selector-class-pattern": null,
    "block-no-empty": null,
    "no-empty-source": null,
    "no-invalid-double-slash-comments": null,
    "selector-type-no-unknown": [
      true,
      {
        ignoreTypes: ["page", "/^uni/", "navigator"]
      }
    ]
  }
}
