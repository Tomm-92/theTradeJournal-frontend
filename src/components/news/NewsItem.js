const NewsItem = ({ item }) => {
  const websiteUrl = item.url;
  const website = websiteUrl.split("https://").pop().split("/")[0];
  const date = item.publishedAt;
  const formatDate = date.replace("T", "");
  const formatTime = formatDate.replace("Z", "");
  console.log(item.url);
  console.log(item);

  return (
    <a href={item.url} className="article">
      <div className="article-content">
        <div className="aricle-source">
          <img
            src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${website}&size=50`}
            alt={item.source.id}
          />
          <span>{item.source.name}</span>
        </div>
        <div className="aricle-title">
          <h3>{item.title}</h3>
        </div>
        <p className="article-description">{item.description}</p>
        <div className="article-details">
          <small>
            <b>Published At: </b> {formatTime}
          </small>
        </div>
      </div>
    </a>
  );
};

export default NewsItem;
