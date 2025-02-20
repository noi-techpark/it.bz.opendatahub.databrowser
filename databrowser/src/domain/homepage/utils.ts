// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import {filtersStore} from "./store/filterStore.ts";

export function updateURL(filters: string[] = [], searchQuery: string = '') {
    const params = getStartedParams();

    if (filters.length > 0) {
        params.set('rawfilter', filters.join('&'));
    } else {
        params.delete('rawfilter');
    }

    if (searchQuery !== '' && searchQuery !== null) {
        params.set('search', searchQuery);
    } else {
        params.delete('search');
    }

    const finalUrl = '?' + params.toString();

    if (params.toString() !== null && params.toString() !== '') {
        window.history.pushState({}, '', window.location.pathname + finalUrl);
    } else {
        window.history.pushState({}, '', window.location.pathname);
    }
    filtersStore.lastFilters = finalUrl; // Only set it once
}

export function getStartedParams() {
    return filtersStore.lastFilters !== '' && filtersStore.lastFilters !== '?'
        ? new URLSearchParams(filtersStore.lastFilters)
        : new URLSearchParams(window.location.search);
}
