// Campos do formulário
const form = document.querySelector("form")
const expense = document.getElementById("expense")
const category = document.getElementById("category")
const amount = document.getElementById("amount")
const expenseList = document.querySelector("ul")

amount.oninput = () => {
    let value = amount.value.replace(/\D/g, "")

    // Transforma valor em centavos
    value = Number(value) / 100

    console.log(value)
    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })

    return value
}

form.onsubmit = (event) => {
    event.preventDefault()

    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }

    expenseAdd(newExpense)
}

function expenseAdd(newExpense) {
    try {
        // Cria o elemento <li> para add na lista <ul>.
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        // Cria o ícone da categoria
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `./img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", `${newExpense.category_name}`)

        // Cria a div do conteudo
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        // Cria titulo e descrição
        const expenseItemTitle = document.querySelector("strong")
        const expenseItemDescription = document.querySelector("span")

        // Adiciona as informações no item
        expenseItem.append(expenseIcon)

        // Adiciona item na lista
        expenseList.append(expenseItem)

    } catch (error) {
        alert("Erro! Não foi possível atualizar a lista")
        console.log(error)
    }
}