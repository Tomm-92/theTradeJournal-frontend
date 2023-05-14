import NewsItem from "./NewsItem";

const NewsGrid = ({ items }) => {
  return (
    <div className="news-grid">
      {items.map((item, i) => (
        <NewsItem key={i} item={item} />
      ))}
    </div>
  );
};

export default NewsGrid;
