## Step 3: Multiply

We've created a pretty cool animation, but it's nothing we couldn't have done via, e.g., CSS animations. Let's build on it by supporting any number of dots, and adding a cool effect.

### Modify HTML

First, let's add a bunch of dots inside `index.html`. How many - it doesn't matter! We'll write *imperative code* (as opposed to *declarative*, provided by CSS animations) that can handle any number.

Your HTML should look a bit like this-

```html
<body>

<div class="dots">
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
</div>

</body>
```

Great. If you refresh the site now, every dot past the second will just be static. Let's add a loop around your existing JavaScript-

```js
  var dots = document.querySelectorAll('.dot');
  for (var i = 0; i < dots.length; ++i) {
    var dot = dots[i];
    var frames = [
      {transform: 'rotate(0deg) translate(80px)'},
      {transform: 'rotate(360deg) translate(80px) '},
    ];
    var timing = {
      duration: 2500,
      iterations: Infinity,
      direction: 'alternate',
      easing: 'ease-in-out',
    };
    dot.animate(frames, timing);
  }
````

Again, all your dots will be rotating in exactly the same position. Let's adjust the frames based on which dot we're focused on-

```js
    var dot = dots[i];

    // Replace the previous 'var frames = ...' section.
    var start = (i / dots.length) * 360;
    var frames = [
      {transform: 'rotate(' + start + 'deg) translate(80px)'},
      {transform: 'rotate(' + (360-(i*5)) + 'deg) translate(80px) '},
    ];
```

Great! Now your dots will start at even offset positions around the circle, and then finish their animation together - much closer to the original 360deg target.

## Done

You're all done! The final version of the site is located in `animateme/final`.

**Our conclusion is in [Step 4: Congratulations! &raquo;](step4.md)**
