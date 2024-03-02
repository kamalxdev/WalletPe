import axios from "axios";
import React, { useEffect, useState } from "react";


export default function Users() {
  const [user, setUser] = useState([]);
  const [Filter, setFilter] = useState("");
  useEffect(() => {
    axios
      .get(`https://wallet-pe.vercel.app/api/v1/user/bulk?filter=${Filter}`,{
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("x-auth-token")}`,
        },
      })
      .then((res) => {
        const { data } = res;
        setUser(data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Filter]);
  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">Users</h2>
            <p className="mt-1 text-sm text-gray-700">
              This is the list all users to whom you can send money.
            </p>
          </div>
          <div className="flex w-full items-center space-x-2 md:w-1/3">
            <input
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="email"
              placeholder="User "
              onChange={(e) => setFilter(e.target.value)}
            ></input>
          </div>
          {/* <div>
            <button
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add new employee
            </button>
          </div> */}
        </div>
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        <span>Name</span>
                      </th>
                      <th scope="col" className="relative px-4 py-3.5">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {user.map((user,index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <div className="flex flex-col justify-center h-full text-xl">
                                {user.firstname[0]}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.firstname + " " + user.lastname}
                              </div>
                              <div className="text-sm text-gray-700">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                          <a href={`/send?id=${user.id}&name=${user.firstname+" "+user.lastname}`}className="text-gray-700">
                            Send Money
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
