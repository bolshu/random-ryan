const ADD_MEMBER_BUTTON_ID = "add-member-button";
const ROOT_EL_ID = "app";
const WINNER_SCREEN_EL_ID = "winner-screen";
const WINNER_COUNTER_EL_ID = "winner-counter";
const LOCAL_STORAGE_KEY = "random_ryan";

const appendElementToNode = (node, element) => {
  node.appendChild(element);
};

const insertElementBeforeNode = (node, element) => {
  const parent = node.parentNode;
  parent.insertBefore(element, node);
};

const applyStylesToEl = (el, styles) => {
  for (const property in styles) {
    el.style[property] = styles[property];
  }
};

const getRootNode = () => {
  return document.getElementById(ROOT_EL_ID);
};

const getID = () => {
  return Date.now().toString();
};

const saveMembersToLocalStorage = () => {
  const membersInputs = Array.from(document.querySelectorAll("INPUT"));
  const values = membersInputs.map((el) => el.value);
  const nonEmptyValues = values.filter((v) => Boolean(v));
  const valuesAsString = JSON.stringify(nonEmptyValues);

  localStorage.setItem(LOCAL_STORAGE_KEY, valuesAsString);
};

const removeWinnerScreen = () => {
  const el = document.getElementById(WINNER_SCREEN_EL_ID);

  if (el) {
    el.remove();
  }
};

const handleMemberInputChange = () => {
  removeWinnerScreen();
  saveMembersToLocalStorage();
};

const getMemberNameInputEl = (id, value) => {
  const el = document.createElement("INPUT");

  el.setAttribute("type", "text");
  el.setAttribute("placeholder", "Name of member");
  el.setAttribute("id", id);

  if (value) {
    el.setAttribute("value", value);
  }

  const styles = {
    display: "block",
    padding: "5px",
    width: "calc(200px - 10px - 2px)",
    height: "20px",
    "line-height": "20px",
    "border-radius": "5px 0 0 5px",
    border: "1px solid lightgray",
    cursor: "pointer",
  };

  applyStylesToEl(el, styles);

  el.addEventListener("change", handleMemberInputChange);

  return el;
};

const removeMemberControl = (id) => {
  document.querySelector(`[data-id="${id}"]`).remove();
};

const handleDeleteMemberBtnClick = (id) => {
  removeWinnerScreen();
  removeMemberControl(id);
  saveMembersToLocalStorage();
};

const getDeleteMemberBtnEl = (id) => {
  const el = document.createElement("BUTTON");

  el.textContent = "✘";

  const styles = {
    display: "block",
    "line-height": "20px",
    "border-radius": "0 5px 5px 0",
    border: "1px solid lightgray",
    "border-left": "none",
    "background-color": "white",
    color: "red",
    cursor: "pointer",
  };

  applyStylesToEl(el, styles);

  el.addEventListener("click", () => {
    handleDeleteMemberBtnClick(id);
  });

  return el;
};

const makeMemberControl = (value) => {
  const ID = getID();
  const el = document.createElement("DIV");
  const addmemberBtn = document.getElementById(ADD_MEMBER_BUTTON_ID);

  const styles = {
    display: "flex",
    "margin-bottom": "10px",
  };

  applyStylesToEl(el, styles);

  el.dataset.id = ID;

  appendElementToNode(el, getMemberNameInputEl(ID, value));
  appendElementToNode(el, getDeleteMemberBtnEl(ID));

  insertElementBeforeNode(addmemberBtn, el);
};

const handleAddInputButtonClick = () => {
  removeWinnerScreen();
  makeMemberControl();
};

const makeAddInputButton = () => {
  const el = document.createElement("BUTTON");

  el.textContent = "Add member";
  el.setAttribute("id", ADD_MEMBER_BUTTON_ID);

  const styles = {
    display: "block",
    padding: "5px",
    width: "200px",
    "line-height": "20px",
    "border-radius": "5px",
    border: "none",
    "background-color": "lightgray",
    cursor: "pointer",
  };

  applyStylesToEl(el, styles);

  el.addEventListener("click", handleAddInputButtonClick);

  appendElementToNode(getRootNode(), el);
};

const makeMembersFromLocalStorage = () => {
  const rawData = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!rawData) {
    return;
  }

  const parsedData = JSON.parse(rawData);

  parsedData.forEach((value) => {
    makeMemberControl(value);
  });
};

const getRandomNumberFromRange = (number) => {
  return Math.floor(Math.random() * number);
};

