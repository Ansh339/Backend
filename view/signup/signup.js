// SIGNUP USER
document.querySelector('#signup-btn').addEventListener('click', e => {
    e.preventDefault()

    const name = document.querySelector('#signup-name').value
    const number = document.querySelector('#signup-number').value
    const email = document.querySelector('#signup-email').value
    const password = document.querySelector('#signup-password').value

    if(email === '' || password === '' )
    {
        alert('Email and Password fields are Mandatory')
    }
    else
    {
        const User = {
            name: name,
            number: number,
            email: email,
            password: password
        }

        const xhr = new XMLHttpRequest()
        const url = 'http://localhost:5000/users/signup'
    
        xhr.open('POST', url)
    
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
    
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4 && xhr.status === 201) {
                console.log(JSON.parse(xhr.responseText));
                const response = JSON.parse(xhr.responseText);
                let output = `
                <div class="alert alert-dismissable alert-success">
                    <h2>Account with Email "${response.userDetails.email}" has been REGISTERED
                </div>
                `

                document.querySelector('#signup-disp').innerHTML = output
            }
            else if(xhr.status === 400 && xhr.readyState === 4)
            {
                const response = JSON.parse(xhr.responseText);
                let output = `
                <div class="alert alert-dismissable alert-warning">
                    <h2>${response.message}
                </div>
                `

                document.querySelector('#signup-disp').innerHTML = output
            }
        }
    
        xhr.send(JSON.stringify(User))
    }
 
})