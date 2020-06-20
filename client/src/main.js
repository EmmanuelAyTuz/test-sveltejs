import Header from "./Header.svelte";
import Main from "./Main.svelte";
import Footer from "./Footer.svelte";

const header = new Header({
  target: document.head,
  props: { title: "Test Svelte" },
});

const main = new Main({
  target: document.body,
});

const footer = new Footer({
  target: document.body,
});

window.app = { header, main, footer };

//export default app;
