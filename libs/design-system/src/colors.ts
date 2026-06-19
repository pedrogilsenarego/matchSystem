export const primary = {
  50: '#e7f1ff',
  100: '#cfe2ff',
  200: '#9ec5fe',
  300: '#6ea8fe',
  400: '#3d8bfd',
  500: '#0d6efd',
  600: '#0a58ca',
  700: '#084298',
  800: '#052c65',
  900: '#031633',
} as const;

export const secondary = {
  50: '#fff4e6',
  100: '#ffe8cc',
  200: '#ffd8a8',
  300: '#ffc078',
  400: '#ffa94d',
  500: '#fd7e14',
  600: '#f76707',
  700: '#e8590c',
  800: '#d9480f',
  900: '#bf400d',
} as const;

export const base = {
  50: '#f8f9fa',
  100: '#f1f3f5',
  200: '#e9ecef',
  300: '#dee2e6',
  400: '#ced4da',
  500: '#adb5bd',
  600: '#868e96',
  700: '#495057',
  800: '#343a40',
  900: '#212529',
} as const;

export const palette = { primary, secondary, base } as const;
