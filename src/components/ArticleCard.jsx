import { useState } from "react";
import { Card, Pagination } from "flowbite-react";
import ButtonGreen from "./Button-green";
import { Link } from "react-router-dom";
import { useArticle } from "../context/ArticleContext";
import "./component.css";

function ArticleCard() {
  const { articles } = useArticle();
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;


  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-8">
        {currentArticles.map((article, index) => (
          <Card
            key={index}
            className="article-card md:max-w-full"
            imgSrc={article.pic}
            horizontal
          >
            <h5 className="text-2xl font-bold tracking-tight text-green-2">
              {article.title}
            </h5>
            <p className="text-sm text-neutral-500">
              Dibuat pada {new Date(article.createdAt).toLocaleDateString()}
            </p>
            <p className="font-normal">
              {article.short_content}
            </p>
            <Link to={`/education/${article.id}`}>
              <ButtonGreen text="Baca Selengkapnya" width="w-max" />
            </Link>
          </Card>
        ))}
      </div>
      <div className="mt-10 flex flex-col items-center">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(articles.length / articlesPerPage)}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default ArticleCard;