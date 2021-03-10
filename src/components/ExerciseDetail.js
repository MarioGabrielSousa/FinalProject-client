import React from "react";
import { Accordion, Card } from "react-bootstrap";
import { getExercise } from "../api";

class ExerciseDetail extends React.Component {
  state = {
    content: "",
    active: "",
  };

  getExerciseDetail = () => {
    getExercise(this.props.id).then((response) => {
      this.setState({
        content: response.data.description,
        active: true,
      });
    });
  };

  render() {
    console.log(this.props.index);
    return (
      <Card onMouseEnter={() => this.getExerciseDetail()}>
        <Accordion.Toggle as={Card.Header} eventKey={this.props.index}>
          {this.props.children}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={this.props.index}>
          <Card.Body
            dangerouslySetInnerHTML={{ __html: this.state.content }}
          ></Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  }
}

export default ExerciseDetail;
