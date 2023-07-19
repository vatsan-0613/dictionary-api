const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const headers = new Headers();
headers.append("Content-Type", "application/json");

const requestOptions = {
  method: "GET",
  headers: headers,
};

const titleText = document.getElementById("card-title");
const group = document.getElementsByClassName("group")[0];
const audioBtn = document.getElementsByClassName("audio-btn")[0];
const card = document.getElementsByClassName('card')[0];

const fillCard = (data) => {
  const title = data[0].word;
  let phonetic;
  let audioURL;
  console.log(title);
  data[0].phonetics.forEach((doc) => {
    if (doc.audio !== "") {
      audioURL = doc.audio;
      phonetic = doc.text;
    }
  });

  audioBtn.addEventListener("click", () => {
    const audio = document.getElementById("pronunce");
    audio.src = audioURL;
    audio.play();
  });
  card.style.visibility = "visible";
  titleText.innerHTML = title + '<br><span id="sub">' + phonetic + "</span>";
  const meanings = data[0].meanings;
  meanings.forEach((partsOfSpeech) => {
    const pts = partsOfSpeech.partOfSpeech;
    const def = partsOfSpeech.definitions[0].definition;
    const ele = document.createElement("li");
    ele.className = "list-group-item";
    ele.innerHTML = '<span class="font-weight-bold">' + pts + ": </span>" + def;
    group.appendChild(ele);
    console.log(pts);
    console.log(def);
  });
};

const request = (word) => {
  fetch(url + word, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      fillCard(data);
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

const getWord = () => {
  const word = document.querySelector("input").value;
  group.innerHTML = "";
  request(word);
};
