// Simulated data arrays
let patients = [];
let appointments = [];
let billings = [];
let medicines = [];
let histories = [];

let loggedIn = false;

// Show/hide sections
function showSection(id) {
    document.querySelectorAll('.card').forEach(c => c.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

// Login function
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if(username === 'admin' && password === 'password') {
        loggedIn = true;
        showSection('menu-section');
        document.getElementById('login-msg').textContent = '';
    } else {
        document.getElementById('login-msg').textContent = 'Invalid username or password';
    }
}

function logout() {
    loggedIn = false;
    showSection('login-section');
}

// Patient functions
function registerPatient() {
    const p = {
        id: patients.length + 1,
        name: document.getElementById('patient-name').value,
        age: parseInt(document.getElementById('patient-age').value),
        gender: document.getElementById('patient-gender').value,
        address: document.getElementById('patient-address').value,
        phone: document.getElementById('patient-phone').value
    };
    patients.push(p);
    alert(`Patient registered with ID ${p.id}`);
}

function viewPatients() {
    const list = document.getElementById('patient-list');
    list.innerHTML = '';
    if(patients.length === 0) list.textContent = 'No patients registered.';
    else {
        patients.forEach(p => {
            const div = document.createElement('div');
            div.textContent = `ID: ${p.id}, Name: ${p.name}, Age: ${p.age}, Gender: ${p.gender}, Phone: ${p.phone}`;
            list.appendChild(div);
        });
    }
}

// Appointment functions
function addAppointment() {
    const a = {
        id: appointments.length + 1,
        patientId: parseInt(document.getElementById('appointment-pid').value),
        date: document.getElementById('appointment-date').value,
        doctor: document.getElementById('appointment-doctor').value
    };
    if(!patients.find(p => p.id === a.patientId)) return alert('Patient not found');
    appointments.push(a);
    alert('Appointment added');
}

function viewAppointments() {
    const list = document.getElementById('appointment-list');
    list.innerHTML = '';
    if(appointments.length === 0) list.textContent = 'No appointments.';
    else {
        appointments.forEach(a => {
            const div = document.createElement('div');
            div.textContent = `ID: ${a.id}, Patient ID: ${a.patientId}, Date: ${a.date}, Doctor: ${a.doctor}`;
            list.appendChild(div);
        });
    }
}

// Billing functions
function addBilling() {
    const b = {
        patientId: parseInt(document.getElementById('billing-pid').value),
        amount: parseFloat(document.getElementById('billing-amount').value)
    };
    if(!patients.find(p => p.id === b.patientId)) return alert('Patient not found');
    billings.push(b);
    alert('Billing added');
}

// Medicine functions
function addMedicine() {
    const m = {
        id: medicines.length + 1,
        name: document.getElementById('medicine-name').value,
        quantity: parseInt(document.getElementById('medicine-quantity').value),
        price: parseFloat(document.getElementById('medicine-price').value)
    };
    medicines.push(m);
    alert(`Medicine added with ID ${m.id}`);
}

function viewMedicines() {
    const list = document.getElementById('medicine-list');
    list.innerHTML = '';
    if(medicines.length === 0) list.textContent = 'No medicines.';
    else {
        medicines.forEach(m => {
            const div = document.createElement('div');
            div.textContent = `ID: ${m.id}, Name: ${m.name}, Qty: ${m.quantity}, Price: $${m.price.toFixed(2)}`;
            list.appendChild(div);
        });
    }
}

// History functions
function addHistory() {
    const h = {
        patientId: parseInt(document.getElementById('history-pid').value),
        details: document.getElementById('history-details').value
    };
    if(!patients.find(p => p.id === h.patientId)) return alert('Patient not found');
    histories.push(h);
    alert('History added');
}

function viewHistory() {
    const list = document.getElementById('history-list');
    list.innerHTML = '';
    const pid = parseInt(document.getElementById('history-pid').value);
    const filtered = histories.filter(h => h.patientId === pid);
    if(filtered.length === 0) list.textContent = 'No medical history found.';
    else filtered.forEach(h => {
        const div = document.createElement('div');
        div.textContent = `Patient ID: ${h.patientId}, Details: ${h.details}`;
        list.appendChild(div);
    });
}


