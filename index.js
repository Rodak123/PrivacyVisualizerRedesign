(() => {
    const NONE = 'none';
    const NOT_LINKED = 'not-linked';
    const LINKED = 'linked';
    const TRACKING = 'tracking';

    const STATUSES = [NONE, NOT_LINKED, LINKED, TRACKING];

    function getStatus(elem) {
        for (const status of STATUSES) if (elem.classList.contains(status)) return status;
        return NONE;
    }

    const categories = document.getElementsByClassName('category');

    function toggleButtonStatus(elem) {
        const status = getStatus(elem);
        const nextStatus = STATUSES[(STATUSES.indexOf(status) + 1) % STATUSES.length];

        if (status == NONE) elem.classList.add(nextStatus);
        else if (nextStatus == NONE) elem.classList.remove(status);
        else elem.classList.replace(status, nextStatus);
    }

    for (const elem of categories)
        elem.getElementsByClassName('card-img-top')[0].addEventListener('click', () =>
            toggleButtonStatus(elem)
        );
})();
