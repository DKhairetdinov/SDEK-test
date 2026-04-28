import { useEffect, useState } from "react";
import { fetchNews } from "./services/api";
import type { ApiRecovery } from "./types/news";
import { NewCard } from "./components/NewsCard/NewsCard";


function App() {

  const [data, setData] = useState<ApiRecovery | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews(1, 3)
    .then((res) => {
        setData(res);
        setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
  }, []);

  if(loading) {
    return <div>Загрузка новостей...</div>;
  }

  if(!data || data.news.length === 0) {
    return <div>Новостей нету</div>
  }

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '20px'}}>
      <h1>Новости компании</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px'}}>
        {data.news.map((item) => (
          <NewCard
            key={item.id}
            item={item}
            showImage={true}
          />
        ))}
      </div>
    </main>
  );
}

export default App;

