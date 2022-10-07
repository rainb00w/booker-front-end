import React from "react";
import { Outlet } from "react-router-dom";
import styles from './MainContainer.module.css';


const MainContainer = () => {
    return (
        <>
            <div className={styles.main_container}>
                <Outlet />
            </div>
        </>
    )
};

export default MainContainer;