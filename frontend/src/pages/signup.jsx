import { useState } from "react";
import FormArea from "../components/formarea";
import FormTitle from "../components/formtitle";
import InputField from "../components/inputField";
import SubmitBTN from "../components/submitBTN";
import axios from "axios";

export default function Signup() {
  const [data, setData] = useState({});
  async function handleSubmit() {
    await axios
      .post(`https://wallet-pe.vercel.app/api/v1/user/signup`, data)
      .then((res) => {
        const { data } = res;
        console.log(data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <FormArea>
      <FormTitle
        title="Sign up to your account"
        subtitle="Already have an account?"
        linkText="Signin here"
        link="/signin"
      />

      <form action="#" method="POST" className="mt-8">
        <div className="space-y-5">
          <InputField
            type="text"
            placeholder="John"
            label="First name"
            onChange={(e) => setData({ ...data, firstname: e.target.value })}
          />
          <InputField
            type="text"
            placeholder="Doe"
            label="Last name"
            onChange={(e) => setData({ ...data, lastname: e.target.value })}
          />
          <InputField
            type="email"
            placeholder="xyz@example.com"
            label="Email Address"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <InputField
            type="password"
            placeholder="Password"
            label="Password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <SubmitBTN text="Sign Up" onClick={handleSubmit} />
        </div>
      </form>
    </FormArea>
  );
}
