
var activeTarget = null;
var activePlayer = null;

/**
 * Close any active group target.
 */
function closeActive() {
  if (!activeTarget) { return; }

  var popup = activeTarget.querySelector('.popup');
  activePlayer.reverse();

  activeTarget = null;
  activePlayer = null;
}

/**
 * Handle a click on a group. Responsible for closing any previous groups.
 * @param {!Element} group selected, as per "icon-group" template
 */
function groupClick(group) {
  if (activeTarget) {
    if (activeTarget == group) {
      return;  // already visible, do nothing
    }
    closeActive();
  }
  activeTarget = group;

  // Change the visibility of the group's popup.
  var popup = activeTarget.querySelector('.popup');
  //popup.style.visibility = 'visible';
  var frame = {'visibility': 'visible'};
  var popupEffect = new KeyframeEffect(popup, [frame, frame], {fill: 'forwards'});

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
  var timing = {
    duration: rect.height * 2,
    easing: 'ease-out',
  };
  var fillEffect = new KeyframeEffect(fill, [{transform: 'scale(0)'}, {transform: 'scale(1)'}], timing);

  // Create icon appear effects.
  var icons = Array.prototype.slice.call(popup.querySelectorAll('.ball'));
  var iconEffect = new SequenceEffect(icons.map(function(icon) {
    var effect = [{opacity: 0}, {opacity: 1}];
    var timing = {duration: rect.height * 2 / icons.length, fill: 'backwards'};
    return new KeyframeEffect(icon, effect, timing);
  }));

  var groupEffect = new GroupEffect([fillEffect, popupEffect, iconEffect], {fill: 'forwards'});
  activePlayer = document.timeline.play(groupEffect);
}
