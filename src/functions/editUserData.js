export default function editUserData(userData, setUserData, section, id, property, value) {
    let data = {...userData};
    data[section][id][property] = value;
    console.log(data);
    setUserData(data);
}