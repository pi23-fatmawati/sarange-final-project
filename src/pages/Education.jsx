import { Carousel } from "flowbite-react";
import ArticleCard from "../components/ArticleCard";
import HeaderPage from "../components/HeaderPage";

function Education() {
  return (
    <div className="container-page">
      <div className="flex flex-col gap-3">
        <HeaderPage title="Artikel Sarange" />
        <div className="flex flex-col gap-10">
          <div className="h-full sm:h-64 xl:h-80 2xl:h-96">
            <Carousel className="carousel-edu" slideInterval={5000}>
              <img
                src="../src/assets/carousel-article-page (2).png"
                alt="..."
              />
              <img
                src="../src/assets/carousel-article-page (3).png"
                alt="..."
              />
              <img
                src="../src/assets/carousel-article-page (1).png"
                alt="..."
              />
            </Carousel>
          </div>
          <ArticleCard />
        </div>
      </div>
    </div>
  );
}

export default Education;
