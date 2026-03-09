/**
 * Central site content and project data.
 * Add new projects by adding an object to the right category's projects array.
 * Project shapes:
 * - pdf: { title, pdfLink, description }
 * - link: { title, image, link, description }
 * - imageText: { title, image?, paragraphs, status? }
 */

export const siteContent = {
  hero: {
    name: "LUCAS CRAMPTON",
    major: "APPLIED MATH",
    tagline: '"A student just happy to be here."',
    profileImage: "hero-wave-transparent.gif"
  },
  contact: {
    tagline: "Email me any time!",
    email: "lucaschioinocrampton@gmail.com"
  },
  bio: {
    title: "Who I Am",
    image: "profile-lucas.png",
    text: "I'm a student at Olympic College passionate about mathematics and the sciences. When I'm not studying, I enjoy photography, hiking, going on runs, playing videogames, and trying new things. I hope to some day make a positive impact in the world through my work. Growing up with an older sister with cerebral palsy has instilled in me a deep-seated empathy and a drive to help those with special needs. I also have always had a deep appreciation for the natural world and the life that it inhabits. For these reasons, environmental conservation and helping people with disabilities are two causes that are especially important to me.",
    linkedin: "https://www.linkedin.com/in/lucas-crampton-0b9917306/",
    github: "https://github.com/LucasCrampy",
    sisterText: "My younger sister is a data science student at Northeastern and does some cool stuff. Check out her work:",
    sisterImage: "bridget-profile.jpg",
    sisterLinkedin: "https://www.linkedin.com/in/bridget-crampton/",
    sisterGithub: "https://github.com/crbridget"
  },
  education: {
    transfer: {
      date: "EST. 2026 - 2027",
      school: "Bachelor's Transfer",
      badge: "FUTURE GOAL",
      badgeClass: "bg-blue-200 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100",
      description: "Mathematics or Applied Mathematics",
      bgClass: "bg-white dark:bg-slate-800",
      shadowClass: "shadow-[8px_8px_0px_0px_rgba(59,130,246,1)]"
    },
    olympic: {
      date: "JAN 2025 - PRESENT",
      school: "Olympic College",
      badge: "CURRENT",
      badgeClass: "bg-yellow-400 dark:bg-slate-700 text-black dark:text-slate-200",
      description: "Currently on track to complete my Associate's degree. Focusing on challenging myself, learning to enjoy the process of learning new things.",
      mathCourses: [
        { name: "Statistics", status: "completed" },
        { name: "Calculus I", status: "completed" },
        { name: "Calculus II", status: "completed" },
        { name: "Calculus III", status: "completed" },
        { name: "Discrete Math", status: "current" },
        { name: "Differential Eq.", status: "current" },
        { name: "Linear Algebra", status: "future" },
        { name: "Calculus IV", status: "future" }
      ],
      otherCourses: [
        "Intro to Physics",
        "Environmental Science",
        "Java I & II",
        "Intro to Communication"
      ]
    },
    highschool: {
      date: "SUMMER 2023",
      school: "Eagle Harbor High",
      badge: "COMPLETED",
      badgeClass: "bg-slate-400 dark:bg-slate-600 text-white dark:text-slate-200",
      bgClass: "bg-slate-100 dark:bg-slate-800/80 opacity-90"
    }
  },
  experience: [
    { role: "Individual Cargiver", year: "2025 - Present" },
    { role: "Carpentry Apprentice", year: "2025" },
    { role: "Freelance IT Work", year: "2025" },
    { role: "Mouse Magic Toys", year: "2024" },
    { role: "Docs Marina Grill", year: "2023" }
  ]
};

