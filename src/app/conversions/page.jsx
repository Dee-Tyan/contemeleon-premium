"use client";

import { useState, useEffect } from "react";
import { useWeb5 } from "../Web5Context";

const ConversionTool = () => {
  const {web5, userDid} = useWeb5()
  const data2send = "send this text to my dwn again"


  // create data object

   const createPostsTemplate = () => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    
    console.log({
      content: data2send, 
      timestamp: `${currentDate} ${currentTime}`,
      author: userDid,  
    })
    return {
      content: data2send, 
      timestamp: `${currentDate} ${currentTime}`,
      author: userDid,  
    };
  };

  // define protocol for the site
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

  // get the newly installed protocol locally
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

  // install the protocol in their local dwn if it doesn't exist
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

  // install the protocol in current users remote dwn if it doesn't exist
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
  //configure protocol
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

  // write data to local dwn

  const saveContent = async () => {
    console.log("saving your data");
    try {
      const generatedPostsProtocol = contemeleonProtocolDefinition();
      const generatedContent = createPostsTemplate()

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
        console.log('sent this', JSON.stringify(generatedContent) )
        return { ...generatedContent, recordId: record.id };
      }

      if (status.code === 202) {
        console.log("your request is processing...");
        return [];
      }

      console.error('Error saving content:', status.code);
      return record;
    } catch (error) {
      console.error("Error saving content", error);
    }
  };

  // read data from dwn
  const retrieveData = async () => {
    console.log("Fetching saved posts...");

    try {
      const response = await web5.dwn.records.query({
        message: {
          filter: {
            protocol: "https://contemeleon.app/content-conversions",
            schema: "http://message.me",
          },
        },
      });

      console.log("API Response:", response);

      if (response.status.code === 200) {
        const userPosts = await Promise.all(
          response.records.map(async (record) => {
            const data = await record.data.json();
            return {
              ...data, 
              recordId: record.id 
            };
          })
        );
        console.log('This is data you need...', userPosts)
        return userPosts
      } else {
        console.error('Error fetching sent messages:');
        return [];
      }
    } catch (error) {
      console.error("Oops, this happened", error);
    }
  };
  

 


  return (
    <div className="h-screen w-screen grid font-mono text-sm place-items-center">
      <p>This is where the magic happens</p>

      <div className="grid gap-4">
        Content conversions
        <button className="p-4 border border-2" onClick={saveContent}>
          {" "}
          Save Content
        </button>
        <button className="p-4 border border-2" onClick={retrieveData}>
          {" "}
          Fetch Saved Content
        </button>
      </div>
    </div>
  );
};

export default ConversionTool;