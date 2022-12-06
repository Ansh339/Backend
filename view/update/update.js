// UPDATE USER
document.querySelector('#update-btn').addEventListener('click', e => {
    e.preventDefault()

    const email = document.querySelector('#update-email').value
    const oldPassword = document.querySelector('#update-o-password').value
    const newPassword = document.querySelector('#update-n-password').value

    if(email === '' || oldPassword === '' || newPassword === '')
    {
        alert('Email and Password fields are Mandatory')
    }
    else
    {
        const User = {
            email: email,
            password: oldPassword,
            newPassword: newPassword
        }

        const xhr = new XMLHttpRequest()
        const url = 'http://localhost:5000/users/update'
    
        xhr.open('PATCH', url)
    
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
    
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4 && xhr.status === 200) {
                console.log(JSON.parse(xhr.responseText));
                const response = JSON.parse(xhr.responseText)
                let output = `
                <p>Account details with Email <b>${response.update.email}</b> has been Successfully Updated</p>
                `

                document.querySelector('#update-disp').innerHTML = output
            }
        }
    
        xhr.send(JSON.stringify(User))
    }
 
})