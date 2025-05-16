import {
  FaChalkboardTeacher,
  FaChartLine,
  FaCode,
  FaDatabase,
  FaJava,
  FaLinux,
  FaMoneyBillWave,
  FaPercent,
  FaRobot,
  FaServer,
  FaSortAmountDownAlt,
} from "react-icons/fa";
import { LuPartyPopper } from "react-icons/lu";
import { IoMdColorPalette, IoMdSettings } from "react-icons/io";
import { MdDownload, MdOutlineQueryStats } from "react-icons/md";
import {
  FaFigma,
  FaLocationCrosshairs,
  FaLock,
  FaNodeJs,
  FaPython,
  FaReact,
} from "react-icons/fa6";
import { TbBrandThreejs, TbChartBubbleFilled } from "react-icons/tb";
import { GiClown, GiCoinsPile, GiFamilyTree } from "react-icons/gi";
import { BsLightningFill, BsSignMergeRightFill, BsYinYang } from "react-icons/bs";
import { FiLayout } from "react-icons/fi";
import { RiSpeakFill } from "react-icons/ri";
import { PiTestTubeFill } from "react-icons/pi";
import { IoConstruct, IoSparkles } from "react-icons/io5";
import {
  SiCplusplus,
  SiCss3,
  SiDatabricks,
  SiExpress,
  SiGo,
  SiHtml5,
  SiJupyter,
  SiMongodb,
  SiNumpy,
  SiPostman,
  SiPytorch,
  SiRobloxstudio,
  SiSocketdotio,
  SiTypescript,
  SiVisualstudiocode,
} from "react-icons/si";

import yipyap from "/src/Assets/Images/Projects/YipYap/YipYap.png";
import bikeWatching from "/src/Assets/Images/Projects/BikeWatching.png";
import sortingViz from "/src/Assets/Images/Projects/SortingVisualizer/SortingVisualizer.png";
import boids from "/src/Assets/Images/Blog/Boids.gif";
import wave from "/src/Assets/Images/Blog/WaveSimulation.png";
import altruism from "/src/Assets/Images/Blog/Altruism.png";

