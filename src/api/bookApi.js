import { path } from '../constants/pathBackend'
import { getParamsCategories } from '../utils/getCategories'

export const getTopSales = async (setTopBooks) => {
  const data = await fetch(path + '/api/v1/books/getTopSales', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })

  const res = await data.json()

  setTopBooks(res)
}

export const getLastAdd = async (setLastAddBooks, setLoading) => {
  const data = await fetch(path + '/api/v1/books/getLastAdd', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })

  const res = await data.json()

  setLastAddBooks(res)
  setLoading(true)
}

export const getBookDetails = async (id, setBook, setLoading) => {
  const data = await fetch(path + '/api/v1/books/' + id, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })

  const res = await data.json()
  setBook(res)
  setLoading(true)
}

export const getBookByPerosnalId = async (id) => {
  const data = await fetch(path + '/api/v1/books/' + id, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token_pr13Jroa')}`
    },
    method: 'GET'
  })

  const res = await data.json()
  return res
}

export const setStock = async (id, num) => {
  const data = await fetch(path + '/api/v1/books/' + id, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token_pr13Jroa')}`
    },
    method: 'PUT',
    body: JSON.stringify({
      stock: num
    })
  })

  const res = await data.json()
  return res
}

export const getBooksByCategorie = async (
  cat,
  setBooks,
  page,
  setLastPage,
  setTitle,
  value,
  setLoading,
  setValue
) => {
  //const categoire = value !== '' ? value : cat
  let categoire = ''
  if (cat === 'manga' || cat === 'infantil') {
    categoire = cat
    setValue('all')
  } else {
    categoire = value
  }

  const infoCat = getParamsCategories(categoire)
  const data = await fetch(
    `${path}/api/v1/books/getByCategorie?categorie=${infoCat.id}&page=${page}&limit=10`,
    {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
    }
  )

  const res = await data.json()
  setLastPage(res.metadata.totalPage)
  setTitle(infoCat.title)
  setBooks(res.data)
  setLoading(true)
}

export const getBooksByTitle = async (
  title,
  setBooks,
  page,
  setLastPage,
  setLoading
) => {
  const upTitle = title.toUpperCase()
  const data = await fetch(
    `${path}/api/v1/books/getByTitle?title=${upTitle}&page=${page}&limit=10`,
    {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
    }
  )

  const res = await data.json()
  setLastPage(res.metadata.totalPage)
  setBooks(res.data)
  setLoading(true)
}
