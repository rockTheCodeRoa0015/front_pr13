export const saveLoginData = (res) => {
  localStorage.setItem('token_pr13Jroa', res.token)
  localStorage.setItem('_id_pr13Jroa', res.user._id)
  localStorage.setItem('id_pr13Jroa', res.user.id)
}
