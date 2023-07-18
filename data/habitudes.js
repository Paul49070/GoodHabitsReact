const getRandomPercentage = () => Math.floor(Math.random() * 100);

const generateRandomHabitudes = () => {

  const titles = [
    {titre: "Running", icon: require('../img/HabitsIcons/run.png') },
    {titre: "Manger sain", icon: require('../img/HabitsIcons/healthy.png')},
    {titre: "Lire", icon: require('../img/HabitsIcons/books.png')},
    {titre: "Méditer", icon: require('../img/HabitsIcons/meditation.png')},
    {titre: "Faire du sport", icon: require('../img/HabitsIcons/bike.png')},
    {titre: "Étudier", icon: require('../img/HabitsIcons/books.png')},
    {titre: "Yoga", icon: require('../img/HabitsIcons/meditation.png')},
    {titre: "Peindre", icon: require('../img/HabitsIcons/pencil.png')},
    {titre: "Marcher", icon: require('../img/HabitsIcons/run.png')},
    {titre: "Écrire", icon: require('../img/HabitsIcons/pencil.png')},
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

  const states = [
    "done",
    "todo",
    "cancel",
    "skip"
  ]

  const habitudes = titles.map(({titre, icon}, index) =>
  {
      const totalSteps = Math.floor(Math.random() * 9) + 1;

      return {
        
        titre: titre,
        pourcentage: getRandomPercentage(),
        color: colors[index % colors.length],
        state: states[Math.floor(Math.random() * states.length)],
        totalSteps: totalSteps,
        icon: icon,
        doneSteps:  Math.floor(Math.random() * totalSteps) + 1,
        id: (index + 1).toString(),
      }
  });

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