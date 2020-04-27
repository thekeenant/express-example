const helloUrl = 'http://localhost:3000/hello';
const helloForm = document.getElementById('hello_form');
const whoInput = document.getElementById('who_input');

const analyzeUrl = 'http://localhost:3000/analyze';
const analyzeForm = document.getElementById('analyze_form');
const textInput = document.getElementById('text_input');

/**
 * Called after the backend sends its response back to the frontend.
 * @param {*} data
 */
function handleHelloResponse(data) {
  const message = data.message;
  alert(message);
}

/**
 * Called after the backend sends its response back to the frontend.
 * @param {*} data
 */
function handleAnalyzeResponse(data) {
  const analysis = data.analysis;
  alert(JSON.stringify(analysis));
}

helloForm.addEventListener('submit', function(e) {
  // Prevent redirecting, which is the default HTML form behavior. 
  e.preventDefault();

  // Data we are sending to the backend.
  const data = {
    who: whoInput.value
  };

  // Make POST request to backend, and call our handler function.
  fetch(helloUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(function(response) {
    response.json().then(json => {
      handleHelloResponse(json);
    });
  });
});

analyzeForm.addEventListener('submit', function(e) {
  // Prevent redirecting, which is the default HTML form behavior. 
  e.preventDefault();

  // Data we are sending to the backend.
  const data = {
    text: textInput.value
  };

  // Make POST request to backend, and call our handler function.
  fetch(analyzeUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(function(response) {
    response.json().then(json => {
      handleAnalyzeResponse(json);
    });
  });
});