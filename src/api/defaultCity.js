export const getCity = async () => {
    const res = await fetch('https://api.db-ip.com/v2/free/self');
    return await res.json();
}
