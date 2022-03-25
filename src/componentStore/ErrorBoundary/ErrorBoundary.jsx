import BlueBtn from 'pages/home/src/UI/Buttons/BlueBtn'
import React from 'react'
import { useHistory } from 'react-router-dom'
import GrayBtn from 'ui/btns/GrayBtn'

function ErrorBoundary () {
  const history = useHistory()

  function goBack () {

  }

  return (
    <div style={
            {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              minHeight: '100vh',
              marginLeft: '106px'
            }
        }
    >
      <div style={
                {
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }
            }
      >
        <h1 style={
                    {
                      fontWeight: '900',
                      fontSize: '28px',
                      lineHeight: '36px',
                      color: '#333342',
                      marginBottom: '16px'
                    }
                }
        >Неверный запрос
        </h1>
        <p style={
                    {
                      fontWeight: '700',
                      fontSize: '15px',
                      lineHeight: '18px',
                      marginBottom: '48px'
                    }
                }
        >Запрос не может быть понят сервером из-за некорректного синтаксиса
        </p>
        <div style={
                    {
                      display: 'flex',
                      alignItems: 'center'
                    }
                }
        >
          <GrayBtn>Написать в поддержку</GrayBtn>
          <BlueBtn func={goBack}>Вернуться на главную</BlueBtn>
        </div>
      </div>
    </div>
  )
}

export default ErrorBoundary
