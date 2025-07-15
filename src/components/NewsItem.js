import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
      <div className="my-3">
        <div  className="card" >
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '92%',zIndex: '1' }}>  {source} 
          </span>
          <img src={!imageUrl?"https://i.insider.com/67904ed810c98eace913556c?width=1024&format=jpeg":imageUrl}  className="card-img-top" alt="..."/>
          <div  className="card-body">
            <h5  className="card-title">{title}</h5>
            <p  className="card-text">{description}</p>
            <p className="card-text"><small className="text-danger">By {!author?"Unknown": author} on {new Date (date).toGMTString()} </small></p>
            <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-dark">Read more</a>
          </div>
        </div>
      </div>
    )
  }}

export default NewsItem
