<script>
  import { init } from '@waline/client';
  import '@waline/client/waline.css';
  import { onMount } from 'svelte';

  export let serverURL;
  export let path = window.location.pathname;

  onMount(() => {
    init({
      el: '#waline',
      serverURL,
      path,
    });
  });
</script>

<div id="waline"></div>
