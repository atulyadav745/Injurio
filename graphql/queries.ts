import { gql } from "@apollo/client";

// Get all injury reports
export const GET_INJURY_REPORTS = gql`
  query InjuryReports {
    injuryReports {
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

// Get a specific injury report by ID
export const GET_INJURY_REPORT = gql`
  query InjuryReport($id: Int!) {
    injuryReport(id: $id) {
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

// Get all users
export const GET_USERS = gql`
  query Users {
    getAllUsers {
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

// Get a specific user by ID
export const GET_USER = gql`
  query User($id: String!) {
    user(id: $id) {
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
