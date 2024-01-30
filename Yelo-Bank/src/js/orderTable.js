


async function getTable() {
    const res = await fetch('http://localhost:3000/order-card')
    const data =  await res.json()
    
    const tBody = document.querySelector('tbody')

    data.forEach(item => {
        tBody.innerHTML += `<tr>
        <td>${item.name}</td>
        <td>${item.surname}</td>
        <td>${item.phoneNumber}</td>
        <td>${item.fin}</td>
        <td>${item.cardType}</td>
        <td>${item.currency}</td>
        <td>${item.paymentMethod}</td>
        <td>${item.privateMessage}</td>
        <td>${item.deliveryMethod}</td>
        <td>${item.city}</td>
        <td>${item.deliveryAddress}</td>
        <td>${item.branch}</td>
        <td>${item.paymentWay}</td>
    </tr>`
    });

}

getTable()