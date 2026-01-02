
document.addEventListener("DOMContentLoaded", function () {

    try {
        const button = document.querySelector(".cnt-btn");
        const inputs = document.querySelectorAll(".form input, .form textarea");

        // Check if button exists
        if (!button) {
            throw new Error("Submit button not found");
        }

        button.addEventListener("click", function () {

            let valid = true;

            inputs.forEach(input => {
                if (input.value.trim() === "") {
                    valid = false;
                } else {
                    input.style.borderColor = "#ccc";
                }
            });

            if (!valid) {
                alert("Please fill all required fields");
                return;
            }

            alert("Message sent successfully!");

            // Clear inputs
            inputs.forEach(input => input.value = "");

        });

    } catch (error) {
        console.error("Form Error:", error.message);
        alert("Something went wrong. Please try again later.");
    }

});


