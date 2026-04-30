import { NewsFeed } from "./components/NewsFeed/NewsFeed";


function App() {

return (
    <div style={{ 
      backgroundColor: '#F8F9FB',
      minHeight: '100vh', 
      padding: '40px 20px' 
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        display: 'flex', 
        flexDirection: 'column', 
        gap: '24px' 
      }}>
        <NewsFeed title="Новости компании" variant="company" />
        <NewsFeed title="Бизнес" variant="business" />
        <NewsFeed title="Важные новости" variant="company" isEmpty={true} />
      </div>

    </div>
  );
}

export default App;

