document.addEventListener("DOMContentLoaded", function () {
    // 1. SESSION SECURITY & AUTH
    const loggedInUserEmail = localStorage.getItem("userEmail");
    const loggedInUserName = localStorage.getItem("loggedInUser") || "User"; 

  
    if (!loggedInUserEmail) {
        window.location.href = "loginuser.html";
        return;
    }

    // Set the display name in the Navbar
    const nameDisplay = document.getElementById("currentUserName");
    if (nameDisplay) nameDisplay.innerText = loggedInUserName;

    let timerInterval = null;

    // 2. HELPER: FORMAT SECONDS TO MM:SS
    function formatTime(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    // 3. CORE: RENDER DASHBOARD & TABLE
    window.updateUI = function () {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const userTableBody = document.getElementById("userTable");
        
        let teamOnBreakCount = 0;
        let activeCoworkersOnBreak = [];

        // Clear table before re-rendering
        if (userTableBody) userTableBody.innerHTML = "";

        users.forEach((user, index) => {
            // Update Monitoring Table Row
            if (userTableBody) {
                const statusClass = user.status === "Active" ? "online" : "on-break";
                const row = document.createElement("tr");
                
                // Highlight your own row in the table
                const isMe = user.email === loggedInUserEmail;
                if (isMe) row.style.backgroundColor = "#fff9db";

                row.innerHTML = `
                    <td>${user.username} ${isMe ? "<strong>(Me)</strong>" : ""}</td>
                    <td><span class="status-badge ${statusClass}">${user.status}</span></td>
                    <td>${formatTime(user.breakSeconds || 0)}</td>
                    <td>${user.lunchCount || 0}</td>
                    <td>${user.regularCount || 0}</td>
                    <td>
                        <button onclick="resetUserStats(${index})" style="font-size:10px; cursor:pointer;">Reset</button>
                    </td>
                `;
                userTableBody.appendChild(row);
            }

            // Update Personal Stats (Your own info)
            if (user.email === loggedInUserEmail) {
                const lunchEl = document.getElementById("lunchCount");
                const regEl = document.getElementById("regularCount");
                const timeEl = document.getElementById("breakTime");

                if (lunchEl) lunchEl.innerText = user.lunchCount || 0;
                if (regEl) regEl.innerText = user.regularCount || 0;
                if (timeEl) timeEl.innerText = formatTime(user.breakSeconds || 0);
                
                // If browser was refreshed while on break, restart the live timer
                if (user.status.includes("Break") && !timerInterval) {
                    startLiveTimer();
                }
            } else if (user.status.includes("Break")) {
                // Track coworkers on break for the summary
                teamOnBreakCount++;
                activeCoworkersOnBreak.push(user.username);
            }
        });

        // Update Summary Counts
        const teamBreakEl = document.getElementById("teamBreak");
        const onBreakSummaryEl = document.getElementById("onBreak");

        if (teamBreakEl) teamBreakEl.innerText = teamOnBreakCount;
        if (onBreakSummaryEl) {
            onBreakSummaryEl.innerText = activeCoworkersOnBreak.length > 0 
                ? activeCoworkersOnBreak.join(", ") + " is on break" 
                : "No coworkers on break";
        }
    };

    // 4. TIMER LOGIC (Updates localStorage every second)
    function startLiveTimer() {
        if (timerInterval) clearInterval(timerInterval);
        
        timerInterval = setInterval(() => {
            let users = JSON.parse(localStorage.getItem("users")) || [];
            const myIndex = users.findIndex(u => u.email === loggedInUserEmail);

            if (myIndex !== -1 && users[myIndex].status.includes("Break")) {
                users[myIndex].breakSeconds = (users[myIndex].breakSeconds || 0) + 1;
                localStorage.setItem("users", JSON.stringify(users));
                
                // Real-time update to your personal red timer span
                const timeEl = document.getElementById("breakTime");
                if (timeEl) timeEl.innerText = formatTime(users[myIndex].breakSeconds);
            } else {
                // Stop timer if status is no longer 'Break'
                clearInterval(timerInterval);
                timerInterval = null;
            }
        }, 1000);
    }

    // 5. BREAK ACTION HANDLERS
    window.startLunch = function () { handleStatusChange("Lunch Break", "lunchCount"); };
    window.startRegular = function () { handleStatusChange("Regular Break", "regularCount"); };
    window.endBreak = function () { handleStatusChange("Active"); };

    function handleStatusChange(newStatus, countKey = null) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        const myIndex = users.findIndex(u => u.email === loggedInUserEmail);

        if (myIndex !== -1) {
            // Prevent duplicate clicks (e.g., clicking Start Lunch while on Lunch)
            if (users[myIndex].status === newStatus) return;

            users[myIndex].status = newStatus;
            if (countKey) users[myIndex][countKey] = (users[myIndex][countKey] || 0) + 1;

            localStorage.setItem("users", JSON.stringify(users));
            
            if (newStatus.includes("Break")) {
                startLiveTimer();
            } else {
                clearInterval(timerInterval);
                timerInterval = null;
            }
            updateUI(); // Immediate refresh
        }
    }

    // 6. ADMIN-STYLE ACTIONS (Inside Table)
    window.resetUserStats = function(index) {
        if (confirm("Reset statistics for this user?")) {
            let users = JSON.parse(localStorage.getItem("users")) || [];
            users[index].breakSeconds = 0;
            users[index].lunchCount = 0;
            users[index].regularCount = 0;
            users[index].status = "Active";
            localStorage.setItem("users", JSON.stringify(users));
            updateUI();
        }
    };

    // 7. LOGOUT REDIRECTION
    window.logout = function() {
        if (confirm("Are you sure you want to logout?")) {
            // Clear current session
            localStorage.removeItem("userEmail");
            localStorage.removeItem("loggedInUser");
            localStorage.removeItem("role");

            // Direct to user login page
            window.location.href = "loginUser.html";
        }
    };
    

    setInterval(updateUI, 2000);
    
    // Initial UI load
    updateUI();
});