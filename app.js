const API_URL = "/"; // same domain in Render

async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch(API_URL + "login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password})
    });

    const data = await res.json();
    if (res.ok) {
        document.getElementById("login").style.display = "none";
        document.getElementById("patients").style.display = "block";
        loadPatients();
    } else {
        document.getElementById("loginMsg").innerText = data.error;
    }
}

async function loadPatients() {
    const res = await fetch(API_URL + "patients");
    const data = await res.json();
    const list = document.getElementById("patientList");
    list.innerHTML = "";
    data.forEach(p => {
        const li = document.createElement("li");
        li.innerText = `${p.id}: ${p.name} (${p.username}, Age: ${p.age})`;
        list.appendChild(li);
    });
}

async function addPatient() {
    const name = document.getElementById("newName").value;
    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;
    const age = parseInt(document.getElementById("newAge").value);

    const res = await fetch(API_URL + "patients", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name, username, password, age})
    });

    if (res.ok) {
        loadPatients();
        alert("Patient added successfully");
    } else {
        const data = await res.json();
        alert("Error: " + data.error);
    }
}
