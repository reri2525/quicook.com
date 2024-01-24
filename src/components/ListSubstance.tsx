import { useState,useContext } from 'react';
import { MainContext } from '../App';
import '../ScssFile/ListSubstance.scss'
import { Link, useHistory } from "react-router-dom";
import { ListData1, ListData2, ListData3, CategoryData, DishData } from './ListData';
import { TypeDishExpand } from '../TypeDefinition/Type';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import CloseIcon from '@mui/icons-material/Close';
type Props = {
   dialog: boolean;
   setDialog: React.Dispatch<React.SetStateAction<boolean>>;
   isWide: boolean;
}
function ListSubstance(props: Props) {
 const context = useContext(MainContext)
 const loggedInStatus = context.loggedInStatus
 const dialog = props.dialog
 const setDialog = props.setDialog
 const isWide = props.isWide
 const history = useHistory();
 const [categoryExpand, setCategoryExpand] = useState(false)
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
  return (
    <>
    <div className="list_area">
      {!isWide && dialog && <div className='close' onClick={() => setDialog(false)}><CloseIcon /></div>}
      <div className='list_inner'>
      <ul>
      { loggedInStatus === "ログインなう" ?
        ListData1.map((value, key) => {
        return (
         <Link to={value.link} className="list_link">
         <li key={key} className = {window.location.pathname.slice(0, 5) === value.link.slice(0, 5)
                                      ? 
                                      "list_active" 
                                       : 
                                      "list"
                                    }>
            <a className='icon'> 
               {window.location.pathname === value.link  && value.icon2 ? value.icon2 : value.icon}
            </a>
            <a className='list_title'> 
               {value.title}
            </a>
         </li>
         </Link>
        )
       })
       : 
       <Link to={ListData1[0].link} className="list_link">
         <li className = {window.location.pathname.slice(0, 5) === ListData1[0].link.slice(0, 5)
                              ? 
                         "list_active" 
                              : 
                            "list"
                         }>
            <a className='icon'> 
               {window.location.pathname === ListData1[0].link  && ListData1[0].icon2 ? ListData1[0].icon2 : ListData1[0].icon}
            </a>
            <a className='list_title'> 
               {ListData1[0].title}
            </a>
         </li>
       </Link>
      }
      </ul>
      <ul>
         <li  className="list2">
            <a className='icon'> 
               {ListData2[0].icon}
            </a>
            <a className='list_title'>
               {ListData2[0].title}
            </a><br/>
            <a className='category_expand' onClick={() => 
                                           categoryExpand ?  setCategoryExpand(false) : setCategoryExpand(true)}
             >{ categoryExpand ? ListData2[1].icon2 : ListData2[1].icon }
            </a>
         </li>
         { categoryExpand ? 
          CategoryData.map((value, key) => {
          return (
           <li className='category'>
            <img src={value.icon}></img>
            <a onClick={() => history.push(`/category/${value.title}/page/1`)}>{value.title}</a>
            { dishExpand[key] ?
             <> 
              <ExpandLess
               style={{ position: 'relative', top: '7px', left: '6px', cursor: 'pointer' }} 
               onClick={() =>
               setDishExpand(prevState => ({ ...prevState, [key]: false }))} 
              />
               <ul>
                {Object.values(DishData[key]).map((dish) => (
                  dish ? <li className='dish' onClick={() => history.push(`/category/${value.title}／${dish}/page/1`)}>{dish}</li> : null
                ))}
               </ul> 
              </> :
              <ExpandMore 
               style={{ position: 'relative', top: '7px', left: '6px', cursor: 'pointer' }} 
               onClick={() =>
               setDishExpand(prevState => ({ ...prevState, [key]: true }))} 
              /> }
           </li>
           )
          })
          : <></> }
      </ul>
      <ul>
      {ListData3.map((value, key) => {
        return (
         <Link to={value.link} className="list_link">
         <li key={key} className = {window.location.pathname === value.link 
                                      ? 
                                      "list_active" 
                                       : 
                                      "list"
                                    }>
            <a className='icon'> 
               {value.icon}
            </a>
            <a className='list_title'> 
               {value.title}
            </a>
         </li>
         </Link>
        )
      })}
      </ul>
      </div>
    </div>
    </>
  )
}

export default ListSubstance