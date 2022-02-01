import { gql } from 'apollo-boost';

const getTasksQuery = gql`
{
  tasks {
    id
    title
  }
}`

const getProjectsQuery = gql`
{
  projects {
    id
    title
  }
}`

module.exports = { getProjectsQuery, getTasksQuery };
