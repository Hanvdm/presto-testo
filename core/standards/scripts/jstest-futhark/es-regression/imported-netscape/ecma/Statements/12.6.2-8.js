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
    File Name:          12.6.2-8.js
    ECMA Section:       12.6.2 The for Statement

                        1. first expression is present.
                        2. second expression is present
                        3. third expression is present


    Author:             christine@netscape.com
    Date:               15 september 1997
*/
    var SECTION = "12.6.2-8";
    var VERSION = "ECMA_1";
    startTest();
    var TITLE   = "The for statment";

    writeHeaderToLog( SECTION + " "+ TITLE);

    var testcases = getTestCases();

    test();

function getTestCases() {
    var array = new Array();
    array[0] = new TestCase( SECTION, "for statement",  256,     "" );
    return ( array );
}
function testprogram() {
    var myVar;

    for ( myVar=2;  myVar < 256; myVar *= myVar ) {
    }

    return myVar;
}
function test() {
        testcases[0].actual = testprogram();

        testcases[0].passed = writeTestCaseResult(
                    testcases[0].expect,
                    testcases[0].actual,
                    testcases[0].description +" = "+ testcases[0].actual );

        testcases[0].reason += ( testcases[0].passed ) ? "" : "wrong value ";
        stopTest();
        return ( testcases );
}
