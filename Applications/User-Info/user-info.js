import { dragElement } from "../../util/draggable.js";
import { buildToolBar } from "../../util/ToolBar.js";

let tagLines = [
  "I'm a Full Stack Developer based in India.",
  "I love exploring three.js",
];

let skillArr = [
  ["fab fa-js", "background-color: yellow; color: black"],
  ["fab fa-html5", "background-color: orange; color: white"],
  ["fab fa-css3-alt", "background-color: skyblue; color: white"],
  ["fab fa-angular", "background-color: red; color: white"],
  ["fab fa-java", "background-color: white; color: blue"],
  ["fab fa-docker", "background-color: white; color: skyblue"],
];

let contacts = [
  `<a href="https://www.linkedin.com/in/shravan-kumar-udupa/"><i class="fab fa-linkedin"></i></a>`,
  `<a href="https://twitter.com/shravankumarui"><i class="fab fa-twitter-square"></i></a>`,
  `<a href="mailto:shravankumar.udupa@gmail.com"><i class="fab fa-facebook-square"></i></a>`,
];

let contactClasses = ["linked-in", "twitter", "gmail"];

const arena = document.getElementById("arena");
document
  .getElementById("userCardTrigger")
  .addEventListener("click", createCard);

function createCard() {
  const userCard = document.createElement("div");
  userCard.classList.add("user-card");
  userCard.id = "user-card";
  userCard.appendChild(
    buildToolBar(
      userCard,
      "userCardToolbar",
      "userCardToolbar",
      "Shravan Kumar"
    )
  );
  userCard.appendChild(createUserOverView());
  userCard.appendChild(createUserDetails());
  userCard.appendChild(createUserContact());
  arena.appendChild(userCard);
  dragElement(userCard, document.getElementById("userCardToolbar"));
}

function createUserOverView() {
  const userOverView = document.createElement("div");
  userOverView.classList.add("user-overview");
  const userSpacer = document.createElement("div");
  userSpacer.classList.add("user-spacer");
  const userImage = document.createElement("div");
  userImage.classList.add("user-image");
  const userTagLine = document.createElement("div");
  userTagLine.classList.add("user-tagline");

  for (let tag of tagLines) {
    const el = document.createElement("div");
    el.innerHTML = tag;
    userTagLine.appendChild(el);
  }
  userSpacer.appendChild(userImage);
  userSpacer.appendChild(userTagLine);

  userOverView.appendChild(userSpacer);

  return userOverView;
}

function createUserDetails() {
  const userDetails = document.createElement("div");
  userDetails.classList.add("user-details");

  const userSkills = document.createElement("div");
  userSkills.classList.add("user-skills");

  skillArr.forEach((arr) => {
    const skillIcon = document.createElement("i");
    arr[0].split(" ").forEach((cls) => skillIcon.classList.add(cls));
    skillIcon.style = arr[1];
    userSkills.appendChild(skillIcon);
  });

  const userWorks = document.createElement("div");
  userWorks.classList.add("user-works");
  userWorks.innerHTML = `
  <a target="_blank" href="https://stardragoncoder.github.io/Skui-OS/"
          >RocketOS</a
        >
        <a
          target="_blank"
          href="https://stardragoncoder.github.io/Solar-System/"
          >SolarSystem</a
        >
  `;
  const userEducation = document.createElement("div");
  userEducation.classList.add("user-education");
  userEducation.innerHTML = `
  <div class="edu">Btech in CSE</div>
        <div class="edu">NITK</div>
        <div class="edu">India</div>
  `;
  const userWorkExp = document.createElement("div");
  userWorkExp.classList.add("user-workExp");
  userWorkExp.innerHTML = `
  7+ years Software development Experience
  `;

  userDetails.appendChild(userSkills);
  userDetails.appendChild(userWorks);
  userDetails.appendChild(userEducation);
  userDetails.appendChild(userWorkExp);

  return userDetails;
}

function createUserContact() {
  const userContact = document.createElement("div");
  userContact.classList.add("user-contact");

  for (let i = 0; i < contacts.length; i++) {
    const el = document.createElement("div");
    el.classList.add(contactClasses[i]);
    el.innerHTML = contacts[i];

    userContact.appendChild(el);
  }

  return userContact;
}
