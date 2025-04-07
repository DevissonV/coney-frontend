import { useState, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import PaymentCardList from '../../components/payments-components/PaymentCardList';
import SearchToolbar from '../../components/generic/search-toolbar/SearchToolbar';
import { useTranslation } from 'react-i18next';

const PaymentsPage = ({ payments }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPayments = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return payments.filter((payment) => {
      const raffleName = payment.raffle?.name?.toLowerCase() || '';
      const buyerName = 
      `${
          payment.tickets?.[0]?.user?.first_name || ''
        } 
        ${
          payment.tickets?.[0]?.user?.last_name || ''
        }
      `.toLowerCase();
      return raffleName.includes(query) || buyerName.includes(query);
    });
  }, [payments, searchQuery]);

  return (
    <Box>
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
          onSearchChange={setSearchQuery}
          placeholder={t('search_placeholder_payment')}
        />
      </Box>

      <PaymentCardList rows={filteredPayments} />
    </Box>
  );
};

export default PaymentsPage;
