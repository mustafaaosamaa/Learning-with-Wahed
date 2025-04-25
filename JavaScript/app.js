const searchButton = document.getElementById('search');

searchButton.addEventListener('click', () => {
    const usernameInput = document.getElementById('username');
    const username = usernameInput.value;
    usernameInput.value = '';

    if(!username) {
        alert('Please enter a username');
        return;
    }

    fetch(`https://api.github.com/users/${username}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("User not found"); 
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem("lastUser", JSON.stringify(data));


        const userInfo = document.getElementById('user-info');
        userInfo.innerHTML = `
            <h2>${data.name}</h2>
            <p>Followers: ${data.followers}</p>
            <p>Following: ${data.following}</p>
            <p>Public Repos: ${data.public_repos}</p>
            <img src="${data.avatar_url}" alt="${data.name}'s avatar" />
        `;
    })
    .catch(error => {
        document.getElementById('user-info').innerHTML = `<p>${error.message}</p>`;
    });

})

const savedUser = localStorage.getItem("lastUser");

if (savedUser) {
    const data = JSON.parse(savedUser); // convert string back to object
    const userInfo = document.getElementById('user-info');
    userInfo.innerHTML = `
        <h2>${data.name}</h2>
        <p>Followers: ${data.followers}</p>
        <p>Following: ${data.following}</p>
        <p>Public Repos: ${data.public_repos}</p>
        <img src="${data.avatar_url}" alt="${data.name}'s avatar" />
    `;
}