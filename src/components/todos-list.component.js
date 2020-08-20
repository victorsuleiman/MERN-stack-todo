import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Todo = props => (
  <tr className="d-flex">
    <td id = {props.todo._id} className='col-10'>{props.todo.activity}</td>
    <td className='col-2' style={{textAlign:"right"}}>
    <button onClick={() => { props.strike(props.todo._id) }} >Strikethrough</button>
    <Link to={{pathname: "/edit/" + props.todo._id, todo:{id:props.todo._id,activity:props.todo.activity}
              }}> <button>Edit</button></Link>
      <button onClick={() => { props.deleteTodo(props.todo._id) }} >delete</button>
    </td>
  </tr>
)


export default class TodosList extends Component {
  // constructor(props) {
  //   super(props);

    strike = this.strike.bind(this)
    // this.
    deleteTodo = this.deleteTodo.bind(this)

    // this.
    state = {todos: []};
  // }

  componentDidMount() {
    // // this is for testing
    // this.setState({
    //   todos: [{activity:'t1'},{activity:'t2'},{activity:'t3'}]
    // })
    axios.get('http://localhost:5000/todos/')
      .then(response => {
        this.setState({ todos: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  strike(id){
    let strikeTodo = document.getElementById(id).textContent.strike();
    document.getElementById(id).innerHTML = strikeTodo;
  }

  deleteTodo(id) {
    axios.delete('http://localhost:5000/todos/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      todos: this.state.todos.filter(el => el._id !== id)
    })
  }

  todoList() {
    return this.state.todos.map(currenttodo => {
      return <Todo todo={currenttodo} 
      deleteTodo={this.deleteTodo} key={currenttodo._id}
      editTodo = {this.editTodo} 
      strike = {this.strike}

      />;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Todos</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Activity</th>
            </tr>
          </thead>
          <tbody>
            { this.todoList() }
          </tbody>
          {/* just to put the last line under */} <tbody><a> </a></tbody>
        </table>
      </div>
    )
  }
}