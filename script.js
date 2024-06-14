

const ongsUl = document.querySelector('#ongs-ul')
const a = document.querySelector('#ancora')
const form = document.querySelector('#search-form')
const baseUrl  = 'http://fundacao-solidaria-api.us-west-2.elasticbeanstalk.com/'
//const baseUrl = 'http://localhost:8080/'  
const  closeModal = document.querySelector('#close-modal-btn')
const openLogin = document.querySelector('#open-login')
const loginSubmit = document.querySelector('#login-submit')
const getOngsButton = document.querySelector('#get-ongs')
/*     "email": "teste@email.com",
    "password": "senha123" */

openLogin.addEventListener('click', () => {
    document.querySelector('dialog').showModal()
})

closeModal.addEventListener('click', () => {
    document.querySelector('dialog').close()
})

loginSubmit.addEventListener('click', async (event) => {
    event.preventDefault()
    const email = document.querySelector('#email').value
    const password = document.querySelector('#senha').value
    await auth(email, password)
    document.querySelector('dialog').close()
})

getOngsButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const ongs = await getAllOngs()
    ongsUl.innerHTML = ''
    ongsUl.style.listStyle = 'none'
    ongs.forEach(ong => {
        const div = document.createElement('div')
        div.style.display = 'flex'
        div.style.flexDirection = 'row'
        div.style.gridTemplateRows = 'auto auto auto auto'
        const li = document.createElement('li')
        li.style.marginTop = '2.5vh'
        li.style.marginBottom = '2.5vh'
        li.appendChild(div)

        

        const img = document.createElement('img')
        img.style.maxWidth = '19vw'
        img.style.maxHeight = '30vh'
        img.style.gridColumn = '1'
        img.style.marginRight = '2.5VW'

        img.src = ong.image
        div.appendChild(img)

        const contentDiv = document.createElement('div')
        contentDiv.style.display = 'flex'
        contentDiv.style.flexDirection = 'column'
        contentDiv.style.justifyContent = 'space-between'

        const h2 = document.createElement('h2')
        h2.textContent = ong.name
        h2.style.margin = '0'
        contentDiv.appendChild(h2)
        
        const p = document.createElement('p')
        p.textContent = ong.description
        contentDiv.appendChild(p)

        const divEndereco = document.createElement('div')
        divEndereco.style.display = 'flex'
        divEndereco.style.justifyContent = 'space-between'
        contentDiv.appendChild(divEndereco)

        const pCidade = document.createElement('p')
        pCidade.textContent = `Cidade: ${ong.city}`
        divEndereco.appendChild(pCidade)

        const pUf = document.createElement('p')
        pUf.textContent = `UF: ${ong.uf}`
        divEndereco.appendChild(pUf)

        const a = document.createElement('a')
        a.textContent = 'Ver mais'
        a.style.textDecoration = 'none'
        a.style.color = 'white'
        a.style.width = '100%'
        a.style.borderRadius = '5px'
        a.style.padding = '5px'
        a.style.textAlign = 'center'
        a.style.backgroundColor = '#009EDB'
        a.href = `ong.html?id=${ong.id}`
        contentDiv.appendChild(a)

        div.appendChild(contentDiv)

        ongsUl.appendChild(li)
            

    })
})

async function getAllOngs() {
    const token = sessionStorage.getItem('token')
    const response = await fetch(`${baseUrl}ong/all`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        },
    })
    const data = await response.json()
    console.log(data)
    return data
}

async function auth(email, password) {
    try{
    const token = await fetch(`${baseUrl}donor/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        }),
        
    })
    const data = await token.json()
    sessionStorage.setItem('token', data.token)
    }catch(error){
        alert("Não foi possível fazer o login")
    }
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    await auth('teste@email.com', 'senha123')
    console.log(token)
})
