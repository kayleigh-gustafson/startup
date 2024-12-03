export default async function editUserData(userData, setUserData, section, id, property, value) {
    let data = {...userData};
    data[section][id][property] = value;
    setUserData(data);
    await fetch('/api/setuserdata', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({data}),
    });
}