const ADD_MEMBER_BUTTON_ID = "add-member-button";
const ROOT_EL_ID = "app";
const WINNE_SCREEN_EL_ID = "winner-screen";
const LOCAL_STORAGE_KEY = "random_ryan";

const appendElementToNode = (node, element) => {
  node.appendChild(element);
};

const insertElementBeforeNode = (node, element) => {
  const parent = node.parentNode;
  parent.insertBefore(element, node);
};

const applyStylePropToEl = (el, prop, value) => {
  el.style[prop] = value;
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
  const el = document.getElementById(WINNE_SCREEN_EL_ID);

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

  applyStylePropToEl(el, "display", "block");
  applyStylePropToEl(el, "padding", "5px");
  applyStylePropToEl(el, "width", "calc(200px - 10px - 2px)");
  applyStylePropToEl(el, "height", "20px");
  applyStylePropToEl(el, "line-height", "20px");
  applyStylePropToEl(el, "border-radius", "5px 0 0 5px");
  applyStylePropToEl(el, "border", "1px solid lightgray");
  applyStylePropToEl(el, "cursor", "pointer");

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

  applyStylePropToEl(el, "display", "block");
  applyStylePropToEl(el, "line-height", "20px");
  applyStylePropToEl(el, "border-radius", "0 5px 5px 0");
  applyStylePropToEl(el, "border", "1px solid lightgray");
  applyStylePropToEl(el, "border-left", "none");
  applyStylePropToEl(el, "background-color", "white");
  applyStylePropToEl(el, "color", "red");
  applyStylePropToEl(el, "cursor", "pointer");

  el.addEventListener("click", () => {
    handleDeleteMemberBtnClick(id);
  });

  return el;
};

const makeMemberControl = (value) => {
  const ID = getID();
  const el = document.createElement("DIV");
  const addmemberBtn = document.getElementById(ADD_MEMBER_BUTTON_ID);

  applyStylePropToEl(el, "display", "flex");
  applyStylePropToEl(el, "margin-bottom", "10px");

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

  applyStylePropToEl(el, "display", "block");
  applyStylePropToEl(el, "padding", "5px");
  applyStylePropToEl(el, "width", "200px");
  applyStylePropToEl(el, "line-height", "20px");
  applyStylePropToEl(el, "border-radius", "5px");
  applyStylePropToEl(el, "border", "none");
  applyStylePropToEl(el, "background-color", "lightgray");
  applyStylePropToEl(el, "cursor", "pointer");

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

const makeWinnerScreen = (name) => {
  const el = document.createElement("DIV");

  el.setAttribute("id", WINNE_SCREEN_EL_ID);

  el.textContent = name;

  applyStylePropToEl(el, "position", "fixed");
  applyStylePropToEl(el, "width", "500px");
  applyStylePropToEl(el, "height", "500px");
  applyStylePropToEl(el, "top", "50%");
  applyStylePropToEl(el, "left", "50%");
  applyStylePropToEl(el, "transform", "translate(-50%, -50%)");
  applyStylePropToEl(el, "text-align", "center");
  applyStylePropToEl(el, "font-weight", "bold");
  applyStylePropToEl(el, "font-size", "80px");
  applyStylePropToEl(el, "line-height", "500px");

  appendElementToNode(getRootNode(), el);
};

const handleSubmitButtonClick = () => {
  removeWinnerScreen();

  const winnerName = getWinnerName();

  makeWinnerScreen(winnerName);
};

const makeSubmitButton = () => {
  const el = document.createElement("BUTTON");

  el.textContent = "Submit";

  applyStylePropToEl(el, "display", "block");
  applyStylePropToEl(el, "padding", "5px");
  applyStylePropToEl(el, "margin-top", "10px");
  applyStylePropToEl(el, "width", "200px");
  applyStylePropToEl(el, "line-height", "20px");
  applyStylePropToEl(el, "border-radius", "5px");
  applyStylePropToEl(el, "border", "none");
  applyStylePropToEl(el, "background-color", "lightgreen");
  applyStylePropToEl(el, "cursor", "pointer");

  el.addEventListener("click", handleSubmitButtonClick);

  appendElementToNode(getRootNode(), el);
};

const makeHeading = () => {
  const el = document.createElement("H1");

  el.textContent = "Random Ryan";

  applyStylePropToEl(el, "margin-top", "0");

  appendElementToNode(getRootNode(), el);
};

const makeRoot = () => {
  const el = document.createElement("DIV");
  el.setAttribute("id", ROOT_EL_ID);

  applyStylePropToEl(el, "position", "relative");
  applyStylePropToEl(el, "box-sizing", "border-box");
  applyStylePropToEl(el, "padding", "10px");
  applyStylePropToEl(el, "width", "100%");
  applyStylePropToEl(el, "min-height", "100vh");

  appendElementToNode(document.body, el);
};

const resetBodyStyles = () => {
  const el = document.body;

  applyStylePropToEl(el, "margin", "0");
  applyStylePropToEl(el, "padding", "0");
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
