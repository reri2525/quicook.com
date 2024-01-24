import { Fragment } from 'react'
import { useMedia } from 'use-media';
import '../ScssFile/Footer.scss'
type Props = {
  setLogModal: React.Dispatch<React.SetStateAction<boolean>>;
  setNewModal: React.Dispatch<React.SetStateAction<boolean>>
}
function Footer(props: Props) {
   const isWide = useMedia({minWidth: '1000px'})
   const ShowLogModal = () => {
    props.setLogModal(true)
   }
   const ShowNewModal = () => {
    props.setNewModal(true)
   }
  return (
    <Fragment>
      <footer>
       <div className='footer_title'>
         <h2>Quicook..</h2>
         <img className='footer_photo' src='http://illust-ryokka.jp/wp-content/uploads/2017/12/Cuisine-16.png'></img>
       </div>
        <h3>３分で作れるお手軽料理レシピ!</h3>
        { isWide && <><a className='new' onClick={() => ShowNewModal()}>新規登録</a>
        <a className='login' onClick={() => ShowLogModal()}>ログイン</a></> }
      </footer>
    </Fragment>
  );
}

export default Footer;