export default function deleteUserData(userData, setUserData, section, id, currentTerm="", setCurrentTerm="") {
    let data = structuredClone(userData);
    console.log("currentTerm", currentTerm, "setCurrentTerm", setCurrentTerm);
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
        if (currentTerm === termId) {
            let remainingTerms = data.terms;
            Object.keys(remainingTerms).forEach(key => {
                if (key === currentTerm) delete remainingTerms[key];
              });
            setCurrentTerm(Object.keys(remainingTerms)[0]);
        }
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
    }

    function deleteTask(section, taskId) {
        delete data[section][taskId];
    }
    
    console.log(data);
    setUserData(data);
}