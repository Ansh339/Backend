document.querySelector('#admin-btn').addEventListener('click', e => {
    e.preventDefault()

    const email = document.querySelector('#admin-email').value
    const password = document.querySelector('#admin-password').value

    if(email === '' || password === '' )
    {
        alert('Email and Password fields are Mandatory')
    }
    else
    {
        if(email !== 'admindata2431@adminorg.com' || password !== 'admin@Data1243')
        {
            alert('Wrong email or password')
        }
        else
        {
            // console.log('SIGN IN SUCCESSFUL');
            const xhr = new XMLHttpRequest()
            const url = 'http://localhost:5000/users/signup'
        
            xhr.open('GET', url)
        
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
        
            xhr.onreadystatechange = () => {
                if(xhr.readyState === 4 && xhr.status === 200)
                {
                    const response = JSON.parse(xhr.responseText)
        
                    let output = ''
        
                    for( let i = 0; i < response.Accounts.length; i++)
                    {
                        output += `
                        <div class="card text-white bg-danger mb-3" style ="margin: 1.2em; width:250px">
                            <div class="card-body">
                                <p>NAME = ${response.Accounts[i].name}</p>
                                <p>NUMBER = ${response.Accounts[i].number}</p>
                                <p>EMAIL = ${response.Accounts[i].email}</p>
                                <p>PASSWORD = ${response.Accounts[i].password}</p>
                            </div>
                        </div>
                        `
                    }
                    document.querySelector('#admin-disp').innerHTML = output
                }
            }
        
            xhr.send()
        }
    }
})