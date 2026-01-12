function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const errorMsg = document.getElementById("errorMsg");

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (!email || !password) {
        errorMsg.innerText = "Please fill all fields";
        return;
    }

    if (!email.endsWith("@oppty.in")) {
        errorMsg.innerText = "Only @oppty.in email allowed";
        return;
    }

    const matchedUser = users.find(
        user => user.email === email && user.password === password
    );

    if (!matchedUser) {
        errorMsg.innerText = "Invalid email or password";
        return;
    }

    localStorage.setItem("userEmail", matchedUser.email);
    localStorage.setItem("username", matchedUser.username);
    localStorage.setItem("role", "user");

    window.location.href = "userDS.html";
}
