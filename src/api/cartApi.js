import { path } from '../constants/pathBackend'
import { sumPrice } from '../utils/sumPrices'
import { getBookByPerosnalId, setStock } from './bookApi'
import { getNextSale, postSale } from './saleApi'
import { putUserData } from './userApi'

const postCart = async (book, num) => {
  const data = await fetch(path + '/api/v1/carts', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token_pr13Jroa')}`
    },
    method: 'POST',
    body: JSON.stringify({
      users: localStorage.getItem('_id_pr13Jroa'),
      books: book._id,
      numCopies: num,
      price: book.price
    })
  })

  const res = await data.json()
  return res
}

const putCart = async (num, id) => {
  const data = await fetch(path + '/api/v1/carts/' + id, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token_pr13Jroa')}`
    },
    method: 'PUT',
    body: JSON.stringify({
      numCopies: num
    })
  })

  const res = await data.json()
  return res
}

const getCartByUserAndBook = async (book) => {
  const data = await fetch(path + '/api/v1/carts/getCartUserAndBook', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token_pr13Jroa')}`
    },
    method: 'POST',
    body: JSON.stringify({
      user: localStorage.getItem('_id_pr13Jroa'),
      book: book._id
    })
  })

  const res = await data.json()
  return res
}

export const addBooksCart = async (book, num) => {
  const resGetCart = await getCartByUserAndBook(book)
  const resBook = await getBookByPerosnalId(book._id)

  if (parseInt(resBook.stock) < num) {
    return { error: `Solo quedan ${resBook.stock} de stock` }
  } else {
    if (resGetCart.length !== 0) {
      const resPut = await putCart(
        num + parseInt(resGetCart[0].numCopies),
        resGetCart[0]._id
      )
      return resPut
    } else {
      const resPost = await postCart(book, num)
      return resPost
    }
  }
}

export const getCartBooks = async (id) => {
  const data = await fetch(path + '/api/v1/carts/getByUser/' + id, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token_pr13Jroa')}`
    },
    method: 'GET'
  })

  const res = await data.json()
  return res
}

export const getCartByPersonalId = async (id) => {
  const res = await getCartBooks(id)
  let num = 0
  if (res !== null) {
    if (res.length !== 0) {
      for (const cart of res) {
        num += parseInt(cart.numCopies)
      }
    }
  }

  return num
}

export const getDetailCart = async (
  id,
  setCartBooks,
  setSumTotal,
  setLoading
) => {
  const arrBooks = []
  const res = await getCartBooks(id)
  if (res !== null) {
    for (const cart of res) {
      const obBook = {
        id: cart._id,
        bookId: cart.books._id,
        title: cart.books.title,
        cover: cart.books.cover,
        price: cart.books.price,
        quantity: cart.numCopies,
        stock: cart.books.stock
      }
      arrBooks.push(obBook)
    }
  }
  setCartBooks(arrBooks)
  sumPrice(arrBooks, setSumTotal)
  setLoading(true)
}

export const delCart = async (id) => {
  const data = await fetch(path + '/api/v1/carts/' + id, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token_pr13Jroa')}`
    },
    method: 'DELETE'
  })

  const res = await data.json()
  return res
}

const checkAddCart = async (id, num) => {
  const res = await getBookByPerosnalId(id)
  if (parseInt(res.stock) < num) {
    return false
  }
  return true
}

export const addRemoveCartBooks = async (action, id, num, personalId) => {
  let res = ''
  if (action === 'sum') {
    const resChek = await checkAddCart(personalId, num + 1)
    if (resChek) res = await putCart(num + 1, id)
  } else {
    if (num !== 1) res = await putCart(num - 1, id)
  }
  return res
}

const checkStock = async (arrCart) => {
  for (const cart of arrCart) {
    const resBook = await getBookByPerosnalId(cart.books._id)
    if (parseInt(resBook.stock) < parseInt(cart.numCopies)) {
      return `No hay suficiente stock de ${resBook.title}, quedan ${resBook.stock}`
    }
  }
}

export const purchase = async (id, values) => {
  const restPutUser = await putUserData(id, values)
  if (!restPutUser.mensaje) {
    return { msg: 'Error al Modificar los datos del usuario', status: 400 }
  }

  const resCart = await getCartBooks(id)
  const resCheck = await checkStock(resCart)
  if (resCheck) return { msg: resCheck, status: 400 }

  for (const cart of resCart) {
    const resBook = await getBookByPerosnalId(cart.books._id)
    const resStock = await setStock(
      resBook._id,
      parseInt(resBook.stock) - parseInt(cart.numCopies)
    )
    if (!resStock.mensaje) {
      return { msg: 'Error al quitar stock', status: 400 }
    }

    const resNextSale = await getNextSale()
    const resSale = await postSale(resNextSale.next, cart, values.pay)
    if (!resSale.mensaje) {
      return { msg: 'Error al añadir compra', status: 400 }
    }
    const rescartDel = await delCart(cart._id)
    if (!rescartDel.mensaje) {
      return { msg: 'Error al borrar la cesta', status: 400 }
    }
  }
  return { msg: 'Compra realizada', status: 200 }
}
