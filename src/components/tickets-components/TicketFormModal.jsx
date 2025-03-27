import { useEffect, useState } from 'react';
import { Dialog, Button, Card, CardContent, Box,Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { set } from 'date-fns';
import { ConstructionOutlined } from '@mui/icons-material';

const TicketFormModal = ({ open, 
  onClose, 
  onSubmit, 
  initialValues, 
  selectedTickets,
  selectedTicketNumbers,
  tickets,
  totalPrice }) => {
  const { t } = useTranslation();

  
  const [userid, setUserID] = useState('1');

  useEffect(() => {
    if (initialValues && initialValues.ticketNumber) {
      setUserID(initialValues.userID || '1');
    } else {
      setUserID('1');
    }
  }, [initialValues]);

  const handleSubmit = () => {
    const ticketId = selectedTickets.length > 0 ? selectedTickets[0].id : null;
    onSubmit({
      ticketId: ticketId,
      userid: userid,
    });
    
    onClose();
  };


  return (
          <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <Card>
              <CardContent style={{ textAlign: 'center' }}>
                {selectedTickets.length > 0 && ( // MUESTRA LOS TICKETS SELECCIONADOS EN EL DIALOG
                  <>
                    <h3>Tickets Seleccionados:</h3>
                    <Typography variant="h6" mt={2} fontWeight="bold">
                      Número de Ticket: {selectedTicketNumbers}
                    </Typography>
                    <Typography variant="h6" mt={2} fontWeight="bold">
                    Total: ${totalPrice}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={onClose}
                    >
                      Iniciar sesión
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={onClose}
                      style={{ marginLeft: 10 }}
                    >
                      Ingresa con Google
                    </Button>

                    <div style={{ textAlign: 'center' }}>
                    <Button
                    onClick={handleSubmit}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    {t('reserve')}
                  </Button>
                  </div>

            
                  </>
                )}
              </CardContent>
            </Card>
          </Dialog>
  );
};

export default TicketFormModal;
