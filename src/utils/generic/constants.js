// ROLES
export const ROLE_ADMIN = import.meta.env.VITE_ROLE_ADMIN || 'admin';
export const ROLE_USER = import.meta.env.VITE_ROLE_USER || 'user';
export const ROLE_ANONYMOUS =
  import.meta.env.VITE_ROLE_ANONYMOUS || 'anonymous';

// AUTHORIZATION
export const AUTHORIZATION_STATUS_APPROVED = 'approved';
export const AUTHORIZATION_STATUS_PENDING = 'pending';
export const AUTHORIZATION_STATUS_REJECTED = 'rejected';
export const AUTHORIZATION_STATUS_REVIEWING = 'reviewing';

// RAFFLE
export const RAFFLE_FILTER_ALL = 'all';
export const RAFFLE_FILTER_MINE = 'mine';
export const RAFFLE_FILTER_PENDING = 'pending';

// DEFALT IMAGES
export const DEFAULT_IMAGE_NOT_RAFFLES = import.meta.env
  .VITE_DEFAULT_IMAGE_NOT_RAFFLES;
