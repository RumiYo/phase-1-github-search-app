
document.addEventListener('DOMContentLoaded', function() {
    
    //Search User

    const input = document.querySelector('#github-form');
    input.addEventListener('submit', (e)=>{
        e.preventDefault();
        let inputValue = e.target.search.value;
        getUserData(inputValue);
    })

    //Get Userdata and Display them
    function getUserData(userName){
        fetch(`https://api.github.com/search/users?q=${userName}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept:'application/vnd.github.v3+json'
            }
        })
        .then(res => res.json())
        .then(data => {
            const items = data.items;
            for(const id in items){
                let list =document.createElement('li')
                list.className = 'userInfo'
                list.innerHTML = `
                <img src='${items[id].avatar_url}' height='25'/>
                <span class='usernames'>${items[id].login}</span> <a class=urls href="${items[id].html_url}">${items[id].html_url}</p> 
                `
                document.querySelector('#user-list').appendChild(list);
            };
        
            //AddLinkToEachUser
            const userNames = document.querySelectorAll('.usernames')
            userNames.forEach((eachUser) => {
                eachUser.addEventListener('click', () => {
                    let userForRepos =eachUser.textContent;
                    fetch(`https://api.github.com/users/${userForRepos}/repos`,{
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept:'application/vnd.github.v3+json'
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        const listToRemove =  document.querySelector('#repos-list')
                        listToRemove.textContent = ''
                        for(const id in data){
                            let list =document.createElement('li');
                            localStorage.className = 'reposList';
                            list.innerHTML = `
                            <span class='repoName'>${data[id].name}  </span><a class='repoUrl' href="${data[id].html_url}">${data[id].html_url}</a>                      
                            `
                            document.querySelector('#repos-list').appendChild(list)
                        }
                    })
                })
            })
        })
    }
})