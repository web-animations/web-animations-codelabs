
function animateToSection(link, current, previous) {
  // Step 1: Add Animation!
  // TODO
  var header = document.querySelector('header');

  var effectNode = document.createElement('div');
  effectNode.className = 'effect';

  var currentColor = window.getComputedStyle(header).backgroundColor;
  var newColor = 'hsl(' + Math.round(Math.random() * 255) + ', 46%, 42%)';

  var bounds = link.getBoundingClientRect();
  header.appendChild(effectNode);
  effectNode.style.left = bounds.left + bounds.width / 2 + 'px';
  effectNode.style.top = bounds.top + bounds.height / 2 + 'px';

  // Step 1.1
  var circleMotionEffect = (function() {
    // TODO: white flash, but color causes repaint
    var steps = [
      {'transform': 'scale(0)'},
      {'transform': 'scale(1)'}
    ];
    effectNode.style.background = newColor;
    return new KeyframeEffect(effectNode, steps, {
      duration: 1000,
      easing: 'ease-out',
      fill: 'forwards'
    });
  })();

  // Step 1.2
  var contentMoveOutEffect = (function() {
    if (!previous) { return new GroupEffect([]); }

    var angle = Math.pow((Math.random() * 16) - 8, 3);
    var offset = (Math.random() * 20) - 10;
    var steps = [
      {
        'transform': 'translate(0, 0) rotate(0deg) scale(1)',
        'opacity': 1,
        'display': 'block'
      },
      {
        'transform': 'translate(' + offset + 'em, 20em) rotate(' + angle + 'deg) scale(0)',
        'opacity': 0,
        'display': 'block'
      }
    ];
    return new KeyframeEffect(previous, steps, {
      duration: 1250,
      fill: 'forwards',
      easing: 'ease-out'
    });
  })();

  // Step 1.3
  var contentMoveInEffect = (function() {
    var steps = [
      {'transform': 'translate(0, 20em)', 'opacity': '0.0', 'display': 'none'},
      {'transform': 'translate(0, 0)', 'opacity': '1.0', 'display': 'block'}
    ];
    return new KeyframeEffect(current, steps, {
      fill: 'backwards',
      duration: 1250,
      delay: -1000,
      easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    });
  })();

  var group = new GroupEffect([
    circleMotionEffect,
    new SequenceEffect([contentMoveOutEffect, contentMoveInEffect])
  ]);
  var player = document.timeline.play(group);
  player.playbackRate = 0.5;

  player.addEventListener('finish', function() {
    header.style.backgroundColor = newColor;
    header.removeChild(effectNode);
    player.cancel();
  });
}



window.addEventListener('load', function() {

  var el = document.querySelector('aside.skybox');


  function animateSky(type, direction) {
    var sky = el.querySelector('.sky.' + type);
    var steps = [{opacity: 0}, {opacity: 1}];
    var anim = new KeyframeEffect(sky, steps, {
      duration: 1,
      fill: 'both',
      easing: 'ease-in-out',
      direction: direction || 'auto',
    });
    return anim;
  }

  var lightEffect = animateSky('light', 'reverse');
  var darkEffect = animateSky('dark');


  var featureSteps = [
    {'transform': 'translate(0, 0)', 'opacity': 1},
    {'transform': 'translate(0, 10em)', 'opacity': 0.5}
  ];
  var moonEffect = new KeyframeEffect(el.querySelector('.moon'), featureSteps, {
    direction: 'reverse',
    duration: 1,
    easing: 'ease-in-out',
    fill: 'both'
  });
  var sunEffect = new KeyframeEffect(el.querySelector('.sun'), featureSteps, {
    duration: 1,
    easing: 'ease-in-out',
    fill: 'both'
  });

  var clouds = el.querySelectorAll('.icon.cloud');
  var cloudEffects = [];
  for (var i = 0; i < clouds.length; ++i) {
    var pos = (Math.random() * 10);
    var inset = (Math.random() * 160) - 80;
    var side = (inset < 0) ? 'left' : 'right';
    var start;
    if (inset < 0) {
      inset -= 10;
      start = -10;
    } else {
      inset += 10;
      start = +10;
    }
    clouds[i].style[side] = '0em';
    clouds[i].style['bottom'] = pos + 'em';
    inset *= -1;

    var scale = Math.random() * 0.2 + 0.9;

    var steps = [
      {'transform': 'translate(' + start + 'vw) scale(0.7)'},
      {'transform': 'translate(' + inset + 'vw) scale(' + scale + ')'}
    ];
    console.info(steps);
    var effect = new KeyframeEffect(clouds[i], steps, {
      duration: 1,
      easing: 'ease-in-out',
      fill: 'both'
    });
   cloudEffects.push(effect);
  }
  var cloudGroup = new GroupEffect(cloudEffects);

  var group = new GroupEffect([lightEffect, darkEffect, moonEffect, sunEffect, cloudGroup]);
  var player = document.timeline.play(group);
  player.pause();

  function updatePlayer() {
    var top = window.scrollY;
    var all = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var ratio = top / all;
    player.currentTime = ratio;
  }
  updatePlayer();
  window.addEventListener('scroll', updatePlayer);

});
