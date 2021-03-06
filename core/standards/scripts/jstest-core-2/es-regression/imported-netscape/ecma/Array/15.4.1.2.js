/* The contents of this file are subject to the Netscape Public License
 * Version 1.0 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://www.mozilla.org/NPL/
 * 
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
 * License for the specific language governing rights and limitations
 * under the License.
 * 
 * The Original Code is Mozilla Communicator client code, released March
 * 31, 1998.
 * 
 * The Initial Developer of the Original Code is Netscape Communications
 * Corporation. Portions created by Netscape are Copyright (C) 1998
 * Netscape Communications Corporation. All Rights Reserved.
 * 
 */
/**
    File Name:          15.4.1.2.js
    ECMA Section:       15.4.1.2 Array(len)

    Description:        When Array is called as a function rather than as a
                        constructor, it creates and initializes a new array
                        object.  Thus, the function call Array(...) is
                        equivalent to the object creationi new Array(...) with
                        the same arguments.

                        An array is created and returned as if by the
                        expression new Array(len).

    Author:             christine@netscape.com
    Date:               7 october 1997
*/
    var SECTION = "15.4.1.2";
    var VERSION = "ECMA_1";
    startTest();
    var TITLE   = "Array Constructor Called as a Function:  Array(len)";

    writeHeaderToLog( SECTION + " "+ TITLE);

    var testcases = getTestCases();
    test();

function getTestCases() {
    var array = new Array();
    var item = 0;

    array[item++] = new TestCase( SECTION,  "(Array()).length",             0,                              (Array()).length );
    array[item++] = new TestCase( SECTION,	"(Array(0)).length",            0,                              (Array(0)).length );
    array[item++] = new TestCase( SECTION,	"(Array(1)).length",            1,                              (Array(1)).length );
    array[item++] = new TestCase( SECTION,	"(Array(-1)).length",           ToUint32(-1),                   (Array(-1)).length );
    array[item++] = new TestCase( SECTION,	"(Array(10)).length",           10,                             (Array(10)).length );
    array[item++] = new TestCase( SECTION,	"(Array('1')).length",          1,                              (Array('1')).length );
    array[item++] = new TestCase( SECTION,	"(Array(1000)).length",         1000,                           (Array(1000)).length );
    array[item++] = new TestCase( SECTION,	"(Array('1000')).length",       1,                              (Array('1000')).length );
    array[item++] = new TestCase( SECTION,	"(Array(4294967295)).length",   ToUint32(4294967295),           (Array(4294967295)).length );
    array[item++] = new TestCase( SECTION,	"(Array(4294967296)).length",   ToUint32(4294967296),           (Array(4294967296)).length );
    array[item++] = new TestCase( SECTION,	"(Array(4294967297)).length",   ToUint32(4294967297),           (Array(4294967297)).length );
    array[item++] = new TestCase( SECTION,	"(Array(Math.pow(2,31)-1)).length",     ToUint32(Math.pow(2,31)-1),     (Array(Math.pow(2,31)-1)).length );
    array[item++] = new TestCase( SECTION,	"(Array(Math.pow(2,31))).length",       ToUint32(Math.pow(2,31)),       (Array(Math.pow(2,31))).length );
    array[item++] = new TestCase( SECTION,	"(Array(Math.pow(2,31)+1)).length",     ToUint32(Math.pow(2,31)+1),     (Array(Math.pow(2,31)+1)).length );
    array[item++] = new TestCase( SECTION,	"(Array(8589934592)).length",   ToUint32(8589934592),           (Array(8589934592)).length );
    array[item++] = new TestCase( SECTION,	"(Array('8589934592')).length", 1,                              (Array("8589934592")).length );
    array[item++] = new TestCase( SECTION,	"(Array('4294967296')).length", 1,                              (Array("4294967296")).length );
    array[item++] = new TestCase( SECTION,	"(Array(3.14159)).length",      ToUint32(3.14159),              (Array(3.14159)).length );
    array[item++] = new TestCase( SECTION,	"(Array(-3.14159)).length",     ToUint32(-3.14159),             (Array(-3.14159)).length );
    array[item++] = new TestCase( SECTION,	"(Array(1073741823)).length",   ToUint32(1073741823),           (Array(1073741823)).length );
    array[item++] = new TestCase( SECTION,	"(Array(1073741824)).length",   ToUint32(1073741824),	        (Array(1073741824)).length );
    array[item++] = new TestCase( SECTION,	"(Array('a string')).length",   1,                              (Array("a string")).length );

    return ( array );
}
function test() {
    for ( tc=0; tc < testcases.length; tc++ ) {
        testcases[tc].passed = writeTestCaseResult(
                            testcases[tc].expect,
                            testcases[tc].actual,
                            testcases[tc].description +" = "+ testcases[tc].actual );
        testcases[tc].reason += ( testcases[tc].passed ) ? "" : "wrong value ";
    }
    stopTest();
    return ( testcases );
}
function ToUint32( n ) {
    n = Number( n );
    var sign = ( n < 0 ) ? -1 : 1;

    if ( Math.abs( n ) == 0 || Math.abs( n ) == Number.POSITIVE_INFINITY) {
        return 0;
    }
    n = sign * Math.floor( Math.abs(n) )

    n = n % Math.pow(2,32);

    if ( n < 0 ){
        n += Math.pow(2,32);
    }

    return ( n );
}