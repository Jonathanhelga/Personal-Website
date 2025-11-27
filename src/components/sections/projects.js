// data/projects.js
export const projects = [
    {
        id: 1,
        title: "Project Flowerly",
        name: 'Front-end Developer (Lead Frontend & 3D Graphics) (school group project)',
        description: [
        "My role on this project is led the technical decision-making process to solve the project's visualization requirement, evaluated multiple frameworks and selecting Three.js to leverage the team's existing proficiency and ensure rapid feature delivery within strict project timelines.",
        "architected and implemented the core 3D customization engine using Three.js, enabling users to dynamically interact with flowers and assemble bouquet models in real-time.",
        "Translating complex 3D concepts into a user-friendly 2D interface, allowing for the seamless manipulation of individual flower."
        ],
        vimeoId: "1140667898",
        technologies: ["ThreeJS", "MongoDB", "Node.js + Express"],
        githubUrl: "https://github.com/juliobellano/flowerly.git",
    },
    {
        id: 2,
        title: "Project MiniPOS",
        name: 'Business Point-of-Sales Desktop App',
        description: [
            "I  developed a Point-of-Sale (POS) desktop application because my parents needed one and preffered not to pay a monthly POS subscription.",
            "My app uses SQLite as its database and runs offline, allowing it to handle and store data without any internet connection",
            "It manages product details, handles customer orders, and updates inventory in real time after each transaction(synchronization).",
            "User can generate barcodes for every product based on its SKU, and the app also provides a ready-to-print barcode label design.",
            "The app allows users to update inventory levels and set minimum stock threshold, if it belows, alert will be displayed.",
            "I also implemented a RESTful API using Express Router, including server-side validation."
        ],
        vimeoId: "1136838970",
        technologies: ["Electron", "SQLite", "Node.js + Express"],
        githubUrl: "https://github.com/Jonathanhelga/Small-Business-POS.git",
    },
    // https://vimeo.com/1136838970?fl=ip&fe=ec
        {
        id: 3,
        title: "Project CaterFlow",
        name: 'Catering Management Web Application',
        description: [
            "I create a full stack catering management system to handle core operations and data storing for small catering business.",
            "User can store their customers, products, and vendors details inside MySQL database, I use CRUD (Create, Read, Update, Delete) system.",
            "User also can process new orders based on the products stored inside the system and also generate a ready-printed designed invoice.",
            "I create a search column, for search all historical stored business data.",
            "There are still a lot of room to improve this web-app."
        ],
        vimeoId: "1136838939",
        technologies: ["PHP", "MariaDB", "JavaScript"],
        githubUrl: "https://github.com/Jonathanhelga/catering.git",
    },
    // https://vimeo.com/1136838939?fl=ip&fe=ec
];

{/* <iframe src="https://player.vimeo.com/video/1136838970?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" width="3548" height="2304" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" title="ProjectPOS"></iframe> */}
{/* <iframe src="https://player.vimeo.com/video/1140667898?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" width="3600" height="2044" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" title="Screen Recording 2025-11-26 at 13.46.34"></iframe> */}
