const Tab = ({ selectors }) => {
  const { tabsContainer, panelsContainer } = selectors;

  const tabList = document.querySelector(`${tabsContainer} > [role="tablist"]`);
  const tabs = [...tabList.querySelectorAll(':scope > [role="tab"]')];
  const tabPanels = [
    ...document.querySelectorAll(`${panelsContainer} > [role="tabpanel"]`),
  ];

  const firstTabIndex = 0;
  const lastTabIndex = tabs.length - 1;

  const getIndexOfFocusedTab = () => {
    let index = 0;
    while (index <= lastTabIndex) {
      if (tabs[index].getAttribute('tabindex') == 0) {
        return index;
      }
      index++;
    }
    return -1;
  };

  const focus = (index) => {
    tabs.forEach((tab) => {
      tab.setAttribute('tabindex', -1);
    });

    const newTab = tabs[index];
    newTab.setAttribute('tabindex', 0);
    newTab.focus();
  };

  const focusNext = () => {
    const indexOfFocusedTab = getIndexOfFocusedTab();
    const newFocusedIndex =
      indexOfFocusedTab >= lastTabIndex ? firstTabIndex : indexOfFocusedTab + 1;
    focus(newFocusedIndex);
  };

  const focusPrevious = () => {
    const indexOfFocusedTab = getIndexOfFocusedTab();
    const newFocusedIndex =
      indexOfFocusedTab <= firstTabIndex ? lastTabIndex : indexOfFocusedTab - 1;
    focus(newFocusedIndex);
  };

  const select = (event) => {
    tabs.forEach((tab) => {
      tab.setAttribute('aria-selected', false);
    });
    tabPanels.forEach((panel) => {
      panel.setAttribute('hidden', true);
    });

    const clickedTab = event.currentTarget;
    clickedTab.setAttribute('aria-selected', true);
    const idOfPanelToShow = clickedTab.getAttribute('aria-controls');
    tabPanels
      .find((panel) => {
        return panel.id === idOfPanelToShow;
      })
      .removeAttribute('hidden');
  };

  const handleClick = (event) => {
    select(event);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      focusNext();
    } else if (event.key === 'ArrowLeft') {
      focusPrevious();
    }
  };

  const registerEvents = () => {
    tabList.addEventListener('keydown', handleKeyDown);
    tabs.forEach((tab) => {
      tab.addEventListener('click', handleClick);
    });
  };

  registerEvents();
};

export default Tab;
