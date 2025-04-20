import BadgeIcon from '@mui/icons-material/Badge';
import DescriptionIcon from '@mui/icons-material/Description';
import ReceiptIcon from '@mui/icons-material/Receipt';
import GavelIcon from '@mui/icons-material/Gavel';
import EventIcon from '@mui/icons-material/Event';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

export const DOCUMENT_TYPE_OPTIONS = [
  {
    value: 'identification_document',
    labelKey: 'identification_document',
    icon: <BadgeIcon fontSize="small" />,
  },
  {
    value: 'tax_certificate',
    labelKey: 'tax_certificate',
    icon: <ReceiptIcon fontSize="small" />,
  },
  {
    value: 'prize_invoice',
    labelKey: 'prize_invoice',
    icon: <DescriptionIcon fontSize="small" />,
  },
  {
    value: 'prize_appraisal',
    labelKey: 'prize_appraisal',
    icon: <VerifiedUserIcon fontSize="small" />,
  },
  {
    value: 'compliance_insurance',
    labelKey: 'compliance_insurance',
    icon: <CheckCircleIcon fontSize="small" />,
  },
  {
    value: 'organizer_certificate',
    labelKey: 'organizer_certificate',
    icon: <GavelIcon fontSize="small" />,
  },
  {
    value: 'schedule',
    labelKey: 'schedule',
    icon: <EventIcon fontSize="small" />,
  },
  {
    value: 'ticket_text',
    labelKey: 'ticket_text',
    icon: <DescriptionIcon fontSize="small" />,
  },
];
