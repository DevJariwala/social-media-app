import './App.css';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Auth from './components/Auth/Auth';
import Navbar from './components/Navbar/Navbar';
import Form from './components/Form/Form';
import AllPost from './components/AllPost/AllPost';
import SearchMemories from './components/SearchMemories/SearchMemories';
import SearchPosts from './components/SearchPosts/SearchPosts';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Navbar />
          <AllPost />
        </Route>
        <Route path="/auth" exact>
          <Navbar />
          <Auth />
        </Route>
        <Route path="/addMemory" exact >
          <Navbar />
          <Form />
        </Route>
        <Route path="/updatePost/:post_id" exact>
          <Navbar />
          <Form />
        </Route>
        <Route path="/searchMemory" exact>
          <Navbar />
          <SearchMemories />
        </Route>
        <Route path="/posts/search">
          <Navbar />
          <SearchPosts />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
