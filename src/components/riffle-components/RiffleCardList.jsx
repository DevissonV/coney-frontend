import {
	Box,
	Card,
	CardContent,
	CardActions,
	Typography,
	Grid,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import useAuthStore from '../../stores/auth/useAuthStore';
import { ROLE_ADMIN } from '../../utils/generic/constants';
import { motion } from 'framer-motion';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RiffleActions from './RiffleActions';

const RiffleCardList = ({
	rows,
	onEdit,
	onDelete,
	onViewTickets,
	handleWinner,
}) => {
	const { t } = useTranslation();
	const { user } = useAuthStore();

	return (
		<Grid container spacing={3}>
			{rows.map((raffle) => {
				const canSelectWinner =
					user?.role === ROLE_ADMIN || raffle.created_by === user?.id;

				return (
					<Grid item xs={12} sm={6} md={4} lg={3} key={raffle.id}>
						<motion.div
							whileHover={{ scale: 1.03 }}
							whileTap={{ scale: 0.98 }}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, ease: 'easeOut' }}
						>
						<Card
							sx={{
								height: '100%',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								borderRadius: 3,
								boxShadow: 4,
								bgcolor: 'background.paper',
							}}
							>
							<CardContent>
									<Box display="flex" alignItems="center" gap={1} mb={1}>
										<ConfirmationNumberIcon fontSize="small" />
										<Typography variant="h6" fontWeight="bold">
											{raffle.name}
										</Typography>
									</Box>

									<Typography variant="body2" color="text.secondary" mb={1}>
										{raffle.description}
									</Typography>

									<Box display="flex" alignItems="center" gap={1}>
										<EventIcon fontSize="small" />
										<Typography variant="body2">
											{t('end_date')}: {dayjs(raffle.end_date).format('DD-MM-YYYY HH:mm')}
										</Typography>
									</Box>

									<Box display="flex" alignItems="center" gap={1}>
										<ConfirmationNumberIcon fontSize="small" />
										<Typography variant="body2">
											{t('available_tickets')}: {raffle.available_tickets}
										</Typography>
									</Box>

									<Box display="flex" alignItems="center" gap={1}>
										<AttachMoneyIcon fontSize="small" />
										<Typography variant="body2">
											{t('price')}:{' '}
											{new Intl.NumberFormat('es-CO', {
												style: 'currency',
												currency: 'COP',
												minimumFractionDigits: 0,
											}).format(raffle.price)}
										</Typography>
									</Box>
							</CardContent>

							<CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
								<RiffleActions
									riffleId={raffle.id}
									availableTickets={raffle.available_tickets}
									createdBy={raffle.created_by}
									onEdit={() => onEdit(raffle)}
									onDelete={onDelete}
									onViewTickets={onViewTickets}  
									handleWinner={handleWinner}
								/>
							</CardActions>
						</Card>
						</motion.div>
					</Grid>
				);
			})}
		</Grid>
	);
};

export default RiffleCardList;
