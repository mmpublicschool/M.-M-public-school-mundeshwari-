// Sample data storage (in a real application, this would be a database)
let studentResults = [
    { name: "Rahul Kumar", roll: "2025001", marks: 85 },
    { name: "Priya Singh", roll: "2025002", marks: 92 },
    { name: "Amit Sharma", roll: "2025003", marks: 78 }
];

let studentAdmitCards = [
    { 
        name: "Rahul Kumar", 
        father: "Rajesh Kumar", 
        mother: "Sunita Devi", 
        roll: "2025001", 
        mobile: "9876543210", 
        dob: "2008-05-15", 
        center: "Mundeshwari", 
        date: "2025-03-15", 
        time: "9:00 AM to 12:00 PM" 
    },
    { 
        name: "Priya Singh", 
        father: "Vikram Singh", 
        mother: "Anita Singh", 
        roll: "2025002", 
        mobile: "9876543211", 
        dob: "2008-07-22", 
        center: "Bhagwanpur", 
        date: "2025-03-16", 
        time: "9:00 AM to 12:00 PM" 
    }
];

// Check Result Functionality
document.getElementById('checkResultBtn').addEventListener('click', function() {
    const name = document.getElementById('studentName').value.trim();
    const roll = document.getElementById('rollNumber').value.trim();
    const resultDisplay = document.getElementById('resultDisplay');
    
    if (!name || !roll) {
        resultDisplay.textContent = "Please enter both name and roll number.";
        resultDisplay.className = "result-display error";
        resultDisplay.style.display = "block";
        return;
    }
    
    const student = studentResults.find(s => 
        s.name.toLowerCase() === name.toLowerCase() && s.roll === roll
    );
    
    if (student) {
        resultDisplay.innerHTML = `
            <strong>Result Found!</strong><br>
            Name: ${student.name}<br>
            Roll Number: ${student.roll}<br>
            Marks: ${student.marks}/100<br>
            Status: ${student.marks >= 33 ? 'Pass' : 'Fail'}
        `;
        resultDisplay.className = "result-display success";
    } else {
        resultDisplay.textContent = "No result found. Please check your details.";
        resultDisplay.className = "result-display error";
    }
    
    resultDisplay.style.display = "block";
});

// Check Admit Card Functionality
document.getElementById('checkAdmitBtn').addEventListener('click', function() {
    const name = document.getElementById('admitName').value.trim();
    const father = document.getElementById('fatherName').value.trim();
    const dob = document.getElementById('dob').value;
    const admitDisplay = document.getElementById('admitDisplay');
    const admitCardTemplate = document.getElementById('admitCardTemplate');
    
    if (!name || !father || !dob) {
        admitDisplay.textContent = "Please enter all details.";
        admitDisplay.className = "admit-card-display error";
        admitDisplay.style.display = "block";
        admitCardTemplate.style.display = "none";
        return;
    }
    
    const student = studentAdmitCards.find(s => 
        s.name.toLowerCase() === name.toLowerCase() && 
        s.father.toLowerCase() === father.toLowerCase() && 
        s.dob === dob
    );
    
    if (student) {
        // Populate admit card template
        document.getElementById('acName').textContent = student.name;
        document.getElementById('acFather').textContent = student.father;
        document.getElementById('acMother').textContent = student.mother;
        document.getElementById('acRoll').textContent = student.roll;
        document.getElementById('acDob').textContent = formatDate(student.dob);
        document.getElementById('acMobile').textContent = student.mobile;
        document.getElementById('acCenter').textContent = student.center;
        document.getElementById('acDate').textContent = formatDate(student.date);
        document.getElementById('acTime').textContent = student.time;
        
        admitCardTemplate.style.display = "block";
        admitDisplay.style.display = "none";
    } else {
        admitDisplay.textContent = "No admit card found. Please check your details.";
        admitDisplay.className = "admit-card-display error";
        admitDisplay.style.display = "block";
        admitCardTemplate.style.display = "none";
    }
});

// Login Functionality
document.getElementById('loginBtn').addEventListener('click', function() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const loginMessage = document.getElementById('loginMessage');
    const adminPanel = document.getElementById('adminPanel');
    
    if (username === "Pksss" && password === "654321") {
        adminPanel.style.display = "block";
        loginMessage.textContent = "Login successful!";
        loginMessage.style.color = "green";
        document.querySelector('.login-section').style.display = "none";
    } else {
        loginMessage.textContent = "Invalid username or password!";
        loginMessage.style.color = "red";
    }
});

