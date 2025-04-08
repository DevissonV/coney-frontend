import { Box, Typography, CircularProgress } from '@mui/material';
import PaymentCardList from '../../components/payments-components/PaymentCardList';
import SearchToolbar from '../../components/generic/search-toolbar/SearchToolbar';
import { useTranslation } from 'react-i18next';

const PaymentsPage = ({ payments, searchQuery, onSearchChange, loading }) => {
  const { t } = useTranslation();

  return (
    <Box>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="h4" align="center" gutterBottom>
            {t('payments')}
          </Typography>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={4}
          >
            <SearchToolbar
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
              placeholder={t('search_placeholder_payment')}
            />
          </Box>

          <PaymentCardList rows={payments} />
        </>
      )}
    </Box>
  );
};

export default PaymentsPage;
