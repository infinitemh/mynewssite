import React, { Component } from "react";
import { fetchArticles } from "../redux/ActionCreators";
import { renderFilter } from "../shared/renderOptions";
import { connect } from "react-redux";
import { countryArray, categoryArray } from "../shared/filters";

const mapDispatchToProps = {
  fetchArticles: (country, category) => fetchArticles(country, category),
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "us",
      category: "general",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value }, () =>
      this.handleSubmit(event)
    );
  }

  handleSubmit(event) {
    this.props.fetchArticles(this.state.country, this.state.category);
    event.preventDefault();
  }

  render() {
    const countryInput = renderFilter(countryArray);
    const categoryInput = renderFilter(categoryArray);

    return (
      <div className="row justify-content-center">
        <div className="container m-5">
          <div className="mb-3">
            <h1 style={{ fontWeight: "700" }}>
              Top{" "}
              <span>
                <u>{this.state.category}</u>{" "}
              </span>
              Stories from{" "}
              <span>
                <u>{this.state.country.toUpperCase()}</u>
              </span>
            </h1>
          </div>
          <div className="row justify-content-center">
            <form className="form-inline">
              <div className="form-group mx-3">
                <label htmlFor="category">Category: </label>
                <select
                  id="category"
                  name="categorylist"
                  value={this.state.category}
                  onChange={this.handleChange}
                >
                  {categoryInput}
                </select>
              </div>
              <div className="form-group mx-3">
                <label htmlFor="country">Country: </label>
                <select
                  id="country"
                  name="countrylist"
                  value={this.state.country}
                  onChange={this.handleChange}
                >
                  {countryInput}
                </select>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Header);
