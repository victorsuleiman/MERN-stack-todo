import React, { Component } from "react";
import axios from "axios";

export default class EditTodo extends Component {
  constructor(props) {
    super(props);

    this.
    onChangeActivity = this.onChangeActivity.bind(this);
    this.
    onSubmit = this.onSubmit.bind(this);

    this.
    state = {
      activity: props.location.todo.activity,
      id: props.location.todo.id
    };
  }

  componentDidMount() {

    let id = this.state.id;

    axios.get('http://localhost:5000/todos/'+id)
      .then(response => {
        this.setState({ activity: response.data.activity })
      })
      .catch((error) => {
        console.log(error);
      })
    
  }

  onChangeActivity(e) {
    this.setState({
      activity: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const activityvar = {
      activity: this.state.activity,
    };

    console.log(activityvar);

    let id = this.state.id;

    axios.post("http://localhost:5000/todos/update/"+id, activityvar).then((res) => {
      window.location = "/";
    });
  }

  render() {
    return (
      <div>
        <h3>Edit Activity Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Task: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.activity}
              onChange={this.onChangeActivity}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Edit Task"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}