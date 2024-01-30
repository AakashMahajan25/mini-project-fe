import React from 'react'
import styles from './styles.module.scss'
import leftIcon from '../../assets/images/input-user.png'

function CustomInput({ labelTitle, showMandatory, showLeftIcon, showRightIcon, leftIcon, rightIcon }) {
    return (
        <div class="form-group">
            <label className={styles.formLabel}>{labelTitle} {showMandatory && <span className={styles.mandatory}>*</span>}</label>
            <div className={styles.inputRelative}>
                <input type="email" className={styles.formcontrol} style={{ paddingLeft: showLeftIcon ? 40 : 12 }} placeholder="Enter email" />
                {showLeftIcon && <img src={leftIcon} className={styles.leftIcon} />}
                {showRightIcon && <img src={rightIcon} className={styles.rightIcon} />}
            </div>
        </div>
    )
}

export default CustomInput