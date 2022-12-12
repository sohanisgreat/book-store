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
        <table border="1">
            <thead>
                <tr>
                    <td>Book Name</td>
                    <td>Author Name</td>
                    <td>Book Link</td>
                </tr>
            </thead>
            <tbody>
    `;

    for (let i = 0; i < booksObjectArray.length; i++) {
        html += `
                <tr>
                    <td>${booksObjectArray[i].title}</td>
                    <td>${booksObjectArray[i].author}</td>
                    <td><a href="${booksObjectArray[i].link}">PDF</a></td>
                </tr>
        `;
    }

    html += `
            </tbody>
        </table>
    `;

    let library = document.getElementById("library-div");
    library.style.display = "block";
    library.innerHTML = html;
}
