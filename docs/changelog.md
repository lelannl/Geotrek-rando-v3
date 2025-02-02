# Changelog

3.0.3 (2021-05-11)
------------------

**🐛 Fixes**

* Authorize ``null`` value for ``description_teaser`` on ``DetailsCard`` (Fix #366)

3.0.2 (2021-05-06)
------------------

**✨ Improvements**

* Increase clustering maximum zoom level from 15 to 19 (#367)

3.0.1 (2021-05-01)
------------------

**🐛 Fixes**

* Enable ``spiderfy`` on ``Leaflet.markercluster``
* Social network sharing: improve ``og:image`` tag with checking if there is more than one picture instead of two

3.0.0 (2021-04-29)
------------------

* Full redesign and rewriting of Geotrek-rando with React and NextJS (for PWA, SSR and SEO)
* Directly connected to Geotrek-admin API, no more using Geotrek-admin synchronization
* Requires Geotrek-admin 2.57.0 minimun, reachable in https
* Requires Docker to be installed
* Compatible with [Geotrek-rando-v3-installer](https://github.com/GeotrekCE/Geotrek-rando-v3-installer) version 1.0.0 

**🚀 New features**

* Redesign of main pages (Home, Search, Details, Informations)
* Mobile first with a dedicated mobile responsive design
* Rewriting with modern frameworks (React and NextJS)
* Search engine optimisation (SEO) with Server side rendering (SSR)
* Dynamic sitemap generation for SEO
* Progressive web app (PWA) to be able to install the web application on a phone, including some offline contents
* Multilingual
* Optimized API calls with cache on some contents (such as filters values, cities...)
* Customizable homepage content
* Simple deployment and customization
* Search into treks or touristic contents with their common or specific filters
* Global documentation (presentation, installation, customization, development, icons, cache...)

**⚠️ Release notes**

* To upgrade to this version, you will have to do a new installation of Geotrek-rando with Docker. See [installation documentation](https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/docs/installation.md)
* The installation process of Geotrek-rando v3 is independant from your eventual version 2 of Geotrek-rando

1.x and 2.x
-----------

See the repository dedicated to versions 1 and 2 of Geotrek-rando: https://github.com/GeotrekCE/Geotrek-rando
