import { useState } from "react";
import FormArea from "../components/formarea";
import FormTitle from "../components/formtitle";
import InputField from "../components/inputField";
import SubmitBTN from "../components/submitBTN";
import axios from "axios";
import Loading from "../components/loading";

export default function Signup() {
  const [data, setData] = useState({});
  const [loading,setLoading] = useState(false);
  async function handleSubmit() {
    setLoading(true);
    await axios
      .post(`https://wallet-pe.vercel.app/api/v1/user/signup`, data)
      .then((res) => {
        setLoading(false);
        const { data } = res;
        alert(data.message);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        alert("An error occured");
      });
  }
  if(loading){
    return <Loading loadingtext="Signing up..."/>
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
