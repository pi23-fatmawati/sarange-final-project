import { createContext, useState, useContext, useEffect } from "react";

const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(
      "https://artikel-edukasi-fatmawati-ab42a025c219.herokuapp.com/artikel"
    )
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error("Error fetching articles:", error));
  }, []);

  return (
    <ArticleContext.Provider value={{ articles }}>
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticle = () => useContext(ArticleContext);