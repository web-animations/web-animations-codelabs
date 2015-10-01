## Step 1: Include Web Animations

The Web Animations API is a suite of primitives and features, some of which may not yet be available natively in your favourite browser. Let's get started by including the [web-animations polyfill](https://github.com/web-animations/web-animations-js#web-animations-minjs). The polyfill is designed to provide the core of Web Animations on all browsers, falling back to native support where available.

In this codelab, we'll work within the `animateme/start` folder.

Open the `animateme/start/index.html` file in a text editor, and include `web-animations-next.js` from GitHub as shown below.

> Note: If you're targeting only Chrome 36+, or another [supported browser](http://caniuse.com/#feat=web-animation), you can skip this step. However, it's good practice to include the polyfill in your sites anyway, just like for any upcoming feature of HTML.

#### index.html

```html
<head>
  <meta name="viewport" content="width=device-width, user-scalable=no" />
  <link href="site.css" rel="stylesheet" type="text/css" />
  <!-- Add the line below -->
  <script src="https://cdn.rawgit.com/web-animations/web-animations-js/2.1.2/web-animations.js"></script>
  <script>
window.addEventListener('click', function() {
  // Your code here!
});
  </script>
</head>
```

### Alternatives

1. If you're doing this codelab offline, include a local version of the `web-animations-next.js` script from a checked out [polyfill repo](https://github.com/web-animations/web-animations-js#web-animations-nextminjs)

2. You can use [Bower](http://bower.io/) to depend on `web-animations-js`, version 2.0.0 or later.

## Next

**Next, let's rotate in [Step 2: Spin a dot &raquo;](step2.md)**