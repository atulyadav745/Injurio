export const typeDefs = `#graphql 
type InjuryReport {
    id: Int!
    userId: String!
    name: String!
    created_at: String!
    updated_at: String!
    injuries: [InjuryDetail!]!
  }

  type InjuryDetail {
    id: Int!
    reportId: Int!
    injuryDescription: String!
    x: Float!
    y: Float!
  }
  
  type User {
    id: String!
    name: String!
    reports: [InjuryReport!]!
  }
  
  type Query {
    injuryReports: [InjuryReport!]!
    getAllUsers: [User!]!
  }
  
 
  
`;
