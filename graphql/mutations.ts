const gql  = require('@apollo/client');

// Mutation to add a new injury report
export const ADD_INJURY_REPORT = gql`
  mutation AddInjuryReport($input: InjuryReportInput!) {
    createInjuryReport(input: $input) {
      id
      userId
      name
      created_at
      updated_at
      injuries {
        id
        reportId
        injuryDescription
        x
        y
      }
    }
  }
`;

// Mutation to update an existing injury report
export const UPDATE_INJURY_REPORT = gql`
  mutation UpdateInjuryReport($id: Int!, $input: InjuryReportInput!) {
    updateInjuryReport(id: $id, input: $input) {
      id
      userId
      name
      created_at
      updated_at
      injuries {
        id
        reportId
        injuryDescription
        x
        y
      }
    }
  }
`;

// Mutation to delete an existing injury report
export const DELETE_INJURY_REPORT = gql`
  mutation DeleteInjuryReport($id: Int!) {
    deleteInjuryReport(id: $id) {
      id
      userId
      name
      created_at
      updated_at
      injuries {
        id
        reportId
        injuryDescription
        x
        y
      }
    }
  }
`;

// Mutation to add a new user
export const ADD_USER = gql`
  mutation AddUser($input: UserInput!) {
    registerUser(input: $input) {
      id
      name
      reports {
        id
        userId
        name
        created_at
        updated_at
        injuries {
          id
          reportId
          injuryDescription
          x
          y
        }
      }
    }
  }
`;

// Mutation to delete a user
export const DELETE_USER = gql`
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id) {
      id
      name
      reports {
        id
        userId
        name
        created_at
        updated_at
        injuries {
          id
          reportId
          injuryDescription
          x
          y
        }
      }
    }
  }
`;
