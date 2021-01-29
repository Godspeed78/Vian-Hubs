import React from 'react'
import '../ArticleCard/ArticleCard.css';

const ArticleCardLoading = (props) => {
    return (
        <div className={'article-card loading'}>
            <div className={'line'}> </div>
            <div className={'body'}>
                <h3> </h3>
                <p> </p>
                <span> </span>
            </div>
        </div>
    )
};

export default ArticleCardLoading
