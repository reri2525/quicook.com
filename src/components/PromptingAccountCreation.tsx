import { Fragment, useEffect, useContext} from 'react'
import '../ScssFile/PromptingAccountCreation.scss'
import CloseIcon from '@mui/icons-material/Close';
import { MainContext } from '../App';
type Props = {
  setLogModal: React.Dispatch<React.SetStateAction<boolean>>,
  setNewModal: React.Dispatch<React.SetStateAction<boolean>>
}
function PromptingAccountCreation(props: Props) {
  const context = useContext(MainContext)
  const setPromptingAccountCreation = context.setPromptingAccountCreation
  const setLogModal = props.setLogModal
  const setNewModal = props.setNewModal
  const openLogModal = () => {
    setLogModal(true)
    setPromptingAccountCreation(false)
  }
  const openNewModal = () => {
    setNewModal(true)
    setPromptingAccountCreation(false)
  }
  useEffect(() => {
     document.body.style.overflow = 'hidden';
     setPromptingAccountCreation(true)
     return () => {
         document.body.style.overflow = 'auto';
         setPromptingAccountCreation(false)
     };
  },[])
  return (
    <Fragment>
      <div className='back_display2'></div>
      <div className='prompting_login'>
        <div className='container'>
            <h2>この操作を行うにはログインする必要があります。アカウントを持ってない場合は新規登録をしてください。</h2>
            <button className='login' onClick={() => openLogModal()}>ログイン</button>
            <button className='new' onClick={() => openNewModal()}>新規登録</button>
            <div className='close' onClick={() => setPromptingAccountCreation(false)}><a><CloseIcon /></a></div>
        </div>
      </div>
    </Fragment>
  )
}

export default PromptingAccountCreation