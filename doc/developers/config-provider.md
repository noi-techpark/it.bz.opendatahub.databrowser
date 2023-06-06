<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: CC0-1.0
-->

# View Config Provider (for remote API)

>
> ## Attention!!!: the text in this document is out of date
>

The view config provider is used get the view configuration `ViewConfig` for the current route in an async way.

The reason for async support is, that some `ViewConfig` sources may lazy load their data (e.g. remote OpenAPI specifications).

## Resolution

The resolution algorithm for `ViewConfig` iterates on a list of config sources and returns the first source that matches.

At the moment there are two config sources:

- Embedded
- Generated

## Sources

### Embedded configuration

The embedded configuration source contains `ViewConfig` definitions that are part of the Data Browser 2.0. Those definitions are managed by the community.

There may be routes that don't match any embedded definition. The result for such routes is empty.

### Generated configuration (OpenAPI & other heuristics)

The generated configuration source uses a best-effort approach to generate a `ViewConfig`. If it fails, it returns an empty result.

At the moment there is only the OpenAPI resolution approach. It uses (predefined) URLs to fetch OpenAPI descriptions. The descriptions are matched with the current route. If a route matches, a `ViewConfig` is returned. An empty result is returned otherwise.
