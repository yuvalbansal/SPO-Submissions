document.getElementById("signup-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const userId = document.getElementById("signup-form").elements.userId.value;
    const password = document.getElementById("signup-form").elements.password.value;

    // Send signup request to the backend server
    fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId, password })
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.error(error);
            alert("Error occurred during signup");
        });
});

document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const userId = document.getElementById("login-form").elements.userId.value;
    const password = document.getElementById("login-form").elements.password.value;

    // Send login request to the backend server
    fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId, password })
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.error(error);
            alert("Error occurred during login");
        });
});