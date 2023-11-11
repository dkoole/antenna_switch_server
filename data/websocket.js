var gateway = `ws://${window.location.hostname}/ws`;
var websocket;
window.addEventListener('load', onLoad);

function initWebSocket() {
  console.log('Trying to open a WebSocket connection...');
  websocket = new WebSocket(gateway);
  websocket.onopen    = onOpen;
  websocket.onclose   = onClose;
  websocket.onmessage = onMessage;
}

function onOpen(event) {
  console.log('Connection opened');
  websocket.send("current_antenna");
}

function onClose(event) {
  console.log('Connection closed');
  setTimeout(initWebSocket, 2000);
}

function onMessage(event) {
  var state;
  if (event.data == '1'){
    document.getElementById('ant1').checked = true;
    document.getElementById('ant2').checked = false;
    document.getElementById('ant3').checked = false;
    document.getElementById('ant4').checked = false;
  } else if (event.data == '2'){
    document.getElementById('ant1').checked = false;
    document.getElementById('ant2').checked = true;
    document.getElementById('ant3').checked = false;
    document.getElementById('ant4').checked = false;
  } else if (event.data == '3'){
    document.getElementById('ant1').checked = false;
    document.getElementById('ant2').checked = false;
    document.getElementById('ant3').checked = true;
    document.getElementById('ant4').checked = false;
  } else if (event.data == '4'){
    document.getElementById('ant1').checked = false;
    document.getElementById('ant2').checked = false;
    document.getElementById('ant3').checked = false;
    document.getElementById('ant4').checked = true;
  }
}

function onLoad(event) {
  initWebSocket();
  initButtons();
}

function initButtons() {
  document.getElementById('ant1').addEventListener('click', function() { websocket.send('1'); });
  document.getElementById('ant2').addEventListener('click', function() { websocket.send('2'); });
  document.getElementById('ant3').addEventListener('click', function() { websocket.send('3'); });
  document.getElementById('ant4').addEventListener('click', function() { websocket.send('4'); });
}

function toggle(str) {
  websocket.send(str);
}