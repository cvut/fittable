=========================
Timetable a nové rozhraní
=========================

:Autor: Jakub Jirůtka
:Datum: Duben 2015

Tento dokument analyzuje současné rozhraní pro prohlížení rozvrhů `timetable <https://timetable.fit.cvut.cz>`_ a dává ho do kontrastu s připravovaným novým rozhraním postaveným nad službou `Sirius <http://rozvoj.fit.cvut.cz/Main/sirius>`_.

Přehled stránek
===============

Následující sekce popisují jednotlivé základní stránky v rozhraní timetable z pohledu poskytovaných dat a navigace mezi nimi.

Hlavní stránka
--------------

Hlavní stránka slouží jako rozcestník a také prostor pro další textové informace.

Data
  * nestrukturované informace:
    - parita prvního týdne semestru
    - datum začátku semestru
    - standardní začátky hodin (tj. harmonogram dne)
    - mimořádné přesuny výuky a odchylky od standardního hramonogramu dne (tj. rozvrhové výjimky)
    - rozvrh blokové výuky
    - vysvětlivky ke KOSím kódům místností
    - soupis místností (kódy)

Odkazy
  * `Seznam předmětů`_
  * `Seznam místností`_
  * `Rozvrh místnosti na den`_, `Rozvrh všech místností v jednotlivé dny`_
  * `Seznam zkoušek`_
  * `Seznam učitelů`_
  * `Seznam studentů`_
  * `Seznam jednorázových akcí`_


.. tip:: Hlavní stránkou v novém rozhraní bude přímo kalendář přihlášeného uživatele otevřený na aktuálním týdnu.

.. tip:: Všechny rozvrhové výjimky i blokovou výuku budou rozvrháři zadávat do Siria a promítnou se do výsledných kalendářů. Zároveň bude existovat přehledová stránka všech zadaných výjimek.

.. note:: Přehled počítačových a seminárních učeben je také na `webu ICT <https://ict.fit.cvut.cz/~web/current/web/classrooms/ucebny/ucebny.shtml>`_.


Seznam předmětů
----------------

Seznam všech existujících předmětů dané fakulty s odkazem na rozvrh aktuálně vypsaného předmětu a zapsané studenty.
Slouží především jako rozcestník k rozvrhům předmětů.

Data
  * všechny předměty vyučované fakultou (volitelně seskupené dle katedry)
    - český název a kód katedry zajišťující výuku
    - český název a kód předmětu

Odkazy
  * `Rozvrh předmětu`_ (pro aktuálně vypsané)
  * `Seznam studentů zapsaných na předmět`_ (pro aktuálně vypsané)
  * `Seznam studentů zapsaných na předmět`_ bez rozvrhu (pro aktuálně vypsané)


.. tip:: Funkci rozcestníku k rozvrhům zastoupí vyhledávání kalendářů osob, místností a předmětů. Místo toho, aby uživatel hledal daný předmět v seznamu, jen napíše jeho název či kód do vyhledávacího políčka (s našeptávačem).

.. caution:: Kategorizovaný seznam předmětů vyučovaných na fakultě poskytuje Bílá kniha a (víceméně) KOS, tady s ní tedy nepočítáme.


Seznam místností
----------------

Seznam všech místností fakulty s odkazem na rozvrh místnosti.

Data
  * místnosti fakulty (seskupené dle lokality)
    - zkratka lokalita
    - kód místnosti

Odkazy
  * `Rozvrh místnosti`_ (pro aktuálně využívané)


.. TIP:: Funkci rozcestníku k rozvrhům zastoupí vyhledávání kalendářů osob, místností a předmětů. Místo toho, aby uživatel hledal danou místnost v seznamu, jen napíše její kód do vyhledávacího políčka (s našeptávačem).

.. CAUTION:: Seznam (kódů) místností fakulty s rozvrhy přímo nesouvisí, bude-li však o něj zájem, poskytneme ho na samostatné stránce.


Seznam zkoušek
--------------

Seznam všech existujících předmětů dané fakulty s odkazem na seznam aktuálně vypsaných zkoušek.

Data
  * všechny předměty vyučované fakultou (seskupené dle katedry)
    - název a kód katedry zajišťující výuku
    - český název a kód předmětu

Odkazy
  * `Seznam zkouškových termínů předmětu`_

Viz `Seznam předmětů`_.

Seznam zkouškových termínů předmětu
-----------------------------------

Seznam aktuálně vypsaných zkouškových termínů jednoho předmětu.

Data
  * zkouškové termíny předmětu (seskupené dle semestru)
    - kód semestru
    - datum konání
    - kód místnosti
    - jméno učitele, který termín vypsal

Odkazy
  * `Rozvrh učitele`_, který vypsal daný termín


.. TIP:: Zkouškové termíny jsou v Siriu reprezentovány jako události s vazbou na daný předmět a místnost, zobrazí se tedy v kalendáři předmětu, resp. místnosti. Navíc se zobrazí v kalendáři učitele, který zkoušku vypsal, a studentů, kteří se na ni přes KOS přihlásili.

