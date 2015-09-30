## Step 2: Expand the background

On an Android phone, opening a homescreen folder has a subtle but compelling reveal effect, where the background expands from a single point. Instead of just showing a solid background, let's build this feature.

Open the `site.js` file. We've provided a few boilerplate methods that will be called when users interact with groups. Right now, they manage the simple CSS `visibility` change which controls the groups' opening and closing.

### Lights

Open `index.html`. Inside the `template`, add an additional `div` which we'll use to animate the background fill.

```html
<template id="icon-group">
  <div class="group">
    <div class="popup">
      <!-- Add this line below -->
      <div class="fill"></div>
      <div class="icons"></div>
    </div>
  </div>
</template>
```

### Camera

This has no default style. It will eventually be presented as a combination of both prescribed CSS, and the animation effect we'll apply with the Web Animations API.

To set up its default style, open `site.css` and add the following rules-

```css
.fill {
  background: #eee;
  position: absolute;
  z-index: -10;
  top: 0;
  border-radius: 100%;
  transform-origin: center top;
}
```

Additionally, we want to delete the previous lines in this file, as they describe the default background color-

```css
/** DELETE these lines! */
.group .popup {
  background: #eee;
}
````

### Action

Every group will now be created with a fill element. However, because it's set to `position: absolute` and has no content, it will have zero size - it won't appear to anyone!

This is where our animation comes in. We want to make this element appear as part of opening the group.

Open up the `site.js` file again, and let's insert code - including some trigonometry! - at the bottom of the `groupClick` function-

```js
  // Find the 'longEdge', the length of the diagonal in the popup's rect.
  var rect = popup.getBoundingClientRect();
  var dim = Math.max(rect.width, rect.height);
  var longEdge = Math.sqrt(rect.width*rect.width  + rect.height*rect.height);

  // Update the fill object with the longEdge's size.
  var fill = popup.querySelector('.fill');
  fill.style.width = longEdge + 'px';
  fill.style.height = longEdge + 'px';
  fill.style.top = -((longEdge - dim)/2) + 'px'
  fill.style.left = -((longEdge - rect.width)/2) + 'px';

  // Perform a simple animation: scale(0) => scale(1).
  fill.animate([{transform: 'scale(0)'}, {transform: 'scale(1)'}], 1000);
```

This is a bit of a long snippet, but it's mostly just work to make sure that the circle we render is larger than the rectangle. It will exactly fit around the rectangle, ensuring that the scale effect looks just right.

Try it out now! Load the `start/index.html` file in your browser, and click on an icon. You should see the fill occur on open.

> Note! If you use Chrome Developer Tools (or similar, on another browser) to disable the `overflow: hidden` CSS property of `.popup`, you can see the full extent of the fill circle.

Finally, the very last line sets the duration of the effect to 1000, or one second. This is actually probably a bit too slow for most animations. Instead, let's use a duration based on the height of the popup-

```js
  // Perform a simple animation: scale(0) => scale(1).
  var timing = {
    duration: rect.height * 2,
    easing: 'ease-out',
  };
  fill.animate([{transform: 'scale(0)'}, {transform: 'scale(1)'}], timing);
```

In this way, the animation will have a consistent feel, no matter how many icons are displayed in each popup. Being able to configure this value directly in JavaScript is a great benefit of using Web Animations.

## Next

The completed code for this step is available in `iconpopups/step2`.

**Next, let's reverse the animation in [Step 3: Going backwards &raquo;](step3.md)**