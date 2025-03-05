export const getTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme as 'light' | 'dark';
    }
    return 'light';
}


export const setTheme = (theme: 'light' | 'dark') => {
    localStorage.setItem('theme', theme);
}


export const removeTheme = () => {
    return localStorage.removeItem('theme');
}

