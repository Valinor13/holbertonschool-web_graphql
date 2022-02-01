import ApolloClient from 'apollo-boost';

// components
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import AddProject from './components/AddProject';
// apollo client setup
import ApolloProvider from 'react-apollo';
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    <div id="main" >
      <div id="bg" ></div>
      <h1 >Holberton school tasks</h1>
      <TaskList />
      <AddProject />
      <AddTask />
    </div>
  );
}

export default App;
