export const typeDefs = `#graphql 
type InjuryReport {
    id: Int!
    userId: String!
    name: String!
    datetime: String!
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
    email: String!
    reports: [InjuryReport!]!
  }
  
  type Query {
    injuryReports(userId: String!): [InjuryReport!]!
    getAllUsers: [User!]!
    getReport(id: Int!): InjuryReport
    getUser(id: String!): User
  }

  input InjuryDetailInput {
    injuryDescription: String!
    x: Float!
    y: Float!
  }
  
  type Mutation {
    createInjuryReport(userId: String!, name: String!, datetime: String!): InjuryReport
    updateInjuryReport(id: Int!, name: String, datetime: String, injuries: [InjuryDetailInput!]): InjuryReport
    deleteInjuryReport(id: Int!): InjuryReport
    createInjuryDetail(reportId: Int!, injuryDescription: String!, x: Float!, y: Float!): InjuryDetail
    createUser(id: String!, name: String!, email: String!): User
  }
  
`;
