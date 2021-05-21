import React from "react";

class Settings extends React.Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const { setCurrentUser, history } = this.props;
  };

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <form>
          <label>Username</label>
          <input type="text" onChange={this.handleChange} value={username} />

          <label>Password</label>
          <input type="text" onChange={this.handleChange} value={password} />
        </form>
      </div>
    );
  }
}

export default Settings;
/* 

class Settings extends React.Component {
  state = {
    _id: "",
    title: "",
    description: "",
  };
  async componentDidMount() {
    const projectId = this.props.match.params.id;
    const response = await getProject(projectId);
    this.setState({
      _id: response.data._id,
      title: response.data.title,
      description: response.data.description,
    });
  }
  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  handleFormSubmit = async (event) => {
    event.preventDefault();
    await updateProject(this.state);
    this.props.history.push(`/projects`);
  };
  render() {
    const { title, description } = this.state;
    return (
      <form onSubmit={this.handleFormSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={this.handleChange}
        />
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={this.handleChange}
        />
        <button type="submit">Update</button>
      </form>
    );
  }
}
export default EditProject;




<body>
  <>
        <form class="settings-div-form" action="/settings" method="POST" enctype="multipart/form-data">
                <h2>{{user.username}}</h2>
                <img className="myarea-image" src="{{user.imageUrl}}" alt="" />

              <input className="settings-form-image-button" type="file" name="image" />
            </div>


            <div>
              <div class="settings-form-account">

                <label>Created At</label>
                {{user.createdAt}}

                <label>Username</label>
                <input class="settings-form-input" type="text" name="username" value="{{user.username}}"
                  autocomplete="off">

                <label>City</label>
                <input class="settings-form-input" type="text" name="city" value="{{user.city}}" autocomplete="off">

                <button class="settings-form-button" type="submit">Edit</button>
              </div>
        </form>

      </div>

    </div>
  </section>
</body> */
