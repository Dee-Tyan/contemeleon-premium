"use client";
import Header from "@/components/Header2";
import { EmptyProfile } from "@/components/SVGs";
import profile from "@/assets/profile.svg";
import Image from "next/image";
import Link from "next/link";
import { platforms, contentTypes } from "@/data";
import { useState, useEffect } from "react";
import SavedPosts from "@/components/SavedPosts";
import { useWeb5 } from "../../Web5Context";

const Dashboard = () => {
  const { web5, userDid } = useWeb5();
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    if (web5 && userDid) {
      console.log("loading now...");
      const retrieveData = async () => {
        console.log("Fetching saved posts...");
        try {
          const { records, status } = await web5.dwn.records.query({
            message: {
              filter: {
                protocol: "https://contemeleon.app/content-conversions",
                schema: "http://message.me",
              },
            },
          });

          console.log("API Response:", status);

          if (status.code === 200) {
            const userPosts = await Promise.all(
              records.map(async (record) => {
                const data = await record.data.json();
                return {
                  ...data,
                  recordId: record.id,
                };
              })
            );
            console.log("This is data you need...", userPosts);
            setSavedPosts(userPosts);
            return;
          } else {
            console.error("Error fetching sent messages:", status.detail);
            // Handle specific error cases or show an error message to the user.
          }
        } catch (error) {
          console.error("Oops, this happened", error);
          // Handle unexpected errors here.
        }
      };

      retrieveData();
    } else {
      console.log("not ready");
    }
  }, [web5, userDid]);

  return (
    <main className=" min-h-screen bg-blue-90 text-gray-10">
      <Header />
      <div className="grid grid-rows-1 lg:grid-cols-4 m-6 md:mt-14 px-4 md:px-0 gap-8">
        <div className="hidden lg:block">
        <div className="w-64 bg-pink-10 px-4 h-14 flex items-center cursor-pointer rounded font-bold">
            
           View Conversions
          </div>
          {contentTypes?.map((type) => (
            <div key={type?.value} className="py-8 flex items-center">
              <Image
                alt={type?.name}
                loading="lazy"
                className="w-6 h-6 mr-4 cursor-pointer text-pink-10"
                src={type?.icon}
              />
              <div className="hover:text-purple-10 cursor-pointer">
                {type?.name}
              </div>
            </div>
          ))}
        </div>
        <div className="grid w-full lg:col-span-3">
          <div className="grid gap-4">
            {/* <p className='text-sm lg:text-xl'>You should not be here yet, but go ahead and create content </p> */}
          </div>
          <div>
            {/* <div className="flex space-x-4 lg:space-x-10">
              <Link
                href="/premium"
                className="basis-1/2 font-bold bg-white p-2 md:p-4 lg:px-8 rounded-md lg:py-4 bg-blue-90 hover:via-pink-30 via-27.63% hover:to-blue-10 to-2.6% text-center flex items-center justify-center flex items-center justify-center text-xs md:text-base"
              >
                Create content
              </Link>
              <button
                disabled
                className="basis-1/2 font-bold bg-white rounded-md p-2 md:p-4 lg:px-8 lg:py-4 text-blue-90 flex items-center justify-center text-xs md:text-base"
              >
                Import Content
              </button>
            </div> */}
            {savedPosts.length >= 1 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 place-items-center my-4 gap-4">
                {savedPosts?.map((posts, index) => (
                  <SavedPosts {...posts} key={index} />
                ))}
              </div>
            ) : (
              <div className="grid place-items-center mt-8 lg:mt-16 gap-8">
                <EmptyProfile />

                <div className="grid gap-2">
                  <p className="text-center uppercase font-bold text-sm lg:text-xl">
                    Yayy! Someone new arrived!
                  </p>
                  <div className="mx-2 lg:mx-4">
                    <p className="text-xs lg:text-lg text-center">
                      Go ahead and create content, your conversions will appear
                      here
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
