---
published_at: "2024-01-08"
title: "First Mission and Initial Steps with OSRM"
description: "From the initial steps with OSRM to the development of a custom Map Debugging Tool and a glimpse into the integration of Overpass."
---

![](/images/blog/10-first-steps-with-osrm.png)

# First Mission and Initial Steps with OSRM 📚

In the past few months, my main focus has been on customer projects, which prevented me from delving deeper into the development of the game. However, with the turn of the year and the completion of other projects, I was able to redirect my attention to the advancements of `leitstelle.io` and make progress.

The first stage of this development phase led me to engage with OSRM (Open Source Routing Machine). In the process, I even developed my own Map Debugging Tool, allowing for a more visual representation of often cryptic geometries, such as `allfHqivfAEERa@@...[jBUnAIZQl@` (see the screenshot above).

To deepen my knowledge of working with OSRM, I took an in-depth look. This allowed me to better understand routing and real-time vehicle display in both the backend and frontend, enabling me to make corresponding optimizations. However, it's currently only a prototype not yet suitable for integration into the game.

To more effectively test routing, it was necessary to generate a mission near a station—even if initially it was just an empty mission. It became evident that missions should not only arise in the immediate vicinity of a station but also have a connection to the selected location. This led to the realization that another tool—namely `Overpass`—will be used in the near future.

I have already extensively explored `Overpass` on https://bos.wiki. Therefore, the integration into the current prototype should not take too much time. With `Overpass`, it is easy to determine Points of Interest (POI) based on a point on the map. This way, it can be avoided that, for example, a residential fire mission is placed right in the middle of the highway.

Apart from technical progress, I have delved deeply into the architectural and concrete development of `leitstelle.io`. My considerations extended not only to expanding game functionalities but also to the implementation of individual parts of the project. Special attention was given to structuring and development to ensure an efficient and sustainable implementation.

Wishing you all a Happy New Year! Until next time!