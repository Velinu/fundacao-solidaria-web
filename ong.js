const ongInfoElement = document.querySelector('.ong-info');
const ongTitleElement = document.querySelector('.ong-title');
const ongContentElement = document.querySelector('.ong-content');
const ongImageElement = document.querySelector('.ong-image');
const ongDescriptionElement = document.querySelector('.ong-description');
const donationContainerElement = document.querySelector('.donation-container');
const donationAmountElement = document.querySelector('.donation-amount');
const donationButtonElement = document.querySelector('.donation-button');
const baseUrl  = 'http://fundacao-solidaria-api.us-west-2.elasticbeanstalk.com/'

const urlParams = new URLSearchParams(window.location.search);
const ongId = urlParams.get('id');

donationButtonElement.addEventListener('click', async () => {
    const institutionName = ongTitleElement.textContent;
    const donationValue = donationAmountElement.value;
  
    window.location.href = `payment.html?institution=${institutionName}&value=${donationValue}`;
})

async function getOngById(id) {
    const token = sessionStorage.getItem('token')
    const response = await fetch(`${baseUrl}ong/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        },
    })
    const data = await response.json()
    return data
}

async function fillOngInfo() {
    const ong = await getOngById(ongId);
    ongImageElement.src = ong.image;
    ongTitleElement.textContent = ong.name;
    ongDescriptionElement.textContent = ong.description;
}

document.addEventListener('DOMContentLoaded', async () => {
    await fillOngInfo();
})
