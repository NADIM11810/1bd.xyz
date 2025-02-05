import { Link } from "react-router-dom";
import useLogin from "../../Hooks/useLogin";

const Login = () => {
  const { login } = useLogin();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const username = form.username.value;
    const password = form.password.value;

    await login(username, password);
  };
  return (
    <div className="flex justify-center items-center bg-gray-900 min-h-screen">
      <div className="card w-1/2 bg-gray-900 shadow-2xl">
        <div className="card-body items-center text-center">
          <h1 className="text-2xl font-bold text-white">Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="User Name"
              className="input mt-5 input-bordered w-full max-w-xs"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input mt-5 input-bordered w-full max-w-xs"
              required
            />

            <input className="btn mt-10 w-full max-w-xs" type="submit" value="LogIn" />
          </form>

          <h1 className=" text-white">
            Don't have any account?
            <Link className="underline" to="https://wa.me/8801867553824">
              Create account
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
