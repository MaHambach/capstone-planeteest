import {useState} from "react";
import {Article} from "../types/Article.ts";
import axios from "axios";

export function useArticles() {
    const [articles, setArticles] = useState<Article[]>([]);

    function fetchArticles():void {
        axios.get('/api/articles')
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

    function updateArticle(updatedArticle: Article):void {
        axios.put(`/api/articles/${updatedArticle.id}`, updatedArticle)
            .then(fetchArticles)
            .catch(error => {
                if (error?.response?.status === 400) {
                    alert('Fehler: ' + error.response.data.errorMsg);
                } else {
                    alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
                }
            });
    }

    function deleteArticle(id:string):void{
        axios.delete(`/api/articles/${id}`)
            .then(fetchArticles)
            .catch(error => {
                console.log(error)
            });
    }

    return {
        articles,
        fetchArticles,
        getArticleById,
        updateArticle,
        deleteArticle
    }
}
