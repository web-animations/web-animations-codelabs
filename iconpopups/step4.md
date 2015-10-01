## Step 4: Holding visibility

In the previous step, we updated the change in visibility so that we change it on the finish event. The finish event is useful, but it's a bit awkward: there's a corner case where someone might open/close an animation twice in rapid succession, causing the final visibility to be a bit uncertain.

You can use the Web Animations API not to animate a value at all, but to ensure it is set during the course of an animation. To do this, we'll construct a `GroupEffect` and ensure that the visibility on our popup is set during the fade.

### Groups

To combine multiple effects together, to run at the same time, we first need to construct a `GroupEffect`. This type of effect has no element target directly, and can only contain other types of effects. Because of this, we animate it using the `document.timeline.play` method, rather than using the `Element.animate` method on an element itself.

At the end of the `site.js` file, let's change the last `fill.animate` line to this-

```
  var fillEffect = new KeyframeEffect(fill, [{transform: 'scale(0)'}, {transform: 'scale(1)'}], timing);
  var groupEffect = new GroupEffect([fillEffect]);
  activePlayer = document.timeline.play(groupEffect);
```

This might seem verbose, but it showcases a hugely important part of Web Animations: that it provides *composable* and *reusable* objects. The `KeyframeEffect` you've created on its own is very similar to using `Element.animate`, but now, it's a real object you can pass around.

### Holding visibility

Rather than setting the CSS `visibility` property directly, let's add another effect that we can run as part of the group.

Remove all the lines in the file which modify this property. First, inside `closeActive`, either comment the visibility line, or remove the whole listener-

```js
  activePlayer.addEventListener('finish', function() {
    // Remove or comment the following line.
    //popup.style.visibility = 'hidden';
  });
```

And then at the top of `groupClick`, let's change our setter value to instead create a new `KeyframeEffect`-

```js
  var popup = activeTarget.querySelector('.popup');
  // Remove or comment the following line.
  //popup.style.visibility = 'visible';

  // Create the popupEffect here.
  var frame = {'visibility': 'visible'};
  var popupEffect = new KeyframeEffect(popup, [frame, frame], {fill: 'forwards'});
```

We don't need to set a duration on this effect, as it doesn't run for any period of time. However, we do want to set `fill: 'forwards'`: what this means, is that after the animation has finished forwards (immediately, since it has zero duration), its value should continue to be set.

Finally, at the bottom of the file, let's play this effect in our group, updating the list of effects passed to our new group-

```js
  var groupEffect = new GroupEffect([fillEffect, popupEffect]);
```

That's it. Now, your state is completely controlled by Web Animations, and style changes won't happen in an unpredictable order.

## Next

The completed code for this step is available in `iconpopups/step4`.

**Next, let's touch up the effect in [Step 5: Fading it all in &raquo;](step5.md)**