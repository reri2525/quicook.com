import { Fragment } from 'react'
import '../ScssFile/Footer.scss'
type Props = {
  setLogModal: React.Dispatch<React.SetStateAction<boolean>>;
  setNewModal: React.Dispatch<React.SetStateAction<boolean>>
}
function Footer(props: Props) {
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
        <h3>３分で作れるお手軽料理レシピが動画付きで見れる!</h3>
        <a className='new' onClick={() => ShowNewModal()}>新規登録</a>
        <a className='login' onClick={() => ShowLogModal()}>ログイン</a>
      </footer>
    </Fragment>
  );
}

export default Footer;