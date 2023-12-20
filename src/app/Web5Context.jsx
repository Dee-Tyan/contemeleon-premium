"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    installContemeleonProtocolRemotely,
  } from "./helper";

const Web5Context = createContext();

export const useWeb5 = () => {
  return useContext(Web5Context);
};

export const Web5Provider = ({ children }) => {
  const [web5, setWeb5] = useState(null);
  const [userDid, setUserDid] = useState(null);

  useEffect(() => {
    const initializeWeb5 = async () => {
      try {
        const { Web5 } = await import("@web5/api");
        const { web5, did } = await Web5.connect({ sync: "5s" });
        if (web5 && did) {
          setWeb5(web5);
          setUserDid(did);
          await configureContemeleonProtocol(web5, did);
        }
      } catch (error) {
        console.error("Error initializing Web5:", error);
      }
    };
    initializeWeb5();
  }, []);

  // const configureContemeleonProtocol = async (web5, did) => {
  //   const protocolDefinition = contemeleonProtocolDefinition();
  //   const protocolUrl = protocolDefinition.protocol;

  //   const remoteProtocolResponse = await getProtocol(web5, did, protocolUrl);
  //   const { protocols: remoteProtocols, status: remoteProtocolStatus } =
  //     remoteProtocolResponse || {};
  //   // if (!remoteProtocols || !remoteProtocolStatus) return 'not found';

  //   if (!remoteProtocolStatus || !remoteProtocols) {
  //     const result = await installContemeleonProtocolRemotely(
  //       web5,
  //       did,
  //       protocolDefinition
  //     );
  //     console.log({ result });
  //     console.log("Protocol installed successfully");
  //   }
  // };
  const installContemeleonProtocolRemotely = async (
    web5,
    did,
    protocolDefinition
  ) => {

    const { protocol } = await web5.dwn.protocols.configure({
      message: {
        definition: protocolDefinition,
      },
    });
    return await protocol.send(did);
  };
  const contemeleonProtocolDefinition = () => {
    return {
      types: {
        generatedPosts: {
          schema: "http://message.me",
          dataFormats: ['application/json'],
        },
      },
      protocol: "https://contemeleon.app/content-conversions",
      published: true,
      structure: {
        generatedPosts: {
          $actions: [
            { who: "anyone", can: "write" },
            { who: "author", of: "generatedPosts", can: "read" },
          ],
        },
      },
    };
  };
   
  const configureContemeleonProtocol = async (web5, did) => {
    const protocolDefinition = contemeleonProtocolDefinition();
    const protocolUrl = protocolDefinition.protocol;

    const { protocols: localProtocols, status: localProtocolStatus } =  await getLocalProtocol(web5, protocolUrl);
    
      // if (!localProtocolStatus || !localProtocols) return 'not found';

    if (localProtocolStatus.code !== 200 || localProtocols.length === 0) {
      const result = await installContemeleonProtocolLocally(
        web5,
        protocolDefinition
      );
      console.log({ result });
      console.log("Protocol installed locally");
    }

    const remoteProtocolResponse = await getRemoteProtocol(web5, did, protocolUrl);
    const { protocols: remoteProtocols, status: remoteProtocolStatus } = remoteProtocolResponse || {};
    // if (!remoteProtocols || !remoteProtocolStatus) return 'not found';
    
    if (!remoteProtocolStatus || !remoteProtocols) {
      const result = await installContemeleonProtocolRemotely(
        web5,
        did,
        protocolDefinition
      );
      console.log({ result });
      console.log("Protocol installed remotely");
    }
  };

  const installContemeleonProtocolLocally = async (
    web5,
    protocolDefinition
  ) => {
    return await web5.dwn.protocols.configure({
      message: {
        definition: protocolDefinition,
      },
    });
  };

  const getLocalProtocol = async (web5) => {
    return await web5.dwn.protocols.query({
      message: {
        filter: {
          protocol: "https://contemeleon.app/content-conversions",
        },
      },
    });
  };

  //get  protocol from remote dwn
  const getRemoteProtocol = async (web5, did) => {
    await web5.dwn.protocols.query({
      from: did,
      message: {
        filter: {
          protocol: "https://contemeleon.app/content-conversions",
        },
      },
    });
  };

  const contextValue = {
    web5,
    userDid,
  };

  return (
    <Web5Context.Provider value={contextValue}>
      {children}
    </Web5Context.Provider>
  );
};
