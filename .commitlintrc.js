// feat：新增功能
// fix：bug修复
// docs：文档更新
// style： 格式(不影响代码运行的变动,空格,格式化,等等)
// refactor：重构(即不是新增功能，也不是修改bug的代码变动)
// perf: 性能优化 (提高代码性能的改变)
// test：增加测试或者修改测试
// build: 影响构建系统或外部依赖项的更改(maven,gradle,npm 等等)
// ci: 对CI配置文件和脚本的更改
// chore：对非 src 和 test 目录的修改(日常事务)

module.exports = {
    ignores: [commit => commit.includes("init")],
    extends: ["@commitlint/config-conventional"],
    rules: {
        "body-leading-blank": [2, "always"],
        "footer-leading-blank": [1, "always"],
        "header-max-length": [2, "always", 108],
        "subject-empty": [2, "never"],
        "type-empty": [2, "never"],
        "type-enum": [
            2,
            "always",
            [
                "feat",
                "fix",
                "perf",
                "style",
                "docs",
                "test",
                "refactor",
                "build",
                "ci",
                "chore",
                "revert",
                "wip",
                "workflow",
                "types",
                "release"
            ]
        ]
    }
};
