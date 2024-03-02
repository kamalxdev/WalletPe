import Appbar from "../components/appbar";
import Balance from "../components/balance";
import FormArea from "../components/formarea";
import Users from "../components/user";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-col p-10">
        <Balance value={1000} />
        <Users />
      </div>
    </>
  );
}
