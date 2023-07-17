const getRandomPercentage = () => Math.floor(Math.random() * 100);

const generateRandomHabitudes = () => {

  const titles = [
    "Running",
    "Manger sain",
    "Lire",
    "Méditer",
    "Faire du sport",
    "Étudier",
    "Yoga",
    "Peindre",
    "Marcher",
    "Écrire",
  ];
  
  const colors = [
    "#ff4766",
    "#0cf6b7",
    "#ffa500",
    "#800080",
    "#00ff00",
    "#0000ff",
    "#ff00ff",
    "#ffff00",
    "#008080",
    "#ff6347",
  ];
  const habitudes = titles.map((titre, index) => ({
    titre,
    duree: Math.floor(Math.random() * 5) + 1,
    pourcentage: getRandomPercentage(),
    color: colors[index % colors.length],
    id: (index + 1).toString(),
  }));

  return habitudes;
};

const imagePaths = [
  require('../img/FreeFacesPack/x500/45m.jpg'),
  require('../img/FreeFacesPack/x500/02m.jpg'),
  require('../img/FreeFacesPack/x500/06w.jpg'),
  require('../img/FreeFacesPack/x500/04w.jpg'),
  require('../img/FreeFacesPack/x500/05w.jpg'),
  require('../img/FreeFacesPack/x500/06w.jpg'),
  require('../img/FreeFacesPack/x500/07w.jpg'),
  require('../img/FreeFacesPack/x500/08m.jpg'),
  require('../img/FreeFacesPack/x500/09w.jpg'),
  require('../img/FreeFacesPack/x500/10m.jpg'),
  require('../img/FreeFacesPack/x500/11m.jpg'),
  require('../img/FreeFacesPack/x500/12m.jpg'),
  require('../img/FreeFacesPack/x500/13m.jpg'),
  require('../img/FreeFacesPack/x500/14m.jpg'),
  require('../img/FreeFacesPack/x500/15w.jpg'),
  require('../img/FreeFacesPack/x500/15w.jpg'),
  require('../img/FreeFacesPack/x500/16w.jpg'),
  require('../img/FreeFacesPack/x500/17w.jpg'),
  require('../img/FreeFacesPack/x500/18w.jpg'),
  require('../img/FreeFacesPack/x500/19m.jpg'),
  require('../img/FreeFacesPack/x500/20w.jpg'),
  require('../img/FreeFacesPack/x500/21w.jpg'),
  require('../img/FreeFacesPack/x500/22w.jpg'),
  require('../img/FreeFacesPack/x500/23w.jpg'),
  require('../img/FreeFacesPack/x500/24w.jpg'),
  require('../img/FreeFacesPack/x500/25w.jpg'),
  require('../img/FreeFacesPack/x500/26m.jpg'),

];

const names = [
  "Anthony", "Emma", "Louis", "Chloe", "Gabriel", "Ines", "William", "Olivia",
  "Thomas", "Charlotte", "Leo", "Sophia", "Maxime", "Alice", "Hugo", "Julia",
  "Alexandre", "Eva", "Nicolas", "Zoe", "Mathis", "Lena", "Raphael", "Camille",
  "Arthur", "Emma"
];

const generateFriends = () => {

  const friends = []

  for(let i = 0; i<26; ++i)
  { 
    friends.push({nom: names[i], image: imagePaths[i], id: i})
  }

  return friends
}

const generateRandomContributors = (habitudes) => {

  const contributors = [];

  habitudes.forEach((habitude) => {
    const randomContributorsCount = Math.floor(Math.random() * (names.length + 1));

    for (let i = 0; i < randomContributorsCount; i++) {

      const randomFriend = Friends[Math.floor(Math.random() * Friends.length)];

      console.log(randomFriend)

      const contributor = {
        nom: randomFriend.name,
        pourcentage: getRandomPercentage(),
        habitude: habitude.titre,
        image: randomFriend.image,
        id: randomFriend.id
      };

      contributors.push(contributor);
    }
  });

  return contributors;
};

const Habitudes = generateRandomHabitudes();
const Friends = generateFriends()
const ContributorsHabits = generateRandomContributors(Habitudes);

export { Habitudes, ContributorsHabits, Friends };