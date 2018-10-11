let enteredName = false;

let myName = prompt("Whats your name?");

if (myName != null) {
  document.getElementById("chat").value += "Connecting...\n";
  enteredName = true;
}

if (enteredName) {
  let source = new EventSource("/chat/" + myName);
  source.onmessage = e => {
    document.getElementById("chat").value += e.data + "\n";
    document.getElementById("chat").scrollTop = document.getElementById(
      "chat"
    ).scrollHeight;
    document.getElementById("text").value = "";
    document.getElementById("text").placeholder = myName;
  };
  document.getElementById("frm").addEventListener("submit", e => {
    e.preventDefault();
    let xmlHttp = new XMLHttpRequest();
    let textToPost = `{
      "name": "${myName}", 
      "text": "${document.getElementById("text").value}"
    }`;
    xmlHttp.open("POST", "/write/", false);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(textToPost);
  });
}
