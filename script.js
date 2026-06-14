function updateDashboard(){
    document.getElementById("totalStudents").innerText =
        students.length;

    let total = 0;

    students.forEach(student=>{
        total += Number(student.cgpa);
    });

    const avg =
        students.length > 0
        ? (total/students.length).toFixed(2)
        : "0.00";

    document.getElementById("avgCGPA").innerText = avg;
}