Seznam učitelů
--------------

Seznam učitelů fakulty, kteří daný semestr vyučují nějaký předmět, s odkazem na jejich rozvrh.

Data
  * učitelé fakulty
    - název a kód katedry, ke které přísluší
    - celé jméno

Odkazy
  * `Rozvrh učitele`_

.. TIP:: Funkci rozcestníku k rozvrhům zastoupí vyhledávání kalendářů osob, místností a předmětů. Místo toho, aby uživatel hledal daného učitele v seznamu, jen napíše jeho jméno nebo uživatelské jméno do vyhledávacího políčka (s našeptávačem).

.. CAUTION:: Jmenný seznam učitelů (vč. jejich katedry) je dostupný na fakultních webových stránkách a je dohledatelný také v Usermapu, tady s ním tedy nepočítáme.


Seznam studentů
---------------

Seznam studentů fakulty s odkazem na jejich rozvrh.

Data
  * studenti fakulty
    - celé jméno
    - uživatelské jméno

Odkazy
  * `Rozvrh studenta`_


.. TIP:: Funkci rozcestníku k rozvrhům zastoupí vyhledávání kalendářů osob, místností a předmětů. Místo toho, aby uživatel hledal daného studenta v seznamu, jen napíše jeho jméno nebo uživatelské jméno do vyhledávacího políčka (s našeptávačem).

.. CAUTION:: Jmenný seznam studentů s rozvrhy přímo nesouvisí, tady s ním tedy nepočítáme. Zaměstnanci mohou studenty vyhledávat v Usermapu, studenti na to dle nového nařízení rektora ohledně ochramy osobních údajů nemají právo.


Seznam jednorázových akcí
-------------------------

Seznam aktuálně vypsaných jednorázových akcí fakulty.

Data
  * jednorázové akce předmětů fakulty (seskupené dle předmětu)
    - český název a kód předmětu
    - název akce
    - datum a čas konání

Odkazy
  * `Jednorázová akce`_


Jednorázová akce
----------------

Data
  * název akce
  * kapacita
  * počet obsazených míst
  * čas a datum konání
  * datum uzávěrky přihlášek
  * celé jméno učitele
  * katedra (kód a název)

Odkazy
  * `Rozvrh učitele`_


.. TIP:: Jednorázové akce předmětů jsou v Siriu reprezentovány jako události s vazbou na daný předmět a místnost, zobrazí se tedy v kalendáři předmětu, resp. místnosti. Navíc se zobrazí v kalendáři učitele, který akci vypsal, a studentů, kteří se na ni přes KOS přihlásili.


Rozvrh
------

Dvoutýdenní rozvrh ve formě tabulky s hodinami na horizontální ose a dny na vertikální ose.

Data
  * rozvrhové lístky
    - den, hodina (pořadové číslo) a parita týdne
    - typ paralelky (P/C/L)


.. TIP:: Dvoutýdenní rozvrh bude nahrazen klasickým kalendářním pohledem, který reflektuje skutečný průběh semestru (vč. přesunů výuky apod.), dokáže zobrazit blokovou výuku apod.  Budou k dispozici dva základní módy zobrazení – horizontální (rozvrhový) a vertikální (klasický kalendářní).


Rozvrh předmětu
~~~~~~~~~~~~~~~

*Rozšiřuje `Rozvrh`_.*

Data
  * český název a kód předmětu
  * hodinová dotace předmětu (např. 2+2, 2+0…)
  * rozvrhové lístky paralelek předmětu
    - kód místnosti
    - jména učitelů
    - číslo paralelky
    - počet zapsaných studentů

Odkazy
  * `Seznam studentů zapsaných na předmět`_
  * u každého rozvrhového lístku:
    - `Rozvrh místnosti`_
    - `Rozvrh učitele`_, `Rozvrhy učitelů`_
    - `Seznam studentů zapsaných na paralelku`_


.. CAUTION:: Aktuálně nepočítáme se zobrazováním hodinové dotace předmětu, neb v kontextu již sestaveného rozvrhu jde o redundantní informaci a navíc je dostupná v Bílé knize.


Rozvrh učitele
~~~~~~~~~~~~~~

*Rozšiřuje `Rozvrh`_.*

Rozvrh učitele navíc obsahuje speciální rovrhové lístky, tzv. omezení učitele.
Tento typ lístku využívají učitelé pro přidání vlastních událostí do svého rozvrhu, např. konzultační hodiny, schůze pracovní skupiny apod.

Data
  * celé jméno učitele
  * rozvrhové lístky paralelek, které učitel vyučuje
    - kód předmětu
    - kód místnosti
    - číslo paralelky
    - počet zapsaných studentů
  * rozvrhové lístky typu „omezení učitele“
    - den, hodina (pořadové číslo) a parita týdne
    - název lístku
  * emailové adresy studentů paralelek, které vyučuje, dle předmětu a typu paralelky

