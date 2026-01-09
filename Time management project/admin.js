
function validate() {
    const adminId = document.getElementById("adminId").value.trim();
    const password = document.getElementById("password").value;
    const errorMsg = document.getElementById("errorMsg");

    const opptyEmailPattern = /^[a-zA-Z0-9._%+-]+@oppty\.in$/;

    const correctEmail = "manohar.b@oppty.in";
    const correctPassword = "admin123";

    if (adminId === "" || password === "") {
        errorMsg.textContent = "Please fill all fields";
        return;
    }

    if (!opptyEmailPattern.test(adminId)) {
        errorMsg.textContent = "Only @oppty.in email is allowed";
        return;
    }

    if (adminId !== correctEmail || password !== correctPassword) {
        errorMsg.textContent = "Invalid login details";
        return;
    }

    //
    errorMsg.textContent = "";
    window.location.href = "admindash.html";
}