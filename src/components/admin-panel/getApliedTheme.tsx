
import { dark } from '@clerk/themes';

export const getTheme = (theme: string) => {
    if (typeof window !== 'undefined') {
        switch (theme) {
            case 'light':
                return "light";
            case 'dark':
                return dark;
            case 'system':
                // Check the system preference
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                return prefersDark ? dark : "light";
            default:
                return "light"; // Fallback in case of an unexpected value
        }
    }
    return "light"; // Fallback for server-side rendering or when window is undefined
};