import { useForm } from 'react-hook-form'
import StyledFormProfile from './FormProfile.style'
import CustomDiv from '../CustomDiv/CustomDiv'
import Paragraph from '../Paragraph/Paragraph'
import Label from '../Label/Label'
import Button from '../Button/Button'
import useCustomMsg from '../../customHooks/useCustomMsg'
import { useEffect } from 'react'
import { ModifyUserData, getUserId } from '../../api/userApi'
import useEditProfile from '../../customHooks/useEditProfile'

const FormProfile = () => {
  const { register, handleSubmit, formState, setValue } = useForm({
    defaultValues: {
      name: '',
      lastname: '',
      lastname2: '',
      telephone: '',
      street: '',
      number: '',
      floor: '',
      door: '',
      postalCode: '',
      city: '',
      province: ''
    }
  })

  const { msg, setMsg, error, setError } = useCustomMsg()
  const { edit, btnName, modifyEdit, mofifyBtnName } = useEditProfile(true)

  useEffect(() => {
    getuserDetails()
  }, [])

  const getuserDetails = async () => {
    const user = await getUserId(localStorage.getItem('_id_pr13Jroa'))
    if (user.name) {
      setValue('name', user.name)
    } else {
      setValue('name', user.userName)
    }
    setValue('lastname', user.lastName1)
    setValue('lastname2', user.lastName2)
    setValue('telephone', user.telephone)
    setValue('street', user.street)
    setValue('number', user.number)
    setValue('floor', user.floor)
    setValue('door', user.door)
    setValue('postalCode', user.postalCode)
    setValue('city', user.city)
    setValue('province', user.province)
  }

  const onSubmit = async (values) => {
    modifyEdit()
    mofifyBtnName()
    if (!edit) {
      const res = await ModifyUserData(
        localStorage.getItem('_id_pr13Jroa'),
        values
      )
      if (res.status === 200) {
        setMsg(res.msg)
      } else {
        setError(res.msg)
      }
    }
  }
  return (
    <StyledFormProfile onSubmit={handleSubmit(onSubmit)}>
      <CustomDiv w={'100%'}>
        <CustomDiv dir={'column'} w={'250px'} gap={'var(--rtc-gap-xs)'}>
          <Label>Nombre</Label>
          <input
            disabled={edit}
            id='name'
            type='text'
            placeholder='Nombre'
            {...register('name', {
              required: {
                value: true,
                message: 'Obligatorio'
              }
            })}
          ></input>
          {formState.errors.name ? (
            <CustomDiv jc={'flex-start'} padding={'0 var(--rtc-padding-s)'}>
              <Paragraph
                color={'var(--rtc-color-error)'}
                fontweight={'bold'}
                textalign={'center'}
                textshadow={'var(--rtc-textShadow)'}
              >
                {formState.errors.name.message}
              </Paragraph>
            </CustomDiv>
          ) : null}
        </CustomDiv>
        <CustomDiv dir={'column'} w={'250px'} gap={'var(--rtc-gap-xs)'}>
          <Label>Primer apellido</Label>
          <input
            disabled={edit}
            id='lastname'
            type='text'
            placeholder='Primer apellido'
            {...register('lastname')}
          ></input>
        </CustomDiv>{' '}
        <CustomDiv dir={'column'} w={'250px'} gap={'var(--rtc-gap-xs)'}>
          <Label>Segundo apellido</Label>
          <input
            disabled={edit}
            id='lastname2'
            type='text'
            placeholder='Segunda apellido'
            {...register('lastname2')}
          ></input>
        </CustomDiv>
      </CustomDiv>
      <CustomDiv w={'100%'}>
        <CustomDiv dir={'column'} w={'380px'} gap={'var(--rtc-gap-xs)'}>
          <Label>Telefono</Label>
          <input
            disabled={edit}
            id='telephone'
            type='text'
            placeholder='Telefono'
            {...register('telephone')}
          ></input>
        </CustomDiv>
        <CustomDiv dir={'column'} w={'380px'} gap={'var(--rtc-gap-xs)'}>
          <Label>Calle</Label>
          <input
            disabled={edit}
            id='street'
            type='text'
            placeholder='Calle'
            {...register('street')}
          ></input>
        </CustomDiv>
      </CustomDiv>
      <CustomDiv w={'100%'}>
        <CustomDiv dir={'column'} w={'250px'} gap={'var(--rtc-gap-xs)'}>
          <Label>Numero</Label>
          <input
            disabled={edit}
            id='number'
            type='text'
            placeholder='Numero'
            {...register('number')}
          ></input>
        </CustomDiv>
        <CustomDiv dir={'column'} w={'250px'} gap={'var(--rtc-gap-xs)'}>
          <Label>Planta</Label>
          <input
            disabled={edit}
            id='floor'
            type='text'
            placeholder='Planta'
            {...register('floor')}
          ></input>
        </CustomDiv>
        <CustomDiv dir={'column'} w={'250px'} gap={'var(--rtc-gap-xs)'}>
          <Label>Puerta</Label>
          <input
            disabled={edit}
            id='door'
            type='text'
            placeholder='Puerta'
            {...register('door')}
          ></input>
        </CustomDiv>
      </CustomDiv>
      <CustomDiv w={'100%'}>
        <CustomDiv dir={'column'} w={'250px'} gap={'var(--rtc-gap-xs)'}>
          <Label>Código Postal</Label>
          <input
            disabled={edit}
            id='postalCode'
            type='text'
            placeholder='Código postal'
            {...register('postalCode')}
          ></input>
        </CustomDiv>
        <CustomDiv dir={'column'} w={'250px'} gap={'var(--rtc-gap-xs)'}>
          <Label>Ciudad</Label>
          <input
            disabled={edit}
            id='city'
            type='text'
            placeholder='Ciudad'
            {...register('city')}
          ></input>
        </CustomDiv>
        <CustomDiv dir={'column'} w={'250px'} gap={'var(--rtc-gap-xs)'}>
          <Label>Provincia</Label>
          <input
            disabled={edit}
            id='province'
            type='text'
            placeholder='Provincia'
            {...register('province')}
          ></input>
        </CustomDiv>
      </CustomDiv>
      <Button type={'submit'}>{btnName}</Button>
      {error ? (
        <CustomDiv>
          <Paragraph
            color={'var(--rtc-color-error)'}
            fontweight={'bold'}
            textalign={'center'}
            textshadow={'var(--rtc-textShadow)'}
          >
            {error}
          </Paragraph>
        </CustomDiv>
      ) : null}
      {msg ? (
        <CustomDiv>
          <Paragraph
            color={'var(--rtc-color-white)'}
            fontweight={'bold'}
            textalign={'center'}
          >
            {msg}
          </Paragraph>
        </CustomDiv>
      ) : null}
    </StyledFormProfile>
  )
}

export default FormProfile
