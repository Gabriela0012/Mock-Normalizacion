let nickname

//se crea para la conversacion
function chatsHTML(chatList) {
    let expanded = ''

    for (const chat of chatList) {
        if (chat.nickname === nickname) {
            expanded += `
            <div>
                <span class="u2 chat">
                    <span class="userSay">${chat.nickname}:</span><br>
                    ${chat.message}<br>
                    <span class="date">${chat.timestamp}</span>
                </span>
        </div>
                `
        } else {
            expanded += `
                <div>
                <span class="u1 chat">
                    <span class="userSay">${chat.nickname}:</span><br>
                    ${chat.message}<br>
                    <span class="date">${chat.timestamp}</span>
                </span>
        </div>
            `
        }
    }
    return expanded
}

//crea la tabla de productos que agregan
function createProductListHTML(products){
    const listProducts = products.reverse()
    let expanded = ''
    if(products.length==0){
        expanded='<br><h3>There are NOT products jet</h3>'
    }else{
        for(const product of listProducts){
            expanded+=`
            <tr>
                <th class="row">${product.id}</th>
                <td>${product.name}</td>
                <td>$ ${product.price}</td>
                <td>
                    <img src="${product.thumbnail}" alt="${product.name} image" style="height: 80px;">
                </td>
            </tr>
            `
        }
    }
    return expanded
}