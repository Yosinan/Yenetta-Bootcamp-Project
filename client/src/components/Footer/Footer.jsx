import React from 'react'
import { getFullYear } from '../../utils/utils'
import './Footer.css'

function Footer() {
    return (

        <div className='page-container foot'>
           
               
                <div class="copyright_section">
                    <div class="container">
                    <p class="copyright_text">Made by <a href='https://github.com/Yosinan/'>Yoseph</a> © {getFullYear()}  <a href=""></a></p>
                    </div>
                </div>
          </div>
    )
}

export default Footer