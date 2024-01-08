import { Fragment, useState, useContext} from 'react';
import { MainContext } from '../App';
import '../ScssFile/Main.scss'
import Header from './Header';
import PostForm from './Postform';
import List from './List';
import Footer from './Footer';
import Logmodal from './Login';
import Newmodal from './New';
import PromptingAccountCreation from './PromptingAccountCreation';
type MainProps = {
  url: JSX.Element
}
const Main = (props: MainProps) => {
  const context = useContext(MainContext)
  const promptingAccountCreation = context.promptingAccountCreation
  const loggedInStatus = context.loggedInStatus
  const [postModal, setPostModal] = useState(false); 
  const [logModal, setLogModal] = useState(false);
  const [newModal, setNewModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [flashMessage, setFlashMessage] = useState("")

    return (
      <Fragment>
      <body>
       { flashMessage && 
         <div>
           <h2 className='flash_message'>{flashMessage}</h2> 
         </div>
       }
       <Header setPostModal={setPostModal} setLogModal={setLogModal} setNewModal={setNewModal} setModal={setModal} />
        <List />
        <div className='center'>
         <div className='center_inner'>
          <div className='center_container'>
            {props.url}
          </div>
         </div>
        </div>
         { postModal ? <PostForm setPostModal={setPostModal} /> : <></> }
         { logModal ? <Logmodal logModal={logModal} setFlashMessage={setFlashMessage} setLogModal={setLogModal} setModal={setModal} /> : <></> }
         { newModal ? <Newmodal newModal={newModal} setFlashMessage={setFlashMessage} setNewModal={setNewModal} setModal={setModal} /> : <></> }
         { promptingAccountCreation ? <PromptingAccountCreation setLogModal={setLogModal} setNewModal={setNewModal} /> : <></> } 
         { loggedInStatus === "未ログイン" ? <Footer setLogModal={setLogModal} setNewModal={setNewModal}/> : <></> }
     </body>
    </Fragment>
    )
}
export default Main;
