// SIGNUP USER
document.querySelector('#signup-btn').addEventListener('click', e => {
    e.preventDefault()

    const email = document.querySelector('#signup-email').value
    const password = document.querySelector('#signup-password').value

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
        const url = 'http://localhost:5000/users/signup'
    
        xhr.open('POST', url)
    
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
    
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4 && xhr.status === 201) {
                console.log(JSON.parse(xhr.responseText));
                const response = JSON.parse(xhr.responseText);
                let output = `
                <p>Account with email ${response.userDetails.email} has been REGISTERED
                `

                document.querySelector('#signup-disp').innerHTML = output
            }
        }
    
        xhr.send(JSON.stringify(User))
    }
 
})