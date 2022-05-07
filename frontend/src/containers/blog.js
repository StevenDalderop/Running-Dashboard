import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react'
import { Remarkable } from 'remarkable';

const baseUrl = window.location.protocol + "//" + window.location.host


function Article(props) {
    var md = new Remarkable();
    var date = new Date(props.data.pub_date)
    return (
        <div className="col-12 mt-5">
            <span>{date.toDateString() + " " + date.toLocaleTimeString()}</span>
            <h1>{props.data.headline}</h1>            
            <div dangerouslySetInnerHTML={{ __html: md.render(props.data.content)}}>
            </div>
        </div>
    )
}


export default function Blog() {
    const [articles, setArticles] = useState("")

    useEffect(() => {
        fetch(`${baseUrl}/api/articles/`)
            .then(res => res.json())
            .then(data => setArticles(data))
    }, [])

    function handleClick(e) {
        e.preventDefault()
        let url = e.target.name === "next" ? articles.next : articles.previous
        fetch(url)
            .then(res => res.json())
            .then(data => setArticles(data))
    }

    return (
        <div className="container">
            <div className="btn-group">
                <button className="btn btn-outline-primary" name="previous" disabled={articles && !articles.previous} onClick={(e) => handleClick(e)}> Previous </button>
                <button className="btn btn-outline-primary" name="next" disabled={articles && !articles.next} onClick={(e) => handleClick(e)}> Next </button>
            </div>
            <div className="row">
                {articles ? articles.results.map(article => <Article data={article} key={article.id} />) : "Loading"}    
            </div>
        </div>
    )
}
