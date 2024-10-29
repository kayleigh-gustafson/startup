export default function addUserData(userData, setUserData, section, id, object) {
    console.log(userData);
    let data = userData;
    data[section][id] = object;
    console.log(data);
    setUserData(data);
}