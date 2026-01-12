function validate() {
    const adminId = document.getElementById("adminId").value.trim();
    const password = document.getElementById("password").value;
    const errorMsg = document.getElementById("errorMsg");

    const correctEmail = "manohar.b@oppty.in";
    const correctPassword = "admin123";

    if (!adminId || !password) {
        errorMsg.textContent = "Please fill all fields";
        return;
    }

    if (adminId !== correctEmail || password !== correctPassword) {
        errorMsg.textContent = "Invalid login details";
        return;
    }

    localStorage.setItem("adminUser", adminId);
    localStorage.setItem("role", "admin");

    // ✅ THIS LINE MOVES TO INDEX PAGE
    window.location.href = "index.html";
}
