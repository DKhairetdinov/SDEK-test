import { NewsFeed } from "./components/NewsFeed/NewsFeed";


function App() {

  return (
    <div>
      <NewsFeed 
        title="Новости компании"
        variant="company"
      />
      <hr />
      <NewsFeed 
        title="Бизнес"
        variant="business"
      />
      <NewsFeed 
        title="Важные новости"
        variant="company"
        isEmpty={true}
      />
    </div>


  )

}

export default App;

