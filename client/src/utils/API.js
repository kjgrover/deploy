import axios from "axios";

const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json"
const APIKEY = "5aaa658b92564fc8a30fce9376826838";

export default {
  // Gets all articles
  getAllArticles: function() {
    return axios.get("/api/articles");
  },
  // Gets the article with the given id
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  },
  search: function(query, start, end) {
    return axios.get(BASEURL+"?q="+query+"&begin_date="+start+"&end_date="+end+"&api-key="+APIKEY)
    // + query + APIKEY);
  }
};

// https://api.nytimes.com/svc/search/v2/articlesearch.json?q=obama&begin_date=20120101&end_date=20120101&api-key=5aaa658b92564fc8a30fce9376826838