export const projectContent = {
  math: {
    id: "math",
    icon: "calculator",
    title: "Mathematics",
    color: "bg-red-200 dark:bg-slate-800",
    headerTitle: "Math Projects",
    headerSubtitle: "Solving hard problems with math is one of my favorite things. These are some examples of projects I have done for school.",
    cardBadge: "View PDF",
    projects: [
      {
        title: "The Bug Problem",
        pdfLink: "Math-Project-1.pdf",
        description: "A Calculus 3 project analyzing the trajectory of four bugs chasing each other in a square formation. The solution explores both polar coordinate differential equations and geometric series. In the problem sheet we were given, we were guided through the process of solving it with polar quardinates but I came up with a more intuitive way to solve it with geometric series. This method of using a series was kinda builds up from a simpler discrete problem into what is essentially the definition of an integral. I really enjoyed this project because its a great example of how even a simple problem can be solved in a myriad of ways. "
      },
      {
        title: "Keplers Laws",
        pdfLink: "Math-Project-2.pdf",
        description: "This project I used vector calculus and taylor series to derive Kepler's second and third laws from his first law. I liked connecting the physics and astronomy to math concepts we were learning in class and seeing how they all fit together. I also thought it was pretty cool to follow in Keplers footseps in a way and better understand the logic behind the laws."
      }
    ]
  },
  computers: {
    id: "computers",
    icon: "code",
    title: "Computers",
    color: "bg-blue-200 dark:bg-slate-800",
    headerTitle: "Programming & Software",
    headerSubtitle: "Showcasing two applications built with Java. I enjoy a bit of coding here or there and I like the concepts in computer science.",
    projects: [
      {
        title: "Terminal Chess",
        image: "Project1-Screenshot.jpg",
        link: "https://github.com/LucasCrampy/FirstProject_SimpleChessJava",
        description: "This was my final project for my first Java class. I have always enjoyed playing chess and decided to build a simple chess game that can be played in the terminal. For this project I was focused on using the object oriented programming concepts we were learning in class to build a chess board simulation."
      },
      {
        title: "Mold Simulation",
        image: "Project2-Screenshot.jpg",
        link: "https://github.com/LucasCrampy/Final-Project-2.git",
        description: "This is my final project for my second Java class at Olympic College. Its a simple simulation of a mold that grows and spreads in a maze system. The project uses a simple path finding algorithm to determine how the mold spreads and interacts with the environment."
      }
    ]
  },
  photography: {
    id: "photography",
    icon: "camera",
    title: "Photography",
    color: "bg-purple-200 dark:bg-slate-800",
    headerTitle: "Photo Gallery",
    headerSubtitle: "A collection of photos I have taken over the years.",
    images: Array.from({ length: 37 }, (_, i) => `WEBIMG${i + 1}.jpg`)
  },
  science: {
    id: "science",
    icon: "leaf",
    title: "Environmental Science",
    color: "bg-emerald-200 dark:bg-slate-800",
    headerTitle: "Environmental Science",
    headerSubtitle: "Exploring science and stewardship.",
    projects: [
      {
        title: "Passive Acoustic Monitoring",
        image: "AudioMoth-Diagram.jpg",
        paragraphs: [
          "I am building a passive acoustic monitoring device using an <strong>AudioMoth</strong> development board and modifications with parts from AliExpress. With the modifications I should have similary performance to much higher end devices of the same type.",
          "The objective is to deploy this device in the woods to collect raw audio data. Once collected, I will run the data through the Google's <strong>Perch model</strong> to identify bird calls and generate population estimates for local songbird species."
        ],
        status: "Deploying Spring 2026"
      },
      {
        title: "Sustainability Club",
        image: "sustainability-club.jpg",
        paragraphs: [
          "I am a member of the sustainability club at Olympic College, I collaborate with peers on plans aimed at reducing our campus environmental footprint and hosting awareness events."
        ],
        status: null
      }
    ]
  },
  futureProjects: {
    id: "future-projects",
    icon: "lightbulb",
    title: "Future Projects",
    color: "bg-blue-200 dark:bg-slate-800",
    headerTitle: "Future Project Ideas",
    headerSubtitle: "A few ideas I plan to tackle in the future.",
    introParagraphs: [
      "These are some of my future project ideas I will start when I have the time.",
      "While I'm generally busy with school work, I think the best way to learn is to solve hard problems."
    ],
    footerText: "I will update this with new ideas when I get them.",
    cardBadge: "Read More",
    projects: [
      {
        title: "Open Source Speech App",
        image: "char-lucas.jpg",
        paragraphs: [
          "My older sister, Charlotte, has cerebral palsy and is nonverbal. She communicates with a text to speech app on her iPad, and generally feels more comfortable communcating over text. The app she uses costs something like $100 and I thought that was a bit excessive for what it is. I think haveing an opensource alternitive would be great. I think it would be a fun project to refresh my coding skills and I could taylor make the app to meet my sisters needs. ",
        ],
        status: "In Planning Phase"
      }
    ]
  }
};
