<script>
  // Get the current time in PST and update it every second
  let pstTime = new Date().toLocaleTimeString("en-US", {
    timeZone: "America/Los_Angeles",
  })
  setInterval(() => {
    pstTime = new Date().toLocaleTimeString("en-US", {
      timeZone: "America/Los_Angeles",
      hour12: false,
    })
  }, 1000)

  // get time in 24 hour format
</script>

<!-- Shrimpcam hero -->
<div class="pt-16 pb-8 min-w-full">
  <div class="flex items-center max-w-fit mx-auto">
    <h1 class="text-5xl font-medium inline-block mr-4">Shrimpcam!</h1>
    <img src="/shrimp.png" alt="shrimp" class="w-16 h-16 inline-block" />
  </div>
</div>
<!-- Shrimpcam banner w/ time -->
<div class="p-4 min-w-full">
  <div class="flex items-center max-w-fit mx-auto">
    <!--  -->
    <div
      class="p-2.5 rounded-xs outline outline-2 outline-blue-200 bg-blue-400"
    >
      <p class="text-white font-bold text-sm">
        The shrimps' lights are on from 12:00:00 to 21:00:00. The current time
        is {pstTime}
      </p>
    </div>
  </div>
</div>
