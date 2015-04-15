/*
    todo: Defining the dictionary as global variable isn't probably the right
            way to do this. Need to find out how to assign constant to the Locale object
 */
global.activeLanguage = 'english';

/*  LOCALIZATION DICTIONARY
     - Keep the dictionary NOT redundant
 */
global.dictionary = {
    'czech': {
        'week':     'Týden',
        'odd':      'Lichý',
        'even':     'Sudý',
        'day0':     'Pondělí',
        'day1':     'Úterý',
        'day2':     'Středa',
        'day3':     'Čtvrtek',
        'day4':     'Pátek',
        'day5':     'Sobota',
        'day6':     'Neděle'
    },
    'english': {
        'week':     'Week',
        'odd':      'Odd',
        'even':     'Even',
        'day0':     'Monday',
        'day1':     'Tuesday',
        'day2':     'Wednesday',
        'day3':     'Thursday',
        'day4':     'Friday',
        'day5':     'Saturday',
        'day6':     'Sunday'
    }
};

/**
 * @class Locale
 * @brief Class for translations
 */
export default class Locale
{

    static l( key )
    {
        return global.dictionary[ global.activeLanguage ][ key ];
    }

    static ll( key )
    {
        return Locale.l( key ).toLowerCase();
    }

    static lu( key )
    {
        return Locale.l( key ).toUpperCase();
    }
}
