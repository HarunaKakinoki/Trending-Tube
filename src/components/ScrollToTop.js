import React, { useState, useEffect } from 'react';
import styles from '../style/style.module.css';

function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
      }, []);
    

    return (
        <div className={styles.scrollToTop}>
            {
                isVisible && <button onClick={scrollToTop}>Top</button>
            }
        </div>
    )
}

export default ScrollToTop
