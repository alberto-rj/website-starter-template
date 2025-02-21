const OffCanvasMenu = ({ selectors }) => {
  const { menu, toggle, close, inner, overlay } = selectors;
  const menuNode = document.querySelector(menu);
  const toggleNode = menuNode.querySelector(toggle);
  const innerNode = menuNode.querySelector(inner);
  const overlayNode = menuNode.querySelector(overlay);
  const closeNode = menuNode.querySelector(close);

  const toggleMenu = () => {
    const expanded = toggleNode.ariaExpanded === 'true';
    const label = `${expanded ? 'Open' : 'Close'} menu`;
    toggleNode.ariaExpanded = !expanded;
    toggleNode.ariaLabel = label;
    closeNode.ariaExpanded = !expanded;
    closeNode.ariaLabel = label;
    innerNode.dataset.expanded = !expanded;
    overlayNode.dataset.expanded = !expanded;
  };

  const hideMenu = () => {
    if (innerNode.dataset?.expanded === 'false') {
      innerNode.removeAttribute('data-expanded');
      overlayNode.removeAttribute('data-expanded');
    }
  };

  toggleNode.addEventListener('click', toggleMenu);
  closeNode.addEventListener('click', toggleMenu);
  innerNode.addEventListener('transitionend', hideMenu);
  innerNode.addEventListener('animationend', hideMenu);

  return { toggle: toggleMenu };
};

export default OffCanvasMenu;
