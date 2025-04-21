import BadgeIcon from '@mui/icons-material/Badge';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DescriptionIcon from '@mui/icons-material/Description';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const DOCUMENT_TYPE_OPTIONS = [
  {
    value: 'tax_certificate_pdf',
    labelKey: 'tax_certificate_pdf',
    icon: <ReceiptIcon fontSize="small" />,
  },
  {
    value: 'identification_document_id',
    labelKey: 'identification_document_id',
    icon: <BadgeIcon fontSize="small" />,
  },
  {
    value: 'prize_invoice_pdf',
    labelKey: 'prize_invoice_pdf',
    icon: <DescriptionIcon fontSize="small" />,
  },
  {
    value: 'prize_appraisal_pdf',
    labelKey: 'prize_appraisal_pdf',
    icon: <VerifiedUserIcon fontSize="small" />,
  },
  {
    value: 'guarantee_insurance_pdf',
    labelKey: 'guarantee_insurance_pdf',
    icon: <CheckCircleIcon fontSize="small" />,
  }
];
