import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  yourlogo
} from "../assets";
import crossmint from '../assets/socials/crossmint.png';
import metamask from '../assets/socials/metamask.png';
import chainlink from '../assets/socials/chainlink.png';
import thirdweb from '../assets/socials/thirdweb.png';
import usdc from '../assets/socials/usdc.png';
import dogecoin from '../assets/socials/dogecoin.png';

export const navigation = [
  {
    id: "0",
    title: "Features",
    url: "#features",
  },
  {
    id: "1",
    title: "Categories",
    url: "#pricing",
  },
  {
    id: "2",
    title: "Buy",
    url: "#how-to-use",
  },
  {
    id: "3",
    title: "Roadmap",
    url: "#roadmap",
  },
  {
    id: "4",
    title: "New account",
    url: "#signup",
    onlyMobile: true,
  }
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];

export const brainwaveServices = [
  "Photo generating",
  "Photo enhance",
  "Seamless Integration",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "Voice recognition",
    text: "Enable the chatbot to understand and respond to voice commands, making it easier for users to interact with the app hands-free.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Gamification",
    text: "Add game-like elements, such as badges or leaderboards, to incentivize users to engage with the chatbot more frequently.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Chatbot customization",
    text: "Allow users to customize the chatbot's appearance and behavior, making it more engaging and fun to interact with.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Integration with APIs",
    text: "Allow the chatbot to access external data sources, such as weather APIs or news APIs, to provide more relevant recommendations.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap4,
  },
];

export const collabText =
  "Users will be able to connect in the Dapp using Metamask, For taking part in the Presale and Buy tokens easily.";

export const collabContent = [
  {
    id: "0",
    title: "Metamask Integration",
    text: collabText,
  },
  {
    id: "1",
    title: "USDC and Credit Cards available",
  },
  {
    id: "2",
    title: "Including Admin Dashboard",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Crossmint",
    icon: crossmint,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: metamask,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Discord",
    icon: dogecoin,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Slack",
    icon: thirdweb,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: chainlink,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Protopie",
    icon: usdc,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Framer",
    icon: chainlink,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Raindrop",
    icon: thirdweb,
    width: 38,
    height: 32,
  },
];

export const pricing = [
  {
    id: "0",
    title: "Basic",
    description: "AI chatbot, personalized recommendations",
    price: "0",
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
  },
  {
    id: "1",
    title: "Premium",
    description: "Advanced AI chatbot, priority support, analytics dashboard",
    price: "9.99",
    features: [
      "An advanced AI chatbot that can understand complex queries",
      "An analytics dashboard to track your conversations",
      "Priority support to solve issues quickly",
    ],
  },
  {
    id: "2",
    title: "Enterprise",
    description: "Custom AI chatbot, advanced analytics, dedicated account",
    price: null,
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
  },
];

export const benefits = [
  {
    id: "0",
    title: "Transaction Medium",
    text: "ERC20 tokens can be used as a medium of exchange within decentralized applications (DApps) and blockchain ecosystems.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "1",
    title: "Investment Uses",
    text: "Investors can buy ERC20 tokens as a speculative investment, aiming to profit from potential increases in their value over time.",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "2",
    title: "Tokenized Assets",
    text: "ERC20 tokens can represent ownership of real-world assets, such as real estate or artwork, allowing for fractional ownership and easier transfer.",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
  },
  {
    id: "3",
    title: "Governance UseCases",
    text: "Some ERC20 tokens confer voting rights or decision-making power within their associated projects, allowing holders to participate in governance processes.",
    backgroundUrl: "./src/assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "4",
    title: "Utility",
    text: "Many ERC20 tokens serve a specific purpose within their respective ecosystems, such as accessing certain services within DApp.",
    backgroundUrl: "./src/assets/benefits/card-5.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "5",
    title: "Crowdfunding",
    text: "ERC20 tokens are commonly used in initial coin offerings (ICOs) or token sales as a means of raising funds for blockchain projects.",
    backgroundUrl: "./src/assets/benefits/card-6.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
  },
];

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];
