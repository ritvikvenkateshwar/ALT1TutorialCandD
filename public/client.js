console.log("Client-side log HOK");
const btn = document.getElementById("submit-btn");
btn.addEventListener("click", submitDataToServer);

// Submit clicked so post the data to the server
function submitDataToServer() {
  console.log("SUBMIT clicked!!!"); // display a message
  // create an object to post to the server
  // IMPORTANT: ONE NAME - VALUE PAIR FOR EACH FIELD
  let dataObj = {
    name: document.getElementById("name").value,
    task: document.getElementById("task").value,
    date: document.getElementById("date").value,
  };
  // JUST USE THESE LINES AS THEY ARE - NO NEED TO CHANGE
  event.preventDefault(); // prevents 2 calls to this function!!
  const requestMsg = new XMLHttpRequest();
  requestMsg.open("post", "/putData", true); // open a HTTP post request
  requestMsg.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  requestMsg.send(JSON.stringify(dataObj));
}

// Make sure to call this function to get latest data
getDataFromServer();
// Send a request to the server to query the db and send the data back
function getDataFromServer() {
  console.log("getData()"); // display a debug message
  // request the data from the database
  const requestMsg = new XMLHttpRequest();
  requestMsg.addEventListener("load", displayData); // attach a listener
  requestMsg.open("get", "/getData"); // open a HTTP GET request
  requestMsg.send();
}

function displayData() {
  console.log("displayData()");
  const rowList = document.getElementById("users");
  rowList.innerHTML = "";
  let users = JSON.parse(this.responseText);
  users.forEach(function (row) {
    const newListItem = document.createElement("li");
    newListItem.textContent =
      "Name: " + row["name"] +
      " | Task: " + row["task"] +
      " | Deadline: " + row["Complition_date"];
    rowList.appendChild(newListItem);
  });
}
