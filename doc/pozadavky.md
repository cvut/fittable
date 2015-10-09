# Požadavky

Datum: Leden 2015<br>
Autor: Jakub Jirůtka

## Funkční požadavky

1. bude poskytovat náhled na události (tj. kalendáře) z pohledu:
  1. osoby,
  2. předmětu,
  3. místnosti.
2. bude poskytovat různé módy zobrazení:
  1. rozvrhový (horizontální):
     a. s přepínáním mezi zobrazení 5/7 dní (např. dálkoví studenti mívají výuku i o víkendu),
     b. s časovou osou podle harmonogramu dané fakulty (_časové_ rozsahy) sloužící jako _pomocné_ vodítko.
  2. kalendářní:
     1. týdenní (výchozí),
     2. _měsíční,_ (**P2**)
     3. denní.
3. bude zobrazovat paritu (sudý/lichý) aktuálně vybraného období.
4. bude zobrazovat označení semestru aktuálně vybraného období.
5. okénko události bude obsahovat:
  1. kód předmětu,
  2. místnost (KOSí kód), (**P1**)
  3. čas začátku a _konce události_ (**P2**),
  4. typ události (barevným rozlišením),
  5. příznak, zda byla událost ovlivněna rozvrhovou výjimkou (tj. změna oproti pravidelnému rozvrhu).
6. po kliknutí na okénko události se zobrazí detail události obsahující:
  1. celý název předmětu nebo události,
  2. odkaz na kalendář předmětu (jen pro P/C/L/J/Z),
  3. pořadové číslo výukové hodiny nebo zkoušky v semestru (jen pro P/C/L/Z),
  4. číslo paralelky (jen pro P/C/L/J),
  5. odkaz na kalendář místnosti,
  6. vyučující/zkoušející/organizátoři události (jeden nebo více lidí):
     1. celé jméno,
     2. <del>e-mail</del> (je na Usermapu),
     3. odkaz na kalendář,
     4. odkaz na Usermap.
  7. seznam studentů v paralelce (jen pro P/C/L): (**P3**)
     1. celé jméno,
     2. uživatelské jméno,
     3. zobrazovat ve „fancy pop-up.“
  8. seznam výjimek, které událost ovlivnily.
7. na původním místě zrušené či přesunuté události bude zobrazovat zástupné okýnko:
  1. v případě přesunuté události s odkazem na novou událost. (**P3**)
8. bude umožňovat navigaci v kalendáři po týdnech/měsících/semestrech.
9. bude poskytovat filtr zobrazených událostí:
  1. podle typu události.
10. bude poskytovat jednotný vyhledávač kalendářů:
  1. osoby (podle uživatelského i občanského jména),
  2. předmětu (podle kódu a názvu),
  3. místnosti (podle KOSího kódu).
11. kalendářní data bude získávat ze služby Sirius:
  1. přes jeho RESTful API, ve formátu JSON,
  2. _on-demand_.
12. bude poskytovat JS API pro:
  1. přidání položek zobrazených v okénku události,
  2. přidání položek zobrazených v detailu události (textových i akcí),
  3. odchytávání akcí nad kalendářem [TODO].

## Nefunkční požadavky

1. Uživatelské rozhraní:
  1. bude lokalizované do češtiny a angličtiny,
  2. bude responzivní (od desktopu po mobilní telefon s WVGA),
  3. bude přizpůsobené i pro ovládání na dotykovém displeji,
  4. vizuálně bude vycházet z grafiky vytvořené pro „nový web“ od Josefa Lobotky (fonty, barvy, příp. ikony).
2. Přizpůsobitelnost a konfigurovatelnost:
  1. widget bude možné přizpůsobit pro různá použití:
     1. na fakultním webu pro studenty a vyučující,
     2. v rámci administračního rozhraní pro rozvrháře,
     3. v módu omezené funkčnosti, např. na osobní stránce vyučujícího, studenta atp.
  2. widget bude počítat s nasazením i na dalších fakultách.
3. Dokumentace:
  1. bude obsahovat kompletní postup pro sestavení (build),
  2. bude obsahovat popis konfigurace a JS API pro přizpůsobení widgetu,
  3. veškerá dokumentace by měla být v angličtině.
4. Kvalita kódu:
  1. kód bude srozumitelný, dobře strukturovaný a potenciálně nejasné části okomentované,
  2. kód bude pokrytý jednotkovými a integračními testy,
  3. kód i další textové soubory budou v UTF-8 a s unixovým způsobem ukončování řádek (řídící znak LF / 0x0A),
  3. názvy všech identifikátorů použitých v kódu budou v angličtině.
5. Verzování:
  1. projekt bude verzovaný systémem Git na GitHubu.
6. Technologie:
  1. bude implementovaný v jazyce kompilovaném do JavaScriptu; preferovaná je syntaxe ECMAScript 6+ (s překladem pomocí https://github.com/babel/babel[Babel]).
7. Běhové prostředí:
  1. bude fungovat _client-side_, ve webovém prohlížeči s podporou JavaScriptu:
     1. Chrome/Chromium 35+,
     2. Firefox 31+,
     3. Internet Explorer 10+ (9 alespoň omezeně),
     4. Safari 6+.
8. Licence:
  1. bude využívat výhradně _open-source_ knihovny.

## Zkratky

Typy událostí:

* přednáška [P]
* cvičení [C]
* laboratoř [L]
* jednorázová akce předmětu [J]
* zkouška (i zápočtová) [Z]
* omezení vyučujícího [V]
* obecná událost [O]
