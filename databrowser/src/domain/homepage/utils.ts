// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import {Router} from "vue-router";
import {useQueryStore} from "./filterStore.ts";
import {useRouteQuery} from "@vueuse/router";

const queryStore = useQueryStore();

export function updateURL(router: Router, filters: string[] = [], searchQuery: string = '') {
    const currentQuery = router.currentRoute.value.query;
    const newQuery: Record<string, string> = {};

    if (filters.length) newQuery['rawfilter'] = filters.join('&');
    if (searchQuery) newQuery['search'] = searchQuery;

    queryStore.setLastQuery(newQuery);
    if (JSON.stringify(currentQuery) === JSON.stringify(newQuery)) return;

    return router.push({query: newQuery});
}

export function getStartedQuery() {
    const rawfilter = useRouteQuery<string[] | string | null>('rawfilter').value;
    const search = useRouteQuery<string[] | string | null>('search').value;

    return {
        rawfilter: Array.isArray(rawfilter)
            ? rawfilter.join('&')
            : rawfilter ?? '',

        searchQuery: Array.isArray(search)
            ? search.join(' ')
            : search ?? ''
    };
}