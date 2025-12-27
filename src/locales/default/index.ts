import common from './common';
import error from './error';
import expert from './expert';
import phd_prog from './phd-prog';

const resources = {
  common,
  error,
  phd_prog,
  expert,
} as const;

export default resources;
