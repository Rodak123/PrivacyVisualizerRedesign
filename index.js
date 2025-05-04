(() => {
    const NONE = 'none';
    const NOT_LINKED = 'not-linked';
    const LINKED = 'linked';
    const TRACKING = 'tracking';

    const STATUSES = [NONE, NOT_LINKED, LINKED, TRACKING];

    const categories = document.getElementsByClassName('category');

    let urlParams = new URLSearchParams(window.location.search);

    function getStatusIndex(elem) {
        if (urlParams.has(elem.id)) {
            return Number(urlParams.get(elem.id));
        }
        return 0;
    }

    function updateCategoryStatus(elem, prevStatus, nextStatus) {
        if (prevStatus == NONE) {    
            elem.classList.add(nextStatus);
        } 
        else if (nextStatus == NONE) {
            elem.classList.remove(prevStatus);
        }
        else {
            elem.classList.replace(prevStatus, nextStatus);
        }
    }

    function toggleButtonStatus(elem) {
        const statusIndex = getStatusIndex(elem);
        const status = STATUSES[statusIndex];
        const nextStatusIndex = (statusIndex + 1) % STATUSES.length;
        const nextStatus = STATUSES[nextStatusIndex];

        if (nextStatus == NONE) {
            urlParams.delete(elem.id);
        } 
        else {
            urlParams.set(elem.id, nextStatusIndex);
        }

        return [status, nextStatus];
    }

    function displayContent() {
        for (const elem of categories) {
            const button = elem.getElementsByClassName('card-img-top')[0];
            if (urlParams.has(button.id)) {
                const status = STATUSES[urlParams.get(button.id)];
                elem.classList.add(status);
            }
            if (!urlParams.has('locked')) {
                button.addEventListener('click', () => {
                        const [prevStatus, nextStatus] = toggleButtonStatus(button);
                        updateCategoryStatus(elem, prevStatus, nextStatus);
                        const searchString = '?' + urlParams.toString();
                        const href = window.location.origin + window.location.pathname + searchString;
                        window.history.pushState({ searchString: searchString }, "", href);
                    }
                );
            }
        }
    }
    
    // Handle forward/back buttons
    window.addEventListener("popstate", (event) => {
      // If a state has been provided, we have a "simulated" page
      // and we update the current page.
      if (event.state) {
        // Simulate the loading of the previous page
        urlParams = new URLSearchParams(event.state.searchString);
        displayContent();
      }
    });


    displayContent();
})();
