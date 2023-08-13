import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

export const ErrorBoundary: FunctionComponent = () => {
  const navigate = useNavigate();

  const handleResetError = () => {
    navigate("/");
  };

  return (
    <div>
      <div>Что-то пошло не так</div>
      <button onClick={handleResetError}>Вернуться на главную</button>
    </div>
  );
};
