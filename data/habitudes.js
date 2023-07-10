const getRandomPercentage = () => Math.floor(Math.random() * 100);

const generateRandomHabitudes = () => {

  const titles = ["Running", "Manger sain", "Lire", "Méditer", "Faire du sport", "Étudier"];
  const colors = ["#ff4766", "#0cf6b7", "#ffa500", "#800080", "#00ff00", "#0000ff"];

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
  require('../img/ProfilPicture/Memoji-01.png'),
  require('../img/ProfilPicture/Memoji-02.png'),
  require('../img/ProfilPicture/Memoji-03.png'),
  require('../img/ProfilPicture/Memoji-04.png'),
  require('../img/ProfilPicture/Memoji-05.png'),
  require('../img/ProfilPicture/Memoji-06.png'),
  require('../img/ProfilPicture/Memoji-07.png'),
  require('../img/ProfilPicture/Memoji-08.png'),
  require('../img/ProfilPicture/Memoji-09.png'),
  require('../img/ProfilPicture/Memoji-10.png'),
  require('../img/ProfilPicture/Memoji-11.png'),
  require('../img/ProfilPicture/Memoji-12.png'),
  require('../img/ProfilPicture/Memoji-13.png'),
  require('../img/ProfilPicture/Memoji-14.png'),
  require('../img/ProfilPicture/Memoji-15.png'),
  require('../img/ProfilPicture/Memoji-16.png'),
  require('../img/ProfilPicture/Memoji-17.png'),
  require('../img/ProfilPicture/Memoji-18.png'),
  require('../img/ProfilPicture/Memoji-19.png'),
  require('../img/ProfilPicture/Memoji-20.png'),
  require('../img/ProfilPicture/Memoji-21.png'),
  require('../img/ProfilPicture/Memoji-22.png'),
  require('../img/ProfilPicture/Memoji-23.png'),
  require('../img/ProfilPicture/Memoji-24.png'),
  require('../img/ProfilPicture/Memoji-25.png'),
  require('../img/ProfilPicture/Memoji-26.png'),
];

const generateRandomContributors = (habitudes) => {

  const names = ["Anthony", "Emma", "Louis", "Chloe", "Gabriel", "Ines"];
  const pathNameImage = "../img/ProfilPicture/Memoji-";


  const contributors = [];

  habitudes.forEach((habitude) => {
    const randomContributorsCount = Math.floor(Math.random() * (names.length + 1));

    for (let i = 0; i < randomContributorsCount; i++) {

      const randomImageIndex = Math.floor(Math.random() * imagePaths.length);

      const contributor = {
        nom: names[Math.floor(Math.random() * names.length)],
        pourcentage: getRandomPercentage(),
        habitude: habitude.titre,
        image: imagePaths[randomImageIndex],
      };
      contributors.push(contributor);
    }
  });

  return contributors;
};

const Habitudes = generateRandomHabitudes();
const ContributorsHabits = generateRandomContributors(Habitudes);

export { Habitudes, ContributorsHabits };