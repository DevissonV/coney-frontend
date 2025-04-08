import { Box, Typography, CircularProgress } from '@mui/material';
import WinnersCardList from '../../components/winners-components/WinnersCardList';
import { useTranslation } from 'react-i18next';
import SearchToolbar from '../../components/generic/search-toolbar/SearchToolbar';

const WinnersPage = ({ winners, searchQuery, onSearchChange, loading }) => {
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
            {t('winners')}
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
              placeholder={t('search_placeholder_winners')}
            />
          </Box>
          <br />
          <WinnersCardList rows={winners} />
        </>
      )}
    </Box>
  );
};

export default WinnersPage;
