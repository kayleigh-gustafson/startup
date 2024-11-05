export default function editUserData(userData, setUserData, section, id, property, value) {
    let data = {...userData};
    data[section][id][property] = value;
    setUserData(data);
}