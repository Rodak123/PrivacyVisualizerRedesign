(() => {
    const NONE = 'none';
    const NOT_LINKED = 'not-linked';
    const LINKED = 'linked';
    const TRACKING = 'tracking';

    const STATUSES = [NONE, NOT_LINKED, LINKED, TRACKING];

    const categories = document.getElementsByClassName('category');

    const urlParams = new URLSearchParams(window.location.search);

    function getStatusIndex(elem) {
        if (urlParams.has(elem.id)) {
            return urlParams.get(elem.id);
        }
        return 0;
    }

    function addButtonStatus(elem, statusIndex) {
        const status = STATUSES[statusIndex];
        elem.classList.add(status);
    }

    function toggleButtonStatus(elem) {
        const statusIndex = getStatusIndex(elem);
        const status = STATUSES[statusIndex];
        const nextStatusIndex = (statusIndex + 1) % STATUSES.length;
        const nextStatus = STATUSES[nextStatusIndex];

        if (nextStatus == NONE) {
            elem.classList.remove(status);
            urlParams.delete(elem.id);
        } 
        else {
            urlParams.set(elem.id, nextStatusIndex);
        }

        window.location.search = urlParams.toString();
    }
    
    for (const elem of categories) {
        const button = elem.getElementsByClassName('card-img-top')[0];
        if (urlParams.has(button.id)) {
            addButtonStatus(button, urlParams.get(button.id));
        }
        if (!urlParams.has('locked')) {
            button.addEventListener('click', () =>
                toggleButtonStatus(elem)
            );
        }
    }
})();
