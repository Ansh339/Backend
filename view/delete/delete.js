// DELETE USER
document.querySelector('#delete-btn').addEventListener('click', e => {
    e.preventDefault()

    const email = document.querySelector('#delete-email').value
    const password = document.querySelector('#delete-password').value

    if(email === '' || password === '')
    {
        alert('Please Enter the Required Field Data')
    }
    else
    {
        const User = {
            email: email,
            password: password
        }

        const xhr = new XMLHttpRequest()
        const url = `http://localhost:5000/users/users/delete`

        xhr.open('DELETE', url)

        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*')

        xhr.onreadystatechange = () => {
            
            if(xhr.readyState === 4 && xhr.status === 200)
            {
                const response = JSON.parse(xhr.responseText)
                console.log(response)

                let output = `
                <div class="alert alert-dismissable alert-success">
                    <h2>User with Email "${email}" has been Deleted
                </div>
                `

                document.querySelector('#delete-disp').innerHTML = output
            }
            else if(xhr.readyState === 4 && xhr.status === 400)
            {
                const response = JSON.parse(xhr.responseText)
                console.log(response)

                let output = `
                <div class="alert alert-dismissable alert-danger">
                    <h2>${response.message}
                </div>    
                `

                document.querySelector('#delete-disp').innerHTML = output
            }
            else if(xhr.readyState === 4 && xhr.status === 401)
            {
                const response = JSON.parse(xhr.responseText)
                console.log(response)

                let output = `
                <div class="alert alert-dismissable alert-warning">
                    <h2>${response.message}
                </div>    
                `

                document.querySelector('#delete-disp').innerHTML = output
            }
        }
        xhr.send(JSON.stringify(User));
    }
})