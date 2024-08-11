document.querySelectorAll(".scroll-link").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    const offset = 60; // Height of the fixed header
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = target.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  });
});




// animation random ball

// document.addEventListener("DOMContentLoaded", function() {
//     const ball = document.querySelector('.ball');
//     const container = document.querySelector('.hero');

//     const containerWidth = container.clientWidth;
//     const containerHeight = container.clientHeight;
//     const ballDiameter = ball.clientWidth;

//     function getRandomPosition() {
//         const x = Math.random() * (containerWidth - ballDiameter);
//         const y = Math.random() * (containerHeight - ballDiameter);
//         return { x, y };
//     }

//     function moveBall() {
//         const { x, y } = getRandomPosition();
//         ball.style.transform = `translate(${x}px, ${y}px)`;
//     }

//     setInterval(moveBall, 1000);
// });
