import React, { useState } from 'react'
import { TextField, Button, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

const UserForm = ({ onSubmit }) => {
  const { t } = useTranslation()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ firstName, lastName, email, password })
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label={t('first_name')}
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label={t('last_name')}
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label={t('email')}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label={t('password')}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        {t('submit')}
      </Button>
    </Box>
  )
}

export default UserForm
