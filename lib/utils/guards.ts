import type { User } from '../types';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export const isUser = (value: unknown): value is User => {
  if (!isRecord(value)) {
    return false;
  }

  const { email, id, username } = value;

  return (
    typeof id === 'string' &&
    typeof email === 'string' &&
    (username === null || typeof username === 'string')
  );
};
