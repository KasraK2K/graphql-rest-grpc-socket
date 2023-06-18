import { join } from 'node:path'
import { loadFilesSync } from '@graphql-tools/load-files'

const subResolvers = loadFilesSync(join(process.cwd(), 'src/modules/**/*.resolver.ts'))

export default subResolvers
