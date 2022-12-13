function logout() {
    document.getElementById("bookPage").style.display = "none";
    document.getElementById("loginPage").style.display = "block";
}

// -------------------------------------

let users = [
    {
        uname: "soham",
        pass: "soham10"
    },
    {
        uname: "umesh",
        pass: "umesh10"
    },
    {
        uname: "somshekhar",
        pass: "somshekhar"
    }
];

function checkUser(uname, pass) {
    for (let i = 0; i < users.length; i++) {
        if(users[i].uname === uname && users[i].pass === pass)
            return true;
    }
    return false;
}

function login() {
    let uname = document.getElementById("username");
    let pass = document.getElementById("password");

    if (checkUser(uname.value, pass.value)) {
        document.getElementById("bookPage").style.display = "block";
        document.getElementById("loginPage").style.display = "none";
        uname.value = '';
        pass.value = '';
    } else {
        document.getElementById("error").style.display = "block";
    }
}

// --------------------------------------------

let inputArray = [];
let booksObjectArray = [];

function validateForm() {
    inputArray = document.getElementsByClassName("validate");
    for (let i = 0; i < inputArray.length; i++) {
        if (inputArray[i].value == '') {
            inputArray[i].classList.add("error");
            return false;
        }
    }
    return true;
}

function addToLibrary() {
    if (!validateForm()) return;
    
    let book = {};
    for (let i = 0; i < inputArray.length; i++)
        book[inputArray[i].id] = inputArray[i].value;
    
    booksObjectArray.push(book);
    document.getElementById("form-status").style.display = "block";

    setTimeout(() => {
        resetForm();
        document.getElementById("form-status").style.display = "none";
    }, 1200);
}

function resetForm() {
    inputArray = document.getElementsByClassName("validate");
    for (let i = 0; i < inputArray.length; i++) {
        inputArray[i].value = '';
        inputArray[i].classList.remove("error");
    }
}

function showLibrary() {
    inputArray = document.getElementsByClassName("validate");
    let html = `
        <h2 style="margin-bottom: 10px;">Library</h2>
        <table border="1" class="table">
            <thead>
                <tr>
                    <td>S. No.</td>
                    <td>Book Name</td>
                    <td>Author Name</td>
                    <td>Book PDF</td>
                    <td>Book Cover</td>
                </tr>
            </thead>
            <tbody>
    `;

    for (let i = 0; i < booksObjectArray.length; i++) {
        html += `
                <tr>
                    <td>${i+1}</td>
                    <td>${booksObjectArray[i].title}</td>
                    <td>${booksObjectArray[i].author}</td>
                    <td><a href="${booksObjectArray[i].pdflink}" target="_blank">Read PDF</a></td>
                    <td><img src="${booksObjectArray[i].imglink}" style="width: 100px;"></td>
                </tr>
        `;
    }

    html += `
            </tbody>
        </table>
        <div class="inputs">
            <input type="button" value="Remove A Record" onclick="removeARecord()">
            <input type="button" value="Remove All" onclick="removeAllRecords()">
        </div>
    `;

    let library = document.getElementById("library-div");
    library.style.display = "block";
    library.innerHTML = html;
}

function removeARecord() {
    if (booksObjectArray.length == 0) return alert("Library is empty");

    let recordNum = prompt("Enter record S. No. to delete: ");

    if (isNaN(recordNum))
        return alert("Please enter a valid number.");

    if (recordNum < 1 || recordNum > booksObjectArray.length)
        return alert("Record does not exists.");

    const index = booksObjectArray.indexOf(booksObjectArray[recordNum - 1]);
    if (index > -1) {
        if(confirm("Are you sure you want to remove this book?"))
            booksObjectArray.splice(index, 1);
    }
    else
        return alert("Record not found.");
}

function removeAllRecords() {
    if (booksObjectArray.length == 0) return alert("Library is empty.");
    if (confirm("Are you sure you want to delete all the records?"))
        booksObjectArray = [];
}
