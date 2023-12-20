import image from "./assets/image.svg";
import video from "./assets/video.svg";
import audio from "./assets/audio.svg";
import text from "./assets/text.svg";
import facebook from "./assets/facebook.svg";
import linkedin from "./assets/linkedin.svg";
import twitter from "./assets/twitter.svg";
import instagram from "./assets/instagram.svg";
import snapchat from "./assets/snapchat.svg";
import tiktok from "./assets/tiktok.svg";

export const navData = [
  {
    key: "features",
    id: 1,
    name: "Features",
    link: "/features",
  },
  {
    key: "templates",
    id: 2,
    name: "Templates",
    link: "/templates",
  },
  {
    key: "about",
    id: 3,
    name: "About",
    link: "/about",
  },
  {
    key: "create",
    id: 4,
    name: "Create content 🪄",
    link: "/create",
  },
];

export const platforms = [
  {
    name: "Facebook post",
    value: "facebook",
    icon: facebook,
  },
  {
    name: "LinkedIn post",
    value: "linkedin",
    icon: linkedin,
  },
  {
    name: "Tweet",
    value: "twitter",
    icon: twitter,
  },
  {
    name: "Instagram post",
    value: "instagram",
    icon: instagram,
  },
  {
    name: "Snapchat caption",
    value: "snapchat",
    icon: snapchat,
  },
  {
    name: "TikTok script",
    value: "tiktok",
    icon: tiktok,
  },
];

export const contentTypes = [
  {
    name: "Image content",
    value: "image",
    icon: image,
  },
  {
    name: "Video content",
    value: "video",
    icon: video,
  },
  {
    name: "Audio content",
    value: "audio",
    icon: audio,
  },
  {
    name: "Text content",
    value: "text",
    icon: text,
  },
];