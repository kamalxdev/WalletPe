import FormArea from "../components/formarea";
import FormTitle from "../components/formtitle";
import InputField from "../components/inputField";
import SubmitBTN from "../components/submitBTN";

export default function Signin() {
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
          <InputField type="email" placeholder="xyz@example.com" label="Email Address" />
          <InputField type="password" placeholder="Password" label="Password" />
          <SubmitBTN text="Sign In" />
        </div>
      </form>
    </FormArea>
  );
}
