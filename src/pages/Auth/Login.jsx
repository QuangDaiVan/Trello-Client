import React, { useState } from 'react'
import { json, useNavigate } from 'react-router-dom'
import { loginApi } from '~/apis/authAPI'

import {
  Button,
  TextField,
  Link,
  Box,
  Typography,
  Container,
  CssBaseline,
  createTheme,
  ThemeProvider,
  Paper,
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0079bf',
    },
    secondary: {
      main: '#5aac44',
    },
    background: {
      default: '#0079bf',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.87)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#0079bf',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 'bold',
        },
      },
    },
  },
});

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { token, user } = await loginApi(email, password)
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      navigate('/board')
    } catch (error) {
      console.error('Login failed: ', error)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0079bf',
          backgroundImage: 'url("https://www.iconfinder.com/icons/1298768/trello_icon")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container component="main" maxWidth="xs">
          <Paper
            elevation={3}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: 2,
            }}
          >
            <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#5e6c84' }}>
              {isSignUp ? 'Đăng ký tài khoản Trello' : 'Đăng nhập vào Trello'}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Nhập email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Nhập mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {isSignUp && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Xác nhận mật khẩu"
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: 'secondary.main',
                  '&:hover': { bgcolor: 'secondary.dark' },
                  py: 1.5,
                }}
              >
                {isSignUp ? 'Đăng ký' : 'Đăng nhập'}
              </Button>
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => setIsSignUp(!isSignUp)}
                  sx={{ color: 'primary.main', textDecoration: 'none' }}
                >
                  {isSignUp ? 'Đã có tài khoản? Đăng nhập' : 'Chưa có tài khoản? Đăng ký'}
                </Link>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}