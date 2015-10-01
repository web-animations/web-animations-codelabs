## Step 3: Going backwards

In the previous step, we created a reveal effect for when the popup is opened. In this step, we'll play the same effect backwards to show a popup being closed. In fact, we're going to hold onto the player and reverse it, rather than setting up any new effect - how cool is that!

Open up `site.js`. We'll only be modifying this file during this step.

First, let's add a variable that holds our currently active player, so we can manipulate it later. At the top of the file, let's add another global-

```js
var activeTarget = null;
// Add the following line...
var activePlayer = null;
````

Great! Now, let's store the return value from the `fill.animate` call here, so we can reverse the animation layer. At the bottom of the file, let's modify this line to store the `[Animation](http://w3c.github.io/web-animations/#the-animation-interface)` object that is being returned-

```js
  activePlayer = fill.animate([{transform: 'scale(0)'}, {transform: 'scale(1)'}], timing);
```

Finally, we need to modify the `closeActive` method, which is already being called if a popup is to be closed. We'll need to reverse the `activePlayer`, which is simple, but there's a nuance that will be revealed later-

```js
  activeTarget = null;

  // Add these lines at the end of the function.
  activePlayer.reverse();
  activePlayer = null;
```

If you were to run the site now now, the animation would technically reverse. However, the whole popup is actually hidden - as you can see from the CSS change right above this code! We can solve this by only marking it hidden when the animation finishes.

### Visibility

Either comment or remove the existing visibility line, and add a handler for the `finish` event on `activePlayer`. The finish event will run when an animation finishes, regardless of direction - since it is now playing backwards, it will run when the animation reaches its start point. See below-

```js
  // popup.style.visibility = 'hidden';  
  activeTarget = null;

  activePlayer.reverse();
  activePlayer.addEventListener('finish', function() {
    popup.style.visibility = 'hidden';
  });
  activePlayer = null;
}
```

This solution to visibility isn't perfect, but we'll see how we can fix that in the next step, using another powerful part of Web Animations.

## Next

The completed code for this step is available in `iconpopups/step3`.

**Next, let's neaten up the effect in [Step 4: Holding visibility &raquo;](step4.md)**