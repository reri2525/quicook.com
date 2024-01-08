import { useState, useEffect, createContext } from 'react';
import './ScssFile/Share.scss'
import axios from'axios';
import Main from "./components/Main";
import Home from "./components/Home";
import PostShow from "./components/PostShow";
import Bookmark from './components/Bookmark'; 
import Search from './components/Search';
import Category from './components/Category'
import Profile from "./components/Profile";
import ProfileEdit from "./components/ProfileEdit";
import Following from './components/Following';
import PasswordResetForm from './components/PasswordResetForm';
import UpdateEmail from './components/UpdateEmail';
import Top from './components/Top';
import{
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { url } from "./config";
import { TypePost, TypePostShow, TypeUser, TypeMainContext } from './TypeDefinition/Type';
export const MainContext = createContext<TypeMainContext>({
  handleLogin: () => {},
  loggedInStatus: "",
  user: undefined,
  handleLogout: () => {},                    
  promptingAccountCreation: false,                         
  setPromptingAccountCreation: () => {},
  bookmarkCreate: () => {},
  bookmarkDestroy: () => {},                    
  heartCreate: () => {},
  heartDestroy: () => {},                         
  relationshipCreate: () => {},
  relationshipDestroy:  () => {},
});
function App() {
  const [loggedInStatus, setLoggedInStatus] = useState<string>("")
  const [user, setUser] = useState<TypeUser>()
  const [promptingAccountCreation, setPromptingAccountCreation] = useState(false)
  const handleLogin = () => {
    window.location.pathname = "/";
  }
  const handleLogout = () => {
    axios.delete(`${url}/logout`, { withCredentials: true })
            .then(response => {
              window.location.pathname = "/";
            }).catch(error => 
              console.log("ログアウトエラー", error)
            )
  }
  const checkLoginStatus = () => {
    axios.get(`${url}/logged_in`,{ withCredentials: true })
    .then(response => {
      if (response.data.logged_in) {
        setLoggedInStatus("ログインなう")
        console.log("ログイン")
        console.log(response.data.user)
        setUser(response.data.user)
      } else if (!response.data.logged_in) {
        setLoggedInStatus("未ログイン")
        console.log("未ログイン")
        setUser(undefined)
      }
    })

    .catch(error => {
      console.log("ログインエラー", error)
   })
  }
  // 追加
  useEffect(() => {
    checkLoginStatus()
  }, [])
  
  const bookmarkCreate = (post: TypePost | TypePostShow) =>{
   if (loggedInStatus === "ログインなう") {
    axios.post(`${url}/bookmarks`,  { post_id: post.id }, { withCredentials: true })
    .then(response => {
      if (response.data.status) {
        console.log("ブックマーク作成")
      }
    })
    .catch(error => {
      console.log("ブックマーク作成エラー", error)
    })
   } else {
    setPromptingAccountCreation(true)
   }
  }
  const bookmarkDestroy = (post: TypePost | TypePostShow) =>{
    axios.delete(`${url}/bookmarks/${post.id}`, { withCredentials: true })
    .then(response => {
      if (response.data.status) {
        console.log("ブックマーク削除")
      }
    })
    .catch(error => {
      console.log("ブックマーク削除エラー", error)
   })
  }

  const heartCreate = (post: TypePost | TypePostShow) =>{
   if (loggedInStatus === "ログインなう") {
    axios.post(`${url}/hearts`,  { post_id: post.id },  { withCredentials: true })
    .then(response => {
      if (response.data.status) {
        console.log("いいね作成")
      }
    })
    .catch(error => {
      console.log("いいね削除エラー", error)
    })
   } else {
    setPromptingAccountCreation(true)
   }
  }
  const heartDestroy = (post: TypePost | TypePostShow) =>{
    axios.delete(`${url}/hearts/${post.id}`, { withCredentials: true })
    .then(response => {
      if (response.data.status) {
        console.log("いいね削除")
      }
    })
    .catch(error => {
      console.log("いいね削除エラー", error)
   })
  }
  const relationshipCreate = (id: number) => {
   if (loggedInStatus === "ログインなう") {
    axios.post(`${url}/relationships`,  { user_id: id },  { withCredentials: true })
    .then(response => {
      if (response.data.status) {
        console.log("フォロー")
      }
    })
    .catch(error => {
      console.log("フォローエラー", error)
    })
   } else {
    setPromptingAccountCreation(true)
   }
  }
  const relationshipDestroy = (id: number) => {
    axios.delete(`${url}/relationships/${id}`, { withCredentials: true })
    .then(response => {
      if (response.data.status) {
        console.log("フォロー解除")
      }
    })
    .catch(error => {
      console.log("フォロー解除エラー", error)
   })
  }
  const contextValue = {
    loggedInStatus,
    handleLogin,
    user,
    handleLogout,                      
    promptingAccountCreation,                             
    setPromptingAccountCreation,
    bookmarkCreate,
    bookmarkDestroy,                        
    heartCreate,
    heartDestroy,                           
    relationshipCreate,
    relationshipDestroy
  };
  return (
  <MainContext.Provider value={contextValue}>
     <Router>
      <Switch>
        <Route exact path="/"
             render={({ history }) => {
             history.push('/home/page/1');
             return <Home />;
         }}
        />
          <Route exact path={"/home/page/:id"}
             render={props => (
                <Main { ...props } url={<Home />}/>
            )}
          />  
          <Route exact path={"/posts/:id"}
             render={props => (
              <Main { ...props } url={<PostShow />}/>
            )}
          />  
          <Route exact path={"/following/page/:id"}
             render={props => (
              <Main { ...props } url={<Following />}/>
            )}
          />  
          <Route exact path={"/bookmark/page/:id"}
             render={props => (
              <Main { ...props } url={<Bookmark />}/>
              
            )}
          />  
          <Route exact path={"/category/:query/page/:id"}
             render={props => (
              <Main { ...props } url={<Category />}/>
              
            )}
          />  
          <Route exact path={"/search/:query/page/:id"}
             render={props => (
              <Main { ...props } url={<Search />}/>
            )}
          />  
        <Route exact path={"/profile/:id/page/:number"}
             render={props => (
              <Main { ...props } url={<Profile />}/>
            )}
          />  
        <Route exact path={"/edit"}
             render={props => (
              <Main { ...props } url={<ProfileEdit />}/>
            )}
          />  
        <Route exact path={"/password/:id/reset"}
             render={props => (
              <PasswordResetForm />
            )}
          />  
        <Route exact path={"/update/:newEmail/email/:id"}
             render={props => (
              <UpdateEmail />
            )}
          />  
      </Switch>
    </Router>
  </MainContext.Provider>
  );
}

export default App;
