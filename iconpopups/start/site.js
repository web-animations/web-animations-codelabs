
var activeTarget = null;

/**
 * Close any active button target.
 */
function closeActive() {
  if (activeTarget) {
    var popup = activeTarget.querySelector('.popup');
    popup.style.visibility = 'hidden';
  }
  activeTarget = null;
}

/**
 * Handle a click on an unopen group.
 * @param {!Element} group selected
 */
function groupClick(group) {
  activeTarget = group;

  var popup = activeTarget.querySelector('.popup');
  popup.style.visibility = 'visible';
}

/**
 * Configure handlers to open/close all elements of class '.group'.
 */
window.addEventListener('load', function() {
  document.body.addEventListener('click', closeActive);

  var groups = Array.prototype.slice.call(document.querySelectorAll('.group'));
  groups.forEach(function(group) {
    group.addEventListener('click', function(event) {
      event.stopPropagation();
      if (activeTarget == group) {
        return;  // aleady open
      }
      closeActive();
      groupClick(group);
    });
  });
});
