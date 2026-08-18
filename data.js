/**
 * Fichier central de contenu — modifie ce fichier pour ajouter
 * de nouveaux articles ou événements (en attendant Supabase).
 *
 * ARTICLES : ajoute un objet dans le tableau ARTICLES
 * EVENTS   : ajoute un objet dans le tableau EVENTS (date au format "YYYY-MM-DD")
 */

const CATEGORIES = [
    { id: "all", label: "Tous" },
    { id: "medecine", label: "Médecine" },
    { id: "astronomie", label: "Astronomie" },
    { id: "programmation", label: "Programmation" },
    { id: "informatique", label: "Informatique" },
    { id: "ia", label: "Intelligence artificielle" },
    { id: "biologie", label: "Biologie" },
    { id: "physique", label: "Physique" },
    { id: "chimie", label: "Chimie" },
    { id: "environnement", label: "Environnement" },
    { id: "autres", label: "Autres sciences" },
];

const ARTICLES = [
    {
        id: 1,
        title: "Les mystères de l'univers",
        excerpt: "Explorez les secrets de l'univers et découvrez les dernières avancées en astrophysique.",
        category: "astronomie",
        image: "images/image2.jpeg",
        date: "2026-08-01",
        readTime: "8 min",
    },
    {
        id: 2,
        title: "La biologie moderne",
        excerpt: "Plongez dans le monde fascinant de la biologie et apprenez comment la vie fonctionne au niveau microscopique.",
        category: "biologie",
        image: "images/image3.jpeg",
        date: "2026-07-22",
        readTime: "6 min",
    },
    {
        id: 3,
        title: "Technologies émergentes",
        excerpt: "Découvrez les technologies qui façonnent notre avenir et transforment notre quotidien.",
        category: "informatique",
        image: "images/image4.jpeg",
        date: "2026-07-15",
        readTime: "5 min",
    },
    {
        id: 4,
        title: "L'IA en médecine : révolution diagnostique",
        excerpt: "Comment l'intelligence artificielle aide les médecins à détecter plus tôt cancers et maladies rares.",
        category: "ia",
        image: "images/image2.jpeg",
        date: "2026-06-10",
        readTime: "10 min",
    },
    {
        id: 5,
        title: "Python pour la science des données",
        excerpt: "Initiation à NumPy, Pandas et Matplotlib pour analyser des jeux de données scientifiques.",
        category: "programmation",
        image: "images/image4.jpeg",
        date: "2026-05-28",
        readTime: "12 min",
    },
    {
        id: 6,
        title: "Les exoplanètes habitables",
        excerpt: "Où chercher la vie ailleurs que sur Terre ? Tour d'horizon des découvertes récentes.",
        category: "astronomie",
        image: "images/image2.jpeg",
        date: "2026-05-12",
        readTime: "7 min",
    },
    {
        id: 7,
        title: "Immunothérapie : espoirs et limites",
        excerpt: "Comprendre les traitements qui stimulent le système immunitaire contre le cancer.",
        category: "medecine",
        image: "images/image3.jpeg",
        date: "2026-04-20",
        readTime: "9 min",
    },
    {
        id: 8,
        title: "Cybersécurité et réseaux",
        excerpt: "Les bases de la protection des systèmes informatiques en milieu professionnel.",
        category: "informatique",
        image: "images/image4.jpeg",
        date: "2026-03-15",
        readTime: "11 min",
    },
    {
        id: 9,
        title: "La physique quantique expliquée",
        excerpt: "Superposition, intrication et applications concrètes de la mécanique quantique.",
        category: "physique",
        image: "images/image2.jpeg",
        date: "2026-02-08",
        readTime: "14 min",
    },
    {
        id: 10,
        title: "Chimie verte et durabilité",
        excerpt: "Comment la chimie contribue à des procédés industriels plus respectueux de l'environnement.",
        category: "chimie",
        image: "images/image3.jpeg",
        date: "2026-01-25",
        readTime: "6 min",
    },
    {
        id: 11,
        title: "Changement climatique : état des lieux",
        excerpt: "Données récentes sur le réchauffement et les actions possibles à l'échelle individuelle.",
        category: "environnement",
        image: "images/image4.jpeg",
        date: "2025-12-10",
        readTime: "8 min",
    },
    {
        id: 12,
        title: "Neurosciences et mémoire",
        excerpt: "Comment le cerveau encode, stocke et oublie nos souvenirs.",
        category: "autres",
        image: "images/image3.jpeg",
        date: "2025-11-05",
        readTime: "10 min",
    },
];

const EVENTS = [
    {
        id: 1,
        title: "Conférence sur l'intelligence artificielle",
        description: "Experts et chercheurs partagent les avancées récentes en IA générative et éthique.",
        date: "2026-10-15",
        location: "Paris, France",
        online: true,
    },
    {
        id: 2,
        title: "Atelier de biologie marine",
        description: "Observation et analyse d'écosystèmes marins en laboratory.",
        date: "2026-11-22",
        location: "Marseille, France",
        online: false,
    },
    {
        id: 3,
        title: "Exposition de technologies innovantes",
        description: "Startups et laboratoires présentent leurs prototypes.",
        date: "2026-12-10",
        location: "Lyon, France",
        online: false,
    },
    {
        id: 4,
        title: "Hackathon Python Science",
        description: "48 h pour résoudre un défi scientifique en équipe avec Python.",
        date: "2026-09-05",
        location: "En ligne",
        online: true,
    },
    {
        id: 5,
        title: "Conférence sur l'Intelligence Artificielle",
        description: "Première édition de notre cycle IA et société.",
        date: "2024-07-15",
        location: "Paris, France",
        online: false,
    },
    {
        id: 6,
        title: "Atelier de Biologie Marine",
        description: "Exploration des fonds marins et échantillonnage.",
        date: "2024-08-22",
        location: "Marseille, France",
        online: false,
    },
    {
        id: 7,
        title: "Exposition de Technologies Innovantes",
        description: "Retour sur les innovations présentées en 2024.",
        date: "2024-09-10",
        location: "Lyon, France",
        online: false,
    },
    {
        id: 8,
        title: "Nuit des étoiles",
        description: "Observation du ciel avec télescopes et conférences grand public.",
        date: "2025-08-08",
        location: "Observatoire de Paris",
        online: false,
    },
];

function getCategoryLabel(categoryId) {
    const cat = CATEGORIES.find((c) => c.id === categoryId);
    return cat ? cat.label : categoryId;
}

function formatDate(dateStr) {
    return new Date(dateStr + "T12:00:00").toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

function formatEventDateParts(dateStr) {
    const date = new Date(dateStr + "T12:00:00");
    const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"];
    return {
        day: date.getDate(),
        month: months[date.getMonth()],
    };
}

function isEventUpcoming(dateStr) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(dateStr + "T12:00:00");
    return eventDate >= today;
}

function sortEventsByDate(events, ascending = true) {
    return [...events].sort((a, b) => {
        const diff = new Date(a.date) - new Date(b.date);
        return ascending ? diff : -diff;
    });
}

function getRecentArticles(limit = 3) {
    return [...ARTICLES]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, limit);
}

function getUpcomingEvents() {
    return sortEventsByDate(EVENTS.filter((e) => isEventUpcoming(e.date)), true);
}

function getPastEvents() {
    return sortEventsByDate(EVENTS.filter((e) => !isEventUpcoming(e.date)), false);
}

function groupArticlesByCategory(articles) {
    const groups = {};
    articles.forEach((article) => {
        if (!groups[article.category]) {
            groups[article.category] = [];
        }
        groups[article.category].push(article);
    });
    return groups;
}
