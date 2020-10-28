import React, { Component } from "react";
import { fetchArticles } from "../redux/ActionCreators";
import { connect } from "react-redux";
import { Loading } from "./LoadingComponent";
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardSubtitle,
  CardBody,
  CardColumns,
} from "reactstrap";

const mapStateToProps = (state) => {
  return {
    articles: state.articles,
  };
};

const mapDispatchToProps = {
  fetchArticles: (country, category) => fetchArticles(country, category),
};

function RenderNewsArticle({ article }) {
  var articleImage;
  var articleText;
  const pubDate = new Date(article.publishedAt).toLocaleString();

  //   Render a CardImg component if a urlToImage value exists
  if (article.urlToImage) {
    articleImage = (
      <CardImg
        className="article-img img-thumbnail rounded mx-auto"
        src={article.urlToImage}
        alt={article.urlToImage}
        // falls back to a stock error image if there's an error retrieving the image.
        onError={(e) => {
          e.target.onerror = null;
          // e.target.src = "http:///i.imgur.com/hfM1J8s.png";
          e.target.src = "assets/images/dylan-nolte-SH_IjrKwG8c-unsplash.jpg";
        }}
      />
    );
  } else {
    articleImage = <React.Fragment />;
  }

  //   Render description if it exists
  if (article.description) {
    articleText = (
      <CardBody>
        <CardText className="text-left">{article.description}</CardText>
      </CardBody>
    );
  } else {
    articleText = <React.Fragment />;
  }

  return (
    <Card className="pl-4 pr-4 pb-4 mb-4">
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="black-text"
      >
        {articleImage}
        <CardTitle
          className="text-left pb-0 mb-0"
          style={{
            fontWeight: "500",
            fontSize: "1.2em",
          }}
        >
          {article.title}
        </CardTitle>
        <CardSubtitle
          className="text-left text-muted pt-2"
          style={{ fontSize: "0.8em" }}
        >
          {pubDate}
        </CardSubtitle>
        {articleText}
      </a>
    </Card>
  );
}

class Main extends Component {
  componentDidMount() {
    this.props.fetchArticles();
  }

  render() {
    const listOfArticles = this.props.articles.articles.map((article) => (
      <RenderNewsArticle article={article} key={article.url} />
    ));
    // Loading component while the new articles are being fetched
    if (this.props.articles.isLoading) {
      return (
        <div className="row">
          <div className="col-1"></div>
          <div className="col">
            <Loading />
          </div>
          <div className="col-1"></div>
        </div>
      );
    }
    if (this.props.articles.errMess) {
      return (
        <div className="row">
          <div className="col-1"></div>
          <div className="col">{this.props.articles.errMess}</div>
          <div className="col-1"></div>
        </div>
      );
    }
    return (
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <CardColumns>{listOfArticles}</CardColumns>
        </div>
        <div className="col-2"></div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
