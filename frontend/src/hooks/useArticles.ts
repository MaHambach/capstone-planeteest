import {useState} from "react";
import {Article} from "../types/Article.ts";
import axios from "axios";

export function useArticles() {
    const [articles, setArticles] = useState<Article[]>([]);

    function fetchArticles():void {
        axios.get('/api/map-markers')
            .then(response => {
                setArticles(response.data);
            })
            .catch(error => {
                console.error('Es gab ein Problem beim Abrufen der Artikel:', error.message);
            });
    }

    function getArticleById(id:string):Article {
        const articleWithId:Article[] = articles.filter((article:Article) => article.id === id);

        if(articleWithId.length === 0) console.error('Kein Artikel mit der ID ' + id + ' gefunden.');
        else return articleWithId[0];
        return {id:'', content: '', npcIds:[]};
    }

    return {
        articles,
        fetchArticles,
        getArticleById
    }
}