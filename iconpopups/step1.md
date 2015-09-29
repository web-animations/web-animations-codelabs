## Step 1: Include Web Animations

The Web Animations API is a suite of primitives and features, some of which may not yet be available natively in your favourite browser. Let's get started by including the [web-animations-next polyfill](https://github.com/web-animations/web-animations-js#web-animations-nextminjs). The polyfill is designed to provide Web Animations on all browsers, using native support where available: so you'll always get the best combination of support and performance.

In this codelab, we'll work within the `iconpopups/start` folder.

Open the `iconpopups/start/index.html` file in a text editor, and include `web-animations-next.min.js` from GitHub as shown below.

#### index.html

```html
<head>
  <link href="..." rel="stylesheet" type="text/css" />
  <link href="../shared/codelab.css" rel="stylesheet" type="text/css" />
  <link href="site.css" rel="stylesheet" type="text/css" />
  <!-- Add the line below -->
  <script src="https://cdn.rawgit.com/web-animations/web-animations-js/2.1.2/web-animations-next.min.js"></script>
  <script src="../shared/codelab.js"></script>
  <script src="work.js"></script>
</head>
```

### Alternatives

1. If you're doing this codelab offline, include a local version of the `web-animations-next.min.js` script from a checked out [polyfill repo](https://github.com/web-animations/web-animations-js#web-animations-nextminjs)

2. You can use [Bower](http://bower.io/) to depend on `web-animations-js`, version 2.0.0 or later.

## Next

**Next, let's get expansive in [Step 2: Expand the background &raquo;](step2.md)**