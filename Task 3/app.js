// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAkwgRDFanB82EPWlwVYwQnbYWFqQbBI0k",
    authDomain: "spo-task3.firebaseapp.com",
    databaseURL: "https://spo-task3-default-rtdb.firebaseio.com",
    projectId: "spo-task3",
    storageBucket: "spo-task3.appspot.com",
    messagingSenderId: "435569446659",
    appId: "1:435569446659:web:768e6f7dafd4c7d4bca336"
};

firebase.initializeApp(firebaseConfig);

const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;

    try {
        // Send a signup request to the backend server
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, password })
        });

        if (response.ok) {
            alert('Signup successful');
        } else {
            const { error } = await response.json();
            alert(`Signup failed: ${error}`);
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred during signup');
    }
});
