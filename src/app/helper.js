export const createPostsTemplate = (userDid, data2send, conversion_type) => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    
    return {
      content: data2send, 
      conversion_type: conversion_type,
      currentDate: currentDate,
      currentTime: currentTime,
      author: userDid,  
    };
  };


export const contemeleonProtocolDefinition = () => {
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

export const getProtocol = async (web5, did) => {
    await web5.dwn.protocols.query({
      from: did,
      message: {
        filter: {
          protocol: "https://contemeleon.app/content-conversions",
        },
      },
    });
  };

export const installContemeleonProtocolRemotely = async (
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
 export const configureContemeleonProtocol = async (web5, did) => {
    const protocolDefinition = contemeleonProtocolDefinition();
    const protocolUrl = protocolDefinition.protocol;

    const remoteProtocolResponse = await getProtocol(web5, did, protocolUrl);
    const { protocols: remoteProtocols, status: remoteProtocolStatus } = remoteProtocolResponse || {};
    // if (!remoteProtocols || !remoteProtocolStatus) return 'not found';
    
    if (!remoteProtocolStatus || !remoteProtocols) {
      const result = await installContemeleonProtocolRemotely(
        web5,
        did,
        protocolDefinition
      );
      console.log({ result });
      console.log("Protocol installed successfully");
    }
  };

 export const saveContent = async () => {
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

export const retrieveData = async () => {
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

  export const installContemeleonProtocolLocally = async (
    web5,
    protocolDefinition
  ) => {
    return await web5.dwn.protocols.configure({
      message: {
        definition: protocolDefinition,
      },
    });
  };

  