import { useEffect } from "react";
import { fetchNews } from "./services/api";


function App() {
  useEffect(() => {
    const loadData = async() => {
      try {
        const data = await fetchNews(1, 3);
        console.log('Данные из API получены:\n', data);
      } catch(error) {
        console.error('Ошибка получения данных из API:\n', error);
      }
    };

    loadData();
  
  }, []);

  return (
    <div style={{padding: '20px', fontFamily: "-apple-system"}}>
      <h2>Тест API</h2>
    </div>
  );
}

export default App;

