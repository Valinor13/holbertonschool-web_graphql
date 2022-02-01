const Project = require('../models/project');
const Task = require('../models/task');
const _ = require('lodash');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    Task: {
      type: TaskType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: (parent, args) => Task.findById(args.id)
    },
    Project: {
      type: ProjectType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: (parent, args) => Project.findById(args.id)
    },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve: () => Task.find({})
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve: () => Project.find({})
    }
  })
})

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    weight: {
      type: GraphQLInt
    },
    description: {
      type: GraphQLString
    },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve: (parent, args) => Task.find({ projectId: parent.id })
    }
  })
})

const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    project: {
      type: TaskType,
      resovle: (parent, args) => Project.findById(parent.projectId)
    },
    title: {
      type: GraphQLString
    },
    weight: {
      type: GraphQLInt
    },
    description: {
      type: GraphQLString
    }
  })
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addProject: {
      type: ProjectType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parent, args) => {
        let project = new Project({
          title: args.title,
          weight: args.weight,
          description: args.description
        });
        try {
          return await project.save();
        } catch (err) {
          console.log(err);
        }
      }
    },
    addTask: {
      type: TaskType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parent, args) => {
        let task = new Task({
          title: args.title,
          weight: args.weight,
          description: args.description
        });
        try {
          return await task.save();
        } catch (err) {
          console.log(err);
        }
      }
    }
  })
})

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

// const projects = [
//   {id: '1', title: 'Advanced HTML', weight: 1, description: 'Welcome to the Web Stack specialization. The 3 first projects will give you all basics of the Web development: HTML, CSS and Developer tools. In this project, you will learn how to use HTML tags to structure a web page. No CSS, no styling - don’t worry, the final page will be “ugly” it’s normal, it’s not the purpose of this project. Important note: details are important! lowercase vs uppercase / wrong letter… be careful!'},
//   {id: '2', title: 'Bootstrap', weight: 1, description: 'Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS and JavaScript design templates for typography, forms, buttons, navigation, and other interface components.'}
// ]

// const tasks = [
//   {
//     id: '1',
//     projectId: '1',
//     title: 'Create your first webpage',
//     weight: 1,
//     description: 'Create your first HTML file 0 - index.html with: -Add the ' +
//       'doctype on the first line(without any comment) - After the doctype, open ' +
//       'and close a html tag Open your file in your browser (the page should be blank)'
//   },
//   {
//     id: '2',
//     projectId: '1',
//     title: 'Create your first webpage',
//     weight: 1,
//     description: 'Copy the content of 0-index.html into 1-index.html ' +
//       'Create the head and body sections inside the html tag, ' +
//       'create the head and body tags (empty) in this order'
//   }
// ]

// const RootQuery = new GraphQLObjectType({
//   name: 'RootQueryType',
//   fields: () => ({
//     Task: {
//       type: TaskType,
//       args: {
//         id: { type: GraphQLID }
//       },
//       resolve: (parent, args) => _.find(tasks, { id: args.id })
//     },
//     Project: {
//       type: ProjectType,
//       args: {
//         id: { type: GraphQLID }
//       },
//       resolve: (parent, args) => _.find(projects, { id: args.id })
//     },
//     tasks: {
//       type: new GraphQLList(TaskType),
//       resolve: () => tasks
//     },
//     projects: {
//       type: new GraphQLList(ProjectType),
//       resolve: () => projects
//     }
//   })
// })

// const ProjectType = new GraphQLObjectType({
//   name: 'Project',
//   fields: () => ({
//     id: {
//       type: GraphQLID
//     },
//     title: {
//       type: GraphQLString
//     },
//     weight: {
//       type: GraphQLInt
//     },
//     description: {
//       type: GraphQLString
//     },
//     tasks: {
//       type: new GraphQLList(TaskType),
//       resolve: (parent, args) => _.filter(tasks, { projectId: parent.id })
//     }
//   })
// })

// const TaskType = new GraphQLObjectType({
//   name: 'Task',
//   fields: () => ({
//     id: {
//       type: GraphQLID
//     },
//     project: {
//       type: TaskType,
//       resovle: (parent, args) => _.find(projects, { id: parent.projectId })
//     },
//     title: {
//       type: GraphQLString
//     },
//     weight: {
//       type: GraphQLInt
//     },
//     description: {
//       type: GraphQLString
//     }
//   })
// })

module.exports = schema;
