document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".Donation_Form");
    const otherRadio = document.getElementById("other");
    const otherAmountField = document.getElementById("other_amount");
    const recurringCheckbox = document.querySelector('input[name="recurring"]');
    const recurringFields = document.querySelector(".recurring-fields");
    const stateSelect = document.querySelector('select[name="state"]');
    const countrySelect = document.querySelector('select[name="country"]');
    const donationRadios = document.getElementsByName("donation_radio");
    const acknowledgeSection = document.getElementById("acknowledge").closest("label").parentElement;
    const comments = document.querySelector('textarea[name="comments"]');
    const resetButton = document.querySelector('button[type="reset"]');
    const monthlyAmount = document.querySelector('input[name="monthly_amount"]');
    const months = document.querySelector('input[name="months"]');

    // Form Validation before submission
    form.addEventListener("submit", function(e) {
        const firstName = document.getElementById("first_name").value.trim();
        const lastName = document.getElementById("last_name").value.trim();
        const email = document.getElementById("email").value.trim();

        if (firstName === "" || lastName === "" || email === "") {
            alert("Please fill out all required fields.");
            e.preventDefault();
            return;
        }

        //  Email format validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            e.preventDefault();
            return;
        }

        // Donation amount check
        const donationSelected = document.querySelector('input[name="amount"]:checked');
        if (!donationSelected) {
            alert("Please select a donation amount.");
            e.preventDefault();
            return;
        }

        if (donationSelected.id === "other" && otherAmountField.value.trim() === "") {
            alert("Please enter your 'Other Amount'.");
            e.preventDefault();
            return;
        }

        // Recurring total calculation
        if (recurringCheckbox.checked) {
            const amount = parseFloat(monthlyAmount.value) || 0;
            const monthsCount = parseInt(months.value) || 0;
            const total = amount * monthsCount;
            if (total > 0) {
                alert(`Your total recurring donation will be $${total.toFixed(2)}.`);
            }
        }

        alert("Form submitted successfully!");
    });

    // Show/Hide "Other Amount" field based on radio
    document.querySelectorAll('input[name="amount"]').forEach(radio => {
        radio.addEventListener("change", function() {
            if (this.id === "other") {
                otherAmountField.style.display = "inline-block";
            } else {
                otherAmountField.style.display = "none";
                otherAmountField.value = "";
            }
        });
    });

    // Show/Hide recurring donation fields
    recurringCheckbox.addEventListener("change", function() {
        recurringFields.style.display = this.checked ? "block" : "none";
    });
    recurringFields.style.display = "none"; // hidden by default

    // faDElt select options
    if (stateSelect) stateSelect.selectedIndex = 0;
    if (countrySelect) countrySelect.selectedIndex = 0;

    // Confirm password field (optional future use)
    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.id = "confirm_password";
    passwordInput.name = "confirm_password";
    passwordInput.placeholder = "Confirm Password (optional)";
    passwordInput.style.display = "block";
    passwordInput.style.marginTop = "10px";
    form.insertBefore(passwordInput, form.querySelector(".buttons"));

    // 7️⃣ Reset confirmation
    resetButton.addEventListener("click", function(e) {
        const confirmReset = confirm("Are you sure you want to reset the form?");
        if (!confirmReset) e.preventDefault();
    });

    // Show/Hide "Acknowledge Donation" based on selection
    function toggleAcknowledgeSection() {
        const selectedValue = document.querySelector('input[name="donation_radio"]:checked');
        if (selectedValue && (selectedValue.id === "to_honor" || selectedValue.id === "in_memory_of")) {
            acknowledgeSection.style.display = "block";
        } else {
            acknowledgeSection.style.display = "none";
        }
    }

    donationRadios.forEach(radio => {
        radio.addEventListener("change", toggleAcknowledgeSection);
    });
    toggleAcknowledgeSection(); // initial state

    // 9Character limit on Comments
    const charLimit = 150;
    comments.addEventListener("input", function() {
        if (this.value.length > charLimit) {
            this.value = this.value.substring(0, charLimit);
            alert(`Comment limit of ${charLimit} characters reached.`);
        }
    });
});
