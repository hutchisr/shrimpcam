<script>
  // Imports
  import { Transition } from "@rgossiaux/svelte-headlessui"

  // Shrimp notification transition
  let show = true

  // Shrimpcam controls
  let play = true

  // Get the current time in PST and update it every second
  let pstTime = new Date().toLocaleTimeString("en-US", {
    timeZone: "America/Los_Angeles",
    hour12: false,
  })
  setInterval(() => {
    pstTime = new Date().toLocaleTimeString("en-US", {
      timeZone: "America/Los_Angeles",
      hour12: false,
    })
  }, 1000)
</script>

<!-- Shrimpcam hero -->
<div class="pt-8 pb-8 min-w-full">
  <div class="flex items-center max-w-fit mx-auto">
    <h1 class="text-5xl font-medium inline-block mr-4">Shrimpcam!</h1>
    <img src="/shrimp.png" alt="shrimp" class="w-16 h-16 inline-block" />
  </div>
</div>

<!-- Shrimpcam banner w/ time -->
<Transition
  {show}
  enter="transition-opacity duration-75"
  enterFrom="opacity-0"
  enterTo="opacity-100"
  leave="transition-opacity duration-150"
  leaveFrom="opacity-100"
  leaveTo="opacity-0"
>
  <div class="pt-4 pb-8 min-w-full">
    <div class="flex items-center max-w-3xl w-full mx-auto">
      <!-- banner -->
      <div
        class="p-3 rounded-xs outline outline-2 outline-blue-200 bg-blue-400 min-w-full"
      >
        <div class="flex justify-between items-center">
          <!-- left -->
          <div class="mx-auto md:mx-0 px-1">
            <p class="text-white font-bold text-sm text-center md:text-left">
              The shrimps' lights are on from 12:00:00 to 21:00:00.
              <br class="md:hidden" />
              The current time is {pstTime}.
            </p>
          </div>
          <!-- right -->
          <div class="px-1">
            <button
              on:click={() => (show = false)}
              class="py-1 px-1.5 rounded-xs outline outline-2 outline-white/40 text-white bg-red-400 hover:bg-red-500 hover:text-white transition-colors duration-300"
            >
              <i class="fa fa-times" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</Transition>
<!-- Shrimpcam -->
<div class="lg:max-w-6xl lg:mx-auto">
  <!-- shrimpcam! -->
  <media-player autoplay muted aspect-ratio="16/9">
    <media-outlet>
      <source
        src="https://shrimpcam.app/hls/shrimpcam.m3u8"
        type="application/x-mpegurl"
      />
    </media-outlet>
  </media-player>
</div>
<!-- Controls -->
<div class="pt-8 flex min-w-full items-center justify-center">
  <button
    on:click={() => (play = !play)}
    class="py-2 px-3.5 rounded-xs outline outline-2 text-white outline-blue-200 bg-blue-400 hover:bg-blue-500 hover:text-white transition-colors duration-300"
  >
    <p class="text-white font-bold text-sm text-center w-12">
      {play ? "Pause" : "Play"}
    </p>
  </button>
</div>
