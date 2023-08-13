import { FunctionComponent } from "react";
import styles from "./index.module.scss";
import { Outlet } from "react-router-dom";

export const Authorization: FunctionComponent = () => {
  return (
    <div className={styles["authorization"]}>
      <Outlet />
    </div>
  );
};
