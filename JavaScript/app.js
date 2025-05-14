const userInfo = document.getElementById("user-info")
userInfo.style.display = "none"

const searchButton = document.getElementById("search")

searchButton.addEventListener("click", event => {
    const username = document.getElementById("username")

    if (!username.value) {
        alert("Please enter a username")
        return
    }

    fetch(`https://api.github.com/users/${username.value}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("User not found")
            }
            return response.json();
        })

        .then(data => {
            localStorage.setItem("lastUser", JSON.stringify(data))

            const name = document.getElementById("name")
            const repos = document.getElementById("public-repos")
            const following = document.getElementById("following")
            const followers = document.getElementById("followers")
            const avatar = document.getElementById("avatar")

            name.innerHTML = `Name: ${data.name}`
            repos.innerHTML = `public-repos: ${data.public_repos}`
            following.innerHTML = `Following: ${data.following}`
            followers.innerHTML = `Followers: ${data.followers}`
            avatar.src = `${data.avatar_url}`

            userInfo.style.display = "block"
        })
        .catch(error => {
            userInfo.style.display = "block"
            document.getElementById("user-info").innerHTML = `<h1>${error.message}</h1>`
        })
})