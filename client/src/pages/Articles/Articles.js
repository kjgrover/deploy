import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import AddBtn from "../../components/AddBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class articles extends Component {
  state = {
    articles: [],
    topic: "",
    startYear: "",
    endYear: "",
    results: []
  };

  componentDidMount() {
    this.loadArticles();
   // this.search("obama", "20120601", "20130601")
  }

  loadArticles = () => {
    API.getAllArticles()
      .then(res =>
        this.setState({ articles: res.data, topic: "", startYear: "", endYear: "" })
      )
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  search = (query, start, end) => {
    console.log("ITWORKS")
    API.search(query, start, end)
    .then(res => this.setState({ results: res.data.response.docs }))
    .catch(err => console.log(err));
  };


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = (snippet, web_url, web_abstract) => {
  //  event.preventDefault();
   console.log("abstract " +web_abstract)
      API.saveArticle({
        title: snippet,
        url: web_url,
        abstract: web_abstract
      })
        .then(res => this.loadArticles())
        .catch(err => console.log(err));
  };

  handleFormSubmitToo = event => {
    event.preventDefault();
    if (this.state.topic && this.state.startYear) {
    this.search(this.state.topic,this.state.startYear, this.state.endYear)
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <div >
              <h1 className = "text-center">Search</h1>
            </div>
            <form>
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="Topic (required)"
              />
              <Input
                value={this.state.startYear}
                onChange={this.handleInputChange}
                name="startYear"
                type="date"
                placeholder="Start Year (required YYYYMMDD)"
              />
              <Input
                value={this.state.endYear}
                onChange={this.handleInputChange}
                name="endYear"
                type="date"
                placeholder="End Year (required YYYYMMDD)"
              />

              <FormBtn
               disabled={!(this.state.startYear && this.state.endYear && this.state.topic)}
                onClick={this.handleFormSubmitToo}
              >
                Search
              </FormBtn>

            </form>
          </Col>
          </Row>

        <hr></hr>

              <h1 className = "text-center">Search Results</h1>
     
        {this.state.results.length ? (
              <List>
                {this.state.results.map(result=> (
                  <ListItem key={result._id}>
                      <a href = {result.web_url} target="_blank">
                        {result.headline.main}
                      </a>
                      <AddBtn onClick={() => this.handleFormSubmit(result.headline.main, result.web_url, result.snippet)}/>
                  </ListItem>
                ))}
              </List>

            ) : (
              <h3 className = "text-center">No Results to Display</h3>
            )}
          
          <Row>
          <Col size="md-12 sm-12">

          <hr></hr>

          <hr></hr>
          
              <h1 className = "text-center">Saved Articles</h1>
            
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <Link to={"/articles/" + article._id}>
                      <strong>
                        {article.title}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>

            ) : (
              <h3>No Results to Display</h3>
            )}

          </Col>
        </Row>

      </Container>
    );
  }
}

export default articles;
