import React, { Component } from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 10 ,
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }


  constructor() {
    super();
    this.state = {
      articles: [], // Initialize as an empty array
      loading: false,
      page: 1,
      totalResults: 0, // Initialize total results
    };
  }

async updateNews() {
  this.setState({ loading: true });
  const pageSize = this.props.pageSize || 5;
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a4fb16776a88410f8c8e7d5b2ece6cf4&page=${this.state.page}&pageSize=${pageSize}`;
  
  let data = await fetch(url);
  let parsedData = await data.json();
  
  // Debugging response
  console.log("Parsed Data: ", parsedData);
  console.log("Articles Length: ", parsedData.articles.length);
  
  // Set state
  this.setState({
    articles: parsedData.articles || [], // Fallback to empty array if no articles
    totalResults: parsedData.totalResults || 0, // Fallback to 0 if totalResults is missing
    loading: false,
  });
}


  async componentDidMount() {
    await this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 }, this.updateNews);
  };

  handleNextClick = async () => {
    if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
      this.setState({ page: this.state.page + 1 }, this.updateNews);
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin: "35px 0px"}}>NewsMonkey - Top Headlines</h1>
        {this.state.loading && <h3 className="text-center">Loading...</h3>}
        {!this.state.loading && (
        <div className="row">
        {this.state.articles.map((element) => (
        <div className="col-md-4" key={element.url}>
        <NewsItem
          title={element.title ? element.title : ""}description={element.description ? element.description : ""}imageUrl={element.urlToImage}
          newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
              </div>
            ))}
          </div>
        )}
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
