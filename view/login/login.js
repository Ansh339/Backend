// LOGIN USER
document.querySelector('#login-btn').addEventListener('click', e => {
    e.preventDefault()

    const email = document.querySelector('#login-email').value
    const password = document.querySelector('#login-password').value

    if(email === '' || password === '' )
    {
        alert('Email and Password fields are Mandatory')
    }
    else
    {
        const User = {
            email: email,
            password: password
        }

        const xhr = new XMLHttpRequest()
        const url = 'http://localhost:5000/users/login'
    
        xhr.open('POST', url)
    
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
    
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4 && xhr.status === 200) {
                console.log(JSON.parse(xhr.responseText));
                const response = JSON.parse(xhr.responseText);
                let output = `
                <div class="alert alert-dismissible alert-success">
                    <h2 style="text-align:center">Account with Email "${response.result[0].email}" has been Successfully LOGGED IN</h2>
                    <h2 style="text-align:center">WELCOME</h2>
                    <div class="card text-white bg-success mb-3" style ="margin: 1.2em; width:250px">
                        <div class="card-body">
                            <p>NAME = ${response.result[0].name}</p>
                            <p>NUMBER = ${response.result[0].number}</p>
                            <p>EMAIL = ${response.result[0].email}</p>
                        </div>
                    </div>
                </div>
                `

                document.querySelector('#login-disp').innerHTML = output
            }
            else if(xhr.readyState === 4 && xhr.status === 400) {
                console.log(JSON.parse(xhr.responseText));
                const response = JSON.parse(xhr.responseText)
                let output = `
                <div class="alert alert-dismissible alert-danger">
                    <h2>${response.message}
                </div>
                `

                document.querySelector('#login-disp').innerHTML = output
            }
            else if(xhr.readyState === 4 && xhr.status === 401) {
                console.log(JSON.parse(xhr.responseText));
                const response = JSON.parse(xhr.responseText)
                let output = `
                <div class="alert alert-dismissible alert-warning">
                    <h2>${response.message}
                </div>    
                `

                document.querySelector('#login-disp').innerHTML = output
            }
        }
    
        xhr.send(JSON.stringify(User))
    }
 
})