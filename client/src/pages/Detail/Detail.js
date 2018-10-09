import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";

class Detail extends Component {
  state = {
    article: {}
  };
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentWillMount() {
    console.log("hello")
    API.getArticle(this.props.match.params.id)
      .then(res => this.setState({ article: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    {console.log(this.state.article)}
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
            <h1>Article Snippet</h1>
            <br></br>
            <a href = {this.state.article.url} target="_blank">
              <h2>
                {this.state.article.abstract} 
              </h2>
            </a>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
          <div class="fixed-bottom">
            <Link to="/">← Back to NYT Search</Link>
          </div>
          <br></br>

          </Col>

        </Row>
      </Container>
    );
  }
}

export default Detail;
