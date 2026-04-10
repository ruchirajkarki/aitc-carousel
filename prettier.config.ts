// prettier.config.ts, .prettierrc.ts, prettier.config.mts, or .prettierrc.mts
import type { Config } from 'prettier'

const config: Config = {
    plugins: ['@trivago/prettier-plugin-sort-imports'],
    trailingComma: 'none',
    singleQuote: true,
    printWidth: 80,
    tabWidth: 4,
    semi: false,
    importOrder: ['^@core/(.*)$', '^@server/(.*)$', '^@ui/(.*)$', '^[./]'],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true
}

export default config
