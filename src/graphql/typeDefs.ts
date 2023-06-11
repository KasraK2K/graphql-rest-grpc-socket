import globalTypeDefs from './global.typeDefs'
import { typeDefs as userTypeDefs } from '../modules/users/user.graphql'

const typeDefs = [globalTypeDefs, userTypeDefs]

export default typeDefs
