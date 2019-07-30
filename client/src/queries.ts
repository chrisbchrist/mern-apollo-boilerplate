import { gql } from "apollo-boost";

export const ADD_PROJECT = gql`
  mutation addProject($project: ProjectInput!) {
    addProject(project: $project) {
      _id
      title
    }
  }
`;

export const GET_PROJECTS = gql`
  query projects($userId: String!) {
    projects(userId: $userId) {
      _id
      title
      imgUrl
      desc
      tags
    }
  }
`;

export const REMOVE_PROJECT = gql`
  mutation removeProject($id: ID!) {
    removeProject(id: $id) {
      _id
    }
  }
`;

export const GET_USER = gql`
  query getUserInfo($id: ID!) {
    getUserInfo(id: $id) {
      _id
      info
    }
  }
`;

export const UPDATE_USER_INFO = gql`
  mutation updateUserInfo($userInfo: UserInfoInput, $id: ID!) {
    updateUserInfo(userInfo: $userInfo, id: $id) {
      _
    }
  }
`;