const getWinnerName = () => {
  const membersInputs = document.querySelectorAll("INPUT");
  const membersInputsLength = membersInputs.length;
  const winnerIdx = getRandomNumberFromRange(membersInputsLength);
  const winnerName = membersInputs[winnerIdx].value;

  return winnerName;
};

const getWinnerGifEl = () => {
  const el = document.createElement("IMG");

  el.setAttribute("src", "./win.gif");

  const styles = {
    display: "block",
    width: "100%",
    height: "100%",
  };

  applyStylesToEl(el, styles);

  return el;
};

const getWinnerTextEl = (name, color = "white") => {
  const el = document.createElement("DIV");

  el.textContent = name;

  const styles = {
    "text-align": "center",
    "font-weight": "bold",
    "font-size": "80px",
    "line-height": "100px",
    color,
  };

  applyStylesToEl(el, styles);

  return el;
};

const getFireworkEl = (top, left) => {
  const el = document.createElement("IMG");

  el.setAttribute("src", "./fireworks_1.gif");

  const styles = {
    position: "absolute",
    top,
    left,
    width: "300px",
    height: "300px",
  };

  applyStylesToEl(el, styles);

  return el;
};

const makeWinnerScreen = (name) => {
  const el = document.createElement("DIV");

  el.setAttribute("id", WINNER_SCREEN_EL_ID);

  const styles = {
    position: "fixed",
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    width: "800px",
    height: "600px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    "background-image": "url('./win.gif')",
    "background-size": "25% 20%",
  };

  applyStylesToEl(el, styles);

  appendElementToNode(el, getFireworkEl("50px", "0px"));
  appendElementToNode(el, getFireworkEl("-50px", "600px"));
  appendElementToNode(el, getFireworkEl("450px", "150px"));
  appendElementToNode(el, getWinnerTextEl(name));

  appendElementToNode(getRootNode(), el);
};

const removeWinnerCounter = () => {
  document.getElementById(WINNER_COUNTER_EL_ID).remove();
};

const decreaseCounter = () => {
  const SECOND_IN_MS = 1000;
  const el = document.querySelector(`#${WINNER_COUNTER_EL_ID} div`);
  const value = el.textContent;

  const timeout = setTimeout(() => {
    decreaseCounter();
  }, SECOND_IN_MS);

  if (value <= 1) {
    const winnerName = getWinnerName();

    removeWinnerCounter();
    makeWinnerScreen(winnerName);

    clearTimeout(timeout);
  } else {
    el.textContent -= 1;
  }
};

const makeWinnerCounter = () => {
  const INITIAL_COUNT = 4;
  const COUNTER_COLOR = "black";
  const el = document.createElement("DIV");

  el.setAttribute("id", WINNER_COUNTER_EL_ID);

  const styles = {
    position: "fixed",
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    width: "800px",
    height: "600px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  applyStylesToEl(el, styles);

  appendElementToNode(el, getWinnerTextEl(INITIAL_COUNT, COUNTER_COLOR));
  appendElementToNode(getRootNode(), el);

  decreaseCounter();
};

const handleSubmitButtonClick = () => {
  removeWinnerScreen();

  makeWinnerCounter();
};

const makeSubmitButton = () => {
  const el = document.createElement("BUTTON");

  el.textContent = "Submit";

  const styles = {
    display: "block",
    padding: "5px",
    "margin-top": "10px",
    width: "200px",
    "line-height": "20px",
    "border-radius": "5px",
    border: "none",
    "background-color": "lightgreen",
    cursor: "pointer",
  };

  applyStylesToEl(el, styles);

  el.addEventListener("click", handleSubmitButtonClick);

  appendElementToNode(getRootNode(), el);
};

const makeHeading = () => {
  const el = document.createElement("H1");

  el.textContent = "Random Ryan";

  const styles = {
    "margin-top": "0",
  };

  applyStylesToEl(el, styles);

  appendElementToNode(getRootNode(), el);
};

const makeRoot = () => {
  const el = document.createElement("DIV");
  el.setAttribute("id", ROOT_EL_ID);

  const styles = {
    position: "relative",
    "box-sizing": "border-box",
    padding: "10px",
    width: "100%",
    "min-height": "100vh",
  };

  applyStylesToEl(el, styles);

  appendElementToNode(document.body, el);
};

const resetBodyStyles = () => {
  const el = document.body;

  const styles = {
    margin: "0",
    padding: "0",
  };

  applyStylesToEl(el, styles);
};

const initApp = () => {
  resetBodyStyles();

  makeRoot();
  makeHeading();
  makeAddInputButton();
  makeSubmitButton();

  makeMembersFromLocalStorage();
};

initApp();
