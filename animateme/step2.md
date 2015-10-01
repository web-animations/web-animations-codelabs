## Step 2: Spin a dot

The dot provided in the starting HTML is completely static, and anchored in the middle of your display. Let's make it rotate around a central point.

Web Animations allows you to specify keyframe animations as a series of CSS keyframes. The values of the properties will be changed over the timing you've specified. In this codelab, we're going to mostly animate the `transform` property - good thing too, as `transform` and `opacity` are typically the [fastest properties to animate](https://developers.google.com/web/fundamentals/look-and-feel/animations/animations-and-performance) in any modern browser.

### Frames

Open up `index.html`, and let's add some JavaScript inside the `<script>` tag at the top of the page. Let's get hold of the element and define some frames-
  
```js
window.addEventListener('load', function() {
  var dot = document.querySelector('.dot');
  var frames = [
    {transform: 'rotate(0deg) translate(80px) '},
    {transform: 'rotate(360deg) translate(80px)'},
  ];
});
```

> Note: Don't worry about adding `-webkit-transform`, or `-moz-transform` etc. The Web Animations API will handle any prefixing necessary for your browser.

### Go!

Now, let's use the frames and our object to animate over a specified time. After your code above, add the following line-

```js
  dot.animate(frames, 5000);
```

This will animate the object over 5000ms (5 seconds). Load the page in your favourite browser, and you should see the dot spin.

### Rinse and repeat

This is all well and good, but what if we want the dot to rotate forever? Rather than specifying duration as just a number, we can specify a [more complex timing object](http://w3c.github.io/web-animations/#the-animationeffecttimingproperties-dictionary). Update our `.animate` call like this-

```js
  var timing = {
    duration: 2500,
    iterations: Infinity,
    direction: 'alternate',
    easing: 'ease-in-out',
  };
  dot.animate(frames, timing);
```

Reload the page. Now, the dot will move for 2500ms (2.5 seconds), but also repeat forever, and bounce 'back-and-forth' (see `alternate`). Finally, it will also have a smooth easing function, meaning that the dot will smoothly come to a start and stop at each end of the animation.

## Next

The code for this step is located in `animateme/step2`.

**Next, let's add more dots in [Step 3: Multiply &raquo;](step3.md)**