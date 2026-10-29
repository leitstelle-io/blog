---
published_at: "2026-10-28"
title: "Der Kreis schließt sich"
description: "Aus dem Browserspiel wird ein echtes Feuerwehrspiel: Leitstelle und Einsatzleitung in einem, auf echter Karte, mit Feuer, Wasser und Koop. Warum ich zu den Wurzeln zurückkehre – und was ich mitnehme."
cover: "/images/game/hero-nacht-1280.webp"
---

![Eine Drehleiter an einem brennenden Wohnhaus, Einsatzkräfte bei der Arbeit](/images/game/post-house-fire-1280.webp)

# Der Kreis schließt sich 🚒

2015 habe ich hier zum ersten Mal von meinem Traum geschrieben: einem eigenen Feuerwehrspiel. Befeuert von `Emergency 1–4`, `Feuerwache.net`, `LstSim.de` und später `Leitstellenspiel.de`. Gut zehn Jahre später hat dieser Traum eine Wendung genommen – zurück zu seinem Anfang.

## Was in der Pause passiert ist

Anfang 2025 habe ich das Projekt pausiert, um meine Ausbildung zum Werkfeuerwehrmann zu machen. Diese Zeit hat meinen Blick auf das Spiel verändert. Wer selbst an einer Einsatzstelle stand, weiß: Vor Ort passiert nichts von allein. Jemand muss absitzen, das Gerät holen, die Wasserversorgung aufbauen und entscheiden. Genau das hat mir im Spiel gefehlt.

## Was die Browser-Version war

`leitstelle.io` war bisher ein Browserspiel: Laravel, Vue und MapLibre, eine Karte von jedem beliebigen Ort, Fahrzeuge als Symbole, die über echte Straßen fahren. Die Arbeit mit `OSRM` und `Overpass`, die eigenen Kartenkacheln, das Map Debugging Tool – all das hat mir unglaublich viel beigebracht.

::video-slot{poster="/images/blog/10-first-steps-with-osrm.png" caption="Der letzte Stand der Browser-Version"}
::

Aber ehrlich gesagt war es ein Leitstellenspiel, wie es schon viele gibt: Du disponierst, ein Timer läuft ab, fertig. Spannend für ein paar Einsätze, aber nicht das Spiel, von dem ich 2015 geträumt habe.

## Die Wendung

Meine Begeisterung kam immer von zwei Seiten: von der Leitstelle aus `Leitstellenspiel.de` und `LstSim.de` und von der Einsatzstelle aus `Emergency`. Leitstelle vereint jetzt beides und geht darüber hinaus. Du nimmst den Notruf an, alarmierst die passenden Fahrzeuge von echten Wachen – und wenn sie ankommen, übernimmst du selbst.

## Was das Spiel jetzt ist

**Echte Karte, echte Daten.** Der ganze Landkreis Freising, gebaut aus OpenStreetMap und dem bayerischen Geländemodell: 83 Feuerwachen, 3.716 Hydranten und über 130 Fahrzeuge nach dem Vorbild der echten Wehren. Die Einsatzmeldungen tragen echte Adressen.

![Ein HLF auf Anfahrt zur Blauen Stunde](/images/game/post-blue-hour-drive-1280.webp)

**Disponent und Einsatzleiter.** Die Fahrzeuge warten auf ihre Mannschaft, fahren echte Straßen und melden ihren Status wie im Funk. Vor Ort lässt du die Mannschaft absitzen, holst Schlauch, Schere oder Säge vom Fahrzeug und bringst die Drehleiter in Stellung.

**Feuer und Wasser, simuliert.** Ein Brand wächst, wenn zu wenig Wasser ankommt. Du legst die Versorgungsleitung zum Hydranten, saugst aus dem Bach an oder baust lange Schlauchstrecken von Fahrzeug zu Fahrzeug.

![Die Wasserversorgung aus dem Bach steht, während der nächste Alarm eingeht](/images/game/post-draft-line-1280.webp)

**Gemeinsam mit Freunden.** Ihr spielt im Koop in derselben Welt. Jeder übernimmt eigene Fahrzeuge, und pausiert wird nur, wenn alle zustimmen.

![Drei Spieler im Koop mit Spielerliste und Abstimmung zur Pause](/images/game/post-coop-1280.webp)

Und weil Fehler zur Entwicklung dazugehören, gibt es `Summi`: eine kleine Drohne mit großen Augen, mit der ihr Fehler direkt im Spiel melden könnt.

![Summi, die Drohne zum Melden von Fehlern, als 3D-Modell](/images/game/post-summi-1280.webp)

## Neue Technik, altes Wissen

Leitstelle läuft nicht mehr im Browser, sondern als Desktop-Spiel auf macOS, Windows und Linux, gebaut mit `Rust` und `Bevy`. Vom alten PHP-Code ist nichts übrig geblieben, vom Wissen dagegen sehr viel: die Recherche zu Wachen und Fahrzeugen, die Logik hinter Einsatzstichworten und Alarmierung, die Ideen rund um Erkundung und Nachalarmierung. Die Browser-Version war kein Umweg, sie war das Fundament.

## Freising zuerst, dann Deutschland und darüber hinaus

Der erste Landkreis ist Freising. Dort kenne ich mich aus, und dort lässt sich jedes Detail prüfen. Die Technik dahinter ist aber für ganz Deutschland gedacht – und darüber hinaus.

## Was als Nächstes kommt

- Einsätze, die falsch gemeldet werden, und eine Erkundung, die zeigt, was wirklich los ist
- Wind, der Brände auf Nachbargebäude übergreifen lässt
- eine lebendige Welt, in der der Verkehr eine Rettungsgasse bildet
- Rettungsdienst, Polizei und THW
- eine dauerhafte Welt, die rund um die Uhr weiterläuft
- eine Begleit-App für unterwegs

Ein Datum gibt es bewusst noch nicht. Erste Testrunden kündige ich zuerst im [Discord](https://discord.gg/cdRq3bztJu) und im [Forum](https://forum.leitstelle.io) an. Schaut vorbei, erzählt mir von euren Wachen und Fahrzeugen, und lasst uns gemeinsam das Feuerwehrspiel bauen, von dem wir immer geträumt haben.

Der Kreis schließt sich. Bis bald!

André
