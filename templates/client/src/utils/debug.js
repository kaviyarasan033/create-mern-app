/**
 * Client-side debug utility
 * Shows logs only if VITE_APP_DEBUG=true or during development
 */
const isDebug = import.meta.env.VITE_APP_DEBUG === 'true' || import.meta.env.DEV;

export const log = (message, source = 'App') => {
  if (isDebug) {
    console.log(`[DEBUG][${source}]`, message);
  }
};

export const logError = (error, source = 'App') => {
  if (isDebug) {
    console.error(`[ERROR][${source}]`, error);
    if (error.stack) {
      console.error(error.stack);
    }
  }
};

export const logTable = (data, source = 'App') => {
  if (isDebug) {
    console.log(`[DEBUG][${source}] Data Table:`);
    console.table(data);
  }
};

export default { log, logError, logTable };