// Logout Functionality
document.getElementById('logoutBtn').addEventListener('click', function() {
    document.getElementById('adminPanel').style.display = "none";
    document.querySelector('.login-section').style.display = "block";
    document.getElementById('username').value = "";
    document.getElementById('password').value = "";
    document.getElementById('loginMessage').textContent = "";
});

// Upload Result Functionality
document.getElementById('uploadResultBtn').addEventListener('click', function() {
    const name = document.getElementById('resultName').value.trim();
    const roll = document.getElementById('resultRoll').value.trim();
    const marks = parseInt(document.getElementById('resultMarks').value);
    
    if (!name || !roll || isNaN(marks) || marks < 0 || marks > 100) {
        alert("Please enter valid name, roll number and marks (0-100).");
        return;
    }
    
    // Check if student already exists
    const existingIndex = studentResults.findIndex(s => s.roll === roll);
    
    if (existingIndex !== -1) {
        studentResults[existingIndex].name = name;
        studentResults[existingIndex].marks = marks;
        alert("Result updated successfully!");
    } else {
        studentResults.push({ name, roll, marks });
        alert("Result uploaded successfully!");
    }
    
    // Clear form
    document.getElementById('resultName').value = "";
    document.getElementById('resultRoll').value = "";
    document.getElementById('resultMarks').value = "";
});

// Remove Result Functionality
document.getElementById('removeResultBtn').addEventListener('click', function() {
    const roll = document.getElementById('resultRoll').value.trim();
    
    if (!roll) {
        alert("Please enter a roll number.");
        return;
    }
    
    const existingIndex = studentResults.findIndex(s => s.roll === roll);
    
    if (existingIndex !== -1) {
        studentResults.splice(existingIndex, 1);
        alert("Result removed successfully!");
        document.getElementById('resultName').value = "";
        document.getElementById('resultRoll').value = "";
        document.getElementById('resultMarks').value = "";
    } else {
        alert("No result found for this roll number.");
    }
});

// Upload Admit Card Functionality
document.getElementById('uploadAdmitBtn').addEventListener('click', function() {
    const name = document.getElementById('admitCardName').value.trim();
    const father = document.getElementById('admitFatherName').value.trim();
    const mother = document.getElementById('admitMotherName').value.trim();
    const roll = document.getElementById('admitRoll').value.trim();
    const mobile = document.getElementById('mobileNumber').value.trim();
    const dob = document.getElementById('admitDob').value;
    const center = document.getElementById('examCenter').value;
    const date = document.getElementById('examDate').value;
    const time = document.getElementById('examTime').value.trim();
    
    if (!name || !father || !mother || !roll || !mobile || !dob || !center || !date || !time) {
        alert("Please fill all fields.");
        return;
    }
    
    // Check if student already exists
    const existingIndex = studentAdmitCards.findIndex(s => s.roll === roll);
    
    const admitData = {
        name, father, mother, roll, mobile, dob, center, date, time
    };
    
    if (existingIndex !== -1) {
        studentAdmitCards[existingIndex] = admitData;
        alert("Admit card updated successfully!");
    } else {
        studentAdmitCards.push(admitData);
        alert("Admit card uploaded successfully!");
    }
    
    // Clear form
    document.getElementById('admitCardName').value = "";
    document.getElementById('admitFatherName').value = "";
    document.getElementById('admitMotherName').value = "";
    document.getElementById('admitRoll').value = "";
    document.getElementById('mobileNumber').value = "";
    document.getElementById('admitDob').value = "";
    document.getElementById('examCenter').value = "";
    document.getElementById('examDate').value = "";
    document.getElementById('examTime').value = "";
});

// Remove Admit Card Functionality
document.getElementById('removeAdmitBtn').addEventListener('click', function() {
    const roll = document.getElementById('admitRoll').value.trim();
    
    if (!roll) {
        alert("Please enter a roll number.");
        return;
    }
    
    const existingIndex = studentAdmitCards.findIndex(s => s.roll === roll);
    
    if (existingIndex !== -1) {
        studentAdmitCards.splice(existingIndex, 1);
        alert("Admit card removed successfully!");
        
        // Clear form
        document.getElementById('admitCardName').value = "";
        document.getElementById('admitFatherName').value = "";
        document.getElementById('admitMotherName').value = "";
        document.getElementById('admitRoll').value = "";
        document.getElementById('mobileNumber').value = "";
        document.getElementById('admitDob').value = "";
        document.getElementById('examCenter').value = "";
        document.getElementById('examDate').value = "";
        document.getElementById('examTime').value = "";
    } else {
        alert("No admit card found for this roll number.");
    }
});

// Helper function to format dates
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}