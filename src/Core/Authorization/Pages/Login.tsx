import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { IUserAuthData, useServiceAction } from "../Service/useServiceActions";
import styles from "./Login.module.scss";
import { Gap } from "../../../Common/Components/Gap";
import { Link } from "react-router-dom";
import { ROUTE_NAMES } from "../../../Router/Consts";

/**
 * Component Login.
 * @inheritDoc
 */
export const Login: FunctionComponent = () => {
  const { login } = useServiceAction();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserAuthData>();

  return (
    <div className={styles["login"]} onSubmit={handleSubmit(login)}>
      <form className={styles["login__form"]}>
        <input
          placeholder="login"
          type="text"
          autoFocus
          {...register("login", { required: true })}
        />
        {errors.login && <span>Login is required</span>}

        <Gap size={4} />

        <input
          placeholder="password"
          type="text"
          autoFocus
          {...register("password", { required: true })}
        />
        {errors.login && <span>Password is required</span>}
        <br />
        <button type="submit">Log In</button>
      </form>
      <Link
        className={styles["login__registration"]}
        to={ROUTE_NAMES.AUTHORIZATION.REGISTRATION.PATH}
      >
        Registration
      </Link>
    </div>
  );
};
