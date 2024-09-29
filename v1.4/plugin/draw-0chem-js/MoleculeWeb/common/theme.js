export function theme(){
    let html = document.querySelector('html')
    let currentTheme = html.getAttribute('data-theme');
    if (currentTheme === "dark") {
        html.setAttribute('data-theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
    }
}