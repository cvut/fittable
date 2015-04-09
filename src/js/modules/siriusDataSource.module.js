/**
 * @class SiriusDataSource
 * @brief meh
 */

import dataSource from './siriusDataSource.module.js';

console.log( dataSource );

export default class siriusDataSource extends dataSource
{
    constructor( baseUrl, accessToken )
    {
        this.baseURL = baseUrl.endsWith('/') ? baseUrl : baseurl + '/';
        this.accessToken = accessToken;
    }

    makeRequest( subject, parameters, callback )
    {
        var tplReq = new XMLHttpRequest();
        var params = '';

        // Create parameters string (GET)
        if ( parameters.length > 0 )
        {
            params = '?';
            for ( var i in parameters )
                params += i + ':' + parameters[i] + ( i != parameters.length - 1 ? '&' : '');
        }

        console.log( params );

        tplReq.open( 'get', this.baseURL + params, true );
        tplReq.onload = () => {
            callback( tplReq.response );
        };
        tplReq.send();
    }

    /**
     * Constructs a request to Sirius API and returns all event within specified
     * date range through callback in JSON format.
     * @param dateFrom
     * @param dateTo
     * @param person
     * @param offset
     * @param limit
     * @param callback
     */
    getEventsByPerson( dateFrom, dateTo, person, callback )
    {
        makeRequest( 'people/' + person + '/events', {
            'from': dateFrom,
            'to': dateTo,
            'offset': 0,
            'limit': 120
        }, callback);
    }
}
