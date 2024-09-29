// Get the elements
const preorderButton = document.getElementById("preorderButton");
const formSection = document.getElementById("form-section");
const preorderForm = document.getElementById("preorderForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");

(function() {
    emailjs.init("9F1krai-sc2Z_XyXC"); // Replace with your User ID from EmailJS
})();

function sendPreorderEmail(event) {
    event.preventDefault(); // Prevent the default form submission

    const btn = event.target; // Get the button that was clicked
    btn.textContent = 'Pre-ordering...'; // Change button text to indicate sending

    const serviceID = 'service_m33nvbu'; // Replace with your EmailJS service ID
    const templateID = 'template_tzj3p5e'; // Replace with your EmailJS template ID

    // Send the form directly using EmailJS
    emailjs.sendForm(serviceID, templateID, document.getElementById('preorderForm'))
        .then(() => {
            btn.textContent = 'Submit'; // Reset button text
            alert('Thank you for pre-ordering iReadyAuto!'); // Alert for success
            window.location.reload()
        }, (err) => {
            btn.textContent = 'Submit'; // Reset button text on error
            alert('Failed to pre-order: ' + JSON.stringify(err)); // Alert for error
        });
}

// Create elements to hold custom error messages
const nameError = document.createElement("div");
const emailError = document.createElement("div");
nameError.classList.add("error-message");
emailError.classList.add("error-message");
nameInput.after(nameError);
emailInput.after(emailError);

// Show the form when "Preorder Now" is clicked
preorderButton.addEventListener("click", () => {
    formSection.classList.remove("hidden");
    preorderButton.style.display = "none";
});

// Disable default browser tooltips for name and email fields
nameInput.addEventListener("invalid", function (e) {
    e.preventDefault();  // Prevent default tooltip
    nameInput.dispatchEvent(new Event('input'));  // Trigger custom validation message
});

emailInput.addEventListener("invalid", function (e) {
    e.preventDefault();  // Prevent default tooltip
    emailInput.dispatchEvent(new Event('input'));  // Trigger custom validation message
});

// Validate form fields with custom messages and styling
nameInput.addEventListener("input", function () {
    if (nameInput.validity.valueMissing) {
        nameError.textContent = "We need your name to proceed.";
        nameError.classList.add("visible");
    } else {
        nameError.textContent = "";
        nameError.classList.remove("visible");
    }
});

emailInput.addEventListener("input", function () {
    if (emailInput.validity.valueMissing) {
        emailError.textContent = "Please enter your email address.";
        emailError.classList.add("visible");
    } else if (emailInput.validity.typeMismatch) {
        emailError.textContent = "This doesn’t seem like a valid email. Please double-check.";
        emailError.classList.add("visible");
    } else {
        emailError.textContent = "";
        emailError.classList.remove("visible");
    }
});

// Handle form submission
preorderForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Trigger validity check for all fields
    nameInput.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new Event('input'));
    
    // If everything is valid, proceed
    if (nameInput.checkValidity() && emailInput.checkValidity()) {
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var currentDateTime = new Date().toLocaleString(); // You can customize the format as needed
        alert("Thank you for pre-ordering iReadyAuto!");
        sendEmail("nexus.hecker@gmail.com", "iReadyAuto Pre-order", 'Hi')
        window.location.reload()
    }
});