export const projects = [
  {
    name: "Project Aether",
    year: 2021,
    description:
      "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "",
  },
  {
    name: "Neural Nexus",
    year: 2022,
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
    image: "",
  },
  {
    name: "Quantum Flux",
    year: 2023,
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.",
    image: "",
  },
  {
    name: "Echo Grid",
    year: 2021,
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
    image: "",
  },
  {
    name: "Synthwave Engine",
    year: 2022,
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    image: "",
  },
  {
    name: "Nova Protocol",
    year: 2024,
    description:
      "Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae.",
    image: "",
  },
  {
    name: "Orbital Mesh",
    year: 2023,
    description:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.",
    image: "",
  },
  {
    name: "Helix Compiler",
    year: 2025,
    description:
      "Magni dolores eos qui ratione voluptatem sequi nesciunt, neque porro quisquam est qui dolorem.",
    image: "",
  },
  {
    name: "Spectral Core",
    year: 2022,
    description:
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae.",
    image: "",
  },
  {
    name: "Bike Watching",
    year: 2025,
    description:
      "Ever wonder where and when people ride bikes in Boston? Yeah, me neither. But I made a website to track it.",
    image: bikeWatching,
    link: "https://theboyroy05.github.io/BikeWatching/"
  },
  {
    name: "YipYap",
    year: 2024,
    description: "The Chat App for Yappers",
    image: yipyap,
    link: "/yipyap",
    tech: {
      React: <FaReact />,
      TypeScript: <SiTypescript />,
      MongoDB: <SiMongodb />,
      Express: <SiExpress />,
      Node: <FaNodeJs />,
      Figma: <FaFigma />,
      Postman: <SiPostman />,
      SocketIO: <SiSocketdotio />,
    },
    design: [
      {
        title: "User Experience is key - ",
        text: "A clean and simple UI that is easy to navigate and understand.",
        symbol: <FiLayout />,
      },
      {
        title: "Blending tradition with innovation - ",
        text: "Preserving tried and true features from other chat apps while introducing new and exciting ones.",
        symbol: <BsYinYang />,
      },
      {
        title: "What Yappers need - ",
        text: "Prioritizing features that allow for maximum user engagement, including AI suggestions to keep conversations flowing.",
        symbol: <RiSpeakFill />,
      },
      {
        title: "Future color themes - ",
        text: "Designing in grayscale for flexibility in future color themes.",
        symbol: <IoMdColorPalette />,
      },
    ],
    api: [
      {
        title: "Security - ",
        text: "Industry practices like password hashing, user authentication middleware, and session management ensures a secure experience.",
        symbol: <FaLock />,
      },
      {
        title: "Testing - ",
        text: "Frequent testing using Postman ensures a stable and reliable API, ensuring minimal downtime and maximized functionality.",
        symbol: <PiTestTubeFill />,
      },
      {
        title: "AI Suggestions - ",
        text: "Using Mintral AI's API with custom prompting to generate text suggestions keeps conversations flowing.",
        symbol: <IoSparkles />,
      },
      {
        title: "Visualizing the API - ",
        text: "Tableau allows us to visualize the current YipYap API endpoints in use. As YipYap grows, so will this graph.",
        symbol: <GiFamilyTree className="rotate-180 text-3xl" />,
      },
    ],
  },
  {
    name: "Sorting Visualizer",
    year: 2024,
    description: "Visualize your favorite sorting algorithms",
    image: sortingViz,
    link: "/sorting-visualizer",
    tech: {
      React: <FaReact />,
      TypeScript: <SiTypescript />,
    },
    priorities: [
      {
        title: "Keep it simple, yet fun to use.",
        text: "Even a child should be able to use and enjoy playing with it.",
        symbol: <LuPartyPopper />,
      },
      {
        title: "A variety of sorting algorithms.",
        text: "At least 5 to start with, but the more the merrier.",
        symbol: <FaSortAmountDownAlt className="rotate-[270deg]" />,
      },
      {
        title: "A myriad of settings to tweak.",
        text: "So you can see where each algorithm shines and where it falls.",
        symbol: <IoMdSettings />,
      },
      {
        title: "Live statistics.",
        text: "So you can track the performance of each algorithm in real time.",
        symbol: <MdOutlineQueryStats />,
      },
    ],
    algorithms: [
      {
        title: "Selection Sort:",
        text: "An algorithm which goes over the list and 'selects' the next item to sort.",
        symbol: <FaLocationCrosshairs />,
      },
      {
        title: "Bubble Sort:",
        text: "An algorithm which runs through a list, comparing adjacent values, performing swaps when necessary, allowing items towards the end to 'bubble' up.",
        symbol: <TbChartBubbleFilled />,
      },
      {
        title: "Insertion Sort:",
        text: "An algorithm which sorts a list by iteratively 'inserting' each item into their sorted place.",
        symbol: <MdDownload />,
      },
      {
        title: "Heap Sort:",
        text: "An algorithm which uses a data structure called a 'heap' to heapify the list before sorting it.",
        symbol: <GiCoinsPile />,
      },
      {
        title: "Quick Sort:",
        text: "A recursive algorithm which chooses a 'partition' and recursively splits the list into two parts, one with items less than the partition, and the other with items that are greater.",
        symbol: <BsLightningFill />,
      },
      {
        title: "Merge Sort:",
        text: "A recursive algorithm which splits the list in half and recursively sorts them before 'merging' them together.",
        symbol: <BsSignMergeRightFill />,
      },
      {
        title: "Bozo Sort:",
        text: "A terrible algorithm which checks if the list is sorted and if not, swaps two random elements, repeating this process until the list is sorted.",
        symbol: <GiClown />,
      },
    ],
  },
];

export const articles = [
  {
    title: "Boids Simulation",
    time: "January 2025",
    description:
      "Boids are an elegant demonstration of how complex, lifelike group behavior can emerge from simple rules applied to individual agents. These agents can simulate realistic movements such as swarming, avoiding obstacles, and following leaders. It's mesmerizing to witness—and even more fascinating to simulate.",
    image: boids,
    link: "https://medium.com/@issacroy05/boids-simulating-flocks-e11c121a35cc",
    tech: {
      React: <FaReact />,
      TypeScript: <SiTypescript />,
      ThreeJS: <TbBrandThreejs />,
    },
  },
  {
    title: "Wave Simulation",
    time: "June 2024",
    description:
      "The wave equation is a 2nd-order PDE used to describe wave phenomena such as mechanical and electromagnetic waves. This article explores solving the wave equation using the finite difference method in 1D and 2D, covering discretization, damping, and various boundary conditions.",
    image: wave,
    link: "https://medium.com/@issacroy05/a-simple-wave-simulation-35bee02c172b",
    tech: {
      Python: <FaPython />,
      Numpy: <SiNumpy />,
    },
  },
  {
    title: "Altruism",
    time: "February 2024",
    description:
      "Humans are unique due to altruism, prioritizing others' well-being, which contradicts economic models and is absent in even our closest relatives, chimpanzees. Through various simulations, including adding mutations and intelligent decision-making, this article explores evolutionary and traditional game theory.",
    image: altruism,
    link: "https://medium.com/cognitive-neuroeconomics/decoding-altruism-ccd72547d20e",
    tech: {
      Python: <FaPython />,
      Numpy: <SiNumpy />,
    },
  },
];

