import {
  useState,
  //useEffect
} from "react";
// components
import TaskDetails from './TaskDetails';
import { gql } from 'apollo-boost';
import { graphql } from "react-apollo";

const getTasksQuery = gql`
{
  tasks {
    id
    title
  }
}`

function TaskList(props) {
  const [state, setState] = useState({
    selected: null
  });
  console.log(props);

  function displayTasks() {
    console.log(props.data);
    var data = props.data;
  
    if (data.loading) {
      return (<div >Loading tasks...</div>);
    }
    else {
      return data.tasks.map(task => {
        return (<li key={
          task.id
        }
          onClick={
            (e) => {
              setState({
                selected: task.id
              });
            }
          } > {
            task.title
          } </li>);
      })
    }
  }

  return (
    <div >
      <ul id="task-list">{displayTasks()}</ul>
      <TaskDetails />
    </div>
  );
}

export default graphql(getTasksQuery)(TaskList);
