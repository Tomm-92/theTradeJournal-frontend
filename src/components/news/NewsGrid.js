import NewsItem from "./NewsItem";

const NewsGrid = ({ items }) => {
  return (
    <div className="news-grid">
      {items && items.length > 0 && items.map((item, i) => (
        <NewsItem key={i} item={item} />
      ))}
    </div>
  );
};

export default NewsGrid;
