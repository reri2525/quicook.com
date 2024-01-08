import { Fragment, useState, useEffect, useContext } from 'react';
import { MainContext } from '../App';
import '../ScssFile/Login.scss'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router-dom';
import { url } from "../config";
type LoginProps = {
  logModal: boolean,
  setFlashMessage: React.Dispatch<React.SetStateAction<string>>,
  setLogModal: React.Dispatch<React.SetStateAction<boolean>>,
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}
function Logmodal(props: LoginProps) {
  const context = useContext(MainContext)
  const loggedInStatus = context.loggedInStatus
  const handleLogin = context.handleLogin
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors_m, setErrors_m] = useState("")
  const [errors_m_sent, setErrors_m_sent] = useState("")
  const [passwordResetForm, setPasswordResetForm] = useState(false)
  const [sentEmail, setSentEmail] = useState("")
  const history = useHistory();

  const CloseModal = () => {
    props.setLogModal(false)
    props.setModal(false)
    setErrors_m("")
  }

  const onSubmit = (event: any) => {
    const formData = new FormData();
    formData.append('user[email]', email);
    formData.append('user[password]', password);
    axios.post(`${url}/login`,formData,
        { withCredentials: true }
    ).then(response => {
        if (response.data.logged_in) {
            handleLogin()
            history.push("/home/page/1")
        } else if (response.data.status === 401) {
            setErrors_m(response.data.errors)
            console.log("registration errorrrrr")
        }
    }).catch(error => {
        console.log("registration error", error)
        event.preventDefault()
    })
  }

  const handleSentEmail = () => {
    axios.post(`${url}/password_resets`, {sent_email: sentEmail}
    ).then(response => {
      if (response.data.status === "true" ) {
        CloseModal()
        props.setFlashMessage("メールが送信されました。")
        setTimeout(() => {
          props.setFlashMessage("");
        }, 5000);
      } else {
        setErrors_m_sent(response.data.errors)
      }
    }).catch(error => {
      setErrors_m_sent("aaaa")
    })
   }

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  },[])

  const PasswordReset = () => {
    setPasswordResetForm(true)
  }

if (loggedInStatus === "未ログイン") {
return ( 
  <>{props.logModal ? (
    <Fragment>
        <div className="back_display2">
          
        </div>
        <div className="form_modal_login">   
        { passwordResetForm ?
          <form className="form_sent_email">
             <h1>パスワード再設定</h1>
             <ArrowBackIcon style={{float: 'right'}} onClick={ () => setPasswordResetForm(false)}/><br></br>
             <label>送信用のメールアドレス</label><br></br>
             <input className='input_sent_email'
                name="sent_email"
                type="email"
                value={sentEmail}
                onChange={event => setSentEmail(event.target.value)}
                onKeyDown={e => e.key === 'Enter' && e.preventDefault()}
             /><br></br>
             <label>パスワードを再設定するためのメールを送ります。</label><br></br>
             <button className='btn' type="button" onClick={ () => handleSentEmail()}>メールを送信</button><br/>
             <span>{errors_m_sent}</span>
             <div className='close' onClick={() => CloseModal()}><a><CloseIcon /></a></div>
          </form>
           : 
          <form className="form_login">
             <h1>ログイン</h1>
                <label>メールアドレス</label><br></br>
                <input className='input'
                    type="email"
                    name="email"
                   
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                /><br></br>
                <label>パスワード</label><br></br>
                <input className='input'
                    type="password"
                    name="password"
                    
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                /><br></br>
                <button className='btn' type="button" onClick={ event => onSubmit(event)}>ログイン</button><br/>
                <a className='password_reset' onClick={() => PasswordReset()}>パスワードを忘れてしまった</a><br/>
                <span>{errors_m}</span>
               <div className='close' onClick={() => CloseModal()}><a><CloseIcon /></a></div>
          </form>
        }
        </div>  
        
    </Fragment>
) : (
    <></>
)}
</>
)
} else {
  return (
    <></>
  )
}
}



export default Logmodal;