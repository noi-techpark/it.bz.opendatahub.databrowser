// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useEventBus } from '@vueuse/core';

export const useEventDelete = useEventBus<boolean>('delete');
