"use client";
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import { platforms, tones, contentTypes } from "@/data";
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
import Header from "@/components/Header2";
import SavedPosts from "@/components/SavedPosts";

const createContent = ({}) => {
  const [showImportMenu, setShowImportMenu] = useState(false);
  const [importPlatform, setImportPlatform] = useState({
    name: "",
    value: "",
  });
  const [importTone, setImportTone] = useState({
    name: "",
  });
  const [showImportTone, setShowImportTone] = useState(false);
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
            content: `Convert ${textContent} to a ${importPlatform.name}, make it sound ${!importTone.name ? 'catchy' : importTone.name}`,
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
    <div className="h-screen bg-black text-white overflow-y-scroll font-space-mono text-base">
      <Header />
      {isLoading && <Overlay />}
      <div className="grid grid-flow-row-dense grid-cols-1 lg:grid-cols-3 grid-rows-1 lg:grid-rows-3 divide-x divide-blue-90">
        <div className="grid mx-4 lg:mx-8">
          <div className="">
            <textarea
              id="text-box"
              name="content"
              placeholder="Paste your content or enter prompt"
              className="w-full h-52 lg:h-80 p-3 mt-1 resize-none bg-blue-90 rounded focus:outline-none overflow-y-scroll"
              onChange={(e) => setTextContent(e.target.value)}
            />

            <div className="grid text-white relative">
              <div
                className="flex justify-between items-center hover:border-blue-20 font-bold cursor-pointer"
                onClick={() => setShowImportMenu(!showImportMenu)}
              >
                {importPlatform?.name ? (
                  <div className="flex items-center py-2">
                    <Image
                      alt={importPlatform?.name}
                      loading="lazy"
                      className="w-8 h-8 mr-4"
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
              {showImportMenu && (
                <div
                  ref={importMenu}
                  className="absolute mt-2 z-10 bg-blue-90 shadow w-full"
                >
                  {platforms?.map((platform) => (
                    <button
                      key={platform?.value}
                      className="p-4 flex items-center hover:text-blue-20 hover:bg-gray-10 w-full text-left"
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
                        className="w-8 h-8 mr-4"
                        src={platform?.icon}
                      />
                      {platform?.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="grid text-white relative">
              <div
                className="flex justify-between items-center hover:border-blue-20 font-bold cursor-pointer mt-2 lg:mt-4"
                onClick={() => setShowImportTone(!showImportTone)}
              >
                {importTone?.name ? (
                  <div className="flex items-center p-2">
                    {importTone?.name}
                  </div>
                ) : (
                  "Conversion should sound?"
                )}
                {showImportTone ? (
                  <RxCaretUp size="2rem" />
                ) : (
                  <RxCaretDown size="2rem" />
                )}
              </div>
              {showImportTone && (
                <div className="absolute mt-2 lg:mt-4 bg-blue-90 text-white shadow w-full">
                  {tones?.map((tone, index) => (
                    <button
                      key={index}
                      className="p-4 flex items-center hover:text-pink-10 w-full text-left"
                      role="menuitem"
                      onClick={() => {
                        setImportTone(tone);
                        setShowImportTone(false);
                        console.log(tone);
                      }}
                    >
                      {tone.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="">
            <div className="py-2 md:py-6">
              <div className="flex gap-2 md:gap-4 justify-center md:justify-end font-normal text-sm pt-2">
                <button
                  className="px-2 py-4 md:p-4 font-bold bg-pink-10 rounded-md hover:text-md w-full text-center text-base"
                  onClick={convertContent}
                >
                  Convert content
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
        <div className="col-span-2">
          <div className="mx-4 lg:mx-8">
            <textarea
              id="text-box"
              name="content"
              placeholder="Rendered content"
              className="w-full h-64 p-3 mt-1 resize-none bg-blue-90 focus:outline-none rounded-md overflow-y-scroll"
              value={renderedContent}
              readOnly
            />
            <div className="relative">
              <div className="px-4 py-6">
                <div className="flex gap-4 justify-end font-normal text-sm pt-2">
                  <button
                    className="p-4 font-bold border border-gray-10 hover:text-blue-10 rounded"
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
  );
};

export default createContent;
