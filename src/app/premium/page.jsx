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
  return (
    <div className="h-screen bg-black text-white overflow-y-scroll">
      <Header />
      <div className="grid sm:grid-rows-2 lg:grid-cols-4 h-3/4 divide-x mt-8">
        <div className="grid mx-2">
          <div className="">
            <textarea
              id="text-box"
              name="content"
              placeholder="Paste your content or enter prompt"
              className="w-full h-52 p-3 mt-1 resize-none bg-blue-90 rounded focus:outline-none overflow-y-scroll"
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
                className="flex justify-between items-center hover:border-blue-20 font-bold cursor-pointer"
                onClick={() => setShowImportTone(!showImportTone)}
              >
                {importTone?.name ? (
                  <div className="flex items-center py-2">
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
                    ></button>
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
        <div className="hidden lg:col-span-3">col 2</div>
      </div>
    </div>
  );
};

export default createContent;
