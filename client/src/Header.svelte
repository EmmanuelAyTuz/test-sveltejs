<script>
  export let title = "";
  let tags = [
    `<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
		integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
		crossorigin="anonymous"/>`,
    `<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
		integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
		crossorigin="anonymous"/>`,
    `<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
		integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
		crossorigin="anonymous"/>`
  ];
</script>

<!--Header-->
<meta charset="utf8" />
<meta name="viewport" content="width=device-width" />
<link rel="stylesheet" href="bundle.css" />

<title>{title}</title>

<link rel="icon" type="image/png" href="favicon.png" />
<link
  href="https://stackpath.bootstrapcdn.com/bootswatch/4.5.0/simplex/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-6ge4b1Lr1zrvyGvm5pdAkc3NMa97XYhFPBWsZsT6O3eOU+hqURR1bQEMm11Grf3a"
  crossorigin="anonymous" />

{#each tags as tag}
  {@html tags}
{/each}
