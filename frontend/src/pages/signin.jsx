import { useState } from "react";
import FormArea from "../components/formarea";
import FormTitle from "../components/formtitle";
import InputField from "../components/inputField";
import SubmitBTN from "../components/submitBTN";
import Loading from "../components/loading";
import axios from "axios";


export default function Signin() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  async function handleSubmit() {
    setLoading(true);
    await axios
      .post(`https://wallet-pe.vercel.app/api/v1/user/signin`, data)
      .then((res) => {
        setLoading(false);
        const { data } = res;
        localStorage.setItem("x-auth-token", data.userToken);
        alert(data.message);
        
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert("An error occured");
      });
  }
  if(loading){
    return <Loading loadingtext="Signing in..."/>
  }
  return (
    <FormArea>
      <FormTitle
        title="Sign in to your account"
        subtitle="Don't have an account?"
        linkText="Create a free account"
        link="/signup"
      />

      <form action="#" method="POST" className="mt-8">
        <div className="space-y-5">
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
          <SubmitBTN text="Sign In" onClick={handleSubmit} />
        </div>
      </form>
    </FormArea>
  );
}
