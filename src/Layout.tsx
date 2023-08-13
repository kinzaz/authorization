import { FunctionComponent } from "react";
import styles from "./Layout.module.scss";
import { Outlet } from "react-router-dom";

export const Layout: FunctionComponent = () => {
  return (
    <div className={styles["root__layout"]}>
      <Outlet />
    </div>
  );
};
