"use client";
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import { Header } from "@/components/Header";
import { platforms, contentTypes } from "@/data";
import magic from "@/assets/magic.svg";
import arrowDown from "@/assets/arrow-down.svg";
import arrowUpDown from "@/assets/arrow-up-down.svg";
import { platform } from "process";
import {
  createPostsTemplate,
  contemeleonProtocolDefinition,
  getProtocol,
  installContemeleonProtocolRemotely,
} from "../helper";
import Overlay from "@/components/Overlay";
import { useWeb5 } from "../Web5Context";

const CreateContent = () => {
  const {web5, userDid} = useWeb5()
  const [showImportMenu, setShowImportMenu] = useState(false);
  const [importPlatform, setImportPlatform] = useState({
    name: "",
    value: "",
  });
  const [textContent, setTextContent] = useState("");
  const [renderedContent, setRenderedContent] = useState("");
  const [showConvertTooltip, setShowConvertTooltip] = useState(false);
  const [convertError, setConvertError] = useState("");
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);
  const [clipboardTooltip, setClipboardTooltip] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const importMenu = useRef(null);

  useEffect(function mount() {
    const closeOpenMenus = (e) => {
      if (
        importMenu.current &&
        showImportMenu &&
        !importMenu.current.contains(e.target)
      ) {
        setShowImportMenu(false);
      }
    };

    window.addEventListener("mousedown", closeOpenMenus);

    return function unMount() {
      window.removeEventListener("mousedown", closeOpenMenus);
    };
  });

  useEffect(() => {
    const saveContent = async () => {
      console.log("saving your data");
      try {
        const generatedPostsProtocol = contemeleonProtocolDefinition();
        const generatedContent = createPostsTemplate(
          userDid,
          renderedContent,
          importPlatform.value
        );

        const { record, status } = await web5.dwn.records.write({
          data: generatedContent,
          message: {
            protocol: generatedPostsProtocol.protocol,
            protocolPath: "generatedPosts",
            schema: generatedPostsProtocol.types.generatedPosts.schema,
            recipient: userDid,
          },
        });
        if (status.code === 200) {
          console.log("sent this", JSON.stringify(generatedContent));
          return { ...generatedContent, recordId: record.id };
        }

        if (status.code === 202) {
          console.log("your request is processing...");
          return [];
        }

        console.error("Error saving content:", status.code);
        return record;
      } catch (error) {
        console.error("Error saving content", error);
      }
    };

    if (renderedContent) {
      saveContent();
    }
  }, [renderedContent]);

  const convertContent = () => {
    if (importPlatform?.value === "") {
      setConvertError("Please select a platform");
      setShowConvertTooltip(true);
      setTimeout(() => {
        setShowConvertTooltip(false);
      }, 4000);
    } else if (textContent === "") {
      setConvertError("Please enter your content");
      setShowConvertTooltip(true);
      setTimeout(() => {
        setShowConvertTooltip(false);
      }, 4000);
    } else {
      // perform conversion

      try {
        aiConvertContent(textContent);
      } catch (error) {
        console.log(error);
      }
    }
  };

  async function aiConvertContent(textContent) {
    setIsLoading(true);
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Convert ${textContent} to a ${importPlatform.name}`,
          },
        ],
        temperature: 0.7,
      }),
    });

    const text = await response.text();
    const convertedText = JSON.parse(text);
    setRenderedContent(convertedText.choices[0].message.content);
    console.log(convertedText.choices[0].message.content);
    setIsLoading(false);
  }

  const copyToClipboard = (value) => {
    setShowCopyTooltip(true);
    value
      ? setClipboardTooltip("Content copied to clipboard")
      : setClipboardTooltip("No rendered content to copy");
    setTimeout(() => {
      setShowCopyTooltip(false);
    }, 4000);
    if (value) {
      navigator.clipboard.writeText(value).catch((error) => {
        console.error("Failed to copy to clipboard:", error);
      });
    }
  };

  return (
    <>
      {isLoading && <Overlay />}
      <main className="flex min-h-screen flex-col items-center bg-blue-90 text-gray-10 font-space-mono">
        <Header />

        <div className="container flex gap-28 mt-6 md:mt-24 px-4 md:px-0">
          <div className="hidden lg:block">
            <div className="w-64 bg-gray-70 px-4 h-14 flex items-center cursor-pointer">
              <Image
                alt="Create content"
                loading="lazy"
                className="w-6 h-6 mr-4"
                src={magic}
              />
              Create content
            </div>

            <div className="mt-40">
              {contentTypes?.map((type) => (
                <div key={type?.value} className="py-8 flex items-center">
                  <Image
                    alt={type?.name}
                    loading="lazy"
                    className="w-6 h-6 mr-4 cursor-pointer"
                    src={type?.icon}
                  />
                  <div className="hover:text-blue-10 cursor-pointer">
                    {type?.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-center md:text-left md:w-[732px] mb-12">
              <p className="font-orbitron text-[40px] md:text-6xl font-bold leading-[117%]">
                Free <span className="text-blue-20">content conversion</span>{" "}
                templates
              </p>
              <p className="mt-8 leading-7">
                Create professional and engaging content for multiple social
                spaces with Contemeleon’s free AI powered content converter and
                templates.
              </p>
            </div>

            <div className="relative">
              <div
                className="md:w-[316px] flex justify-between items-center pl-4 pr-2 py-6 border border-gray-10 hover:border-blue-20 font-bold cursor-pointer"
                onClick={() => setShowImportMenu(!showImportMenu)}
              >
                {importPlatform?.name ? (
                  <div className="flex items-center">
                    <Image
                      alt={importPlatform?.name}
                      loading="lazy"
                      className="w-10 h-10 mr-4"
                      src={importPlatform?.icon}
                    />
                    {importPlatform?.name}
                  </div>
                ) : (
                  "Choose a conversion type"
                )}
                {showImportMenu ? (
                  <RxCaretUp size="2rem" />
                ) : (
                  <RxCaretDown size="2rem" />
                )}
              </div>

              {/* Import Dropdown menu */}
              {showImportMenu && (
                <div
                  ref={importMenu}
                  className="absolute mt-2 z-10 bg-blue-90 shadow w-full md:w-[316px] border border-gray-10"
                >
                  {platforms?.map((platform) => (
                    <button
                      key={platform?.value}
                      className="p-4 flex items-center hover:text-blue-20 hover:bg-gray-10 border border-gray-10 w-full text-left"
                      role="menuitem"
                      onClick={() => {
                        setImportPlatform(platform);
                        setShowImportMenu(false);
                        console.log(importPlatform);
                      }}
                    >
                      <Image
                        alt={platform?.name}
                        loading="lazy"
                        className="w-10 h-10 mr-4"
                        src={platform?.icon}
                      />
                      {platform?.name}
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-4 md:w-[806px] border border-gray-10">
                <textarea
                  id="text-box"
                  name="content"
                  placeholder="Paste your content or enter prompt"
                  className="w-full h-52 p-3 mt-1 resize-none bg-blue-90 focus:outline-none"
                  onChange={(e) => setTextContent(e.target.value)}
                />
                <div className="relative">
                  <div className="md:px-4 py-2 md:py-6">
                    <div className="flex gap-2 md:gap-4 justify-center md:justify-end font-normal text-sm pt-2">
                      <button
                        className="px-2 py-4 md:p-4 font-bold border border-gray-10 cursor-not-allowed group"
                        disabled
                      >
                        AI generator 🤖
                        <span className="hidden group-hover:block absolute -top-[20px] py-[6px] px-3 text-xs text-gray-30 font-normal capitalize bg-gray-70 border border-gray-30 translate-x-[4px] translate-y-[3px]">
                          Coming soon
                        </span>
                      </button>

                      <button
                        className="px-2 py-4 md:p-4 font-bold border border-gray-10 hover:text-blue-10"
                        onClick={convertContent}
                      >
                        Convert content 🪄
                      </button>
                      {showConvertTooltip && (
                        <div className="absolute w-52 py-[6px] px-3 z-10 -mt-12 bg-gray-70 border border-gray-30 text-xs text-blue-10 text-center whitespace-nowrap shadow-lg">
                          {convertError}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center py-12">
              <div className="group w-14">
                <Image
                  alt="convert content"
                  loading="lazy"
                  className="w-14 h-14 group-hover:hidden"
                  src={arrowDown}
                />
                <Image
                  alt="convert content"
                  loading="lazy"
                  className="w-14 h-14 hidden group-hover:block"
                  src={arrowUpDown}
                />
              </div>
            </div>

            <div className="relative">
              <div className="mt-4 mb-32 md:w-[806px] border border-gray-10">
                <textarea
                  id="text-box"
                  name="content"
                  placeholder="Rendered content"
                  className="w-full h-52 p-3 mt-1 resize-none bg-blue-90 focus:outline-none"
                  value={renderedContent}
                  readOnly
                />
                <div className="relative">
                  <div className="px-4 py-6">
                    <div className="flex gap-4 justify-end font-normal text-sm pt-2">
                      <button
                        className="p-4 font-bold border border-gray-10 hover:text-blue-10"
                        onClick={() => copyToClipboard(renderedContent)}
                      >
                        Copy content 🧙🏻‍♂️
                      </button>
                      {showCopyTooltip && (
                        <div className="absolute w-56 py-[6px] px-3 z-10 -mt-12 bg-gray-70 border border-gray-30 text-xs text-blue-10 text-center whitespace-nowrap shadow-lg">
                          {clipboardTooltip}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CreateContent;
