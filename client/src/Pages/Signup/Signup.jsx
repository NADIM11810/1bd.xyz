import { Link } from "react-router-dom";
import useSignup from "../../Hooks/useSignup";

const Signup = () => {
    const {  signup } = useSignup();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const fullName = form.fullName.value;
        const username = form.username.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        const gender = form.gender.value;

        const input = {
            fullName,
            username,
            password,
            confirmPassword,
            gender
        };
        await signup(input);
        form.reset();
    };

    return (
        <div className="flex justify-center">
            <div className="card w-1/2 shadow-2xl">
                <div className="card-body items-center text-center">
                    <h1 className="text-2xl font-bold ">SIGNUP</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            className="input mt-10 input-bordered w-full max-w-xs"
                            required
                        />
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
                            placeholder="Type Password"
                            className="input mt-5 input-bordered w-full max-w-xs"
                            required
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className="input mt-5 input-bordered w-full max-w-xs"
                            required
                        />
                        <select name="gender" className="select mt-5 select-bordered w-full max-w-xs">
                            <option disabled defaultValue>Gender</option>
                            <option>male</option>
                            <option>female</option>
                        </select>
                        <input className="btn mt-10 w-full max-w-xs" type="submit" value="SignUp" />
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Signup;