export const courses = [
  {
    title: "Data Structures and Algorithms: ",
    text: "Hands-on projects in Java with stacks, queues, trees, and key algorithmic techniques.",
    symbol: <FaCode />,
  },
  {
    title: "Optimization Methods for Data Science: ",
    text: "Covers convexity, optimization techniques, SVMs, and efficient algorithmic methods.",
    symbol: <MdOutlineQueryStats />,
  },
  {
    title: "The Application of Data Science: ",
    text: "Covers the full data science lifecycle: algorithms, ML, stats, systems, and visualization.",
    symbol: <SiDatabricks />,
  },
  {
    title: "Introduction to Data Management: ",
    text: "Intro to SQL, schema design, database architecture, and data-backed applications.",
    symbol: <FaDatabase />,
  },
  {
    title: "Systems for Scalable Analytics: ",
    text: "Explore systems like Hadoop and Spark for large-scale data analysis and processing.",
    symbol: <FaServer />,
  },
  {
    title: "Introduction to Data Visualization: ",
    text: "Covers D3, visualization principles, and interaction design for exploring data visually.",
    symbol: <FaChartLine />,
  },
  {
    title: "Probability and Statistics: ",
    text: "Covers probability, distributions, estimation, confidence intervals, and hypothesis testing.",
    symbol: <FaPercent />,
  },
  {
    title: "Machine Learning - Learning Algorithms: ",
    text: "Intro to supervised/unsupervised ML: k-NN, trees, boosting, clustering, and more.",
    symbol: <FaRobot />,
  },
];

export const experience = [
  {
    title:
      "Data Science Student Society (DS3) | Assistant Director of Infrastructure | Fall '24 - Present: ",
    text: "Leading a team to redesign, program, and deploy a new website for DS3, along with a consulting division website. Improved team productivity through the Agile methodology, streamlining development workflows.",
    symbol: <IoConstruct />,
  },
  {
    title: "San Diego Taxpayer's Association | Data Science Intern | Oct '24 - Jan '25: ",
    text: "Implemented a social media web scraper to gather data to perform sentiment analysis on current county policies. This is to make a public tool for SD Taxpayers and policymakers to see sentiments towards certain policies.",
    symbol: <FaMoneyBillWave />,
  },
  {
    title: "Mathnasium | Learning Instructor | July '22 - June '24: ",
    text: "Instructed over 50 students of ages 5-18 using customized curriculums while consistently assessing mastery of previous topics, resulting in over 90% of students seeing improvements in test scores and improvement in their math skills.",
    symbol: <FaChalkboardTeacher />,
  },
];

export const skills = {
  Languages: {
    Python: <FaPython />,
    TypeScript: <SiTypescript />,
    SQL: <FaDatabase />,
    Java: <FaJava />,
    "C++": <SiCplusplus />,
    Go: <SiGo />,
    HTML: <SiHtml5 />,
    CSS: <SiCss3 />,
  },
  "Developer Tools": {
    VSCode: <SiVisualstudiocode />,
    Postman: <SiPostman />,
    Jupyter: <SiJupyter />,
    Git: <BsSignMergeRightFill />,
    MongoDB: <SiMongodb />,
    Figma: <FaFigma />,
    "Roblox Studio": <SiRobloxstudio />,
  },
  "Technologies/Frameworks": {
    React: <FaReact />,
    NodeJS: <FaNodeJs />,
    Express: <SiExpress />,
    D3: <TbChartBubbleFilled />,
    ThreeJS: <TbBrandThreejs />,
    SocketIO: <SiSocketdotio />,
    PyTorch: <SiPytorch />,
    Linux: <FaLinux />,
  },
};
