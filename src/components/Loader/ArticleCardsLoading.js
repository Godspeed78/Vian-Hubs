import React from 'react'
import ArticleCardLoading from "./ArticleCardLoading";

const ArticleCardsLoading = (props) => {
    return (
        <div className={'grid'}>
            <div className={'col-1'}><ArticleCardLoading/></div>
            <div className={'col-1'}><ArticleCardLoading/></div>
        </div>
    )
};

export default ArticleCardsLoading
