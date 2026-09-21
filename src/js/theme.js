const getPreferredColorScheme = () => {
  const darkQuery = "(prefers-color-scheme: dark)";
  const darkMQL = window.matchMedia ? window.matchMedia(darkQuery) : {};
  if (darkMQL.media === darkQuery && darkMQL.matches) {
   return "dark";
  }
  return "default";
};
document.documentElement.setAttribute("data-color-scheme", getPreferredColorScheme());




document.getElementById("theme_button").onclick = () => {
console.log(1);
  const colorScheme = document.documentElement.getAttribute("data-color-scheme");
 document.documentElement.setAttribute("data-color-scheme", colorScheme === "default" ? "dark" : "default");
};