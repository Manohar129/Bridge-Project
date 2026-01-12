document.addEventListener("DOMContentLoaded", function () {
    let editIndex = null; // null = Add mode, number = Edit mode

    // 1. Initialize Database if empty
    if (!localStorage.getItem("users")) {
        const defaultUsers = [
            { email: "ramesh@oppty.in", username: "Ramesh", password: "123", status: "Active", lunchCount: 0, regularCount: 0, breakSeconds: 0 },
            { email: "suresh@oppty.in", username: "Suresh", password: "123", status: "Active", lunchCount: 0, regularCount: 0, breakSeconds: 0 },
            { email: "mahesh@oppty.in", username: "Mahesh", password: "123", status: "Active", lunchCount: 0, regularCount: 0, breakSeconds: 0 }
        ];
        localStorage.setItem("users", JSON.stringify(defaultUsers));
    }

    // 2. Auth Check (Redirect if not logged in as admin)
    const adminUser = localStorage.getItem("adminUser");
    const role = localStorage.getItem("role");

    if (!adminUser || role !== "admin") {
        window.location.href = "loginAD.html";
        return;
    }

    // Display admin name
    document.querySelector(".user").innerText = adminUser;

    // Logout Function
    document.querySelector(".logout").onclick = () => {
        // We only clear admin session, not the user database
        localStorage.removeItem("adminUser");
        localStorage.removeItem("role");
        window.location.href = "loginAD.html";
    };

    // 3. Helper: Format seconds to M:SS
    function formatTime(sec = 0) {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? "0" : ""}${s}`;
    }

    // 4. Core Render Function
    window.renderUsers = function (filteredData = null) {
        const allUsers = JSON.parse(localStorage.getItem("users")) || [];
        const table = document.getElementById("userTable");
        
        // Use filtered data if provided, otherwise use all users
        const usersToDisplay = filteredData || allUsers;
        
        table.innerHTML = "";

        let activeCount = 0;
        let offlineCount = 0;

        usersToDisplay.forEach((u, index) => {
            const status = u.status || "Offline";
            const lunch = u.lunchCount || 0;
            const regular = u.regularCount || 0;
            const total = lunch + regular;
            const time = u.breakSeconds || 0;

            // Determine status color class
            let statusClass = "offline";
            if (status === "Active") statusClass = "online";
            else if (status.includes("Break")) statusClass = "break";

            if (statusClass === "offline") offlineCount++;
            else activeCount++;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${u.email}</td>
                <td>${u.username}</td>
                <td class="${statusClass}">
                    ${status} (${formatTime(time)})
                </td>
                <td>${lunch}</td>
                <td>${regular}</td>
                <td>${total}</td>
                <td>
                    <button class="edit-btn" onclick="prepareEdit(${index})" style="background:#2196F3; color:white; border:none; padding:4px 8px; cursor:pointer; border-radius:3px;">Edit</button>
                    <button class="reset-btn" onclick="resetUser(${index})" style="background:#ff9800; color:white; border:none; padding:4px 8px; cursor:pointer; border-radius:3px;">Reset</button>
                    <button class="delete-btn" onclick="deleteUser(${index})" style="background:#f44336; color:white; border:none; padding:4px 8px; cursor:pointer; border-radius:3px;">Delete</button>
                </td>
            `;
            table.appendChild(row);
        });

        // Update Dashboard Stats (always based on total data)
        document.getElementById("totalUsers").innerText = allUsers.length;
        document.getElementById("activeUsers").innerText = activeCount;
        document.getElementById("offlineUsers").innerText = offlineCount;
    };

    // 5. Add / Update User Function
    window.saveUser = function () {
        const emailInput = document.getElementById("email");
        const usernameInput = document.getElementById("username");
        const passwordInput = document.getElementById("password");

        if (!emailInput.value || !usernameInput.value || !passwordInput.value) {
            alert("Please fill all fields");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        if (editIndex !== null) {
            // UPDATE MODE
            users[editIndex].email = emailInput.value;
            users[editIndex].username = usernameInput.value;
            users[editIndex].password = passwordInput.value;
            editIndex = null;
            alert("User updated successfully");
        } else {
            // ADD MODE
            const newUser = {
                email: emailInput.value,
                username: usernameInput.value,
                password: passwordInput.value,
                status: "Active",
                lunchCount: 0,
                regularCount: 0,
                breakSeconds: 0
            };
            users.push(newUser);
            alert("User added successfully");
        }

        localStorage.setItem("users", JSON.stringify(users));
        cancelEdit(); // Reset form UI
        renderUsers();
    };

    // 6. Edit Management
    window.prepareEdit = function (index) {
        const users = JSON.parse(localStorage.getItem("users"));
        const user = users[index];

        document.getElementById("email").value = user.email;
        document.getElementById("username").value = user.username;
        document.getElementById("password").value = user.password;

        document.getElementById("form-heading").innerText = "Edit User";
        document.getElementById("submit-btn").innerText = "Update User";
        document.getElementById("cancel-btn").style.display = "block";
        
        editIndex = index;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.cancelEdit = function () {
        editIndex = null;
        document.getElementById("email").value = "";
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        document.getElementById("form-heading").innerText = "Add User";
        document.getElementById("submit-btn").innerText = "Add User";
        document.getElementById("cancel-btn").style.display = "none";
    };

    // 7. Reset & Delete
    window.resetUser = function (index) {
        let users = JSON.parse(localStorage.getItem("users"));
        users[index].lunchCount = 0;
        users[index].regularCount = 0;
        users[index].breakSeconds = 0;
        users[index].status = "Active";
        localStorage.setItem("users", JSON.stringify(users));
        renderUsers();
    };

    window.deleteUser = function (index) {
        if (confirm("Are you sure you want to delete this user?")) {
            let users = JSON.parse(localStorage.getItem("users"));
            users.splice(index, 1);
            localStorage.setItem("users", JSON.stringify(users));
            renderUsers();
        }
    };

    // 8. Live Filter Logic
    window.applyFilter = function () {
        const statusValue = document.getElementById("statusFilter").value;
        const searchValue = document.getElementById("searchInput").value.toLowerCase();
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const filtered = users.filter(u => {
            const matchesStatus = statusValue === "all" || 
                (statusValue === "active" && u.status === "Active") ||
                (statusValue === "break" && u.status.includes("Break"));
            
            const matchesSearch = u.username.toLowerCase().includes(searchValue) || 
                                 u.email.toLowerCase().includes(searchValue);
            
            return matchesStatus && matchesSearch;
        });

        renderUsers(filtered);
    };

    // 9. CSV Download Function
    window.downloadCSV = function () {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.length === 0) return alert("No data to export");

        let csvContent = "Email,Username,Status,LunchCount,RegularCount,TotalBreaks,TimeSpent(sec)\n";

        users.forEach(u => {
            const row = [
                u.email,
                u.username,
                u.status || "Offline",
                u.lunchCount || 0,
                u.regularCount || 0,
                (u.lunchCount || 0) + (u.regularCount || 0),
                u.breakSeconds || 0
            ].join(",");
            csvContent += row + "\n";
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `Break_Report_${new Date().toLocaleDateString()}.csv`;
        link.click();
    };

    // 10. Auto-Refresh Interval (Every 5 seconds)
    setInterval(() => {
        // We only auto-refresh if the admin isn't currently searching or editing
        const isSearching = document.getElementById("searchInput").value.length > 0;
        if (!isSearching && editIndex === null) {
            renderUsers();
        }

        // Check for over-break alerts from user portal
        if (localStorage.getItem("adminAlert") === "true") {
            alert("⚠️ Alert: A user has exceeded their break limit!");
            localStorage.removeItem("adminAlert");
        }
    }, 5000);

    // Initial load
    renderUsers();
});