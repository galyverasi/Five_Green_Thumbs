## Five Green Thumbs


#### An app that will serve as a platform for users to showcase their plants.

#### MVP Goals
 1. Users will be able to create a profile with basic information
 2. Users will be able to create or delete a profile of their plant.
 3. Be able to leave comments or give tips to other users
 4. Display information on how to take care of common indoor plants

#### Stretch Goals
 1. Users will be able to upload a photo of their plant using an API

#### Tech stack
* NodeJS
* Express
* PostgreSQL
* Bootstrap

#### Wireframes
![wireframe](assets/wireframe.png)
#### API
* Trefle is a botanical JSON REST API for plants species, allowing you to search and query over all the registered species

#### ERD<br>
![ERD](assets/erd.png)
<br>
Using node-fetch module:
```
const fetch = require('node-fetch');

(async () => {
  const response = await fetch('https://trefle.io/api/v1/plants?token=YOUR_TREFLE_TOKEN');
  const json = await response.json();
  console.log(json);
})();
```
JSON response looks like this:
```
{
    "data": [
        {
            "author": "Schltr.",
            "bibliography": "Repert. Spec. Nov. Regni Veg. 16: 358 (1920)",
            "common_name": null,
            "family": "Orchidaceae",
            "family_common_name": null,
            "genus": "Aa",
            "genus_id": 14887,
            "id": 834556,
            "links": {
                "genus": "/api/v1/genus/aa",
                "plant": "/api/v1/plants/aa-achalensis",
                "self": "/api/v1/species/aa-achalensis"
            },
            "plant_id": 423071,
            "rank": "species",
            "scientific_name": "Aa achalensis",
            "slug": "aa-achalensis",
            "status": "accepted",
            "synonyms": [],
            "year": 1920
        },
        {
            "author": "Rchb.f.",
            "bibliography": "Xenia Orchid. 1: 18 (1854)",
            "common_name": null,
            "family": "Orchidaceae",
            "family_common_name": null,
            "genus": "Aa",
            "genus_id": 14887,
            "id": 834557,
            "links": {
                "genus": "/api/v1/genus/aa",
                "plant": "/api/v1/plants/aa-argyrolepis",
                "self": "/api/v1/species/aa-argyrolepis"
            },
            "plant_id": 423072,
            "rank": "species",
            "scientific_name": "Aa argyrolepis",
            "slug": "aa-argyrolepis",
            "status": "accepted",
            "synonyms": [
                "Altensteinia argyrolepis"
            ],
            "year": 1854
        },  // ... 28 more items
    ],
    "links": {
        "first": "/api/v1/species?page=1",
        "last": "/api/v1/species?page=20865",
        "next": "/api/v1/species?page=2",
        "self": "/api/v1/species"
    },
    "meta": {
        "total": 417293
    }
}
```

#### Potential Roadblocks
* Trefle API is now read-only
* Learning how to use Cheerio to gather information on plants