const typeDefs = /* GraphQL */ `
  """
  Gender Enum
  """
  enum Gender {
    MALE
    FEMALE
    OTHER
  }

  """
  [MailGun Response](https://www.npmjs.com/package/mailgun.js)
  """
  type MailGunResponse {
    id: String
    message: String
    status: Int
    details: String
  }
`

export default typeDefs
