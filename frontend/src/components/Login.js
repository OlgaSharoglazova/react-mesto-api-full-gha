import React from "react";

function Login({ handleLogin }) {
  const [formValue, setFormValue] = React.useState({ email: "", password: "" });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (evt) => {
    const { email, password } = formValue;
    evt.preventDefault();

    handleLogin(email, password);
  };

  return (
    <div className="auth">
      <div className="auth__container">
        <h2 className="auth__title">Вход</h2>
        <form
          className="auth__form"
          name="form-register"
          noValidate
          onSubmit={handleSubmit}
        >
          <input
            className="auth__input auth__input-email"
            type="email"
            name="email"
            minLength={8}
            maxLength={40}
            placeholder="Email"
            id="input-email"
            value={formValue.email}
            onChange={handleChange}
            autoComplete="email"
          ></input>
          <span className="auth__input-error" />
          <input
            className="auth__input auth__input-password"
            type="password"
            name="password"
            minLength={6}
            maxLength={20}
            placeholder="Пароль"
            id="input-password"
            value={formValue.password}
            onChange={handleChange}
            autoComplete="current-password"
          ></input>
          <span className="auth__input-error" />
          <button className="auth__button" type="submit">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
