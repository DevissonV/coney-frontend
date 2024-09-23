import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material'
import { useTranslation } from 'react-i18next'

const UserList = ({ users }) => {
  const { t } = useTranslation()

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('name')}</TableCell>
            <TableCell>{t('email')}</TableCell>
            <TableCell>{t('created_at')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.firstName} {user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default UserList
