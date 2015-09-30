
var activeTarget = null;

/**
 * Close any active group target.
 */
function closeActive() {
  if (!activeTarget) { return; }

  var popup = activeTarget.querySelector('.popup');
  popup.style.visibility = 'hidden';

  activeTarget = null;
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
  popup.style.visibility = 'visible';
}
