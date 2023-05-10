<script>
  import "../app.postcss"

  let bgColor = "bg-white"
  let textColor = "text-black"

  // Get the current time in PST and update it every second
  let pstTime = new Date().toLocaleTimeString("en-US", {
    timeZone: "America/Los_Angeles",
    hour12: false,
  })

  if (pstTime > "21:00:00" || pstTime < "12:00:00") {
    bgColor = "bg-zinc-700"
    textColor = "text-white"
  } else {
    bgColor = "bg-white"
    textColor = "text-black"
  }
</script>

<div class="min-w-full min-h-screen {bgColor} {textColor}">
  <slot />
</div>
