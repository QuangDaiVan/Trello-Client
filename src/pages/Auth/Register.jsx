import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerApi } from '~/apis/authAPI'

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
  InputAdornment,
  IconButton
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#0079bf'
    },
    secondary: {
      main: '#5aac44'
    },
    background: {
      default: '#0079bf'
    }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.23)'
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.87)'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#0079bf'
            }
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 'bold'
        }
      }
    }
  }
})

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }))
    }
  }

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newErrors = {}
    if (!formData.username.trim()) newErrors.username = 'Tên là bắt buộc'
    if (!formData.email.trim()) newErrors.email = 'Email là bắt buộc'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email không hợp lệ'
    if (!formData.password) newErrors.password = 'Mật khẩu là bắt buộc'
    else if (formData.password.length < 8) newErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      try {
        const { token, user } = await registerApi(formData)
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        navigate('/board')
      } catch (error) {
        // console.error('Registration failed: ', error)
        setErrors({ submit: 'Registration failed. Please try again.' })
      }
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0079bf'
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
              borderRadius: 2
            }}
          >
            <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#5e6c84' }}>
              Đăng ký tài khoản Trello
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Họ tên"
                name="username"
                autoComplete="username"
                autoFocus
                value={formData.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
                inputProps={{ maxLength: 50 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Địa chỉ email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                inputProps={{ maxLength: 100 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={toggleShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                inputProps={{ maxLength: 100 }}
              />
              {errors.submit && (
                <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                  {errors.submit}
                </Typography>
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
                  py: 1.5
                }}
              >
                Đăng ký
              </Button>
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Đã có tài khoản?{' '}
                  <Link href="/login" variant="body2" sx={{ color: 'primary.main', textDecoration: 'none' }}>
                    Đăng nhập
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  )
}