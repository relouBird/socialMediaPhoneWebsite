<script lang="ts">
  export let size: number = 24;
  export let rgbColor: string = "black";
</script>

<button>
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.707 17.707L16.414 12L10.707 6.29297L9.29297 7.70697L13.586 12L9.29297 16.293L10.707 17.707Z"
      fill={rgbColor}
    />
  </svg>
</button>
