import { Fragment, useState } from 'react';
import ListSubstance from './ListSubstance';
import '../ScssFile/List.scss'
import useMedia from 'use-media';
function List() {
 const isWide = useMedia({minWidth: '1000px'});
 const [dialog, setDialog] = useState(false)
 return (
 <Fragment>
    { isWide ? 
      <ListSubstance dialog={dialog} setDialog={setDialog} isWide={isWide}/> 
    :
    dialog ?
    <>
     <div className='back_display'></div>
      <ListSubstance dialog={dialog} setDialog={setDialog} isWide={isWide}/>
    </>
    : 
    <>
      <div className='dialog'>
         <button className='dialog_button' onClick={() => setDialog(true)}>=</button>
      </div>
    </>
    }
  </Fragment> 
 );
}
export default List;