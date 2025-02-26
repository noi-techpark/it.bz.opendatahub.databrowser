// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import {defineStore} from "pinia";

export const useQueryStore = defineStore("queryStore", {
    state: () => ({
        lastQuery: {} as Record<string, string | string[]>,
    }),
    actions: {
        setLastQuery(query: Record<string, string | string[]>) {
            this.lastQuery = query;
        },
        getLastQuery() {
            return this.lastQuery;
        },
    },
});
