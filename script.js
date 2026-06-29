const API = "http://localhost:5000/students";

const nameInput = document.getElementById("name");
const idInput = document.getElementById("id");
const departmentInput = document.getElementById("department");
const cgpaInput = document.getElementById("cgpa");

const table = document.getElementById("studentTable");

const searchInput = document.getElementById("search");
const filterInput = document.getElementById("filter");

let editId = null;

// Load students
async function loadStudents() {

    const res = await fetch(API);
    const students = await res.json();

    displayStudents(students);
}

// Display Table
function displayStudents(students){

    table.innerHTML = "";

    students.forEach(student=>{

        table.innerHTML += `
        <tr>

            <td>${student.name}</td>
            <td>${student.student_id}</td>
            <td>${student.department}</td>
            <td>${student.cgpa}</td>

            <td>

                <button class="edit-btn"
                onclick="editStudent(${student.id},
                '${student.name}',
                '${student.student_id}',
                '${student.department}',
                '${student.cgpa}')">

                <i class="fa-solid fa-pen"></i>

                </button>

                <button class="delete-btn"
                onclick="deleteStudent(${student.id})">

                <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>
        `;

    });

}

// Save Student
document.getElementById("saveBtn").addEventListener("click", async ()=>{

    const student = {

        name:nameInput.value,
        student_id:idInput.value,
        department:departmentInput.value,
        cgpa:cgpaInput.value

    };

    if(editId==null){

        await fetch(API,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(student)
        });

    }else{

        await fetch(API+"/"+editId,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(student)
        });

        editId=null;

    }

    clearForm();
    loadStudents();

});

// Delete
async function deleteStudent(id){

    if(confirm("Delete this student?")){

        await fetch(API+"/"+id,{
            method:"DELETE"
        });

        loadStudents();

    }

}

// Edit
function editStudent(id,name,sid,dept,cgpa){

    editId=id;

    nameInput.value=name;
    idInput.value=sid;
    departmentInput.value=dept;
    cgpaInput.value=cgpa;

}

// Search
searchInput.addEventListener("keyup",()=>{

    const keyword=searchInput.value.toLowerCase();

    Array.from(table.rows).forEach(row=>{

        row.style.display=row.innerText.toLowerCase().includes(keyword)
        ?"":"none";

    });

});

// Filter
filterInput.addEventListener("change",()=>{

    const value=filterInput.value;

    Array.from(table.rows).forEach(row=>{

        if(value==="All Departments"){

            row.style.display="";

        }else{

            row.style.display=row.cells[2].innerText===value
            ?"":"none";

        }

    });

});

function clearForm(){

    nameInput.value="";
    idInput.value="";
    departmentInput.value="";
    cgpaInput.value="";

}

loadStudents();