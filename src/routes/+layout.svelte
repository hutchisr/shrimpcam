<script>
  import { text } from "svelte/internal"
  import "../app.postcss"

  let bgColor = "bg-white"
  let textColor = "text-black"

  // Get the current time in PST and update it every second
  let pstTime = new Date().toLocaleTimeString("en-US", {
    timeZone: "America/Los_Angeles",
    hour12: false,
  })

  if (pstTime > "21:00:00" || pstTime < "12:00:00") {
    bgColor = "bg-zinc-800"
    textColor = "text-white"
  } else {
    bgColor = "bg-white"
    textColor = "text-black"
  }

  // check if time is between 9pm and 12pm every 100ms
  setInterval(() => {
    pstTime = new Date().toLocaleTimeString("en-US", {
      timeZone: "America/Los_Angeles",
      hour12: false,
    })

    if (pstTime > "21:00:00" || pstTime < "12:00:00") {
      bgColor = "bg-zinc-800"
      textColor = "text-white"
    } else {
      bgColor = "bg-white"
      textColor = "text-black"
    }
  }, 100)
</script>

<div class={bgColor + " " + textColor}>
  <div class="min-w-full min-h-screen">
    <slot />
  </div>
</div>
