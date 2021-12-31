import { dragElement } from "../../util/draggable.js";
import { buildToolBar } from "../../util/ToolBar.js";

let tagLines = [
  "Hey I'm Shravan, a Frontend dev",
  "I play around 3D Web Components and Creative Animations",
];

let skillArr = [
  ["fab fa-js", "background-color: yellow; color: black", "Javascript"],
  ["fab fa-angular", "background-color: red; color: white", "Angular"],
  ["fab fa-docker", "background-color: white; color: skyblue", "THREEJS"],
  [
    "fab fa-html5",
    "background: linear-gradient(to right,orange 50%,red 100%); color: white",
    "HTML",
  ],
  [
    "fab fa-css3-alt",
    "background: linear-gradient(to right,lightskyblue 50%,skyblue 100%); color: white",
    "CSS3",
  ],
  ["fab fa-java", "background-color: white; color: blue", "Java"],
];

let contacts = [
  `<a target="_blank"  href="https://www.linkedin.com/in/shravan-kumar-udupa/"><i class="fab fa-linkedin"></i></a>`,
  `<a target="_blank" href="https://twitter.com/shravankumarui"><i class="fab fa-twitter-square"></i></a>`,
  `<a target="_blank" href="mailto:shravankumar.fs.dev@gmail.com"><i class="fas fa-envelope"></i></a>`,
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
    el.classList.add("userTagLineEl");
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
    if (arr[0] === "fab fa-docker") {
      const sp = document.createElement("span");
      sp.innerHTML = `<img src="resources/threejs.jpg"/>
                <span class="tooltip">${arr[2]}</span>
      `;

      userSkills.appendChild(sp);
    } else {
      const sp = document.createElement("span");

      const skillIcon = document.createElement("i");
      arr[0].split(" ").forEach((cls) => skillIcon.classList.add(cls));
      skillIcon.style = arr[1];

      const toolTip = document.createElement("span");
      toolTip.classList.add("tooltip");
      toolTip.innerText = arr[2];

      sp.appendChild(skillIcon);
      sp.appendChild(toolTip);
      userSkills.appendChild(sp);
    }
  });

  const userWorks = document.createElement("div");
  userWorks.classList.add("user-works");
  userWorks.innerHTML = `
  <a target="_blank" href="https://shravankumarui.com">Solar System</a><br>
  <a target="_blank" href="https://rocketos.shravankumarui.com">RocketOS</a><br>
  <a target="_blank" href="https://50days-50-js-widgets.shravankumarui.com">Mini Widgets</a><br>
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
  6+ years Software development Experience
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
