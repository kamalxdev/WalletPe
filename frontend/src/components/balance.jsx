import axios from "axios";
import { useEffect, useState } from "react";

export default function Balance() {
    const [value, setValue] = useState(0);
  useEffect(() => {
    axios
      .get("https://wallet-pe.vercel.app/api/v1/account/balance", {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("x-auth-token")}`,
          },
      })
      .then((res) => {
        const { data } = res;
        setValue(data.balance);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="flex">
      <div className="font-bold text-lg">Your balance</div>
      <div className="font-semibold ml-4 text-lg">Rs {value}</div>
    </div>
  );
}
