const KeyboardTrap = ({ selectors, onScapeKey = (event) => {} }) => {
  const { open, close, container } = selectors;
  const focusableSelectors = `a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]`;

  const openNode = document.querySelector(open);
  const closeNode = document.querySelector(close);
  const containerNode = document.querySelector(container);
  const focusableNodes = [
    ...containerNode.querySelectorAll(focusableSelectors),
  ];

  const firstIndex = 0;
  const lastIndex = focusableNodes.length - 1;

  const storeFocus = () => {
    containerNode.focus();
  };

  const restoreFocus = () => {
    openNode.focus();
  };

  const indexOfFocusedNode = () => {
    const focusedNode = document.activeElement;
    let previousIndex = 0;
    while (previousIndex <= lastIndex) {
      const current = focusableNodes[previousIndex];
      if (current.isEqualNode(focusedNode)) {
        return previousIndex;
      }
      previousIndex++;
    }
    return -1;
  };

  const focusNext = () => {
    let nextIndex = indexOfFocusedNode() + 1;
    if (nextIndex < 0 || nextIndex > lastIndex) {
      nextIndex = firstIndex;
    }
    const current = focusableNodes[nextIndex];
    current.focus();
  };

  const focusPrevious = () => {
    let previousIndex = indexOfFocusedNode() - 1;
    if (previousIndex < firstIndex) {
      previousIndex = lastIndex;
    }
    const current = focusableNodes[previousIndex];
    current.focus();
  };

  const handleKeydown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      if (!event.shiftKey) {
        focusNext();
      } else {
        focusPrevious();
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      restoreFocus();
      onScapeKey(event);
    }
  };

  openNode.addEventListener('click', storeFocus);
  closeNode.addEventListener('click', restoreFocus);
  containerNode.addEventListener('keydown', handleKeydown);
};

export default KeyboardTrap;
