function checkZIP() {
  // For each country, defines the pattern that the ZIP has to follow
  const constraints = {
    ch: [
      "^(CH-)?\\d{4}$",
      "Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950",
    ],
    fr: [
      "^(F-)?\\d{5}$",
      "France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012",
    ],
    de: [
      "^(D-)?\\d{5}$",
      "Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345",
    ],
    nl: [
      "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
    ],
  };

  // Read the country id
  const country = document.getElementById("Country").value;

  // Get the NPA field
  const ZIPField = document.getElementById("ZIP");

  // Build the constraint checker
  const constraint = new RegExp(constraints[country][0], "");
  console.log(constraint);

  // Check it!
  if (constraint.test(ZIPField.value)) {
    // The ZIP follows the constraint, we use the ConstraintAPI to tell it
    ZIPField.setCustomValidity("");
  } else {
    // The ZIP doesn't follow the constraint, we use the ConstraintAPI to
    // give a message about the format required for this country
    ZIPField.setCustomValidity(constraints[country][1]);
  }
}

window.onload = () => {
  document.getElementById("Country").onchange = checkZIP;
  document.getElementById("ZIP").oninput = checkZIP;
};

/* const form = document.querySelector("form"); */
const ZIPFieldError = document.querySelector("#ZIP + span.error1");
const ZIPField = document.getElementById("ZIP");
ZIPField.classList.add("bcolor");

ZIPField.addEventListener("input", () => {
  if (ZIPField.value !== "") {
    ZIPField.classList.remove("bcolor");
    ZIPField.classList.add("bncolor");
  } else if (ZIPField.value === "") {
    ZIPField.classList.remove("bncolor");
    ZIPField.classList.add("bcolor");
  }
});

form.addEventListener("submit", (event) => {
  if (ZIPField.value === "") {
    ZIPFieldError.textContent = "Please enter a ZIP code";
    event.preventDefault();
    return;
  }

  if (!ZIPField.checkValidity()) {
    ZIPFieldError.textContent =
      "Please enter a valid ZIP code from that country";
    event.preventDefault();
    return;
  }
  if (
    ZIPField.checkValidity() &&
    email.validity.valid &&
    password.validity.valid &&
    pconfirmation.value === password.value
  ) {
    ZIPFieldError.textContent = "";
    document.querySelector(".finalm").innerText = "high five!";
  }
});
