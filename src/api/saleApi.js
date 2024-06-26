import { path } from '../constants/pathBackend'
import { getCurrentDate } from '../utils/getDate'

export const getNextSale = async () => {
  const data = await fetch(path + '/api/v1/sales/getNextSale', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token_pr13Jroa')}`
    },
    method: 'GET'
  })

  const res = await data.json()
  return res
}

export const postSale = async (id, cart, pay) => {
  const currentDate = getCurrentDate()
  const data = await fetch(path + '/api/v1/sales', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token_pr13Jroa')}`
    },
    method: 'POST',
    body: JSON.stringify({
      id: id,
      users: cart.users,
      books: cart.books,
      price: cart.price,
      numCopies: cart.numCopies,
      date: currentDate,
      state: 'comprado',
      pay: pay
    })
  })

  const res = await data.json()
  return res
}

const getSaleByUser = async (id, page) => {
  const data = await fetch(
    `${path}/api/v1/sales/getByUser?id=${id}&page=${page}&limit=10`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token_pr13Jroa')}`
      },
      method: 'GET'
    }
  )

  const res = await data.json()
  return res
}

export const getDetailsSalesbyUserId = async (
  id,
  setSalesBooks,
  page,
  setLastPage,
  setLoading
) => {
  const arrBooks = []
  var opciones = { year: 'numeric', month: 'numeric', day: 'numeric' }
  const resSales = await getSaleByUser(id, page)
  if (resSales.metadata.count !== 0) {
    for (const sale of resSales.data) {
      const obBook = {
        id: sale._id,
        title: sale.books.title,
        cover: sale.books.cover,
        price: sale.price * sale.numCopies,
        quantity: sale.numCopies,
        state: sale.state,
        date: new Date(sale.date).toLocaleString('es', opciones)
      }
      arrBooks.push(obBook)
    }
  }
  setLastPage(resSales.metadata.totalPage)
  setSalesBooks(arrBooks)
  setLoading(true)
}
