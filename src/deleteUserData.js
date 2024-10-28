export default function deleteUserData(userData, setUserData, section, id) {
    let data = structuredClone(userData);

    // if we are deleting a term, delete associated classes
    if (section === "terms") {
        deleteTerm(id);
    } else if (section === "classes") {
        deleteClass(id);
    } else if (section === "assignments" || section === "exams") {
        deleteTask(section, id);
    } else {
        console.log("Error: unknown target for deletion");
        return;
    }

    function deleteTerm(termId) {
        for (const [key, value] of Object.entries(userData.classes)) {
            if (value.term === termId) {
                deleteClass(key)
            }
        }
        delete data["terms"][termId];
    }
    function deleteClass(classId) {
        for (const [key, value] of Object.entries(userData.assignments)) {
            if (value.classId === classId) {
                deleteTask("assignments", key)
            }
        }
        for (const [key, value] of Object.entries(userData.exams)) {
            if (value.classId === classId) {
                deleteTask("exams", key)
            }
        }
        delete data["classes"][classId];
        console.log("Deleted class", classId);
    }

    function deleteTask(section, taskId) {
        delete data[section][taskId];
    }
    
    console.log(data);
    setUserData(data);
}