<script lang="ts">
  export let link: string;
  export let small : boolean = false ;
</script>

<a href={link}>
  <svg
    width={small ? "21":"30"}
    height={small ? "21":"30"}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.939 4.93896L6.879 12L13.939 19.061L16.061 16.939L11.121 12L16.061 7.06096L13.939 4.93896Z"
      fill="white"
    />
  </svg>
</a>
