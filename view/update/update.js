// UPDATE USER
document.querySelector('#update-btn').addEventListener('click', e => {
    e.preventDefault()

    const email = document.querySelector('#update-email').value
    const oldPassword = document.querySelector('#update-o-password').value
    const newPassword = document.querySelector('#update-n-password').value

    if(email === '' || oldPassword === '')
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
                <div class="alert alert-dismissable alert-success">
                    <h2>Account details with Name "${response.update.name}" has been Successfully Updated</h2>
                    <div class="card text-white bg-success mb-3" style ="margin: 1.2em; width:250px">
                        <div class="card-body">
                            <p>NAME = ${response.update.name}</p>
                            <p>NUMBER = ${response.update.number}</p>
                            <p>EMAIL = ${response.update.email}</p>
                        </div>
                    </div>
                </div>
                `

                document.querySelector('#update-disp').innerHTML = output
            }
            else if(xhr.readyState === 4 && xhr.status === 400) {
                console.log(JSON.parse(xhr.responseText));
                const response = JSON.parse(xhr.responseText)
                let output = `
                <div class="alert alert-dismissable alert-danger">
                    <h2>${response.message}
                </div>    
                `

                document.querySelector('#update-disp').innerHTML = output
            }
            else if(xhr.readyState === 4 && xhr.status === 401) {
                console.log(JSON.parse(xhr.responseText));
                const response = JSON.parse(xhr.responseText)
                let output = `
                <div class="alert alert-dismissable alert-warning">
                    <h2>${response.message}
                </div>    
                `

                document.querySelector('#update-disp').innerHTML = output
            }
            else if(xhr.readyState === 4 && xhr.status === 402) {
                console.log(JSON.parse(xhr.responseText));
                const response = JSON.parse(xhr.responseText)
                let output = `
                <div class="alert alert-dismissable alert-warning">
                    <h2>${response.message}
                </div>    
                `

                document.querySelector('#update-disp').innerHTML = output
            }
        }
    
        xhr.send(JSON.stringify(User))
    }
 
})