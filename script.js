document.addEventListener("DOMContentLoaded", () => {

  const githubForm = document.querySelector("#github-form")
  githubForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = githubForm.querySelector("#search")
    const inputValue = input.value
    fetchUsers(inputValue)
  })

  const fetchUsers = async (userName) => {
    try {
      const usersResp = await fetch(`https://api.github.com/search/users?q=${userName}`)
      const json = await usersResp.json()
      console.log(json.items)
      const users = json.items
      const userList = document.querySelector("#user-list")
      users.map(user => {
        const li = document.createElement("li")
        li.innerHTML = `
          <img src=${user.avatar_url} alt=${user.login} />
          <a href=${user.html_url} > ${user.login} </a>
        `
        li.addEventListener("click", () => fetchRepos(user.login))
        userList.append(li)
      })

    } catch (error) {
      console.log(error)
    }
  }

  const fetchRepos = async (user) => {
    try{
    const reposResp = await fetch(`https://api.github.com/users/${user}/repos`)
    const json = await reposResp.json()
    console.log(json)
    const reposList = document.querySelector("#repos-list")
    reposList.innerHTML = ""
    json.map(repo => {
      const li = document.createElement("li")
      li.innerHTML = `
      <a href=${repo.html_url} >${repo.name}</a>
      `
      reposList.append(li)
    })
    }  catch(error){
      console.log(error)
    }
  }
  
})

