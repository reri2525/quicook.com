import { Fragment, useState, useEffect } from 'react';
import '../ScssFile/PostForm.scss'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { CategoryData } from './ListData';
import { DishData } from './ListData';
import CloseIcon from '@mui/icons-material/Close';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import { url } from "../config";
import { TypeDishExpand, TypeFileDetails } from '../TypeDefinition/Type';
type Props = {
  setPostModal: React.Dispatch<React.SetStateAction<boolean>>
}
function PostForm(props: Props) {   
  const history = useHistory();
  const [posted, setPosted] = useState(false)
  const [title, setTitle] = useState("")
  const titlelength = 30 - title.length
  const [category, setCategory] = useState("なし")
  const [categoryModal, setCategoryModal] = useState(false)
  const [dishExpand, setDishExpand] = useState<TypeDishExpand>({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
  });
  const [imageOrVideo, setImageOrVideo] = useState<TypeFileDetails>()
  const [imageOrVideoPreview, setImageOrVideoPreview] = useState<string | ArrayBuffer | null>(null)
  const [thumbnail, setThumbnail] = useState<TypeFileDetails>()
  const [thumbnailPreview, setThumbnailPreview] = useState<string | ArrayBuffer | null>(null)
  const [time, setTime] = useState("")
  const [cost, setCost] = useState("")
  const [content, setContent] = useState("")
  const [numberOfPeople, setNumberOfPeople] = useState("")
  const [materialCount, setMaterialCount] = useState(1)
  const [materialFields, setMaterialFields] = useState<{material: string, amount: string}[]>([
    { material: "", amount: "" }
  ]);
  const [materialError, setMaterialError] = useState('')
  const [process, setProcess] = useState("")
  const [coment, setComent] = useState("")
  const imageOrVideoFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.files && setImageOrVideo(event.target.files[0])
    const reader = new FileReader()
         reader.onload = (event: ProgressEvent<FileReader>) => {
             event.target && setImageOrVideoPreview(event.target.result)
         };
         event.target.files && reader.readAsDataURL(event.target.files[0])
  }
  const thumbnailFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.files && setThumbnail(event.target.files[0])
    const reader = new FileReader()
         reader.onload = (event: ProgressEvent<FileReader>) => {
             event.target && setThumbnailPreview(event.target.result)
             event.target && console.log(event.target.result)
         };
         event.target.files && reader.readAsDataURL(event.target.files[0])
  }
  const materialChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newFields = [...materialFields];
    newFields[index].material = e.target.value;
    setMaterialFields(newFields);
  };
  const amountChange = (e:  React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newFields = [...materialFields];
    newFields[index].amount = e.target.value;
    setMaterialFields(newFields);
  };
  const materialRemove = () => {
   if (materialCount > 1) {
   const newMaterialFields = [...materialFields];
   newMaterialFields.pop();
   setMaterialFields(newMaterialFields);
   setMaterialCount(materialCount - 1)
   setMaterialError("");
   }
  };
  const MaterialAdd = () => {
    if (materialCount < 15){
     setMaterialCount(materialCount + 1)
     setMaterialFields([...materialFields, { material: "", amount: "" }]);
     console.log(materialFields)
    } else {
     setMaterialError('※これ以上追加できません')
    }
  }
  const CloseModal = () => {
    props.setPostModal(false)
    setTitle("")
    setCategory("なし")
    setImageOrVideo(undefined)
    setImageOrVideoPreview(null)
    setThumbnailPreview(null)
    setContent("")
    setCost("")
    setTime("")
    setComent("")
    setProcess("")
    setMaterialFields([
      { material: "", amount: "" }
    ])
    setMaterialCount(1)
    setMaterialError("")
  }
  const postRequired = () => {
    if (posted) {
      return false;
    } 
    return title&&imageOrVideo&&imageOrVideoPreview&&content&&time&&cost&&process&&coment&&materialFields[0].material&&materialFields[0].amount;
  }
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPosted(true)
    const formData = new FormData();
    formData.append('post[title]', title);
    formData.append('post[category]', category);
    imageOrVideo && formData.append('post[image]', imageOrVideo);
    thumbnail && formData.append('post[thumbnail]', thumbnail);
    formData.append('post[content]', content);
    formData.append('post[time]', time);
    formData.append('post[cost]', cost);
    formData.append('post[process]', process);
    formData.append('post[coment]', coment);
    formData.append('post[number_of_people]', numberOfPeople);
    for (let i = 0; i < materialFields.length; i++) {
      formData.append(`post[material_${i + 1}]`, materialFields[i].material);
      formData.append(`post[amount_${i + 1}]`, materialFields[i].amount);
    }
    axios.post(`${url}/posts`, formData
                                              ,{ withCredentials: true })
      .then(response => {
        if (response.data.status) {
          CloseModal()
          history.push("/")
        } else if (response.data.status === 'not_created') {
          console.log("失敗")
        }
      })
      .catch((error) => {
        event.preventDefault()
        console.log("未送信")
      });
  };
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  },[])
  return (
   <Fragment>
    <div className='back_display'>

    </div>
           <div className='postform_modal'>
            <div className='postform_modal_inner'>
             <div className='postform_modal_content'>
             <h1>レシピ投稿:</h1>
             <form className="form_post" onSubmit={event => onSubmit(event)}>
             <div className='image_container'>
             {thumbnail ? (
                <></>
             ) : (
             <div className='thumbnail_border'>
               <label className='thumbnail_file'>
                 <CameraAltIcon style={{ fontSize: '67px' }} />
                   <input
                     className='thumbnail'
                     type="file"
                     accept='image/*'
                     capture="environment"
                     name="thumbnail"
                     onChange={thumbnailFile}
                   />
                   <h3>サムネイル</h3>
               </label>
             </div>
             )}
               {thumbnail && thumbnail.type && typeof thumbnail.type === 'string' && thumbnail.type.startsWith("video/") ? (
                  thumbnailPreview && !(thumbnailPreview instanceof ArrayBuffer) && <video controls src={thumbnailPreview} className='thumbnail_display'></video>
               ) : thumbnail && thumbnail.type && typeof thumbnail.type === 'string' && thumbnail.type.startsWith("image/") ? (
                  thumbnailPreview && !(thumbnailPreview instanceof ArrayBuffer) && <img src={thumbnailPreview} className='thumbnail_display'></img>
               ) : (
                 <></>
               )}
               {imageOrVideo ? <></> : 
               <div className='image_border'>
                <label className='image_file'>
                <CameraAltIcon style={{ fontSize: '67px' }} />
                  <input className='image'
                    type="file"
                    accept='video/*, image/*'
                    capture="environment"
                    name="image"
                    onChange={event => imageOrVideoFile(event)}
                  />
                  <h3>コンテンツ</h3>
                </label>
               </div>
               }
                {imageOrVideo && imageOrVideo.type && typeof imageOrVideo.type === 'string' && imageOrVideo.type.startsWith("video/") ? (
                 imageOrVideoPreview && !(imageOrVideoPreview instanceof ArrayBuffer) && <video controls src={imageOrVideoPreview} className='image_display'></video>
                 ) : imageOrVideo && imageOrVideo.type && typeof imageOrVideo.type === 'string' && imageOrVideo.type.startsWith("image/") ? (
                 imageOrVideoPreview && !(imageOrVideoPreview instanceof ArrayBuffer) && <img src={imageOrVideoPreview} className='image_display'></img>
                 ) : (
                 <></>
                 )}
             </div>
                 <br />
                { categoryModal &&
                <Fragment>
                  <div className='category_modal_inner'>
                    <div className='category_modal_content'>
                     <button className='reset' type='button' onClick={() => setCategory("なし")}>なし</button>
                     <div className='category_close' onClick={() => setCategoryModal(false)}><a><CloseIcon /></a></div>
                      { CategoryData.map((value, key) => {
                         return (
                          <li className='category'>
                           <img src={value.icon}></img>
                           <a onClick={() => setCategory(value.title)}>{value.title}</a>
                           { dishExpand[key] ?
                             <Fragment>
                              <ExpandLess
                                style={{ position: 'relative', top: '7px', left: '6px', cursor: 'pointer' }} 
                                onClick={() =>
                                setDishExpand(prevState => ({ ...prevState, [key]: false }))} 
                              />
                              <ul>
                               {Object.values(DishData[key]).map((dish) => (
                                 dish ? <li className='dish' onClick={() => setCategory(`${value.title}／${dish}`)}>{dish}</li> : null
                               ))}
                              </ul> 
                             </Fragment> :
                               <ExpandMore 
                                 style={{ position: 'relative', top: '7px', left: '6px', cursor: 'pointer' }} 
                                 onClick={() =>
                                 setDishExpand(prevState => ({ ...prevState, [key]: true }))} 
                               /> }
                          </li>
                         )
                      })}        
                    </div>
                  </div>
                </Fragment>
                }
                <label>料理名: ※最大30文字</label>
                { title && <a className={ titlelength === 0 ? 'title_length_errors' 
                                                                 :
                                                               ''
                                         }
                            >　残り{titlelength}文字
                            </a>
                }
                <button type='button' className='category_button' onClick={() => setCategoryModal(true)}>カテゴリ:　{category}</button>
                <br></br>
                <input className='title'
                    maxLength={30}
                    type="text"
                    placeholder='料理名'
                    value={title}
                    onChange={event => setTitle(event.target.value)}  
                /><br></br>
                <label>料理概要:</label><br/>
                <textarea className='content'
                    maxLength={300}
                    name="content"        
                    placeholder='料理概要'
                    value={content}
                    onChange={event => setContent(event.target.value)}       
                /><br/>
                <button type="button" className='content_button' onClick={() => setContent("")}>取り消し</button>
                <label>時間　</label>
                <input className='input_time'
                    maxLength={3}
                    type="text"
                    name="time"
                    value={time}
                    onChange={event => setTime(event.target.value)}
                />　分
                <label>　　　　　費用　</label>
                <input className='input_cost'
                    maxLength={5}
                    type="text"
                    name="cost"
                    value={cost} 
                    onChange={event => setCost(event.target.value)}
                />　円<br/>
                <button type='button' className='material_add' onClick={MaterialAdd}>＋　行を追加</button>
                <button type='button' className='material_remove' onClick={materialRemove}>ー　行を削除</button>
                {materialError && <a className='material_errors'>　{materialError}</a>}
                <input className='input_number_of_people' 
                    placeholder='何人分'
                    onChange={event => setNumberOfPeople(event.target.value)}
                />
                <a style={{ fontSize: '12px', opacity: '0.6' }}> 例） 2人分</a>
                <div className='material'>
                 {materialFields.map((field: any, index: number) => {
                  return (
                   <div>
                    <label>材料:</label>
                    <input
                     className='material_input'
                     key={index}
                     type="text"
                     value={field.material}
                     onChange={(e) => materialChange(e, index)}
                    />
                    <label className='amount_label'>分量:</label>
                    <input
                     className='material_input'
                     key={index}  
                     type="text"
                     value={field.amount}
                     onChange={(e) => amountChange(e, index)}
                    />
                   </div>
                  );
                  })}
                </div>
                 <label>作業工程:</label><br/>
                 <textarea className='process'
                    maxLength={300}
                    name="process"        
                    placeholder='作業工程'
                    value={process}
                    onChange={event => setProcess(event.target.value)}       
                 /><br/>
                  <label>ひとこと:</label><br/>
                 <textarea className='coment'
                    maxLength={200}
                    name="coment"           
                    placeholder='ひとこと'
                    value={coment}
                    onChange={event => setComent(event.target.value)}       
                 /><br/>
                 <button className={ posted ?  'posted_button' : 'post_button' } type="submit" disabled={!postRequired()}>
                   投稿する
                 </button>
             </form>
             </div>
           </div>
           <button className='close' onClick={() => CloseModal()} disabled={posted}><a><CloseIcon /></a></button>
         </div>
       <div className='back_display'>

       </div>
   </Fragment>
   )
}

export default PostForm