Odkazy
  * u každého rozvrhového lístku:
    - `Rozvrh předmětu`_
    - `Rozvrh místnosti`_
    - `Seznam studentů zapsaných na paralelku`_


.. CAUTION:: S agregací e-mailových adres studentů napříč více paralelkami konkrétního vyučujícího momentálně nepočítáme. Stejnou funkcionalitu poskytuje webové rozhraní KOSu, pro vyučující dostupné přes Předměty → Prezenční seznamy → Email → Všechny moje paralelky.


Rozvrh studenta
~~~~~~~~~~~~~~~

*Rozšiřuje `Rozvrh`_.*

Data
  * celé jméno studenta
  * rozvrhové lístky paralelek, na které je student zapsaný
    - kód předmětu
    - kód místnosti
    - jména učitelů

Odkazy
  * zkouškové termíny zapsaných předmětů
  * u každého rozvrhového lístku:
    - `Rozvrh předmětu`_
    - `Rozvrh místnosti`_
    - `Rozvrh učitele`_, `Rozvrhy učitelů`_


Rozvrh místnosti
~~~~~~~~~~~~~~~~

*Rozšiřuje `Rozvrh`_.*

Data
  * kód místnosti
  * rozvrhové lístky paralelek, které se v místnosti učí
    - kód předmětu
    - jména učitelů
    - číslo paralelky
    - počet zapsaných studentů

Odkazy
  * u každého rozvrhového lístku:
    - `Rozvrh předmětu`_
    - `Rozvrh učitele`_, `Rozvrhy učitelů`_
    - `Seznam studentů zapsaných na paralelku`_


Rozvrh místnosti na den
~~~~~~~~~~~~~~~~~~~~~~~

*Rozšiřuje `Rozvrh`_.*

Tento způsob zobrazení se od předchozích podstatně liší v tom, že na vertikální ose nejsou dny, ale místnosti.
Poskytuje přehled využití všech místností fakulty po jednotlivých dnech.

Data
  * kód místnosti
  * rozvrhové lístky paralelek, které se v místnosti učí
    - kód předmětu
    - jména učitelů
    - číslo paralelky
    - počet zapsaných studentů

Odkazy
  * u každého rozvrhového lístku:
    - `Rozvrh předmětu`_
    - `Rozvrh učitele`_, `Rozvrhy učitelů`_
    - `Seznam studentů zapsaných na paralelku`_


.. WARNING:: Tento pohled moc nepasuje do kalendářního zobrazení rozvrhů a jde spíše o pomůcku pro rozvrháře.         Je potřeba zjistit, zda ho používá i někdo jiný než rozvrháři a k jakým konkrétním účelům, případně pak vymyslet vhodnou náhradu. Zatím s ním počítáme pouze v rozhraní pro rozvrháře.


Seznam zapsaných studentů
-------------------------

Seznam studentů zapsaných na předmět nebo paralelku.

Data
  * český název a kód předmětu
  * semestr slovy
  * den, hodina (skutečný čas od-do), parita týdne
  * seznam studentů řazený dle jména:
    - příjmení a jméno
    - ročník
    - kruh
    - docházka (nepoužívá se, KOS taková data ani neobsahuje)
    - zápočet
    - e-mailová adresa

Odkazy
  * `Rozvrh předmětu`_
  * `Rozvrh studenta`_


.. CAUTION:: Někteří vyučující si tuto stránku tisknou a používají jako záznamový arch pro docházku. S touto funkcionalitou zde nepočítáme, vyučující si mohou prezenční seznam vytisknout z webového rozhraní KOSu: Předměty → Prezenční seznamy → Tisk (`ukázka <img/kos-attendance-list.png>`_).


Seznam studentů zapsaných na předmět
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

*Rozšiřuje `Seznam zapsaných studentů`_.*

Tento seznam zahrnuje i studenty, kteří nejsou zapsaní na žádnou paralelku.


.. CAUTION:: Toto nespadá do kompetence Siria a v novém rozhraní s tím momentálně nepočítáme. Vyučující si mohou zobrazit seznam všech studentů ve webovém rozhraní KOSu: Předměty → Prezenční seznamy, ve filtru „Paralelka“ zvolit „Všechny moje paralelky.“


Seznam studentů zapsaných na paralelku
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

*Rozšiřuje `Seznam zapsaných studentů`_.*

Data
  * počet studentů zapsaných na paralelce
  * číslo paralelky
  * jména vyučujících
  * kód místnosti
  * e-mailová adresa (alias) paralelky

Odkazy
  * `Rozvrh učitele`_
  * `Rozvrh místnosti`_
  * `Rozvrh studenta`_, `Rozvrhy studentů`_


.. TIP:: U každé události bude seznam jejích účastníků, tedy zapsaných studentů.
