import { gql } from 'apollo-boost';

export const ADD_PROJECT = gql`
    mutation addProject($project: Project) {
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