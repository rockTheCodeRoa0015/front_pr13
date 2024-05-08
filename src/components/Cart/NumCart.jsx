import { useContext, useEffect } from 'react'
import StyledNumCart from './NumCart.style'
import { NumCartContext } from '../../provider/NumCartProvider'
import { getCartByPersonalId } from '../../api/cartApi'
import { LoginContext } from '../../provider/LoginProvider'

const NumCart = () => {
  const { numCart, setNumCart } = useContext(NumCartContext)
  const { isLogin } = useContext(LoginContext)

  useEffect(() => {
    if (localStorage.getItem('id_pr13Jroa') && isLogin) {
      setCartNum()
    }
  }, [])

  const setCartNum = async () => {
    const num = await getCartByPersonalId(localStorage.getItem('id_pr13Jroa'))
    if (num !== 0 && num !== NaN) {
      setNumCart(num)
    }
  }
  return <StyledNumCart>{numCart}</StyledNumCart>
}

export default NumCart
