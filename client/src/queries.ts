import { gql } from "apollo-boost";

export const GET_PROJECTS = gql`
  query projects($userId: String!) {
    projects(userId: $userId) {
      _id
      title
      imgUrl
      desc
      tags
      user {
        _id
      }
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation addProject($project: ProjectInput!) {
    addProject(project: $project) {
      _id
      title
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation updateProject($project: ProjectInput!, $id: ID!) {
    updateProject(project: $project, id: $id) {
      _id
      user {
        _id
      }
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
  query getUser($id: ID!) {
    getUser(id: $id) {
      _id
      info {
        name
        profilePhoto
        location
        about
        email
        phone
        github
      }
    }
  }
`;

export const UPDATE_USER_INFO = gql`
  mutation updateUserInfo($userInfo: UserInfoInput!, $id: ID!) {
    updateUserInfo(userInfo: $userInfo, id: $id) {
      _id
      info {
        name
        profilePhoto
        location
        about
        email
        phone
        github
      }
    }
  }
`;
