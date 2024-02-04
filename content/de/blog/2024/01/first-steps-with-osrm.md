---
published_at: "2024-01-08"
title: "Erster Einsatz und erste Schritte mit OSRM"
description: "Von den ersten Schritten mit OSRM bis zur Entwicklung eines eigenen Map Debugging Tools und dem Ausblick auf die Integration von Overpass."
---

![](/images/blog/10-first-steps-with-osrm.png)

# Erster Einsatz und erste Schritte mit OSRM 📚

In den vergangenen Monaten lag mein Hauptaugenmerk auf Kundenprojekten, was mich daran hinderte, mich intensiver mit der Weiterentwicklung des Spiels zu beschäftigen. Mit dem Jahreswechsel und dem Abschluss anderer Projekte konnte ich jedoch meine Aufmerksamkeit wieder verstärkt auf die Entwicklungen von `leitstelle.io` lenken und dabei Fortschritte erzielen.

Die erste Etappe dieses Entwicklungsabschnitts führte mich zur Auseinandersetzung mit OSRM (Open Source Routing Machine). Dabei entwickelte ich sogar ein eigenes Map Debugging Tool, das es ermöglicht, die oft kryptischen Geometrien, wie beispielsweise `allfHqivfAEERa@@...[jBUnAIZQl@`, anschaulicher darzustellen (siehe Screenshot oben).

Um meine Kenntnisse im Umgang mit OSRM weiter zu vertiefen, habe ich einen intensiven Einblick genommen. Dies ermöglichte es mir, das Routing und die Echtzeitanzeige von Fahrzeugen sowohl im Backend als auch im Frontend besser zu verstehen und entsprechende Optimierungen vorzunehmen. Bisher handelt es sich jedoch lediglich um einen Prototypen, der noch nicht für die Integration in das Spiel geeignet ist.

Um das Routing effektiver zu testen, war es erforderlich, einen Einsatz in der Nähe einer Wache zu generieren – auch wenn es zu Beginn lediglich ein leerer Einsatz war. Dabei wurde deutlich, dass Einsätze nicht nur in unmittelbarer Nähe einer Wache entstehen sollten, sondern auch einen Bezug zum ausgewählten Ort haben müssen. Dies führte zu der Erkenntnis, dass in naher Zukunft ein weiteres Tool – nämlich `Overpass` - zum Einsatz kommen wird.

Bereits auf https://bos.wiki habe ich mich intensiv mit `Overpass` beschäftigt. Daher sollte die Integration in den aktuellen Prototypen nicht allzu viel Zeit in Anspruch nehmen. Mit `Overpass` ist es leicht möglich, anhand eines Punktes auf der Karte einen Points of Interest (POI) zu bestimmen. Auf diese Weise kann vermieden werden, dass ein Wohnungsbrandeinsatz beispielsweise mitten auf der Autobahn platziert wird.

Abseits der technischen Fortschritte habe ich mich intensiv mit der architektonischen und konkreten Entwicklung von `leitstelle.io` auseinandergesetzt. Meine Überlegungen erstreckten sich dabei nicht nur auf die Erweiterung der Spielfunktionalitäten, sondern vor allem auf die Umsetzung einzelner Teile des Projekts. Ein besonderes Augenmerk lag dabei auf der Strukturierung und Entwicklung, um eine effiziente und nachhaltige Umsetzung sicherzustellen.

Ich wünsche euch allen ein frohes neues Jahr! Bis zum nächsten Mal!
