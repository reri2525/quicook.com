import React, { Fragment, useState } from 'react';
import { Link } from "react-router-dom";
function Loginwarn() {
  return (
    <Fragment>
     <h1>現在ログイン中です</h1>
     <Link to="/" >トップページへ戻る</Link>
    </Fragment>
  )
}

export default Loginwarn