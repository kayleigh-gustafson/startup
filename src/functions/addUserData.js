export default async function addUserData(userData, setUserData, section, id, object) {
    let data = {...userData};
    if (section === "terms") {
        let classId = "";
        while (classId === "") {
            let tempId = Math.floor(Math.random() * 90000) + 10000;
            if (!userData.assignments.hasOwnProperty(tempId) && !userData.exams.hasOwnProperty(tempId)) {
                classId = tempId;
            }
        }
        addUserData(userData, setUserData, "classes", classId, {name: "My new class", color: "#a8a8a8", term: id})
    }
    data[section][id] = object;
    console.log("addUserData: setUserData", data);
    setUserData(data);
    await fetch('/api/setuserdata', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({data}),
    });
}