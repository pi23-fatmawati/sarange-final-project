import { useParams } from "react-router-dom";
import { useArticle } from "../context/ArticleContext";
import BackNavigation from "../components/BackNavigation";

function Article() {
  const { id } = useParams();
  const { articles } = useArticle();
  const article = articles.find((article) => article.id === parseInt(id));

  if (!article) {
    return <div className="container-page">Loading...</div>;
  }

  return (
    <div className="container-page">
      <BackNavigation page="Kembali" />
      <div className="mt-5 flex flex-col gap-4 items-center">
        <div className="text-center max-w-4xl">
          <h1 className="text-2xl text-green-2 font-medium text-center">
            {article.title}
          </h1>
          <p className="text-neutral-500">Dibuat pada {new Date(article.createdAt).toLocaleDateString()}</p>
        </div>
        <img
          src={article.pic}
          alt={article.title}
          style={{ maxWidth: "700px", borderRadius: "12px"}}
        />
        <div className="text-justify" dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
    </div>
  );
}

export default Article;
