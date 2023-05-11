window.onload = function (e) {
    liff.init(function (data) {
        initializeApp(data);
    });
};


function initializeApp(data) {
    document.getElementById('loginButton').addEventListener('click', function() {
            // Get the email from the input field
            const email = document.getElementById('emailInput').value;
        liff.getProfile().then(profile => {
            const lineUserId = profile.userId;

            // Get the LINE Access Token
            const accessToken = liff.getAccessToken();

            // Send the LINE ID and Access Token to your backend
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ lineUserId, accessToken, email }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // User logged in successfully
                    // You can redirect the user or show a success message
                } else {
                    // Login failed
                    // You can show an error message
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }).catch(err => console.error(err));
    });
}

