export const licenses = [
    {
        id: 0,
        title: 'Attribution',
        abbr: 'by',
        description: 'No Strings Attached: This license lets others distribute, remix, tweak, and build upon your work, even commercially, as long as they credit you for the original creation. This is the most accommodating of licenses offered. Recommended for maximum dissemination and use of licensed materials.',
        icons: [
            "FaCreativeCommons",
            "RiCreativeCommonsByLine"
        ],
        url: "https://creativecommons.org/licenses/by/3.0/es/"
    },
    {
        id: 1,
        title: 'Attribution No Derivative Works',
        abbr: 'by-nd',
        description: 'Share only: This license allows for redistribution, commercial and non-commercial, as long as it is passed along unchanged and in whole, with credit to you.',
        icons: [
            "FaCreativeCommons",
            "RiCreativeCommonsByLine",
            "FaCreativeCommonsNd"
        ],
        url: "https://creativecommons.org/licenses/by-nd/3.0/es/"
    },
    {
        id: 2,
        title: 'Attribution Share Alike',
        abbr: 'by-sa',
        description: 'Remix and Share: This license lets others remix, tweak, and build upon your work even for commercial purposes, as long as they credit you and license their new creations under the identical terms. All new works based on yours will carry the same license, so any derivatives will also allow commercial use. This is the license used by Wikipedia, and is recommended for materials that would benefit from incorporating content from Wikipedia and similarly licensed projects.',
        icons: [
            "FaCreativeCommons",
            "RiCreativeCommonsByLine",
            "FaCreativeCommonsSa"
        ],
        url: "https://creativecommons.org/licenses/by-sa/3.0/es/"
    },
    {
        id: 3,
        title: 'Attribution Non-Commercial',
        abbr: 'by-nc',
        description: "Remix and Share: This license lets others remix, tweak, and build upon your work non-commercially, and although their new works must also acknowledge you and be non-commercial, they don't have to license their derivative works on the same terms.",
        icons: [
            "FaCreativeCommons",
            "RiCreativeCommonsByLine",
            "FaCreativeCommonsNc"
        ],
        url: "https://creativecommons.org/licenses/by-nc/3.0/es/"
    },
    {
        id: 4,
        title: 'Attribution Non-Commercial Share Alike',
        abbr: 'by-nc-sa',
        description: "Remix and Share: This license lets others remix, tweak, and build upon your work non-commercially, as long as they credit you and license their new creations under the identical terms.",
        icons: [
            "FaCreativeCommons",
            "RiCreativeCommonsByLine",
            "FaCreativeCommonsNc",
            "FaCreativeCommonsSa"
        ],
        url: "https://creativecommons.org/licenses/by-nc-sa/3.0/es/"
    },
    {
        id: 5,
        title: 'Attribution Non-Commercial No Derivatives',
        abbr: 'by-nc-nd',
        description: "Remix and Share: This license is the most restrictive of our six main licenses, only allowing others to download your works and share them with others as long as they credit you, but they can't change them in any way or use them commercially.",
        icons: [
            "FaCreativeCommons",
            "RiCreativeCommonsByLine",
            "FaCreativeCommonsNc",
            "FaCreativeCommonsNd"
        ],
        url: "https://creativecommons.org/licenses/by-nc-nd/3.0/es/"
    },
    {
        id: 6,
        title: 'Public Domain',
        description: "No Strings Attached: Works in the public domain are those whose exclusive intellectual property rights have expired, have been forfeited, or are inapplicable. This license allows you to distribute, remix, tweak, and build upon public work, as long as you credit the original creator.",
        icons: [
            "FaCreativeCommons",
            "FaCreativeCommonsPdAlt"
        ],
        url: "https://creativecommons.org/publicdomain/zero/1.0/deed.es_ES"
    },

];

export const adaptations = [
    {
        id: 0,
        title: 'Remix',
    },
    {
        id: 1,
        title: 'Correction'
    },
    {
        id: 2,
        title: 'Derived Copy'
    },
    {
        id: 3,
        title: 'Translation'
    }
]

export let licenseMap = new Map();

licenseMap.set('by', { id: 0, url: 'https://creativecommons.org/licenses/by/3.0/es'});
licenseMap.set('by-nd', { id: 1, url: 'https://creativecommons.org/licenses/by-nd/3.0/es', abbr: 'by-nd'});
licenseMap.set('by-sa', { id: 2, url: 'https://creativecommons.org/licenses/by-sa/3.0/es', abbr: 'by-sa'});
licenseMap.set('by-nc', { id: 3, url: 'https://creativecommons.org/licenses/by-nc/3.0/es', abbr: 'by-nc'});
licenseMap.set('by-nc-sa', { id: 4, url: 'https://creativecommons.org/licenses/by-nc-sa/3.0/es', abbr: 'by-nc-sa'});
licenseMap.set('by-nc-nd', { id: 5, url: 'https://creativecommons.org/licenses/by-nc-nd/3.0/es', abbr: 'by-nc-nd'});
licenseMap.set('zero', { id: 6, url: 'https://creativecommons.org/publicdomain/zero/1.0/deed.es_ES'});


export const materialTypes = [
    "Activity/Lab",
    "Assessment",
    "Case Study",
    "Data Set",
    "Diagram/Illustration",
    "Full Course",
    "Game",
    "Homework/Assignment",
    "Interactive",
    "Lecture",
    "Lecture Notes",
    "Lesson",
    "Lesson Plan",
    "Module",
    "Primary Source",
    "Reading"
]

export const subjectAreas = [
    "Architecture and Design",
    "Computer Science",
    "Engineering",
    "Environmental Science",
    "Health, Medicine and Nursing",
    "Information Science",
    "Art History",
    "Graphic Arts",
    "Languages",
    "Literature",
    "Performing Arts",
    "Philosophy",
    "Religious Studies",
    "World Cultures",
    "Business",
    "Marketing"
]

export const languages = [
    "English",
    "Spanish"
]

export const educationLevels = [
    "Preschool",
    "Lower Primary",
    "Middle School",
    "High School",
    "College",
    "Graduate / Professional",
    "Career/ Technical",
    "Adult Education"
]

export const usages = [
    {
        id: 0,
        title: 'Teaching'
    },
    {
        id: 1,
        title: 'Self Learning'
    },
    {
        id: 2,
        title: 'Assesment'
    },
    {
        id: 3,
        title: 'Course Preparation'
    },
    {
        id: 4,
        title: 'Lecture Class'
    }
]