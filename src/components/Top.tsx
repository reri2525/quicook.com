import { Fragment, useState, useContext } from 'react';
import Header from './Header';
import '../ScssFile/Top.scss'
import Footer from './Footer';
import Logmodal from './Login';
import Newmodal from './New';
import { MainContext } from '../App';
function Top(props: any) {
  const context = useContext(MainContext)
  const [logmodal, setLogmodal] = useState(false);
  const [newmodal, setNewmodal] = useState(false);
  const [modal, setModal] = useState(false);
  const [postmodal, setPostmodal] = useState(false); 
  const [scroll, setScroll] = useState(false); 


  if (context.loggedInStatus === '未ログイン') {
 return (
  <Fragment>
  <body>
    <div className='top'>
     <div className='container'>
      <h1>Quicook..</h1>
      <h3>３分で作れるお手軽料理</h3>
      <img className='top_photo' src='http://illust-ryokka.jp/wp-content/uploads/2017/12/Cuisine-16.png'></img>
     </div>
    </div>
  </body>
 </Fragment>
  );
 } else if (context.loggedInStatus === 'ログインなう') {

 }
}
 export default Top;