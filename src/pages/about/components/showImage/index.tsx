import React from 'react';
import imgSrc from '/public/img/OIP-C.jpg'
import styles from './index.less'
const ShowImage = ()=>{
    return(
        <div className={styles.imgContainer}>
            <img src={imgSrc} alt="" />
        </div>
    )
}
export default ShowImage 