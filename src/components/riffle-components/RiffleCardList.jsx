import {
	Box,
	Card,
	CardContent,
	CardActions,
	Typography,
	IconButton,
	Tooltip,
	Grid,
} from '@mui/material';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import useAuthStore from '../../stores/auth/useAuthStore';
import { ROLE_ANONYMOUS } from '../../utils/generic/constants';
import { motion } from 'framer-motion';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


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
					user?.role === 'admin' || raffle.created_by === user?.id;

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

							<CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
								<Box>
									<Tooltip title={t('view_tickets')}>
										<IconButton onClick={() => onViewTickets(raffle.id)}>
											<VisibilityIcon />
										</IconButton>
									</Tooltip>

									{user && user.role !== ROLE_ANONYMOUS && (
										<>
											<Tooltip title={t('edit')}>
												<IconButton onClick={() => onEdit(raffle)}>
													<EditIcon />
												</IconButton>
											</Tooltip>
											<Tooltip title={t('delete')}>
												<IconButton onClick={() => onDelete(raffle.id)}>
													<DeleteIcon color="error" />
												</IconButton>
											</Tooltip>
										</>
									)}
								</Box>

								{user && user.role !== ROLE_ANONYMOUS && (
									canSelectWinner ? (
										<Tooltip title={t('select_winner')}>
											<IconButton onClick={() => handleWinner(raffle)}>
												<EmojiEventsOutlinedIcon sx={{ color: 'goldenrod' }} />
											</IconButton>
										</Tooltip>
									) : (
										<Tooltip title={t('not_your_riffle')}>
											<InfoOutlinedIcon color="disabled" />
										</Tooltip>
									)
								)}
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
