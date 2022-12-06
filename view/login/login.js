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
                let output = `
                <p>Account with Email <b>${email}</b> has been Successfully LOGGED IN</p>
                <p>WELCOME</p>
                `

                document.querySelector('#login-disp').innerHTML = output
            }
        }
    
        xhr.send(JSON.stringify(User))
    }
 
})