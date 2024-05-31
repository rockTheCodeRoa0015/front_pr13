import { useParams } from 'react-router-dom'
import StyledBookDetail from './BookDetail.style'
import { useContext, useEffect, useState } from 'react'
import CustomDiv from '../../components/CustomDiv/CustomDiv'
import Image from '../../components/Image/Image'
import SubTitle from '../../components/SubTitle/SubTitle'
import Paragraph from '../../components/Paragraph/Paragraph'
import { getBookDetails } from '../../api/bookApi'
import { LoginContext } from '../../provider/LoginProvider'
import ButtonCart from '../../components/ButtonCart/ButtonCart'
import ButtonTotal from '../../components/ButtonTotal/ButtonTotal'
import useAddCart from '../../customHooks/useAddCart'
import useCustomMsg from '../../customHooks/useCustomMsg'
import useLoading from '../../customHooks/useLoading'

const BookDetail = () => {
  const { id } = useParams()
  const [book, setBook] = useState()
  const { num, sumNum, substractNum } = useAddCart(1)
  const { error, setError } = useCustomMsg()
  const { isLogin } = useContext(LoginContext)
  const { load, setLoading } = useLoading()

  useEffect(() => {
    setLoading(false)
    getBookDetails(id, setBook, setLoading)
  }, [])

  return (
    <StyledBookDetail>
      {!load ? (
        <Image src={'../assets/load.gif'}></Image>
      ) : (
        <>
          <CustomDiv w={'420px'}>
            <Image
              src={book.cover}
              alt={book.title}
              h={'600px'}
              w={'400px'}
            ></Image>
          </CustomDiv>
          <CustomDiv
            w={'30%'}
            dir={'column'}
            ai={'flex-start'}
            gap={'var(--rtc-gap-xs)'}
          >
            <SubTitle>{book.title}</SubTitle>
            <Paragraph>{book.author}</Paragraph>
            <Paragraph
              padding={'var(--rtc-padding-xxs) var(--rtc-padding-xs)'}
              bg={'var(--rtc-background-green)'}
              radius={'var(--rtc-border-radius-button)'}
              color={'var(--rtc-color-white)'}
              bgh={'var(--rtc-background-green)'}
            >
              {book.categories.categorie}
            </Paragraph>
            <Paragraph>{book.price} €</Paragraph>
            <Paragraph>{book.synopsis}</Paragraph>
            <Paragraph
              padding={'var(--rtc-padding-xxs) var(--rtc-padding-xs)'}
              bg={
                book.stock !== 0
                  ? 'var(--rtc-background-green)'
                  : 'var(--rtc-color-grey)'
              }
              radius={'var(--rtc-border-radius-button)'}
              color={
                book.stock !== 0
                  ? 'var(--rtc-color-white)'
                  : 'var(--rtc-color-black)'
              }
              bgh={
                book.stock !== 0
                  ? 'var(--rtc-background-green)'
                  : 'var(--rtc-color-grey)'
              }
            >
              stock
            </Paragraph>
            <ButtonCart
              disable={isLogin === false || book.stock === 0 ? true : false}
              Book={book}
              num={num}
              setError={setError}
            >
              Añadir cesta
            </ButtonCart>
            <CustomDiv dir={'row'} w={'auto'} gap={'var(--rtc-gap-xs)'}>
              <ButtonTotal func={substractNum}>-</ButtonTotal>
              <Paragraph>{num}</Paragraph>
              <ButtonTotal func={sumNum}>+</ButtonTotal>
            </CustomDiv>
            {error && <Paragraph>{error}</Paragraph>}
          </CustomDiv>
        </>
      )}
    </StyledBookDetail>
  )
}

export default BookDetail
